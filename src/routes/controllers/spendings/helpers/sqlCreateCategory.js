const sqlCreateCategory = (newCategoryID, userID, category) => `
  INSERT INTO Categories (ID, userID, name, color)
  VALUES ("${newCategoryID}", "${userID}", "${category.name}", "${category.color}");
`;

module.exports = sqlCreateCategory;
