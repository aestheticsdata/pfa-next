const signIn = require('./helpers/signInHelper');
const bcrypt = require('bcryptjs');
const prisma = require('../../../db/dbInit');
const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');


module.exports = async (req, res, next) => {
  const {
    name,
    email,
    password,
    baseCurrency,
    registerDate,
    language,
  } = req.body;

  if (!name || !email || !password) {
    return next(createError(500, 'Please enter all fields'));
  }

  let user = await prisma.users.findUnique({ where: { email } });
  if (user) { return next(createError(500, 'Email already exists')); }

  const newUser = {
    ID: uuidv1(),
    name,
    email,
    password,
    baseCurrency,
    registerDate,
    language,
  };

  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error('There was an error during salt', err);
    else {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) console.error('There was an error during hash', err);
        else {
          newUser.password = hash;
          user = await prisma.users.create({ data: newUser });
          signIn(res, user);
        }
      });
    }
  });
};



