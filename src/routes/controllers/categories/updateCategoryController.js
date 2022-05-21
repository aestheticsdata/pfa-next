const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const {
    ID: categoryID,
    name,
    color,
    userID,
  } = req.body;

  await prisma.categories.update({
    where: { ID: categoryID },
    data: {
      name,
      color,
    },
  });
  const categories = await prisma.categories.findMany({
    where: {
      userID,
    },
  });
  res.json(categories);
};
