const sqlQueries = {
  getSpending: (spendingID, userID) => `
    SELECT * FROM Spendings
    WHERE ID="${spendingID}" AND userID="${userID}";
    `,
  createCategory: (newCategoryID, userID, category) => `
    INSERT INTO Categories (ID, userID, name, color)
    VALUES ("${newCategoryID}", "${userID}", "${category.name}", "${category.color}");
  `
};

module.exports = sqlQueries;
