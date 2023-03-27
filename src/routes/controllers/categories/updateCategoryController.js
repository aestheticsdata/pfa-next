const dbConnection = require('../../../db/dbinitmysql');

module.exports =  async (req, res, _next) => {
  const {
    ID: categoryID,
    name,
    color,
    userID,
  } = req.body;

  const sqlUpdate = `
    UPDATE Categories
    SET name="${name}", color="${color}"
    WHERE ID="${categoryID}";
  `;
  const sql = `
    SELECT * FROM Categories
    WHERE userID="${userID}";
  $`;

  dbConnection.query(
    sqlUpdate,
    () => {
      dbConnection.query(
        sql,
        (err, results) => {
          res.json(results);
        }
      );
    }
  );
};

