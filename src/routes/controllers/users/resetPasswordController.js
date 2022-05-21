const prisma = require('../../../db/dbInit');

const bcrypt = require('bcryptjs');
const passwordgenerator = require('generate-password');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_APIKEY);

const createError = require('http-errors');


module.exports = async (req, res, next) => {
  const { email, subject, changedPassword } = req.body;

  const newPassword = changedPassword || passwordgenerator.generate({
    length: 10,
    numbers: true,
  });

  const msg = {
    to: email,
    from: 'hxf.finance@protonmail.com',
    subject,
    text: `your new password is: ${newPassword}`,
  };

  const user = await prisma.users.findUnique({ where: { email } });
  if (user === null) return next(createError(500, 'no users registered with this email'));

  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error('There was an error during salt', err);
    else {
      bcrypt.hash(newPassword, salt, async (err, hash) => {
        if (err) console.error('There was an error during hash', err);
        else {
          await prisma.users.update({ where: { email }, data: { password: hash } })
          await sendgrid.send(msg);
          res.json('sendgrid success');
        }
      });
    }
  });
};
