"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  LineChart,
  Camera,
  Bot,
  FileText,
  DollarSign,
  Leaf,
  MapPin,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

export const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Live Monitoring", href: "/dashboard/live", icon: Zap },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { name: "CV Inspection", href: "/dashboard/cv-inspection", icon: Camera },
  { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Financial Analytics", href: "/dashboard/financial", icon: DollarSign },
  { name: "Carbon Savings", href: "/dashboard/carbon", icon: Leaf },
  { name: "Service Centers", href: "/dashboard/service-centers", icon: MapPin },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function DashboardNav({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f1626]/80 backdrop-blur-lg transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className={`flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity ${
            collapsed ? "opacity-0 md:opacity-100 justify-center w-full" : "px-2"
          }`}
          onClick={handleNavClick}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-white shadow-md shadow-emerald-500/20">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          {!collapsed && (
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Saurnet
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-6 w-6 items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>

      {/* Sidebar Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative cursor-pointer
                ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <Icon
                className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 duration-200 ${
                  isActive ? "text-emerald-500 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
                }`}
              />
              {!collapsed && <span>{item.name}</span>}

              {/* Tooltip for Collapsed State */}
              {collapsed && (
                <div className="absolute left-16 z-50 hidden group-hover:block rounded-md bg-slate-950 px-2 py-1 text-xs text-white shadow-md whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Admin Panel Quicklink at Bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/admin"
          onClick={handleNavClick}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all group relative cursor-pointer
            ${
              pathname === "/admin"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }
          `}
        >
          <ShieldAlert className="h-5 w-5 text-amber-500" />
          {!collapsed && <span>Admin Dashboard</span>}
          {collapsed && (
            <div className="absolute left-16 z-50 hidden group-hover:block rounded-md bg-slate-950 px-2 py-1 text-xs text-white shadow-md whitespace-nowrap">
              Admin Dashboard
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
