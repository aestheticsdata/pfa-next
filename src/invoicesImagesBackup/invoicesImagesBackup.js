const chokidar = require('chokidar');
const { uploadPath } = require('../routes/controllers/spendings/helpers/constants');
const sshCopy = require('../helpers/sshRaw').copy;

module.exports = invoicesImagesBackup = () => {
  chokidar.watch(uploadPath, {
    ignoreInitial: true,
  }).on('add', path => {
    const pathSplitted = path.split('/');
    const userID = pathSplitted[4];
    const fileName = pathSplitted[5];
    const dest = `${process.env.PFA_BACKUP_INVOICES_SERVER_PATH}${userID}/${fileName}`;
    (path.split('.')[0]).search(/-r$/) !== -1 && sshCopy(path, dest);
  });
};
