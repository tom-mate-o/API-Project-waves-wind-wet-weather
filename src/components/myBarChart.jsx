import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function MyBarChart({ data, dataKey, legend, unit }) {
  const currentDate = new Date();
  const currentHour = ('0' + currentDate.getHours()).slice(-2);
  const currentDay = currentDate.toISOString().slice(0, 10);
  const referenceTime = `${currentDay}T${currentHour}:00`;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
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
          tickFormatter={(time) => `${new Date(time).getHours()}h`}
        />
        <YAxis
          stroke="#1C2541"
          tick={{ fill: 'lightgrey' }}
          tickFormatter={(value) => `${value}${unit}`}
        />
        <Tooltip
          labelFormatter={(value) => {
            const date = new Date(value);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Monate sind von 0-11
            const year = date.getFullYear();
            const hour = date.getHours().toString().padStart(2, '0');
            const minute = date.getMinutes().toString().padStart(2, '0');
            return `${day} ${month} ${year} - ${hour}:${minute}`;
          }}
          formatter={(value) => [`${value} ${unit}`, legend]}
          contentStyle={{ backgroundColor: 'var(--tooltip-bg)' }}
        />

        <Bar dataKey={dataKey} fill="turquoise" />
        <ReferenceLine x={referenceTime} stroke="white" />
      </BarChart>
    </ResponsiveContainer>
  );
}
