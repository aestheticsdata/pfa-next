const deleteHelper = require('../helpers/deleteHelper');

module.exports = async (req, res, _next) => {
  await deleteHelper("Spendings", req.params.id, res, _next);
};
