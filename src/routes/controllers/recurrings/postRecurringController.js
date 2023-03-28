// const prisma = require('../../../db/dbInit');
// const { v1: uuidv1 } = require('uuid');
// const createError = require('http-errors');
//
//
// module.exports = async (req, res, next) => {
//   const {
//     userID,
//     start: dateFrom,
//     end: dateTo,
//     label,
//     amount,
//     currency,
//   } = req.body;
//
//   if (!amount || !label) {
//     return next(createError(500, 'Please enter amount and label'));
//   }
//
//   await prisma.recurrings.create({
//     data: {
//       ID: uuidv1(),
//       userID,
//       dateFrom: new Date(dateFrom),
//       dateTo: new Date(dateTo),
//       label,
//       amount,
//       currency,
//       itemType: 'recurring',
//     },
//   });
//   res.json('new category added');
// };




const dbConnection = require('../../../db/dbinitmysql');
const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  const {
    userID,
    start: dateFrom,
    end: dateTo,
    label,
    amount,
    currency,
  } = req.body;

  if (!amount || !label) {
    return next(createError(500, 'Please enter amount and label'));
  }

  const sql = `
    INSERT INTO Recurrings (ID, userID, dateFrom, dateTo, label, amount, currency, itemType)
    VALUES ("${uuidv1()}", "${userID}", "${dateFrom}", "${dateTo}", "${label}", "${amount}", "${currency}", "recurring")
  `;

  dbConnection.query(
    sql,
    () => {
      res.json("new recurring added")
    }
  );
};

