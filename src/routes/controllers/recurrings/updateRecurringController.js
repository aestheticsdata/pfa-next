const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const {
    label,
    amount,
  } = req.body;

  await prisma.recurrings.update({
    where: { ID: req.params.id },
    data: {
      label,
      amount,
    },
  });
  res.json({ success: true });
};
