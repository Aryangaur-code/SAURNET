"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", efficiency: 92.4 },
  { name: "Tue", efficiency: 93.1 },
  { name: "Wed", efficiency: 89.8 },
  { name: "Thu", efficiency: 94.2 },
  { name: "Fri", efficiency: 95.0 },
  { name: "Sat", efficiency: 95.8 },
  { name: "Sun", efficiency: 96.2 },
];

export default function EfficiencyChart() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl animate-pulse">
        <span className="text-sm text-slate-400">Loading Efficiency Trends...</span>
      </div>
    );
  }

  const isDark = theme === "dark";
  const axisColor = isDark ? "#94a3b8" : "#475569";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const tooltipBg = isDark ? "rgba(15, 22, 38, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorder = isDark ? "1px solid rgba(30, 41, 59, 0.8)" : "1px solid rgba(226, 232, 240, 0.8)";
  const tooltipColor = isDark ? "#fff" : "#0f172a";

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            stroke={axisColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={axisColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={[85, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: tooltipBorder,
              borderRadius: "12px",
              color: tooltipColor,
              fontSize: "12px",
            }}
            itemStyle={{ color: tooltipColor }}
            formatter={(value: any) => [`${value}%`, "System Efficiency"]}
          />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
