const dbConnection = require('../../../db/dbinitmysql');

module.exports = async (req, res, _next) => {
  const { id: ID } = req.params;

  const sqlDelete = `
    DELETE FROM Categories
    WHERE ID="${ID}";
  `;

  const sqlSpendingsUpdate = `
    UPDATE Spendings
    SET categoryID=NULL
    WHERE categoryID="${ID}";
  `;

  dbConnection.query(
    sqlDelete,
    () => {
      dbConnection.query(
        sqlSpendingsUpdate,
        () => {
          res.json({ success: true });
        }
      )
    }
  )
};
