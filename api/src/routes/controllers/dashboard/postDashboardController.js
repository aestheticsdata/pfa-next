const dbConnection = require('../../../db/dbinitmysql');
const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');


module.exports = async (req, res, next) => {
  const {
    start,
    end,
    amount,
    userID,
  } = req.body;

  if (!amount || !start) {
    return next(createError(500, 'Please enter amount and a date'));
  }

  let sql = `
    SELECT * FROM Dashboards
    WHERE userID="${userID}" AND dateFrom="${start}"
  `;

  // this code seems to be unused
  // see below
  let sqlUpdate = (dashboard) => `
    UPDATE Dashboards
    SET initialAmount=amount
    WHERE ID="${dashboard.ID}"
  `;
  // end of maybe unused code
  // ////////////////////////

  let sqlCreate = `
    INSERT INTO Dashboards (ID, dateFrom, dateTo, initialAmount, userID)
    VALUES ("${uuidv1()}", "${start}", "${end}", "${amount}", "${userID}")
  `;

  dbConnection.query(
    sql,
    (err, results) => {
      // this code seems to be unreachable since there is an update controller which
      // is called when a dashboard already exists
      if (results.length > 0) {
        dbConnection.query(
          sqlUpdate(results[0]),
          (err, results) => {
            res.json(results)
          }
        )
      // end of maybe unreachable code //////////////////////////////////////////
      // ////////////////////////////////////////////////////////////////////////
      } else {
        dbConnection.query(
          sqlCreate,
          (err, results) => {
            res.json(results);
          }
        )
      }
    }
  )
};

