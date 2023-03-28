const dbConnection = require('../../../db/dbinitmysql');

module.exports = async (req, res, _next) => {
  let dashboard;

  const sqlInitialAmount = `
    UPDATE Dashboards
    SET initialAmount="${req.body.amount}"
    WHERE ID="${req.params.id}"
  `;

  if (req.body.amount !== null) {
   dbConnection.query(
     sqlInitialAmount,
     (err, results) => {
       dashboard = results;
     }
   );
  }

  const sqlCeiling = `
    UPDATE Dashboards
    SET initialCeiling="${req.body.ceiling}"
    WHERE ID="${req.params.id}"
  `;

  if (req.body.ceiling !== null) {
   dbConnection.query(
     sqlCeiling,
     (err, results) => {
       dashboard = results
     }
   );
  }

  res.json(dashboard);
}
