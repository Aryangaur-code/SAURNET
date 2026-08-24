"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", savings: 1920 },
  { name: "Tue", savings: 2480 },
  { name: "Wed", savings: 2240 },
  { name: "Thu", savings: 3120 },
  { name: "Fri", savings: 3520 },
  { name: "Sat", savings: 3840 },
  { name: "Sun", savings: 4160 },
];

export default function SavingsChart() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-xl animate-pulse">
        <span className="text-sm text-slate-400">Loading Savings Trends...</span>
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
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
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
            tickFormatter={(value) => `₹${value}`}
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
            formatter={(value: any) => [`₹${value.toLocaleString()}`, "Amount Saved"]}
          />
          <Bar
            dataKey="savings"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
