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
    result.forEach(row => {
      const date = parse(row.month_key, 'yyyy-MM', new Date());
      const year = format(date, 'yyyy');
      const month = format(date, 'MMM', { locale: fr });

      if (!output.data[year]) {
        output.data[year] = [];
      }

      const existingMonthData = output.data[year].find(m => m.month === month);
      if (existingMonthData) {
        existingMonthData[row.categoryName.toLowerCase()] = row.total;
      } else {
        const newMonthData = {
          month: month,
        };
        newMonthData[row.categoryName.toLowerCase()] = row.total;
        output.data[year].push(newMonthData);
      }

      if (!output.colors[row.categoryName.toLowerCase()]) {
        output.colors[row.categoryName.toLowerCase()] = row.categoryColor;
      }
    });

    res.json(output);
  });
}
