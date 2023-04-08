const dbConnection = require('../../../db/dbinitmysql');
const getImage = require('./helpers/getImage');

module.exports = async (req, res, _next) => {
  const { id: spendingID } = req.params;
  const { userID } = req.query;

  let invoicefile = null;

  const itemType = req.query.itemType;

  // itemType is spending or recurring, but no recurring invoice now
  const spendingsTableName = itemType.charAt(0).toUpperCase() + itemType.slice(1) + "s";

  const sqlInvoiceFile = `
    SELECT invoiceFile
    FROM ${spendingsTableName}
    WHERE ID="${spendingID}";
  `;

  dbConnection.query(
    sqlInvoiceFile,
    async (err, results) => {
      invoicefile = results[0]?.invoiceFile;
      if (invoicefile) {
        const [invoiceImageString, contentType] = await getImage(invoicefile, userID);
        res.setHeader('content-type', contentType);
        res.send(invoiceImageString);
      } else {
        res.status(200).json(null);
      }
    }
  );
};
