const dbConnection = require('../../../db/dbinitmysql');
const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');
const format = require('date-fns/format');

module.exports = async (req, res, _next) => {
  const { userID } = req.query;
  const start = format(startOfMonth(new Date(req.query.from)), 'yyyy-MM-dd');
  const end = format(endOfMonth(new Date(req.query.from)), 'yyyy-MM-dd');

  const sqlRecurringsSum = `
    SELECT SUM(amount) as amount
    FROM Recurrings
    WHERE userID = "${userID}"
    AND dateFrom = "${start}"
    AND dateTo = "${end}";
  `;

  const sqlSpendingsSum = `
    SELECT SUM(amount) as amount
    FROM Spendings
    WHERE userID = "${userID}"
    AND date >= "${start}"
    AND date <= "${end}";
  `;

  let recurringsSum = { amount: "0" }
  let spendingsSum = { amount: "0" };

  dbConnection.query(
    sqlRecurringsSum,
    (err, results) => {
      (results?.length > 0) && (recurringsSum = results[0]);
      dbConnection.query(
        sqlSpendingsSum,
        (err, results) => {
          (results?.length > 0) && (spendingsSum = results[0]);
          res.json({ spendingsSum, recurringsSum });
        }
      );
    }
  );
};
