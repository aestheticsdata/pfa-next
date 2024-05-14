import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const PFALineCharts = ({ data }) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="month"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Line type="monotone" dataKey="alimentation" stroke="#8884d8"/>
        <Line type="monotone" dataKey="foo" stroke="#82ca9d"/>
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PFALineCharts;
