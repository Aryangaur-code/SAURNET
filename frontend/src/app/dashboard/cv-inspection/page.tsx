"use client";

import { useState, useRef } from "react";
import { Upload, Camera, AlertTriangle, ShieldCheck, Activity, Sparkles, CheckCircle2, ChevronRight, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CVInspection() {
  const [scanState, setScanState] = useState<"before" | "scanning" | "after">("before");
  const [selectedScanType, setSelectedScanType] = useState<"thermal" | "optical" | "upload">("thermal");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSimulateScan = (type: "thermal" | "optical") => {
    setSelectedScanType(type);
    setScanState("scanning");
    setTimeout(() => {
      setScanState("after");
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setSelectedScanType("upload");
        setScanState("scanning");
        setTimeout(() => {
          setScanState("after");
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScan = () => {
    setScanState("before");
    setUploadedImage(null);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">CV surface Diagnostic</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">
            Segment arrays and detect thermal shunts or microcracks via aerial photography.
          </p>
        </div>
        {scanState === "after" && (
          <Button variant="outline" size="sm" onClick={resetScan} className="text-xs font-bold border-slate-200 dark:border-slate-800 cursor-pointer">
            New Scan Session
          </Button>
        )}
      </div>

      {scanState === "before" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* File Upload Zone */}
          <Card className="lg:col-span-2 border-dashed border-2 border-slate-350 dark:border-slate-800 bg-[#030712]/10 hover:border-emerald-500/30 transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 animate-pulse-soft">
                <Upload className="h-7 w-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Upload Inspection Footage</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-semibold">
                  Drag and drop aerial drone thermal files (.tiff, .png) or load orthomosaics.
                </p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload} 
              />
              <Button 
                variant="outline" 
                className="text-xs font-bold border-slate-250 dark:border-slate-800 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
            </CardContent>
          </Card>

          {/* Quick Demos */}
          <Card className="border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Select Simulator
              </CardTitle>
              <CardDescription>Try preloaded panels to inspect defect modeling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col justify-center">
              <button
                onClick={() => handleSimulateScan("thermal")}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0b0f19] hover:border-emerald-500/35 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 duration-200">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Sample #1: Thermal scan</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Detect hotspot shunts on cells</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleSimulateScan("optical")}
                className="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0b0f19] hover:border-emerald-500/35 transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 duration-200">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Sample #2: Optical scan</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Detect dust, leaves, and cracks</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {scanState === "scanning" && (
        <Card className="border-slate-200/60 dark:border-slate-800/80">
          <CardContent className="flex flex-col items-center justify-center py-28 space-y-6">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10 border-t-emerald-400 animate-spin" />
            </div>
            <div className="space-y-1.5 text-center">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Saurnet CV Scan active</h3>
              <p className="text-xs text-slate-450 font-semibold">
                Isolating panel rows, conducting thermographic anomaly check...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {scanState === "after" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          {/* Before/After States */}
          <Card className="lg:col-span-2 border-slate-200/60 dark:border-slate-800/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Before / After AI segmentation</CardTitle>
              <CardDescription>
                {selectedScanType === "thermal"
                  ? "Thermography frames compared against heat signature threshold anomalies."
                  : "Optical drone images compared against localized soiling metrics."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Before State */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">1. Original Photo (Before)</span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0b0f19] flex items-center justify-center text-center p-4 relative">
                  {selectedScanType === "thermal" ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900/60 flex flex-col justify-center items-center">
                      <div className="w-44 h-24 border border-white/10 rounded-xl flex items-center justify-center text-[10px] text-white/40 bg-white/5 font-mono">
                        [Raw FLIR Camera Frame]
                      </div>
                    </div>
                  ) : selectedScanType === "optical" ? (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center">
                      <div className="w-44 h-24 border border-white/10 rounded-xl flex items-center justify-center text-[10px] text-white/40 bg-white/5 font-mono">
                        [Raw Optical drone frame]
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center">
                      {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded Panel" className="object-cover w-full h-full opacity-70" />
                      ) : (
                        <div className="w-44 h-24 border border-white/10 rounded-xl flex items-center justify-center text-[10px] text-white/40 bg-white/5 font-mono">
                          [Uploaded Image]
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* After State */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 2. AI Detected overlay (After)
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#0b0f19] flex items-center justify-center text-center p-4 relative">
                  {selectedScanType === "thermal" ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-900/60 flex flex-col justify-center items-center">
                      {/* Hotspot overlay */}
                      <div className="w-44 h-24 border-2 border-red-500 rounded-xl flex items-center justify-center bg-red-500/20 relative animate-pulse-soft">
                        <span className="absolute -top-7 left-0 text-[9px] bg-red-500 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                          HOTSPOT: 72.8°C
                        </span>
                        <div className="h-7 w-7 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-red-500/50">
                          !
                        </div>
                      </div>
                    </div>
                  ) : selectedScanType === "optical" ? (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center">
                      {/* Dust overlay */}
                      <div className="w-44 h-24 border-2 border-amber-500 rounded-xl flex items-center justify-center bg-amber-500/20 relative animate-pulse-soft">
                        <span className="absolute -top-7 left-0 text-[9px] bg-amber-500 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                          SOILING SOOT: 84%
                        </span>
                        <div className="h-7 w-7 rounded-full bg-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-amber-500/50">
                          !
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col justify-center items-center">
                      {uploadedImage && (
                        <img src={uploadedImage} alt="Uploaded Panel" className="absolute inset-0 object-cover w-full h-full opacity-50" />
                      )}
                      {/* Dust and Crack overlay */}
                      <div className="w-44 h-24 border-2 border-emerald-500 rounded-xl flex items-center justify-center bg-emerald-500/20 relative animate-pulse-soft z-10">
                        <span className="absolute -top-7 left-0 text-[9px] bg-emerald-500 text-white font-mono px-2 py-0.5 rounded-full font-bold">
                          DETECTED: CRACKS & DUST
                        </span>
                        <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-500/50">
                          !
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Severity & Recommendations */}
          <div className="space-y-6">
            {/* Severity meter */}
            <Card className="border-slate-200/60 dark:border-slate-800/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-extrabold tracking-wider uppercase">Severity Analysis</CardTitle>
                <CardDescription>Defect priority index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">Risk Score</span>
                  {selectedScanType === "thermal" ? (
                    <Badge variant="destructive" className="font-extrabold text-[9px]">CRITICAL RISK (86/100)</Badge>
                  ) : selectedScanType === "optical" ? (
                    <Badge variant="warning" className="font-extrabold text-[9px]">MEDIUM RISK (44/100)</Badge>
                  ) : (
                    <Badge variant="warning" className="font-extrabold text-[9px] bg-orange-500">HIGH RISK (72/100)</Badge>
                  )}
                </div>
                {/* Meter bar */}
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                  <div
                    className={`h-full ${selectedScanType === "thermal" ? "bg-red-500 neon-glow-red" : selectedScanType === "optical" ? "bg-amber-500 neon-glow-amber" : "bg-orange-500 neon-glow-orange"}`}
                    style={{ width: selectedScanType === "thermal" ? "86%" : selectedScanType === "optical" ? "44%" : "72%" }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-bold tracking-wider">
                  <span>LOW</span>
                  <span>MEDIUM</span>
                  <span>CRITICAL</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-2">
                  {selectedScanType === "thermal"
                    ? "Severe cell resistance hotspot. Potential for diode breakdown and grid panel coupling decay."
                    : selectedScanType === "optical" 
                    ? "Dust deposit coating detected on 14% of cell margins. Washing is advised to restore absorption yield."
                    : "Multiple micro-cracks and heavy dust accumulation detected on the uploaded panel. Immediate cleaning and structural assessment required to prevent further damage."}
                </p>
              </CardContent>
            </Card>

            {/* Recommendation card */}
            <Card className="border-slate-200/60 dark:border-slate-800/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-450" />
                  AI Recommendation
                </CardTitle>
                <CardDescription>Automated diagnostic action items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/10 border border-slate-150 dark:border-slate-850/80 text-xs space-y-2.5">
                  <p className="font-bold text-slate-900 dark:text-white">Suggested Actions:</p>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    {selectedScanType === "thermal" ? (
                      <>
                        <li>Replace Bypass Diode PV-300 (C8).</li>
                        <li>Audit voltage sweep on Inverter #3.</li>
                        <li>Dispatch service team to microgrid C8.</li>
                      </>
                    ) : selectedScanType === "optical" ? (
                      <>
                        <li>Trigger high-pressure wash on Grid B4.</li>
                        <li>Clear bottom array border blockages.</li>
                        <li>Schedule audit compliance in 7 days.</li>
                      </>
                    ) : (
                      <>
                        <li>Schedule panel cleaning for dust removal.</li>
                        <li>Dispatch technician to assess micro-cracks.</li>
                        <li>Monitor output voltage for related efficiency drops.</li>
                      </>
                    )}
                  </ul>
                </div>
                <Button className="w-full text-xs font-bold h-9 cursor-pointer" variant="outline">
                  Create Work Ticket
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
