const dbConnection = require('../../../db/dbinitmysql');
const sqlQueries = require("./helpers/sqlQueries");


module.exports = async (req, res, _next) => {
  dbConnection.query(
    sqlQueries.getSpending(req.params.id, req.params.userID),
    (err, results) => {
      res.json(results);
    }
  );
};

