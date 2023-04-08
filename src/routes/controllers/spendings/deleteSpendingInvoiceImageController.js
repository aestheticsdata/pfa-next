const { unlink } = require('fs').promises;
const dbConnection = require('../../../db/dbinitmysql');
const { uploadPath } = require('./helpers/constants');
const sshDeleteFile = require('../../../helpers/sshRaw').deleteFile;


module.exports = async (req, res, _next) => {
  const {
    ID: spendingID,
    itemType,
    userID,
    invoicefile,
  } = req.body;

  await unlink(uploadPath + userID + '/' + invoicefile);

  const sqlSpending = `
    UPDATE Spendings
    SET invoicefile=NULL
    WHERE ID="${spendingID}";
  `;
  if (itemType === 'spending') { //@TODO recurring, pour l'instant il n'y a pas d'invoice file pour les recurrings
    dbConnection.query(
      sqlSpending,
      () => {
        if (process.env.PROD) {
          sshDeleteFile(process.env.PFA_BACKUP_INVOICES_SERVER_PATH + userID + '/' + invoicefile);
        }
        res.status(200).json({ msg: 'INVOICE_IMAGE_DELETED'});
      }
    );
  }
}
