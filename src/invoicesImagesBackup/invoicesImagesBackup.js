const chokidar = require('chokidar');
const { uploadPath } = require('../routes/controllers/spendings/helpers/constants');
const sshCopy = require('../helpers/sshRaw').copy;

module.exports = invoicesImagesBackup = () => {
  chokidar.watch(uploadPath, {
    ignoreInitial: true,
  }).on('add', path => {
    console.log("chokidar ---- 9");
    const pathSplitted = path.split('/');
    const userID = pathSplitted[4];
    const fileName = pathSplitted[5];
    console.log("chokidar ---- 13")
    const dest = `${process.env.PFA_BACKUP_INVOICES_SERVER_PATH}${userID}/${fileName}`;
    console.log("chokidar dest : ", dest);
    try {
      (path.split('.')[0]).search(/-r$/) !== -1 && sshCopy(path, dest);
    } catch (e) {
      console.log("chokidar error : ", e);
    }
  });
};
