const prisma = require('../../../db/dbInit');
const deleteHelper = require('../helpers/deleteHelper');


module.exports = async (req, res, _next) => {
  await deleteHelper(prisma.spendings, req.params.id, res, _next);
};
