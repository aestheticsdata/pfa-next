const dbConnection = require('../../../db/dbinitmysql');
const dateFormatter = require('../../api/helpers/dateFormatter');

module.exports = async (req, res, _next) => {
  const { from } = dateFormatter(req.query.start);

  const sql = `
    SELECT * FROM Recurrings
    WHERE userID="${req.query.userID}" AND dateFrom="${from}"
    ORDER BY amount DESC;
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      res.json(results);
    }
  );
};
