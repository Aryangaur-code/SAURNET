"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldAlert, Users, Server, Radio, ArrowLeft, Zap, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "Administrator" | "Technician" | "Auditor";
  status: "active" | "invited";
}

const initialUsers: AdminUser[] = [
  { id: 1, name: "Sujata Patel", email: "sujata@saurnet.com", role: "Administrator", status: "active" },
  { id: 2, name: "Marcus Thorne", email: "marcus.t@cleanpower.com", role: "Technician", status: "active" },
  { id: 3, name: "Aria Chen", email: "a.chen@utilityaudit.org", role: "Auditor", status: "invited" },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [feedLimit, setFeedLimit] = useState(45); // Max Grid export limit in kW
  const [saved, setSaved] = useState(false);

  const handleSaveLimits = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const handleRoleChange = (id: number, newRole: "Administrator" | "Technician" | "Auditor") => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col gap-8">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors" title="Back to Dashboard">
            <ArrowLeft className="h-4.5 w-4.5 text-slate-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              Saurnet Admin Console
            </h1>
            <p className="text-[10px] text-slate-500">Root Management & Grid Limits control</p>
          </div>
        </div>
        <Link href="/dashboard">
          <Button size="sm" variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white cursor-pointer">
            User Dashboard
          </Button>
        </Link>
      </header>

      {/* Admin Stat row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Managed Arrays</span>
            <h3 className="text-2xl font-black mt-1">4 Micro-Grids</h3>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Registered Assets</span>
            <h3 className="text-2xl font-black mt-1">192 Solar Nodes</h3>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Operational Inverters</span>
            <h3 className="text-2xl font-black mt-1">4 Active</h3>
          </CardContent>
        </Card>
        <Card className="border-slate-800 bg-slate-900/30">
          <CardContent className="p-6">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Admin Sessions</span>
            <h3 className="text-2xl font-black mt-1">1 Active Session</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Role Management Panel */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/10">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-blue-400" />
              User Directory & Roles
            </CardTitle>
            <CardDescription>Configure credential authorization and access permissions.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-850 pb-2 text-slate-500 font-bold uppercase">
                  <th className="py-2">User Name</th>
                  <th className="py-2">Role Scope</th>
                  <th className="py-2">Security Level</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-900/40">
                    <td className="py-3">
                      <p className="font-bold text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500">{user.email}</p>
                    </td>
                    <td className="py-3">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                        className="bg-slate-900 border border-slate-800 rounded-lg p-1 text-[11px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Technician">Technician</option>
                        <option value="Auditor">Grid Auditor</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold font-mono text-slate-400">
                        {user.role === "Administrator" ? "LEVEL-5 (Root)" : user.role === "Technician" ? "LEVEL-3 (Write)" : "LEVEL-1 (Read)"}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={user.status === "active" ? "success" : "secondary"}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Solar grid Capacity configuration */}
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-900/10">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Server className="h-4.5 w-4.5 text-emerald-400" />
                Grid Capacity Limiter
              </CardTitle>
              <CardDescription>Configure physical coupling safety limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Limit slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Max Export Rate</span>
                  <span className="font-mono text-emerald-400 font-extrabold">{feedLimit} kW</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={feedLimit}
                  onChange={(e) => setFeedLimit(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Threshold indicator */}
              {feedLimit > 60 && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 leading-snug flex gap-2">
                  <ShieldAlert className="h-5.5 w-5.5 shrink-0 text-red-500" />
                  <p>
                    <strong>WARNING:</strong> Setting grid export limit above 60 kW may exceed local municipal substation tolerances, risking circuit breaker trips.
                  </p>
                </div>
              )}

              <Button onClick={handleSaveLimits} className="w-full text-xs h-9 cursor-pointer gap-1.5" variant="default">
                <Save className="h-3.5 w-3.5" />
                {saved ? "Limits Saved!" : "Save Grid Limits"}
              </Button>
            </CardContent>
          </Card>

          {/* Alarm system logs */}
          <Card className="border-slate-800 bg-slate-900/10">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-1.5">
                <Radio className="h-4.5 w-4.5 text-amber-500" />
                Global Alert Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2.5 max-h-56 overflow-y-auto">
              <div className="p-2 border-b border-slate-900 text-[10px] space-y-1">
                <div className="flex justify-between font-bold text-red-500">
                  <span>ARRAY_HOTSPOT_FAULT</span>
                  <span>10:48 AM</span>
                </div>
                <p className="text-slate-400">Panel C8 thermal shunt limit exceeded (Critical: 72.8°C)</p>
              </div>
              <div className="p-2 border-b border-slate-900 text-[10px] space-y-1">
                <div className="flex justify-between font-bold text-amber-500">
                  <span>PANEL_DIRT_WARNING</span>
                  <span>08:12 AM</span>
                </div>
                <p className="text-slate-400">Array B, Panel B4 dust coverage at 14% (Clean recommended)</p>
              </div>
              <div className="p-2 text-[10px] space-y-1">
                <div className="flex justify-between font-bold text-emerald-400">
                  <span>GRID_LIMIT_UPDATE</span>
                  <span>Yesterday</span>
                </div>
                <p className="text-slate-400">User Sujata Patel set grid limits to 45 kW</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
