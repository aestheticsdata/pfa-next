const dbConnection = require('../../../db/dbinitmysql');
const { format, parse } = require('date-fns');
const { fr } = require('date-fns/locale');

module.exports = async (req, res) => {
  const categoryIDs = req.query.categories.split(',');
  const formattedUUIDs = categoryIDs.map(uuid => `"${uuid}"`).join(', ');

  const years = req.query.years.split(',');
  const formattedYears = years.map(year => `"${year}"`).join(', ');

  const sql = `
    SELECT
      DATE_FORMAT(S.date, '%Y-%m') AS month_key,
      C.name AS categoryName,
      C.color AS categoryColor,
      SUM(S.amount) AS total
      FROM
        Spendings S
      JOIN
        Categories C ON S.categoryID = C.id
      WHERE
        S.categoryID IN (${formattedUUIDs})
        AND YEAR(S.date) IN (${formattedYears})
      GROUP BY
        month_key,
        C.name,
        C.color
      ORDER BY
        month_key;
  `;

  dbConnection.query(sql, (_err, result) => {
    if (_err) {
      return res.status(500).json({ error: 'Database error', details: _err.message });
    }

    // data format :
    // {
    //   colors: {
    //     "alimentation": "#ff339A",
    //       "foo": "#4756AB",
    //   },
    //   data: {
    //     2023: [
    //       {
    //         "month": "Fev",
    //         "alimentation": 3000,
    //         "foo": 2388,
    //       },
    //       {
    //         "month": "Mars",
    //         "alimentation": 2000,
    //         "foo": 2388,
    //       },
    //       etc...
    //     ],
    //       2024: [etc...]
    //   }
    // }

    const output = { colors: {}, data: {} };
    const categoryTemplate = {};

    result.forEach(row => {
      if (!output.colors[row.categoryName.toLowerCase()]) {
        output.colors[row.categoryName.toLowerCase()] = row.categoryColor;
        categoryTemplate[row.categoryName.toLowerCase()] = 0;
      }
    });

    result.forEach(row => {
      const date = parse(row.month_key, 'yyyy-MM', new Date());
      const year = format(date, 'yyyy');
      const month = format(date, 'MMM', { locale: fr });

      if (!output.data[year]) {
        output.data[year] = [];
      }

      let existingMonthData = output.data[year].find(m => m.month === month);
      if (!existingMonthData) {
        existingMonthData = { month: month, ...categoryTemplate }; // Utilisez le template pour initialiser les catégories à 0
        output.data[year].push(existingMonthData);
      }
      // Mise à jour des données réelles en s'assurant que les montants sont des nombres
      existingMonthData[row.categoryName.toLowerCase()] = Number(row.total); // Convertit les montants en nombres
    });

    res.json(output);
  });


}
