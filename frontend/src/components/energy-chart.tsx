"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", energy: 240 },
  { name: "Tue", energy: 310 },
  { name: "Wed", energy: 280 },
  { name: "Thu", energy: 390 },
  { name: "Fri", energy: 440 },
  { name: "Sat", energy: 480 },
  { name: "Sun", energy: 520 },
];

export default function EnergyChart() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl animate-pulse">
        <span className="text-sm text-slate-400">Loading Energy Trends...</span>
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `${value}kWh`}
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
            formatter={(value: any) => [`${value} kWh`, "Energy Generated"]}
          />
          <Area
            type="monotone"
            dataKey="energy"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#energyGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
