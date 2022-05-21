module.exports = async (model, ID, res, _next) => {
  await model.delete({ where: { ID } });
  res.json({ success: true });
};
