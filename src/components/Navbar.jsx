import {
  FaInstagram,
  FaSun,
  FaMoon,
  FaFileCsv,
  FaFileExcel,
  FaCodeBranch,
  FaBell,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="
      sticky
      top-0
      z-30
      backdrop-blur-xl
      bg-white/80
      dark:bg-slate-950/80
      border-b
      border-slate-200
      dark:border-slate-800
      transition
    "
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-5">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          <div
            className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-br
            from-pink-500
            via-purple-500
            to-orange-500
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-xl
          "
          >
            <FaInstagram />
          </div>

          <div>

           <div>
  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
    Instagram Insight Pro
  </h1>

  <p className="text-sm text-slate-500 dark:text-slate-400">
    Professional Analytics Dashboard
  </p>

  <a
    href="https://instagram.com/pieditya"
    target="_blank"
    rel="noopener noreferrer"
    className="
      mt-1
      inline-flex
      items-center
      gap-1
      text-xs
      font-semibold
      text-pink-500
      hover:text-pink-600
      dark:text-pink-400
      dark:hover:text-pink-300
      transition-all
      duration-300
      hover:translate-x-1
    "
  >
    <FaInstagram className="text-sm" />
    Created by <span className="font-bold">@pieditya</span>
  </a>
</div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap items-center gap-3">

          <div
            className="
            hidden
            lg:flex
            px-4
            py-2
            rounded-xl
            bg-slate-100
            dark:bg-slate-900
            font-semibold
          "
          >
            {time}
          </div>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-500
            hover:bg-cyan-600
            px-4
            py-3
            text-white
            transition
          "
          >
            <FaCodeBranch />
            Compare ZIP
          </button>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-600
            px-4
            py-3
            text-white
            transition
          "
          >
            <FaFileCsv />
            CSV
          </button>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-green-600
            hover:bg-green-700
            px-4
            py-3
            text-white
            transition
          "
          >
            <FaFileExcel />
            Excel
          </button>

          <button
            className="
            relative
            rounded-xl
            p-3
            bg-slate-100
            dark:bg-slate-900
          "
          >
            <FaBell />

            <span
              className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-red-500
            "
            />
          </button>

          <button
            onClick={toggleTheme}
            className="
            rounded-xl
            p-3
            bg-slate-100
            dark:bg-slate-900
            transition
            hover:scale-110
          "
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>

        </div>

      </div>

    </header>
  );
}