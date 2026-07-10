import { FaCopy } from "react-icons/fa";
import "./ResultList.css";

export default function ResultList({ users }) {
  const copyUsername = async (username) => {
    try {
      await navigator.clipboard.writeText(username);
      alert(`"${username}" berhasil disalin.`);
    } catch (error) {
      console.error("Gagal menyalin username:", error);
      alert("Gagal menyalin username.");
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <h3>Tidak ada data</h3>
        <p>Tidak ada username yang dapat ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="result-list">
      <div className="result-header">
        <h2>Daftar Username</h2>
        <span>{users.length} akun</span>
      </div>

      {users.map((user, index) => (
        <div className="user-card" key={`${user}-${index}`}>
          <span className="username">@{user}</span>

          <button
            className="copy-btn"
            onClick={() => copyUsername(user)}
            title="Salin Username"
          >
            <FaCopy />
          </button>
        </div>
      ))}
    </div>
  );
}