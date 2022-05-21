// const { DataTypes } = require('sequelize');
//
// const User = sequelize => sequelize.define('User', {
//   ID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1, // default value not working, bug in sequelize or mysql ? see https://github.com/sequelize/sequelize/issues/10879
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING(20),
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING(60),
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING(250),
//     allowNull: false,
//     unique: true,
//   },
//   registerDate: {
//     type: DataTypes.DATE,
//   },
//   language: {
//     type: DataTypes.STRING(3),
//     defaultValue: 'en',
//   },
//   baseCurrency: {
//     type: DataTypes.STRING(3),
//     allowNull: false,
//   },
// }, {
//   timestamps: false,
// });
//
// module.exports = User;
