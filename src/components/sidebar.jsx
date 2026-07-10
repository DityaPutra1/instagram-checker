import { useState } from "react";
import {
  FaInstagram,
  FaUsers,
  FaUserFriends,
  FaHeart,
  FaUserMinus,
  FaChartPie,
  FaCodeBranch,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ tab, setTab }) {
  const [open, setOpen] = useState(false);

  const menus = [
    { key: "followers", title: "Followers", icon: FaUsers },
    { key: "following", title: "Following", icon: FaUserFriends },
    { key: "mutual", title: "Mutual", icon: FaHeart },
    { key: "fans", title: "Fans", icon: FaChartPie },
    { key: "notFollowBack", title: "Not Follow Back", icon: FaUserMinus },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-5 top-5 z-50 lg:hidden rounded-xl bg-white dark:bg-slate-900 shadow-lg p-3"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-72
          bg-white dark:bg-slate-950
          border-r border-slate-200 dark:border-slate-800
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center text-white text-xl">
            <FaInstagram />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Insight Pro
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Instagram Analytics
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-4 space-y-2">
          {menus.map(({ key, title, icon: Icon }) => {
            const active = tab === key;

            return (
              <button
                key={key}
                onClick={() => {
                  setTab(key);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition
                  ${
                    active
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
              >
                <Icon />
                <span>{title}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition">
            <FaCodeBranch />
            <span>Compare ZIP</span>
          </button>

          <button className="w-full mt-2 flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-900 transition">
            <FaCog />
            <span>Settings</span>
          </button>

          <div className="mt-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
            <p className="font-semibold">Instagram Insight Pro</p>
            <p className="text-sm opacity-80">Version 4.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}