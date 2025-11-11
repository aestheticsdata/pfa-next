const dbConnection = require('../../../db/dbinitmysql');

module.exports = async (table, ID, res, _next) => {
  const sql = `
    DELETE FROM ${table}
    WHERE ID="${ID}";
  `;

  dbConnection.query(
    sql,
    (_err) => {
      res.json({ success: true });
    }
  )
};
