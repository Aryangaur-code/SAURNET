"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboard } from "@/lib/api";
import {
  Sun,
  Activity,
  DollarSign,
  Leaf,
  AlertTriangle,
  TrendingUp,
  CloudSun,
  Flame,
  Compass,
  RefreshCw,
  Wind,
  Cloud,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnergyChart from "@/components/energy-chart";
import EfficiencyChart from "@/components/efficiency-chart";
import SavingsChart from "@/components/savings-chart";
import Link from "next/link";

const iconMap: Record<string, { icon: any; color: string; bg: string; glow: string; indicator: string }> = {
  "Energy Generated": { icon: Sun, color: "text-amber-400", bg: "bg-amber-500/10", glow: "neon-glow-amber", indicator: "bg-amber-400" },
  "Conversion Efficiency": { icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "neon-glow-emerald", indicator: "bg-emerald-400" },
  "Financial Savings": { icon: DollarSign, color: "text-blue-400", bg: "bg-blue-500/10", glow: "neon-glow-cyan", indicator: "bg-blue-400" },
  "CO₂ Savings": { icon: Leaf, color: "text-emerald-400", bg: "bg-emerald-500/10", glow: "neon-glow-emerald", indicator: "bg-emerald-400" }
};

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState<"energy" | "efficiency" | "savings">("energy");

  // React Query fetch hook
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const handleRefresh = async () => {
    await refetch();
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-850" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[260px] bg-slate-200 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-850" />
          <div className="h-[260px] bg-slate-200 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-850" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            System Operations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
            Real-time telemetry and control interface for Sujata Micro-grid.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefetching}
            className="h-9 gap-1.5 text-xs font-bold border-slate-200 dark:border-slate-800 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? "animate-spin" : ""}`} />
            Sync Hardware
          </Button>
          <Link href="/dashboard/live">
            <Button size="sm" variant="default" className="h-9 text-xs font-bold gap-1 cursor-pointer">
              Launch Live Grid <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.kpis.map((kpi: any, index: number) => {
          const style = iconMap[kpi.title] || {
            icon: Sun,
            color: "text-slate-455",
            bg: "bg-slate-500/10",
            glow: "",
            indicator: "bg-slate-400"
          };
          const Icon = style.icon;
          return (
            <Card key={index} className={`relative overflow-hidden group transition-all duration-300 ${style.glow}`}>
              <div className={`absolute top-0 inset-x-0 h-1 ${style.indicator}`} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {kpi.title}
                  </span>
                  <div className={`p-2.5 rounded-xl ${style.color} ${style.bg}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {kpi.value}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${style.indicator} animate-pulse`} />
                    {kpi.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Irradiance, Weather & Alerts Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PV Telemetry Panel */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-extrabold tracking-wider uppercase">
              <Compass className="h-4 w-4 text-emerald-400" />
              Photovoltaic Diagnostics
            </CardTitle>
            <CardDescription>Microgrid array tracking and conversion parameters</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center pt-4">
            
            {/* Radial Array Health Score */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80 text-center relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Array Health</span>
              <div className="relative flex items-center justify-center mt-6 h-36 w-36">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    className="stroke-emerald-400"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={376.8}
                    strokeDashoffset={376.8 * (1 - data.health_score / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{data.health_score.toFixed(1)}%</span>
                  <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase mt-1">
                    Optimal
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold mt-6">
                48 of 49 cells online. Active tracking operational.
              </p>
            </div>

            {/* Weather & Irradiance stats */}
            <div className="space-y-6">
              {/* Solar Irradiance GHI Widget */}
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>GLOBAL HORIZONTAL IRRADIANCE (GHI)</span>
                  <Flame className="h-4.5 w-4.5 text-amber-400" />
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{data.irradiance.ghi}</span>
                  <span className="text-xs text-slate-500 font-bold">W/m²</span>
                </div>
                {/* Horizontal GHI bar */}
                <div className="mt-4 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" style={{ width: `${data.irradiance.percent}%` }} />
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-bold mt-2">
                  <span>0 W/M²</span>
                  <span>800-1000 OPTIMAL</span>
                  <span>1200 MAX</span>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 block">WEATHER STATION</span>
                  <div className="space-y-0.5">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {data.weather.condition} ({data.weather.temperature.toFixed(0)}°C)
                    </span>
                    <span className="text-[10px] text-amber-400 font-bold block">
                      UV Index: {data.weather.uv_index} (Very High)
                    </span>
                  </div>
                  <div className="flex gap-4 text-[10px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <Wind className="h-3 w-3" /> {data.weather.wind_speed.toFixed(0)} mph
                    </span>
                    <span className="flex items-center gap-1">
                      <Cloud className="h-3 w-3" /> {data.weather.cloud_coverage}% cloud
                    </span>
                  </div>
                </div>
                <CloudSun className="h-12 w-12 text-amber-400 animate-pulse-soft" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts List */}
        <Card className="border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Active Alerts
              </CardTitle>
              <Badge variant="destructive" className="text-[9px] font-extrabold">
                {data.alerts.length} Active
              </Badge>
            </div>
            <CardDescription>Grid and inverter status warnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow overflow-y-auto">
            {data.alerts.map((alert: any) => (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border text-xs flex flex-col gap-1.5 transition-colors duration-300 ${
                  alert.severity === "critical"
                    ? "bg-red-500/5 border-red-500/20"
                    : "bg-amber-500/5 border-amber-500/20"
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className={alert.severity === "critical" ? "text-red-500" : "text-amber-500"}>
                    {alert.device}
                  </span>
                  <span className="text-slate-400 text-[10px]">{alert.time}</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">{alert.msg}</p>
              </div>
            ))}
            {data.alerts.length === 0 && (
              <p className="text-center text-slate-400 text-xs py-8 font-semibold">No critical warnings found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="border-slate-200/60 dark:border-slate-800/80">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              Yield Trends
            </CardTitle>
            <CardDescription>System production and financial timelines</CardDescription>
          </div>
          {/* Chart selector tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("energy")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "energy"
                  ? "bg-white dark:bg-slate-800 text-emerald-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Energy
            </button>
            <button
              onClick={() => setActiveTab("efficiency")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "efficiency"
                  ? "bg-white dark:bg-slate-800 text-amber-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Efficiency
            </button>
            <button
              onClick={() => setActiveTab("savings")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "savings"
                  ? "bg-white dark:bg-slate-800 text-blue-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Savings
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            {activeTab === "energy" && <EnergyChart />}
            {activeTab === "efficiency" && <EfficiencyChart />}
            {activeTab === "savings" && <SavingsChart />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
