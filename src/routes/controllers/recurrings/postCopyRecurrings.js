const dbConnection = require('../../../db/dbinitmysql');
const { v1: uuidv1 } = require('uuid');

module.exports = async (req, res, _next) => {
  const { start, end, previousMonthStart } = req.body.dates;

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
        dateFrom: start,
        dateTo: end,
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
