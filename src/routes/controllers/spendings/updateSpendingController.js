const prisma = require('../../../db/dbInit');
const dbConnection = require('../../../db/dbinitmysql');
const { v1: uuidv1 } = require('uuid');


module.exports = async (req, res, _next) => {
  const {
    userID,
    label,
    amount,
    id: spendingID,
    category: {
      ID: categoryID,
      color,
      name,
    },
  } = req.body;




  const createNewCategory = async (name, color) => {
    return await prisma.categories.create({
      data: {
        ID: uuidv1(),
        userID,
        name,
        color,
      }
    });
  };

  const spending = await prisma.spendings.findUnique({ where: { ID: spendingID } });
  const spendingCurrentCategoryID = spending.categoryID;

  if (categoryID !== null && spendingCurrentCategoryID !== categoryID) {
    const category = await prisma.categories.findUnique({ where: { ID: categoryID } });
    // les deux ids de categories sont differents alors
    // si la nouvelle catégorie existe deja, changer l'id category du spending
    if (categoryID === category.ID) {
      await prisma.spendings.update({
        where: { ID: spendingID },
        data: {
          label,
          amount,
          categoryID,
        },
      });
    } else {
      // si la nouvelle catégorie n'existe pas, créér la nouvelle catégorie, et mettre à jour l'id category du spending
      const newCategory = await createNewCategory(name, color);
      await prisma.spendings.update({
        where: { ID: spendingID },
        data: {
          label,
          amount,
          categoryID: newCategory.ID,
        },
      })
    }
  } else {
    // la catégorie est null
    // mettre à jour le label et/ou l'amount, et mettre à null l'id de la catégorie du spending
    if (categoryID === null) {
      let newCategory = null;
      if (color) {
        newCategory = await createNewCategory(name, color);
      }
      await prisma.spendings.update({
        where: { ID: spendingID },
        data: {
          label,
          amount,
          categoryID : newCategory?.ID ?? categoryID,
        },
      });
    } else {
      // mettre à jour le label et/ou l'amount du spending uniquement et ne pas toucher à la catégorie
      await prisma.spendings.update({
        where: { ID: spendingID },
        data: {
          label,
          amount,
        },
      });
    }
  }
  res.json({ success: true });
};

