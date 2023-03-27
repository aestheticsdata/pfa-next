const deleteHelper = require('../helpers/deleteHelper');


module.exports = async (req, res, _next) => {
  await deleteHelper("Recurrings", req.params.id, res, _next);
}
