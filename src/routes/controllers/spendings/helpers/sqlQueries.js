const sqlQueries = {
  getSpending: (spendingID, userID) => `
      SELECT DISTINCT spending
      FROM Spendings
      WHERE spendingID=${spendingID} AND userID=${userID};
    `,
  createCategory: (newCategoryID, userID, category) => `
    INSERT INTO Categories (ID, userID, name, color)
    VALUES ("${newCategoryID}", "${userID}", "${category.name}", "${category.color}");
  `
};

module.exports = sqlQueries;
