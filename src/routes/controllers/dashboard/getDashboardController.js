const dbConnection = require('../../../db/dbinitmysql');
const dateFormatter = require('../../api/helpers/dateFormatter');

module.exports = async (req, res, _next) => {
  const { from } = dateFormatter(req.query.start);

  const sql = `
    SELECT * FROM Dashboards
    WHERE userID="${req.query.userID}" and dateFrom="${from}";
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      if (results.length > 0) {
        const dashboard = {
          ...results[0],
          initialAmount: Number(results[0].initialAmount),
          initialCeiling: Number(results[0].initialCeiling)
        }
        res.json(dashboard);
      } else {
        res.json(null);
      }
    }
  );
};

