const prisma = require('../../../db/dbInit');
const { v1: uuidv1 } = require('uuid');
const createError = require('http-errors');


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
    await prisma.spendings.create({
      data: {
        ID: uuidv1(),
        userID,
        date: new Date(date),
        label,
        amount,
        categoryID: newCategoryID ?? (existingCategory?.ID ?? category?.ID),
        currency,
        itemType: 'spending',
      }
    });
    res.json('new spending added');
  };

  if (!amount || !label) {
    return next(createError(500, 'Please enter amount and label'));
  }

  if (category.ID === null && category.color !== null) {
    // before creating a new category, we have to check if this user has already a category with this name
    const existingCategory = await prisma.categories.findFirst({
      where : {
        userID,
        name: category.name
      }
    });
    if (existingCategory) {
      // créer un spending en refusant la creation d'une catégorie qui existe deja pour ce user
      await createSpending(null, existingCategory);
    } else {
      const newCategoryID = uuidv1();
      await prisma.categories.create({
        data: {
          ID: newCategoryID,
          userID,
          name: category.name,
          color: category.color,
        }
      });
      await createSpending(newCategoryID);
    }
  } else {
    // no category created, just create a spending
    await createSpending();
  }
};
