"use client";

import { useState } from "react";
import { FileText, Download, CheckCircle, RefreshCw, Calendar, FileSpreadsheet, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const [reportType, setReportType] = useState("yield");
  const [reportState, setReportState] = useState<"configure" | "generating" | "done">("configure");
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setReportState("generating");
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setReportState("done");
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleReset = () => {
    setReportState("configure");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Audit & Reports</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Generate and export CSV/PDF reports on panel yield, carbon credits, and array telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configurations panel */}
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-base font-bold">Configure Audit Report</CardTitle>
            <CardDescription>Select template filters and format configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Report Template</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="yield">Yield Performance Audit (Weekly)</option>
                <option value="audit">Hardware Diagnostic & Defect log</option>
                <option value="financial">Financial Tariff Ledger (Monthly)</option>
                <option value="carbon">Ecology & Carbon Offset Verification</option>
              </select>
            </div>

            {/* Scope select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Array scope</label>
              <select className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                <option>All Arrays (A, B, C, D)</option>
                <option>Array A only</option>
                <option>Array B & D</option>
              </select>
            </div>

            {/* Time period */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Period range</label>
              <select className="w-full h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] px-3 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Current Quarter (Q2)</option>
                <option>Custom Date Range...</option>
              </select>
            </div>

            {/* Actions */}
            {reportState === "configure" ? (
              <Button onClick={handleGenerate} className="w-full mt-4 cursor-pointer">
                Generate Audit Report
              </Button>
            ) : reportState === "generating" ? (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                  <span>Assembling ledger rows...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                <div className="flex gap-2">
                  <Button variant="default" className="flex-1 cursor-pointer">
                    <Download className="h-4 w-4" /> PDF
                  </Button>
                  <Button variant="outline" className="flex-1 cursor-pointer">
                    <FileSpreadsheet className="h-4 w-4" /> Excel/CSV
                  </Button>
                </div>
                <Button variant="ghost" onClick={handleReset} className="w-full text-xs cursor-pointer">
                  Configure New Report
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Preview mock */}
        <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80">
          <CardHeader>
            <CardTitle className="text-base font-bold">Document Preview</CardTitle>
            <CardDescription>Audited report data output frame</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 overflow-y-auto">
            {reportState === "configure" ? (
              <div className="text-center space-y-2 text-slate-400">
                <FileText className="h-10 w-10 mx-auto opacity-40" />
                <p className="text-xs">Select configurations and click generate to view data audit ledger.</p>
              </div>
            ) : reportState === "generating" ? (
              <div className="flex flex-col items-center space-y-4">
                <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                <span className="text-xs text-slate-400 font-semibold">Generating report matrices...</span>
              </div>
            ) : (
              <div className="w-full h-full text-left space-y-6 text-xs p-2">
                {/* Header mock */}
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wide">Saurnet Solar Operations Audit</h4>
                    <p className="text-[10px] text-slate-400">Scope: Micro-grid Array A-D | Period: Weekly (7 Days)</p>
                  </div>
                  <Badge variant="success">GENERATED OK</Badge>
                </div>

                {/* Table data preview */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 font-bold text-slate-400 text-[10px] uppercase">
                      <th className="py-2">Date</th>
                      <th className="py-2">GHI Index</th>
                      <th className="py-2">Solar Yield</th>
                      <th className="py-2">CO₂ Offsets</th>
                      <th className="py-2">Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                    <tr>
                      <td className="py-2.5 font-semibold">2026-06-06</td>
                      <td className="py-2.5">842 W/m²</td>
                      <td className="py-2.5">41.8 kWh</td>
                      <td className="py-2.5">618 kg</td>
                      <td className="py-2.5 text-emerald-500 font-semibold">$18.60</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold">2026-06-05</td>
                      <td className="py-2.5">790 W/m²</td>
                      <td className="py-2.5">38.4 kWh</td>
                      <td className="py-2.5">570 kg</td>
                      <td className="py-2.5 text-emerald-500 font-semibold">$16.80</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold">2026-06-04</td>
                      <td className="py-2.5">810 W/m²</td>
                      <td className="py-2.5">39.8 kWh</td>
                      <td className="py-2.5">584 kg</td>
                      <td className="py-2.5 text-emerald-500 font-semibold">$17.40</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold">2026-06-03</td>
                      <td className="py-2.5">690 W/m²</td>
                      <td className="py-2.5">32.6 kWh</td>
                      <td className="py-2.5">480 kg</td>
                      <td className="py-2.5 text-emerald-500 font-semibold">$14.20</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold">2026-06-02</td>
                      <td className="py-2.5">740 W/m²</td>
                      <td className="py-2.5">35.2 kWh</td>
                      <td className="py-2.5">518 kg</td>
                      <td className="py-2.5 text-emerald-500 font-semibold">$15.30</td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer specs */}
                <div className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                  <ShieldAlert className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <p className="leading-snug">
                    This document represents an official compliance print. Data is encrypted using SHA-256 signatures for solar hardware audit validity.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
