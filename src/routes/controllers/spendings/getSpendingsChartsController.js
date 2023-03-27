const dbConnection = require('../../../db/dbinitmysql');
const dateFormatter = require('../../api/helpers/dateFormatter');

module.exports = async (req, res, _next) => {
  const {
    from,
    to,
  } = dateFormatter(req.query.from, req.query.to);

  const sql = `
    SELECT amount as value, name as category, color as categoryColor
    FROM 
      (
        SELECT categoryID, SUM(amount) as amount
        FROM Spendings
        LEFT JOIN Categories ON Spendings.categoryID = Categories.ID
        WHERE Spendings.userID = "${req.query.userID}"
        AND Spendings.date BETWEEN "${from}" AND "${to}"
        GROUP BY categoryID
      ) as TableTemp
      LEFT JOIN Categories on TableTemp.categoryID = Categories.ID
      ORDER BY amount DESC;
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      res.status(200).json(results);
    }
  );
};
