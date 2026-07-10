import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaKeyboard,
} from "react-icons/fa";

export default function Search({
  keyword,
  setKeyword,
}) {
  const [value, setValue] = useState(keyword);

  const inputRef = useRef(null);

  // Sinkronisasi jika keyword diubah dari parent
  useEffect(() => {
    setValue(keyword);
  }, [keyword]);

  // Debounce agar pencarian lebih ringan
  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(value);
    }, 250);

    return () => clearTimeout(timer);
  }, [value, setKeyword]);

  // Escape untuk menghapus pencarian
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setValue("");
        setKeyword("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [setKeyword]);

  const clearSearch = () => {
    setValue("");
    setKeyword("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Cari username Instagram..."
          onChange={(e) => setValue(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            py-4
            pl-14
            pr-14
            text-white
            placeholder:text-slate-500
            backdrop-blur-xl
            outline-none
            transition
            duration-300
            focus:border-cyan-400
            focus:bg-white/10
            focus:ring-4
            focus:ring-cyan-500/20
          "
        />

        {value && (
          <button
            onClick={clearSearch}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              rounded-lg
              p-2
              text-slate-400
              transition
              hover:bg-white/10
              hover:text-white
            "
            title="Hapus pencarian"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <FaKeyboard />
          <span>Tekan ESC untuk menghapus pencarian.</span>
        </div>

        <div>
          {value ? (
            <span className="rounded-xl bg-cyan-500/10 px-3 py-1 text-cyan-300">
              Mencari: <strong>{value}</strong>
            </span>
          ) : (
            <span>Menampilkan seluruh username.</span>
          )}
        </div>
      </div>
    </div>
  );
}