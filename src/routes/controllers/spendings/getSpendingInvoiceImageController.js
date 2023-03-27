const dbConnection = require('../../../db/dbinitmysql');
const getImage = require('./helpers/getImage');

module.exports = async (req, res, _next) => {
  const { id: spendingID } = req.params;
  const { userID } = req.query;

  let invoicefile = null;
  dbConnection.query(
    `
      SELECT DISTINCT invoiceFile
      FROM "${req.query.itemType}s"
      WHERE ID="${spendingID}"
    `,
    (err, results) => {
      invoicefile = results;
    }
  )

  if (invoicefile) {
    const [invoiceImageString, contentType] = await getImage(invoicefile, userID);
    res.setHeader('content-type', contentType);
    res.send(invoiceImageString);
  } else {
    res.status(200).json(null);
  }
};
