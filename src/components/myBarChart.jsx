import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function MyBarChart({ data, dataKey, legend, unit }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(hour) => `${hour.toString().padStart(2, '0')}:00`}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => `${value.toString().padStart(2, '0')}:00`}
          formatter={(value) => [`${value} ${unit}`, legend]}
        />
        <Legend />
        <Bar dataKey={dataKey} fill="turquoise" />
      </BarChart>
    </ResponsiveContainer>
  );
}
