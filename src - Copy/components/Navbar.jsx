import {
  FaInstagram,
  FaSun,
  FaMoon,
  FaDesktop,
  FaCodeBranch,
  FaFileCsv,
  FaFileExcel,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const renderIcon = () => {
    if (theme === "dark") return <FaSun />;
    if (theme === "light") return <FaMoon />;
    return <FaDesktop />;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-slate-950 transition-colors backdrop-blur-xl">

      <div className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 text-white text-xl shadow-md">
            <FaInstagram />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Instagram Insight Pro
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Instagram Analytics Dashboard
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center justify-end gap-3">

          {/* Compare */}
          <button className="flex items-center gap-2 rounded-xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-300 transition hover:opacity-80">
            <FaCodeBranch />
            Compare ZIP
          </button>

          {/* CSV */}
          <button className="flex items-center gap-2 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-300 transition hover:opacity-80">
            <FaFileCsv />
            CSV
          </button>

          {/* Excel */}
          <button className="flex items-center gap-2 rounded-xl border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-300 transition hover:opacity-80">
            <FaFileExcel />
            Excel
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-yellow-500 dark:text-yellow-300 transition hover:scale-110"
            title="Toggle Theme"
          >
            {renderIcon()}
          </button>

        </div>

      </div>
    </header>
  );
}