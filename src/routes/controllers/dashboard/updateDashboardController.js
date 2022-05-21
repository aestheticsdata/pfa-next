const prisma = require('../../../db/dbInit');

module.exports = async (req, res, _next) => {
  let dashboard;
  if (req.body.amount !== null) {
    dashboard = await prisma.dashboards.update({
      where: {
        ID: req.params.id,
      },
      data: {
        initialAmount: req.body.amount,
      },
    });
  }
  if (req.body.ceiling !== null) {
    dashboard = await prisma.dashboards.update({
      where: {
        ID: req.params.id,
      },
      data: {
        initialCeiling: req.body.ceiling,
      },
    });
  }
  res.json(dashboard);
}
