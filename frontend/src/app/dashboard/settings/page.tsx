"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { useUser } from "@/components/user-provider";
import { Settings, User, Bell, Key, Shield, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { name, setName, email, setEmail, company, setCompany } = useUser();

  // Settings form states

  const [thresholdDrop, setThresholdDrop] = useState(15); // % drop before alert
  const [tempAlert, setTempAlert] = useState(65); // °C temp limit before alert
  const [apiKey, setApiKey] = useState("saurnet_live_pk_f98d2b...38f9");

  const handleGenerateKey = () => {
    const randomHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setApiKey(`saurnet_live_pk_${randomHex}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Configure hardware thresholds, developer API credentials, profile preferences, and theme values.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile and System Preferences */}
        <div className="space-y-6 lg:col-span-2">
          {/* User profile card */}
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <User className="h-4.5 w-4.5 text-emerald-500" />
                Profile Settings
              </CardTitle>
              <CardDescription>Modify account information and company scopes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Company / Organization</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} className="text-xs" />
              </div>
              <Button size="sm" className="cursor-pointer">Save Account Profile</Button>
            </CardContent>
          </Card>

          {/* Developer API Card */}
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Key className="h-4.5 w-4.5 text-blue-500" />
                API Credentials
              </CardTitle>
              <CardDescription>API secret keys for hardware webhooks and telemetry integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">Live API Key</label>
                <div className="flex gap-2">
                  <Input value={apiKey} readOnly className="font-mono text-xs select-all bg-slate-100 dark:bg-slate-900" />
                  <Button variant="outline" size="icon" onClick={handleGenerateKey} className="shrink-0 cursor-pointer" title="Regenerate Key">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">
                Warning: Regenerating your API key will break active PV node collectors. Update hardware collectors immediately.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Threshold Preferences */}
        <div className="space-y-6">
          {/* Threshold sliders card */}
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Bell className="h-4.5 w-4.5 text-amber-500" />
                Alert Thresholds
              </CardTitle>
              <CardDescription>Configure telemetry alarm parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Slider 1: Yield drop */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">Yield Drop Alarm</span>
                  <span className="font-mono text-amber-500">{thresholdDrop}% drop</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={thresholdDrop}
                  onChange={(e) => setThresholdDrop(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Slider 2: Temp limit */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-300">Temp Overheat Limit</span>
                  <span className="font-mono text-amber-500">{tempAlert}°C</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="1"
                  value={tempAlert}
                  onChange={(e) => setTempAlert(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="pt-4 border-t border-slate-250 dark:border-slate-850 space-y-3">
                <label className="text-xs font-semibold text-slate-400 block">Notification Frequency</label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-500" />
                    <span>Instant Push Notification</span>
                  </label>
                  <label className="flex items-center gap-2 font-medium cursor-pointer">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-emerald-500" />
                    <span>Daily email ledger digests</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings Card */}
          <Card className="border-slate-200/60 dark:border-slate-800/80">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Shield className="h-4.5 w-4.5 text-emerald-500" />
                Theme Preferences
              </CardTitle>
              <CardDescription>Customize interface themes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => setTheme("light")}
                  className={`py-2 rounded-xl border transition-all cursor-pointer ${
                    theme === "light"
                      ? "border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  Light Theme
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`py-2 rounded-xl border transition-all cursor-pointer ${
                    theme === "dark"
                      ? "border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  Dark Theme
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
