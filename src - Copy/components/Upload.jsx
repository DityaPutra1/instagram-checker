import { useRef, useState } from "react";
import JSZip from "jszip";
import {
  FaCloudUploadAlt,
  FaFileArchive,
  FaCheckCircle,
} from "react-icons/fa";

import { parseInstagram } from "../utils/parseInstagram";

export default function Upload({ setData, setLoading }) {
  const inputRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const processFile = async (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".zip")) {
      alert("Silakan pilih file ZIP Instagram.");
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024 / 1024).toFixed(2) + " MB");

    setLoading?.(true);

    try {
      const zip = await JSZip.loadAsync(file);

      let followersJson = null;
      let followingJson = null;

      for (const filename of Object.keys(zip.files)) {
        const lower = filename.toLowerCase();

        if (zip.files[filename].dir) continue;

        if (
          lower.endsWith("followers_1.json") ||
          lower.includes("/followers_1.json")
        ) {
          followersJson = await zip.files[filename].async("string");
        }

        if (
          lower.endsWith("following.json") ||
          lower.includes("/following.json")
        ) {
          followingJson = await zip.files[filename].async("string");
        }
      }

      if (!followersJson) {
        alert("followers_1.json tidak ditemukan.");
        return;
      }

      if (!followingJson) {
        alert("following.json tidak ditemukan.");
        return;
      }

      const followers = JSON.parse(followersJson);
      const following = JSON.parse(followingJson);

      const parsed = parseInstagram({
        followers,
        following,
      });

      setData(parsed);
    } catch (err) {
      console.error(err);
      alert("Gagal membaca ZIP Instagram.");
    } finally {
      setLoading?.(false);
    }
  };

  const handleChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    processFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-5">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 transition-all duration-300
        ${
          dragging
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-white/15 bg-white/5 hover:border-cyan-400/50 hover:bg-white/10"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-4xl text-white shadow-xl">
            <FaCloudUploadAlt />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Upload Instagram ZIP
          </h2>

          <p className="mt-3 max-w-xl text-slate-400">
            Drag & drop file ZIP Instagram ke area ini atau klik untuk memilih
            file dari komputer Anda.
          </p>

          <button
            type="button"
            className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Pilih File ZIP
          </button>
        </div>
      </div>

      {fileName && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <FaFileArchive className="text-3xl text-emerald-400" />

            <div className="flex-1">
              <h3 className="font-semibold text-white">
                {fileName}
              </h3>

              <p className="text-sm text-slate-300">
                {fileSize}
              </p>
            </div>

            <FaCheckCircle className="text-3xl text-emerald-400" />
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-200">
        <strong>Tips:</strong> Gunakan file ZIP hasil unduhan data Instagram
        yang masih berisi <code>followers_1.json</code> dan{" "}
        <code>following.json</code>.
      </div>
    </div>
  );
}