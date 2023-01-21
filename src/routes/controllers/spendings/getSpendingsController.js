const prisma = require('../../../db/dbInit');
const dateFormatter = require('./helpers/dateFormatter');


module.exports = async (req, res) => {
  const {
    from,
    to,
  } = dateFormatter(req);

  const spendings = await prisma.$queryRaw`
      SELECT s.*, c.name as category, c.color as categoryColor
      FROM Spendings s
      LEFT JOIN Categories c ON s.categoryID = c.ID
      WHERE s.date BETWEEN ${from} AND ${to} AND s.userID=${req.query.userID}
      ORDER BY date ASC;
  `;
  res.json(spendings);
};

