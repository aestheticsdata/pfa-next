// const { DataTypes } = require('sequelize');
//
// const Category = sequelize => sequelize.define('Category', {
//   ID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1, // default value not working, bug in sequelize or mysql ? see https://github.com/sequelize/sequelize/issues/10879
//     primaryKey: true,
//   },
//   userID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1,
//   },
//   name: {
//     type: DataTypes.STRING(20),
//     allowNull: false,
//   },
//   color:{
//     type: DataTypes.STRING(20),
//     allowNull: false,
//   },
// }, {
//   timestamps: false,
// });
//
// module.exports = Category;
//
