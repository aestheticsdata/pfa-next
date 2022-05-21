const prisma = require('../../../db/dbInit');
const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');

module.exports = async (req, res, next) => {
  const {
    start,
    end,
    amount,
    userID,
  } = req.body;

  let dashboard;

  if (!amount || !start) {
    return next(createError(500, 'Please enter amount and a date'));
  }

  dashboard = await prisma.dashboards.findFirst({
    where: {
      userID,
      dateFrom: new Date(req.body.start),
    }
  });
  if (dashboard) {
    await prisma.dashboards.update({
      where: { ID: dashboard.ID },
      data: {
        initialAmount: amount,
      },
    });
  } else {
    dashboard = await prisma.dashboards.create({
      data: {
        ID: uuidv1(),
        dateFrom: new Date(start),
        dateTo: new Date(end),
        initialAmount: amount,
        userID,
      },
    });
  }
  res.json(dashboard);
};

