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

    const output = {};
    // result.forEach(row => {
    //   const date = parse(row.month_key, 'yyyy-MM', new Date());
    //   const formattedMonth = format(date, 'MMM', { locale: fr });
    //   if (!output[formattedMonth]) {
    //     output[formattedMonth] = { month: formattedMonth };
    //   }
    //   output[formattedMonth][row.categoryName.toLowerCase()] = row.total;
    // });

    dbConnection.query(sql, (_err, result) => {
      if (_err) {
        return res.status(500).json({ error: 'Database error', details: _err.message });
      }

      const output = {};
      result.forEach(row => {
        const date = parse(row.month_key, 'yyyy-MM', new Date());
        const formattedMonth = format(date, 'MMM', { locale: fr });

        if (!output[formattedMonth]) {
          output[formattedMonth] = { month: formattedMonth, colors: {} };
        }
        output[formattedMonth][row.categoryName.toLowerCase()] = row.total;
        output[formattedMonth].colors[row.categoryName.toLowerCase()] = row.categoryColor;
      });

      const formattedOutput = Object.values(output);

      res.json(formattedOutput);
    });

    const formattedOutput = Object.values(output);

    res.json(formattedOutput);
  });
}
