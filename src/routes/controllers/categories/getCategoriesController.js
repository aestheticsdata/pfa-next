const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const categories = await prisma.categories.findMany({
    where: {
      userID: req.query.userID,
    }
  });
  res.json(categories);
};
