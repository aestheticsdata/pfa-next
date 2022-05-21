const prisma = require('../../../db/dbInit');

module.exports = async (req, res, _next) => {
  const dashboard = await prisma.dashboards.findFirst({
    where: {
      userID: req.query.userID,
      dateFrom: new Date(req.query.start),
    }
  });
  res.json(dashboard);
};
