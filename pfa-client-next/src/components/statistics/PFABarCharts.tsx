import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const PFABarCharts = ({ data, year }) => {
  const currentYearData = data.data[year];
  if (!currentYearData) {
    return <p>Aucune donnée disponible pour l'année {year}.</p>;
  }
  console.log("currentYearData", currentYearData);

  const categoryKeys = currentYearData.length > 0 ? Object.keys(currentYearData[0]).filter(key => key !== 'month') : [];
  console.log("categoryKeys", categoryKeys);
  return (
    <BarChart width={800} height={450} data={currentYearData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      {categoryKeys.map((key) => (
        <Bar key={key} dataKey={key} fill={data.colors[key]} />
      ))}
    </BarChart>
  );
};

export default PFABarCharts;
