const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const { id: ID } = req.params;
  await prisma.categories.delete({ where: { ID } });
  // UPDATE Spendings SET categoryID = null WHERE categoryID = '${ID}';
  await prisma.spendings.updateMany({
    where: {
      categoryID: ID,
    },
    data: {
      categoryID: null,
    }
  })
  res.json({ success: true });
};
