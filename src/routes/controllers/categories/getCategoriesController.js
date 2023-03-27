const dbConnection = require('../../../db/dbinitmysql');

module.exports = async (req, res, _next) => {
  const sql = `
    SELECT * FROM Categories
    WHERE userID="${req.query.userID}";
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      res.json(results)
    }
  );
};
