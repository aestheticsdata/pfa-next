const signIn = require('./helpers/signInHelper');
const bcrypt = require('bcryptjs');
const prisma = require('../../../db/dbInit');
const createError = require('http-errors');


module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return next(createError(500, 'Please enter all fields'));
  }

  // Check for existing user
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return next(createError(500, 'User does not exist'));

  // Validate password
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) return next(createError(500, 'Invalid credentials'));
  signIn(res, user);
};
