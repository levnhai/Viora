"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function AdminThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("admin_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin_theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center p-2 rounded-xl text-slate-400">
        <Sun className="w-5 h-5 opacity-40" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group relative"
      title={isDark ? "Chuyển sang Giao diện Sáng (Light Mode)" : "Chuyển sang Giao diện Tối (Dark Mode)"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform duration-200" />
      )}
    </button>
  );
}
