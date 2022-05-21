const prisma = require('../../../db/dbInit');

const startOfMonth = require('date-fns/startOfMonth');
const endOfMonth = require('date-fns/endOfMonth');
const format = require('date-fns/format');


module.exports = async (req, res, _next) => {
  const { userID } = req.query;
  const start = new Date(format(startOfMonth(new Date(req.query.from)), 'yyyy-MM-dd'));
  const end = new Date(format(endOfMonth(new Date(req.query.from)), 'yyyy-MM-dd'));

  const recurringsSum = await prisma.recurrings.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userID,
      dateFrom: start,
      dateTo: end,
    },
  })

  const spendingsSum = await prisma.spendings.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userID,
      date: {
        gte: start,
        lte: end,
      }
    }
  })

  res.json({ spendingsSum, recurringsSum });
}
