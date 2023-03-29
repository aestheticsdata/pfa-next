// const prisma = require('../../../db/dbInit');
const dbConnection = require('../../../db/dbinitmysql');
const { format, subMonths } = require('date-fns');
const { v1: uuidv1 } = require('uuid');

module.exports = async (req, res, _next) => {
  const currentMonth = req.body.month.start;
  const dateFormat = 'yyyy-MM-dd';
  const previousMonthStart = format(subMonths(new Date(currentMonth), 1), dateFormat);

  const sqlRead = `
    SELECT label, amount, itemType, currency, userID, invoicefile
    FROM Recurrings
    WHERE dateFrom="${previousMonthStart}" AND userID="${req.body.userID}";
  `;

  const order = ["ID", "userID", "dateFrom", "dateTo", "label", "amount", "currency", "itemType"];

  const sqlWrite = (values) => `
    INSERT INTO Recurrings (${order.toString()})
    VALUES ${values};
  `;

  dbConnection.query(
    sqlRead,
    (err, results) => {
      const recurringsFromCurrentMonth = results.map(recurring => ({
        ...recurring,
        ID: uuidv1(),
        dateFrom: format(new Date(currentMonth), dateFormat),
        dateTo: format(new Date(req.body.month.end), dateFormat),
        invoicefile: "NULL",
      }));


      const sortedValues = recurringsFromCurrentMonth.map((recurring) => {
        return "("+ order.map(key => {
          const value = recurring[key];
          if (key === "amount") return Number(value);
          return '"'+recurring[key]+'"';
        })+ ")"});

      dbConnection.query(
        sqlWrite(sortedValues),
        () => {
          res.status(200).json({msg: 'recurrings copied'});
        }
      );
    }
  );
};
