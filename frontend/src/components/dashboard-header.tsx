"use client";

import { useTheme } from "@/components/theme-provider";
import { useUser } from "@/components/user-provider";
import {
  Bell,
  Sun,
  Moon,
  Search,
  Menu,
  LogOut,
  User,
  Settings as SettingsIcon,
  ChevronDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchAlerts } from "@/lib/api";

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
  mobileOpen: boolean;
}

export default function DashboardHeader({ setMobileOpen, mobileOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { name, email } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { data: alertsList } = useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#090d16]/70 backdrop-blur-md px-4 md:px-6">
      {/* Left side: Hamburger (mobile) and search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-xs md:max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search panels, alerts, reports..."
            className="pl-10 pr-4 w-full"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all relative cursor-pointer"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#090d16]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] p-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer">
                  Mark all read
                </span>
              </div>
              <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                {alertsList && alertsList.map((n: any) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-xl border transition-all text-xs cursor-pointer ${
                      n.severity === "critical"
                        ? "bg-red-500/5 border-red-500/20 hover:bg-red-500/10"
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold ${n.severity === "critical" ? "text-red-500" : "text-slate-800 dark:text-slate-200"}`}>
                        {n.device}
                      </span>
                      <span className="text-slate-400 text-[10px]">{n.time}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 leading-snug">{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 p-1.5 pr-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500 to-amber-400 text-white font-semibold text-sm">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="hidden md:block text-xs font-medium text-slate-700 dark:text-slate-300">
              {name}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1626] p-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/50">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{name}</p>
                <p className="text-[10px] text-slate-400 truncate">{email}</p>
              </div>
              <div className="mt-1 space-y-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  My Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer"
                >
                  <SettingsIcon className="h-3.5 w-3.5 text-slate-400" />
                  Account Settings
                </Link>
                <Link
                  href="/login"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-red-600 hover:bg-red-500/5 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
