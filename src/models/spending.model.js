// const { DataTypes } = require('sequelize');
//
// const Spending = sequelize => sequelize.define('Spending', {
//   ID: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV1, // default value not working, bug in sequelize or mysql ? see https://github.com/sequelize/sequelize/issues/10879
//     primaryKey: true
//   },
//   userID: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   itemType: {
//     type: DataTypes.STRING(11),
//     allowNull: false,
//   },
//   label: {
//     type: DataTypes.STRING(100),
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.DECIMAL(6,2),
//     allowNull: false,
//   },
//   categoryID: {
//     type: DataTypes.UUID,
//   },
//   currency: {
//     type: DataTypes.STRING(3),
//   },
//   // FOREIGN KEY (user_id) REFERENCES users(user_id),
//   // FOREIGN KEY (category_id) REFERENCES categories(category_id)
// }, {
//   timestamps: false,
// });
//
// module.exports = Spending;
