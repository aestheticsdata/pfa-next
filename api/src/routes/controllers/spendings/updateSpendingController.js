const { v1: uuidv1 } = require('uuid');
const dbConnection = require('../../../db/dbinitmysql');
const sqlQueries = require("./helpers/sqlQueries");


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
    const uuid = uuidv1();
    dbConnection.query(
      sqlQueries.createCategory(uuid, userID, { name, color }),
      () => {
        const sqlUpdateSpending = () => `
          UPDATE Spendings
          SET label="${label}", amount="${amount}", categoryID="${uuid}"
          WHERE ID="${spendingID}"
        `;
        dbConnection.query(
          sqlUpdateSpending(),
          () => { res.json({ success: true }); }
        )
      }
    );
  };

  dbConnection.query(
    sqlQueries.getSpending(spendingID, userID),
    (err, spending) => {
      if (categoryID !== null && spending[0].categoryID !== categoryID) {
        const sqlCategory = `
          SELECT * FROM Categories
          WHERE ID="${categoryID}";
        `;
        dbConnection.query(
          sqlCategory,
          (err, category) => {
            // les deux ids de categories sont differents alors
            // si la nouvelle catégorie existe deja, changer l'id category du spending
            if (categoryID === category[0]?.ID) {
              const sqlSpendingUpdate = `
                UPDATE Spendings
                SET label="${label}", amount="${amount}", categoryID="${categoryID}"
                WHERE ID="${spendingID}";
              `;
              dbConnection.query(
                sqlSpendingUpdate,
                () => { res.json({ success: true }); }
              )
            } else {
              // si la nouvelle catégorie n'existe pas, créér la nouvelle catégorie, et mettre à jour l'id category du spending
              // const newCategory = await createNewCategory(name, color);
              createNewCategory(name, color);
            }
          }
        )
      } else {
        // la catégorie est null
        // mettre à jour le label et/ou l'amount, et mettre à null l'id de la catégorie du spending
        if (categoryID === null) {
          // let newCategory = null;
          if (color) {
            createNewCategory(name, color);
          } else {
            const sqlUpdateSpending = `
            UPDATE Spendings
            SET label="${label}", amount="${amount}", categoryID="${null}"
            WHERE ID="${spendingID}"
          `;

            dbConnection.query(
              sqlUpdateSpending,
              () => { res.json({ success: true }); }
            )
          }
        } else {
          const sqlUpdateSpending = `
            UPDATE Spendings
            SET label="${label}", amount="${amount}"
            WHERE ID="${spendingID}"
          `;

          dbConnection.query(
            sqlUpdateSpending,
            () => { res.json({ success: true }); }
          )
        }
      }
    }
  )
};

