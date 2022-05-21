const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const spending = await prisma.spendings.findUnique({
    where: {
      spendingID: req.params.id,
      userID: req.params.userID,
    }
  });
  res.json(spending);
};

