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
  const currentYearData = data?.data?.[year] ?? 0;
  if (!currentYearData) {
    return <p>pas de données.</p>;
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
      {data?.data && categoryKeys.map((key) => (
        <Bar
          key={key}
          dataKey={key}
          fill={data.colors[key]}
        />
      ))}
    </BarChart>
  );
};

export default PFABarCharts;
