"use client";

import Link from "next/link";
import { Zap, Sun, Brain, Award, ArrowRight, Activity, Cpu, Leaf, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Home() {
  const [carbonOffset, setCarbonOffset] = useState(6374.20);
  const [activePanel, setActivePanel] = useState<number | null>(null);

  // Carbon counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonOffset((prev) => prev + 0.05);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Grid hover interaction
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePanel(Math.floor(Math.random() * 16));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-300 antialiased overflow-x-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* Floating Header Navigation */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto w-[95%] rounded-2xl border border-slate-800 bg-[#090d16]/75 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight select-none">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white shadow-md shadow-emerald-500/20">
            <Zap className="h-4.5 w-4.5 fill-current" />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Saurnet
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/login" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm" variant="default" className="text-xs font-bold h-9">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto w-full px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-3.5 py-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-400">
            <Brain className="h-3.5 w-3.5 animate-pulse-soft" />
            Artificial Intelligence For Photovoltaic Arrays
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            Clean Energy.<br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
              Audited in Real Time.
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg leading-relaxed font-medium">
            Saurnet combines computer vision defect analysis, automated tilt-angle adjustments, and live feed-in tariff calculations to optimize solar array performance.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/dashboard">
              <Button size="lg" className="group text-xs font-extrabold px-6 h-11">
                Launch System Console
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg" className="border-slate-800 text-slate-300 hover:bg-slate-900 text-xs font-extrabold h-11 px-6">
                Request API Access
              </Button>
            </Link>
          </div>

          {/* Dynamic counter ticker */}
          <div className="pt-6 border-t border-slate-900/60 flex gap-8">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CO₂ Offset Ticker</span>
              <p className="text-xl font-extrabold font-mono text-emerald-500">
                {carbonOffset.toFixed(2)} kg
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Monitoring</span>
              <p className="text-xl font-extrabold text-white">
                48 / 48 Nodes Operational
              </p>
            </div>
          </div>
        </div>

        {/* High-fidelity Visual Solar Panel / UI Mockup */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center animate-pulse-soft">
          {/* Floating UI cards */}
          <div className="absolute -top-6 -left-6 z-20 w-48 p-4 rounded-2xl bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-800 shadow-2xl neon-glow-emerald">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
              <span>SOLAR YIELD</span>
              <Sun className="h-4.5 w-4.5 text-amber-500" />
            </div>
            <h4 className="text-2xl font-black text-white mt-1">4.2 kW</h4>
            <p className="text-[9px] text-emerald-500 font-bold mt-1">▲ 12% optimal peak rate</p>
          </div>

          <div className="absolute -bottom-6 -right-6 z-20 w-48 p-4 rounded-2xl bg-[#0b0f19]/80 backdrop-blur-xl border border-slate-800 shadow-2xl neon-glow-amber">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
              <span>CV SCANNER</span>
              <Cpu className="h-4.5 w-4.5 text-amber-400" />
            </div>
            <h4 className="text-xs font-black text-white mt-1">Segmenting Array A</h4>
            <p className="text-[9px] text-amber-400 font-bold mt-1">0 defect anomalies registered</p>
          </div>

          {/* Core Panel Grid graphic */}
          <div className="w-full aspect-square max-w-[360px] rounded-3xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden solar-cell-pattern">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />

            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                GRID_A ONLINE
              </span>
              <span className="text-[10px] text-slate-500 font-mono">NODE_INDEX: 49</span>
            </div>

            {/* Solar cells matrix */}
            <div className="grid grid-cols-4 gap-3 my-4 flex-grow justify-center items-center">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl border transition-all duration-300 ${
                    activePanel === i
                      ? "border-emerald-400 bg-emerald-500/25 shadow-lg shadow-emerald-500/20 scale-105"
                      : "border-slate-800 bg-[#0b0f19]/80"
                  }`}
                />
              ))}
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
              <span>Conversion: 98.4%</span>
              <span>Temp: 38.6 °C</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Features grid */}
      <section className="bg-[#02050e] border-t border-slate-900 py-24 px-6">
        <div className="max-w-7xl mx-auto w-full space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tight">Photovoltaic Core Intelligence</h2>
            <p className="text-slate-400 text-sm font-medium">
              Every detail optimized to ensure absolute maximum solar absorption and micro-grid stabilization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:border-emerald-500/20 duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Yield Telemetry</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Track GHI, UV variables, inverter coupling tolerances, and grid tariffs in high-resolution, down to individual panels.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:border-emerald-500/20 duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">CV Scanning</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Drag and drop aerial panel photos. AI segmentation automatically detects cell cracks, hotspots, dust coverage, and diode failure.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:border-emerald-500/20 duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">AI Solar Copilot</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                  Chat directly with our Copilot trained on photovoltaic system design standards to calculate ROI and plan washing cycles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-6 text-center text-slate-500 text-[10px] font-semibold">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Saurnet Corp. Designed in compliance with utility micro-grid standards.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
