
import { BarChart as Chart } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Drafting", value: 12 },
  { name: "Review", value: 8 },
  { name: "Filing", value: 15 },
  { name: "Granted", value: 5 },
  { name: "Rejected", value: 2 },
];

export function PatentChart() {
  return (
    <div className="dashboard-card space-y-4">
      <div className="flex items-center gap-2">
        <Chart className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Patent Status Distribution</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
