import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

const PFABarCharts = ({ data, year }) => {
  const currentYearData = data?.data?.[year] ?? 0;
  if (!currentYearData) {
    return <div className="">pas de données.</div>;
  }
  console.log("currentYearData", currentYearData);

  const categoryKeys = currentYearData.length > 0 ? Object.keys(currentYearData[0]).filter(key => key !== 'month') : [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={currentYearData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          labelFormatter={label => `${label} ${year}`}
          labelClassName="bg-gray-200 p-1 rounded font-semibold"
          formatter={(value: number) => `${value} €`}
          offset={7}
          contentStyle={{
            fontSize: "0.8rem",
            borderRadius: "5px",
          }}
          animationDuration={200}
        />
        <Legend />
        {data?.data && categoryKeys.map((key, i) => {
          return <Bar
            key={key}
            dataKey={key}
            fill={data.colors[key]}
          >
            <LabelList
              dataKey={key}
              position="top"
              formatter={(label: number) => label > 0 ? `${label}€` : null}
              fontSize="12px"
            />
          </Bar>
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PFABarCharts;
