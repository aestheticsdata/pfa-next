const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');
const dbConnection = require('../../../db/dbinitmysql');
const sqlCreateCategory = require("./helpers/sqlCreateCategory");


module.exports = async (req, res, next) => {
  const {
    userID,
    date,
    label,
    amount,
    category,
    currency,
  } = req.body;

  const createSpending = async (newCategoryID = null, existingCategory = null) => {
    const sqlCreateSpending = `
      INSERT INTO Spendings (ID, userID, date, label, amount, categoryID, currency, itemType)
      VALUES ("${uuidv1()}", "${userID}", "${date}", "${label}", "${amount}", "${newCategoryID ?? (existingCategory?.ID ?? category?.ID)}", "${currency}", "spending");
    `;

    dbConnection.query(
      sqlCreateSpending,
      () => {
        res.json('new spending added');
      }
    )
  };

  if (!amount || !label) {
    return next(createError(500, 'Please enter amount and label'));
  }

  if (category.ID === null && category.color !== null) {
    // before creating a new category, we have to check if this user has already a category with this name
    // category.ID === null && category.color !== null -> c'est une nouvelle catégorie, la couleur
    // a été créé à l'instant par le front, mais elle n'existe pas encore dans la base de donnée
    // d'où le category.ID === null
    const sqlCategory = `SELECT * FROM Categories WHERE userID="${userID}" AND name="${category.name}"`;

    dbConnection.query(
      sqlCategory,
      (err, existingCategory) => {
        if (existingCategory.length > 0) {
          // créer un spending en refusant la creation d'une catégorie qui existe deja pour ce user
          // une catégorie existe déjà avec ce nom mais avec une casse différente, donc il ne faut pas en créer une nouvelle
          // par exemple aBC et AbC
          // ce cas ne doit pas arriver fréquement, à part faute de frappe
          createSpending(null, existingCategory);
        } else {
          const newCategoryID = uuidv1();

          dbConnection.query(
            sqlCreateCategory(newCategoryID, userID, category),
            () => { createSpending(newCategoryID); }
          )
        }
      }
    )
  } else {
    // no category created, just create a spending
    createSpending();
  }
};
