"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/lib/api";
import { LineChart, BarChart, Bar, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, RefreshCw, AlertCircle } from "lucide-react";
import EnergyChart from "@/components/energy-chart";
import EfficiencyChart from "@/components/efficiency-chart";
import { useTheme } from "@/components/theme-provider";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "6m">("7d");
  const [arrayFilter, setArrayFilter] = useState("all");
  const { theme } = useTheme();

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  const isDark = theme === "dark";
  const axisColor = isDark ? "#94a3b8" : "#475569";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const tooltipBg = isDark ? "rgba(15, 22, 38, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorder = isDark ? "1px solid rgba(30, 41, 59, 0.8)" : "1px solid rgba(226, 232, 240, 0.8)";
  const tooltipColor = isDark ? "#fff" : "#0f172a";

  // Error State Layout
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 max-w-md mx-auto mt-20 text-center animate-slide-up">
        <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">API Sync Failure</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Unable to connect to SaurNet API. Verify that your FastAPI server is running locally on port 8000.
          </p>
        </div>
        <Button onClick={handleRefresh} className="text-xs font-bold gap-1.5 cursor-pointer">
          <RefreshCw className="h-3.5 w-3.5" />
          Retry Connection
        </Button>
      </div>
    );
  }

  // Loading State Skeletal Layout
  if (isLoading || !data) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800/40 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800/40 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[320px] bg-slate-200 dark:bg-slate-800/40 rounded-2xl" />
          <div className="h-[320px] bg-slate-200 dark:bg-slate-800/40 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Performance Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
            Deep dive into historical yield metrics, solar degradation, and grid performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Group Filter */}
          <select
            value={arrayFilter}
            onChange={(e) => setArrayFilter(e.target.value)}
            className="h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] px-3 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Arrays (Grid A-D)</option>
            <option value="gridA">Array A (Premium Monocrystalline)</option>
            <option value="gridB">Array B (South Roof)</option>
            <option value="gridC">Array C (West Garage)</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
            className="h-9 gap-1.5 text-xs font-bold border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? "animate-spin" : ""}`} />
            Sync
          </Button>
        </div>
      </div>

      {/* Time-Range Filters & Summary Metrics */}
      <div className="flex justify-between items-center bg-white dark:bg-[#0f1626] border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-2xl">
        <span className="text-xs font-bold text-slate-450 pl-2">Filter Timeframe</span>
        <div className="flex gap-1">
          {["7d", "30d", "6m"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r as any)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                timeRange === r
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Clean Yield</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">13.4 MWh</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Life-to-date generation</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Peak Generation Rate</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">4.8 kW</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Recorded Jun 6 at 13:10</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Avg Daily Output</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">38.2 kWh</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">Within optimal yield bounds</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Capacity Factor</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">21.8%</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">+1.4% above local average</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Generation Output</CardTitle>
            <CardDescription>Solar yield production measured in kWh</CardDescription>
          </CardHeader>
          <CardContent>
            {timeRange === "6m" ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthly_data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" stroke={axisColor} fontSize={11} tickLine={false} />
                    <YAxis stroke={axisColor} fontSize={11} tickLine={false} tickFormatter={(v) => `${v}k`} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: "12px", border: tooltipBorder, color: tooltipColor, fontSize: "11px" }} itemStyle={{ color: tooltipColor }} />
                    <Bar dataKey="generation" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EnergyChart />
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Solar Conversion Index</CardTitle>
            <CardDescription>Conversion index tracking thermal levels vs. output</CardDescription>
          </CardHeader>
          <CardContent>
            {timeRange === "6m" ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthly_data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" stroke={axisColor} fontSize={11} tickLine={false} />
                    <YAxis stroke={axisColor} fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderRadius: "12px", border: tooltipBorder, color: tooltipColor, fontSize: "11px" }} itemStyle={{ color: tooltipColor }} />
                    <Bar dataKey="savings" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EfficiencyChart />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Array Metrics Details Table */}
      <Card className="border-slate-200/60 dark:border-slate-800/80">
        <CardHeader>
          <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Solar Array Comparison Index</CardTitle>
          <CardDescription>Detailed metrics per grid division group</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th className="py-3 px-4">Array Name</th>
                <th className="py-3 px-4">Panel Type</th>
                <th className="py-3 px-4">Capacity</th>
                <th className="py-3 px-4">Daily Yield</th>
                <th className="py-3 px-4">Avg Temp</th>
                <th className="py-3 px-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {data.yield_comparison.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-550 font-semibold">{item.panel_type}</td>
                  <td className="py-3.5 px-4 font-mono font-bold">{item.capacity}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-500">{item.daily_yield}</td>
                  <td className="py-3.5 px-4 font-semibold">{item.avg_temp}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={
                      item.status === "OPTIMAL"
                        ? "success"
                        : item.status.includes("HOTSPOT")
                        ? "destructive"
                        : "warning"
                    } className="text-[8px] font-extrabold">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
