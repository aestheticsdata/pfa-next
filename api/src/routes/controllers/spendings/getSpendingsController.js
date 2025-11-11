const dbConnection = require('../../../db/dbinitmysql');
const dateFormatter = require('../../api/helpers/dateFormatter');


module.exports = async (req, res) => {
  const {
    from,
    to,
  } = dateFormatter(req.query.from, req.query.to);

  const sql = `
    SELECT s.*, c.name as category, c.color as categoryColor
    FROM Spendings s
    LEFT JOIN Categories c ON s.categoryID = c.ID
    WHERE s.date BETWEEN '${from}' AND '${to}' AND s.userID='${req.query.userID}'
    ORDER BY date ASC;
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      res.json(results);
    }
  );
};


