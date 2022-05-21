// const { DataTypes } = require('sequelize');
//
// const Dashboard = sequelize => sequelize.define('Dashboard', {
//   ID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1, // default value not working, bug in sequelize or mysql ? see https://github.com/sequelize/sequelize/issues/10879
//     primaryKey: true
//   },
//   userID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1,
//   },
//   dateFrom: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   dateTo: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   initialAmount: {
//     type: DataTypes.DECIMAL(6,2),
//     allowNull: false,
//   },
// }, {
//   timestamps: false,
// });
//
// module.exports = Dashboard;
//
