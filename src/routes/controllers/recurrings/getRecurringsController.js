const prisma = require('../../../db/dbInit');

module.exports = async (req, res, _next) => {
  const recurrings = await prisma.recurrings.findMany({
    where: {
      AND: [
        { userID: req.query.userID },
        {
          dateFrom: { equals: new Date(req.query.start) }
        },
      ]
    },
    orderBy: {
      amount: 'desc',
    },
  });
  res.json(recurrings);
};
