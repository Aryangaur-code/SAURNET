"use client";

import { useState } from "react";
import { IndianRupee, Landmark, Coins, TrendingUp, Percent, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FinancialAnalytics() {
  // Slider states for dynamic tariff calculation
  const [exportRate, setExportRate] = useState(3.14); // ₹ per kWh sold to grid (RERC Average)
  const [offsetRate, setOffsetRate] = useState(8.00); // ₹ per kWh saved locally (Rajasthan Slab Average)
  const [dailyGen, setDailyGen] = useState(38); // kWh generated daily

  // Calculated variables
  const monthlyYield = dailyGen * 30; // ~1140 kWh/month
  const offsetShare = 0.45; // 45% self-consumption
  const exportShare = 0.55; // 55% export to grid

  const monthlyOffsetSavings = monthlyYield * offsetShare * offsetRate;
  const monthlyExportEarnings = monthlyYield * exportShare * exportRate;
  const totalMonthlySavings = monthlyOffsetSavings + monthlyExportEarnings;

  const initialInvestment = 450000; // Estimated cost for ~8.5kW in Rajasthan
  const currentAccumulated = 150000;
  const paybackPercentage = (currentAccumulated / initialInvestment) * 100;
  const remainingMonths = Math.ceil((initialInvestment - currentAccumulated) / totalMonthlySavings);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Financial Analytics</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Track utility offsets, grid feed-in tariffs, dynamic ROI estimation, and amortization periods for Rajasthan.
        </p>
      </div>

      {/* Amortization / Payback Period Widget */}
      <Card className="border-slate-200/60 dark:border-slate-800/80">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Landmark className="h-4.5 w-4.5 text-emerald-500" />
              Payback & Amortization Period
            </CardTitle>
            <Badge variant="success" className="font-mono">
              {paybackPercentage.toFixed(1)}% Recovered
            </Badge>
          </div>
          <CardDescription>Estimated amortization timeline for initial ₹4,50,000 grid installation cost.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Invested Capital: ₹4,50,000</span>
            <span>Earned Surplus: ₹{currentAccumulated.toLocaleString()}</span>
          </div>
          {/* Amortization bar */}
          <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${paybackPercentage}%` }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Net Monthly Savings</span>
              <h4 className="text-2xl font-black mt-1 text-emerald-500">₹{totalMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Remaining Months</span>
              <h4 className="text-2xl font-black mt-1">{remainingMonths} months</h4>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total ROI Earned</span>
              <h4 className="text-2xl font-black mt-1 text-slate-900 dark:text-white">₹{currentAccumulated.toLocaleString()}</h4>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Tariff Calculator & Yield Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Calculator slider widget */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Coins className="h-4.5 w-4.5 text-blue-500" />
              Dynamic Tariff Calculator
            </CardTitle>
            <CardDescription>Adjust variables to forecast monthly clean earnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Slider 1: export rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Feed-in Grid Tariff (Export)</span>
                <span className="font-mono text-emerald-500">₹{exportRate.toFixed(2)} / kWh</span>
              </div>
              <input
                type="range"
                min="1.00"
                max="6.00"
                step="0.10"
                value={exportRate}
                onChange={(e) => setExportRate(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Slider 2: offset rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Local Utility Rate (Import Offset)</span>
                <span className="font-mono text-emerald-500">₹{offsetRate.toFixed(2)} / kWh</span>
              </div>
              <input
                type="range"
                min="4.00"
                max="12.00"
                step="0.10"
                value={offsetRate}
                onChange={(e) => setOffsetRate(parseFloat(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Slider 3: Daily Generation */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300">Average Daily Production</span>
                <span className="font-mono text-emerald-500">{dailyGen} kWh</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="1"
                value={dailyGen}
                onChange={(e) => setDailyGen(parseInt(e.target.value))}
                className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 accent-emerald-500 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Self-consumption and offset metrics details */}
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-base font-bold">Earnings Summary</CardTitle>
            <CardDescription>Monthly projection estimates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 block">Self-Consumption (45%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">Offset Grid Purchase</span>
              </div>
              <span className="font-extrabold text-emerald-500">+₹{monthlyOffsetSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 block">Grid Export (55%)</span>
                <span className="font-semibold text-slate-900 dark:text-white">Feed-In Earnings</span>
              </div>
              <span className="font-extrabold text-emerald-500">+₹{monthlyExportEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-900 dark:text-white">Projected Monthly Total</span>
              <span className="text-lg text-emerald-600 dark:text-emerald-400 font-black">
                ₹{totalMonthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
