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
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1C2541" />
        <XAxis
          dataKey="time"
          stroke="#1C2541"
          tick={{ fill: 'lightgrey' }}
          tickFormatter={(hour) => `${hour.toString().padStart(2, '0')}:00`}
        />
        <YAxis
          stroke="#1C2541"
          tick={{ fill: 'lightgrey' }}
          tickFormatter={(value) => `${value}${unit}`}
        />
        <Tooltip
          labelFormatter={(value) => `${value.toString().padStart(2, '0')}:00`}
          formatter={(value) => [`${value} ${unit}`, legend]}
          contentStyle={{ backgroundColor: 'var(--tooltip-bg)' }}
        />

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
