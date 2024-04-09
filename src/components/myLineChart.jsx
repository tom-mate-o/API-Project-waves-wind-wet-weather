import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function MyLineChart({ data, legend, unit, dataKey }) {
  const currentDate = new Date();
  const currentHour = ('0' + currentDate.getHours()).slice(-2);
  const currentDay = currentDate.toISOString().slice(0, 10);
  const referenceTime = `${currentDay}T${currentHour}:00`;

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
          type="category"
          domain={['auto', 'auto']}
          tickFormatter={(time) => `${new Date(time).getHours()}:00`}
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

        <ReferenceLine x={referenceTime} stroke="white" />
      </LineChart>
    </ResponsiveContainer>
  );
}
