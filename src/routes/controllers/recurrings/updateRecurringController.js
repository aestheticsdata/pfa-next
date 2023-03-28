const dbConnection = require('../../../db/dbinitmysql');

module.exports = async (req, res, _next) => {
  const {
    label,
    amount,
  } = req.body;

  const sql = `
    UPDATE Recurrings
    SET label="${label}", amount="${amount}"
    WHERE ID="${req.params.id}";
  `;

  dbConnection.query(
    sql,
    () => {
      res.json({ success: true });
    }
  );
};
