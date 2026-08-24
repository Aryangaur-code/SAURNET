"use client";

import { useState } from "react";
import { Zap, Activity, Sun, BatteryCharging, Home, ShieldAlert, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Panel {
  id: string;
  status: "optimal" | "warning" | "faulty";
  temp: number;
  output: number; // in Watts
  efficiency: number; // in %
}

// Generate mock panel array data (48 panels)
const initialPanels: Panel[] = Array.from({ length: 48 }, (_, i) => {
  const gridRow = String.fromCharCode(65 + Math.floor(i / 12)); // A, B, C, D
  const gridCol = (i % 12) + 1;
  const id = `${gridRow}${gridCol}`;
  
  let status: "optimal" | "warning" | "faulty" = "optimal";
  let temp = 38 + Math.random() * 5;
  let output = 310 + Math.random() * 20;
  let efficiency = 92 + Math.random() * 4;

  if (id === "B4") {
    status = "warning";
    temp = 52.4;
    output = 210.5;
    efficiency = 74.2;
  } else if (id === "C8") {
    status = "faulty";
    temp = 72.8;
    output = 12.0;
    efficiency = 4.1;
  } else if (i % 17 === 0) {
    status = "warning";
    temp = 48.2;
    output = 264.0;
    efficiency = 81.3;
  }

  return { id, status, temp, output, efficiency };
});

export default function LiveMonitoring() {
  const [panels] = useState<Panel[]>(initialPanels);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(initialPanels[15]);
  const [exportMode, setExportMode] = useState<"self" | "grid" | "battery">("self");

  const optimalCount = panels.filter(p => p.status === "optimal").length;
  const warningCount = panels.filter(p => p.status === "warning").length;
  const faultyCount = panels.filter(p => p.status === "faulty").length;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Live Array Grid</h1>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
          Photovoltaic node diagnostics and inverter routing indicators.
        </p>
      </div>

      {/* Energy Flow & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Flow Card */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <div>
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                Animated Energy Flow
              </CardTitle>
              <CardDescription>Live power distribution: Panels → Inverter → Home → Grid</CardDescription>
            </div>
            {/* Flow selector buttons */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setExportMode("self")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                  exportMode === "self" ? "bg-white dark:bg-slate-800 text-emerald-500 shadow-sm" : "text-slate-400"
                }`}
              >
                Self-Consume
              </button>
              <button
                onClick={() => setExportMode("grid")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                  exportMode === "grid" ? "bg-white dark:bg-slate-800 text-emerald-500 shadow-sm" : "text-slate-400"
                }`}
              >
                Grid Export
              </button>
              <button
                onClick={() => setExportMode("battery")}
                className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer transition-all ${
                  exportMode === "battery" ? "bg-white dark:bg-slate-800 text-emerald-500 shadow-sm" : "text-slate-400"
                }`}
              >
                Store Battery
              </button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            
            {/* SVG Animated Flow Diagram */}
            <svg viewBox="0 0 800 320" className="w-full max-w-xl">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>

              {/* Connecting Lines */}
              {/* Panels to Inverter */}
              <path d="M 120 160 L 280 160" stroke="#1f2937" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path
                d="M 120 160 L 280 160"
                stroke="url(#flowGrad)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="animate-dash-fast"
              />

              {/* Inverter to Home */}
              <path d="M 380 160 L 520 160" stroke="#1f2937" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path
                d="M 380 160 L 520 160"
                stroke="#10b981"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="animate-dash-medium"
              />

              {/* Inverter to Battery (Below) */}
              <path d="M 330 200 L 330 260" stroke="#1f2937" strokeWidth="4" fill="none" strokeLinecap="round" />
              {exportMode === "battery" && (
                <path
                  d="M 330 200 L 330 260"
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-dash-fast"
                />
              )}

              {/* Home to Utility Grid */}
              <path d="M 620 160 L 720 160" stroke="#1f2937" strokeWidth="4" fill="none" strokeLinecap="round" />
              {exportMode === "grid" && (
                <path
                  d="M 620 160 L 720 160"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-dash-fast"
                />
              )}

              {/* Nodes */}
              {/* Solar Panels Node */}
              <g transform="translate(40, 110)">
                <rect width="80" height="100" rx="16" fill="#0b0f19" stroke="#1f2937" strokeWidth="2" />
                <path d="M 10 25 L 70 25 M 10 45 L 70 45 M 10 65 L 70 65 M 10 85 L 70 85 M 26 10 L 26 90 M 54 10 L 54 90" stroke="#1f2937" strokeWidth="1" />
                <Sun className="h-6 w-6 text-amber-400 absolute top-2.5 left-7 animate-pulse-soft" />
                <text x="40" y="90" fill="#9ca3af" fontSize="9" fontWeight="extrabold" className="tracking-wider" textAnchor="middle">
                  PANELS
                </text>
              </g>

              {/* Inverter Node */}
              <g transform="translate(280, 110)">
                <rect width="100" height="90" rx="20" fill="#111827" stroke="#10b981" strokeWidth="2.5" className="neon-glow-emerald" />
                <rect x="20" y="20" width="60" height="20" rx="6" fill="#030712" />
                <text x="50" y="34" fill="#10b981" fontSize="11" fontWeight="black" textAnchor="middle" className="font-mono">
                  3.8 kW
                </text>
                <text x="50" y="70" fill="#fff" fontSize="9" fontWeight="extrabold" className="tracking-wider" textAnchor="middle">
                  INVERTER
                </text>
                {/* Indicator LED */}
                <circle cx="15" cy="15" r="3" fill="#10b981" className="animate-pulse" />
              </g>

              {/* Home Load Node */}
              <g transform="translate(520, 110)">
                <rect width="100" height="90" rx="20" fill="#111827" stroke="#3b82f6" strokeWidth="2.5" />
                <Home className="h-7 w-7 text-blue-400 absolute top-4 left-9" />
                <text x="50" y="70" fill="#fff" fontSize="9" fontWeight="extrabold" className="tracking-wider" textAnchor="middle">
                  HOME LOAD
                </text>
                <text x="50" y="52" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">
                  1.6 kW
                </text>
              </g>

              {/* Battery Storage Node (Below Inverter) */}
              <g transform="translate(290, 255)">
                <rect width="80" height="55" rx="12" fill="#111827" stroke="#4b5563" strokeWidth="2" />
                <BatteryCharging className="h-5 w-5 text-emerald-400 absolute top-1.5 left-7.5" />
                <text x="40" y="44" fill="#9ca3af" fontSize="8" fontWeight="bold" textAnchor="middle">
                  BATTERY (92%)
                </text>
              </g>

              {/* Utility Grid Node */}
              <g transform="translate(710, 125)">
                <circle cx="30" cy="30" r="28" fill="#111827" stroke="#fbbf24" strokeWidth="2.5" />
                <Zap className="h-6 w-6 text-amber-400 absolute top-5 left-5" />
                <text x="30" y="80" fill="#9ca3af" fontSize="8" fontWeight="extrabold" className="tracking-wider" textAnchor="middle">
                  GRID
                </text>
              </g>
            </svg>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[10px] text-slate-500 font-bold">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Solar Generation: 3.8 kW
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" /> Household Load: 1.6 kW
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" /> Net Grid Export: +2.2 kW
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Selected Panel telemetry Panel */}
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Node Telemetry</CardTitle>
              {selectedPanel ? (
                <Badge
                  variant={
                    selectedPanel.status === "optimal"
                      ? "success"
                      : selectedPanel.status === "warning"
                      ? "warning"
                      : "destructive"
                  }
                  className="text-[9px] font-extrabold"
                >
                  {selectedPanel.status.toUpperCase()}
                </Badge>
              ) : null}
            </div>
            <CardDescription>Selected Panel Diagnostics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedPanel ? (
              <>
                <div className="text-center p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Panel Identifier</span>
                  <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">
                    Panel #{selectedPanel.id}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Peak Output</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">
                      {selectedPanel.output.toFixed(1)} W
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Temperature</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">
                      {selectedPanel.temp.toFixed(1)} °C
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Voltage</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">38.4 V</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Efficiency</span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-1 block">
                      {selectedPanel.efficiency.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {selectedPanel.status !== "optimal" && (
                  <div className={`p-4 rounded-2xl border text-xs flex gap-2.5 items-start ${
                    selectedPanel.status === "warning" ? "bg-amber-500/5 border-amber-500/20" : "bg-red-500/5 border-red-500/20"
                  }`}>
                    <ShieldAlert className={`h-5 w-5 shrink-0 mt-0.5 ${selectedPanel.status === "warning" ? "text-amber-400" : "text-red-400"}`} />
                    <div className="space-y-1">
                      <p className={`font-bold ${selectedPanel.status === "warning" ? "text-amber-400" : "text-red-400"}`}>
                        Alert Registered
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 leading-snug">
                        {selectedPanel.status === "warning"
                          ? "Dust levels high on panel cell array. Cleaning service recommended to regain peak 320W output."
                          : "Critical Hotspot anomaly detected. Maintenance check required to avoid microcrack propagation."}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-60 flex items-center justify-center text-slate-400 text-xs">
                Hover or click on a panel to read telemetry.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Array Grid Layout */}
      <Card className="border-slate-200/60 dark:border-slate-800/80">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Physical Array Map</CardTitle>
            <CardDescription>Hover over cells to read instant readings, click to inspect.</CardDescription>
          </div>
          {/* Status indicators */}
          <div className="flex flex-wrap gap-4 text-[10px] font-bold">
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Optimal ({optimalCount})
            </span>
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Warning ({warningCount})
            </span>
            <span className="flex items-center gap-1.5 text-red-500">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Faulty ({faultyCount})
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Grid Layout of 48 Panels */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
            {panels.map((panel) => (
              <button
                key={panel.id}
                onMouseEnter={() => setSelectedPanel(panel)}
                onClick={() => setSelectedPanel(panel)}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all p-1 cursor-pointer
                  ${
                    selectedPanel?.id === panel.id
                      ? "ring-2 ring-emerald-400 scale-105 border-transparent shadow-lg shadow-emerald-500/10"
                      : "hover:scale-105"
                  }
                  ${
                    panel.status === "optimal"
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                      : panel.status === "warning"
                      ? "bg-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                      : "bg-red-500/5 border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                  }
                `}
              >
                <span className="text-[10px] font-black">{panel.id}</span>
                <span className="text-[8px] font-medium opacity-80 mt-0.5">{Math.round(panel.output)}W</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
