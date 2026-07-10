import { useState } from "react";
import {
  FaChartPie,
  FaUsers,
  FaUserFriends,
  FaUserMinus,
  FaHeart,
  FaCog,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ tab, setTab }) {
  const [open, setOpen] = useState(false);

  const menus = [
    {
      key: "followers",
      title: "Followers",
      icon: FaUsers,
    },
    {
      key: "following",
      title: "Following",
      icon: FaUserFriends,
    },
    {
      key: "mutual",
      title: "Mutual",
      icon: FaHeart,
    },
    {
      key: "fans",
      title: "Fans",
      icon: FaChartPie,
    },
    {
      key: "notFollowBack",
      title: "Not Follow Back",
      icon: FaUserMinus,
    },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-white backdrop-blur-xl shadow-xl lg:hidden"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-72
          border-r border-white/10
          bg-slate-900/70
          backdrop-blur-2xl
          shadow-2xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-xl text-white shadow-lg">
            <FaInstagram />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Instagram Insight
            </h2>

            <p className="text-sm text-slate-400">
              Pro Dashboard
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 p-4">
          {menus.map(({ key, title, icon: Icon }) => {
            const active = tab === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  setOpen(false);
                }}
                className={`
                  group flex items-center gap-4 rounded-2xl px-5 py-4
                  transition-all duration-300

                  ${
                    active
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`text-lg ${
                    active
                      ? ""
                      : "group-hover:scale-110 transition-transform"
                  }`}
                />

                <span className="font-medium">{title}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-4">
          <button
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FaCog className="text-lg" />
            <span className="font-medium">Settings</span>
          </button>

          <div className="mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
            <p className="text-xs uppercase tracking-widest text-cyan-300">
              Instagram Insight Pro
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Dashboard Analitik Instagram Modern
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}