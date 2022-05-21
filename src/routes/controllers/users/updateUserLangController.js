const prisma = require('../../../db/dbInit');


module.exports = async (req, res, _next) => {
  const user = await prisma.users.findUnique({ where: {ID: req.params.id}});
  user.language = req.body.lang;
  res.json('User updated');
};
