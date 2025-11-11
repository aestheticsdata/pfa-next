const ssh = require('ssh2');
const fs = require("fs");
const path = require('path');

const config = {
  host: process.env.PFA_BACKUP_SERVER_IP,
  port: 22,
  username: process.env.DEBIAN_OVH_VPS_SSH_USER,
  privateKey: process.env.NODE_ENV === "production" && fs.readFileSync(process.env.DEBIAN_OVH_VPS_SSH_KEY_PATH),
};

const connection = fn => {
  const conn = new ssh.Client();
  conn.on('error', (err) => {
    console.error('Connection error:', err);
  });
  conn.on('ready', () => {
    console.log('Client :: ready');
  });
  console.log("ssh2 connection ----- 14");
  conn.on('ready', fn(conn)).connect(config);
  console.log("ssh2 connection ----- 16");
}

const checkDirectoryExists = (sftp, dir, callback) => {
  sftp.stat(dir, (err) => {
    if (err && err.code === 2) {
      // Directory does not exist
      checkDirectoryExists(sftp, path.dirname(dir), (err) => {
        if (err) return callback(err);
        sftp.mkdir(dir, callback);
      });
    } else {
      callback(err);
    }
  });
};

module.exports.copy = (src, dest) => {
  console.log("ssh 2 copy");
  const copy = conn => () => conn.sftp((err, sftp) => {
    if (err) {
      console.error('SFTP error:', err);
      return;
    }
    console.log("ssh2 ---- 22");

    const destDir = path.dirname(dest);

    checkDirectoryExists(sftp, destDir, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
        return;
      }

      setTimeout(() => {
        sftp.fastPut(src, dest, {}, error => {
          if (error) {
            console.log('sftp error: ', error);
          } else {
            console.log('File copied successfully');
          }
        });
      }, 60000);
    });
  });
  connection(copy);
};

module.exports.deleteFile = filepath => {
  const deleteFile = conn => () => conn.sftp((err, sftp) => {
    if (err) {
      console.error('SFTP error:', err);
      return;
    }
    sftp.unlink(filepath, (unlinkErr) => {
      if (unlinkErr) {
        if (unlinkErr.code === 2) {
          console.error('File does not exist:', unlinkErr);
        } else {
          console.error('Unlink error:', unlinkErr);
        }
      } else {
        console.log('File deleted successfully');
      }
    });
  });
  connection(deleteFile);
};
