"use client";

import { Leaf, Trees, Car, Fuel, Zap, Globe, Flame } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CarbonSavings() {
  const lifetimeProduction = 13420; // 13.42 MWh lifetime clean solar energy
  const co2Factor = 0.475; // kg of CO2 saved per kWh
  const totalCo2Saved = lifetimeProduction * co2Factor; // ~6374 kg CO2 offset

  // Conversion calculations
  const equivalentTrees = Math.round(totalCo2Saved / 22); // 1 tree absorbs ~22kg CO2 per year
  const gasMilesAvoided = Math.round(totalCo2Saved * 2.5); // ~2.5 miles of driving avoided per kg CO2
  const coalBurnedAvoided = Math.round(totalCo2Saved * 1.1); // lbs of coal burned avoided

  const environmentalMetrics = [
    {
      title: "Forest Absorption Equivalent",
      value: `${equivalentTrees} mature trees`,
      desc: "Annual carbon absorption of a woodland grove",
      icon: Trees,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Gasoline Combustion Offset",
      value: `${gasMilesAvoided.toLocaleString()} miles`,
      desc: "Equivalent driving distance in a passenger vehicle",
      icon: Car,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Coal Combustion Avoided",
      value: `${coalBurnedAvoided.toLocaleString()} lbs`,
      desc: "Pounds of coal kept in raw geological reserve",
      icon: Fuel,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Ecology & Carbon Savings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Tracking clean energy offsets and human-friendly ecological equivalencies.
        </p>
      </div>

      {/* Main carbon score card */}
      <Card className="border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-emerald-500" />
              Grid Emission Offset Ledger
            </CardTitle>
            <CardDescription>Life-to-date carbon offset signature.</CardDescription>
          </div>
          <Badge variant="success" className="font-mono px-3 py-1 font-bold">
            NET POSITIVE
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-8 py-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Carbon Offsets</span>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black tracking-tight text-emerald-500">
                {(totalCo2Saved / 1000).toFixed(2)}
              </h2>
              <span className="text-lg font-bold text-slate-400">Metric Tons CO₂</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Calculated using the regional EPA eGRID factor of 0.475 kg CO₂ greenhouse gas emissions offset per clean solar kWh generated.
            </p>
          </div>

          <div className="h-28 w-28 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center animate-pulse-soft">
            <Leaf className="h-12 w-12 text-emerald-500" />
          </div>
        </CardContent>
      </Card>

      {/* Ecological Conversions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {environmentalMetrics.map((m, index) => {
          const Icon = m.icon;
          return (
            <Card key={index} className="border-slate-200/60 dark:border-slate-800/80 hover:border-emerald-500/20 transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Metric Conversion</span>
                  <div className={`p-2 rounded-xl ${m.color} ${m.bg}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {m.value}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-bold">{m.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-snug">{m.desc}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
