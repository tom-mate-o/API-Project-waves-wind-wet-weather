import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function MyLineChart({ data, legend, unit, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
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
        <Line
          key={Math.random()}
          type="monotone"
          dataKey={dataKey}
          name={legend}
          stroke="turquoise"
          strokeWidth={2}
          dot={false}
          animationDuration={2500}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
