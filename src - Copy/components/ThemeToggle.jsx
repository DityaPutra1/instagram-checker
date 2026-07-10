import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(!dark)}
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}