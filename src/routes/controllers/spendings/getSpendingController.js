const dbConnection = require('../../../db/dbinitmysql');


module.exports = async (req, res, _next) => {
  const sql = `
    SELECT DISTINCT spending
    FROM Spendings
    WHERE spendingID=${req.params.id} AND userID=${req.params.userID};
`;
  dbConnection.query(
    sql,
    (err, results) => {
      res.json(results);
    }
  );
};

