// const prisma = require('../../../db/dbInit');
//
// const bcrypt = require('bcryptjs');
// const passwordgenerator = require('generate-password');
//
// // Sendinblue
// const SibApiV3Sdk = require('sib-api-v3-sdk');
// let defaultClient = SibApiV3Sdk.ApiClient.instance;
// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.SENDINBLUE_APIKEY;
// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
// // Sendinblue end
//
//
// const createError = require('http-errors');
//
//
// module.exports = async (req, res, next) => {
//   const { email, subject, changedPassword } = req.body;
//
//   const newPassword = changedPassword || passwordgenerator.generate({
//     length: 10,
//     numbers: true,
//   });
//
//   sendSmtpEmail.subject = subject;
//   sendSmtpEmail.htmlContent = `votre nouveau mot de passe: ${newPassword}`;
//   sendSmtpEmail.sender = {"name":"HXF finance","email":"hxf.finance@gmail.com"};
//   sendSmtpEmail.to = [{"email":email, "name":email}];
//   sendSmtpEmail.replyTo = {"email":"hxf.finance@gmail.com", "name":"HXF Finance"};
//
//   const user = await prisma.users.findUnique({ where: { email } });
//   if (user === null) return next(createError(500, 'no users registered with this email'));
//
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) console.error('There was an error during salt', err);
//     else {
//       bcrypt.hash(newPassword, salt, async (err, hash) => {
//         if (err) console.error('There was an error during hash', err);
//         else {
//           await prisma.users.update({ where: { email }, data: { password: hash } })
//           await apiInstance.sendTransacEmail(sendSmtpEmail);
//           res.json('sendinblue success');
//         }
//       });
//     }
//   });
// };
