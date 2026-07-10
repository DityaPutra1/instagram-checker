import { FaInstagram } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaInstagram size={32} />
        <div>
          <h2>Instagram Insight Pro</h2>
          <p>Analyze your Instagram Export</p>
        </div>
      </div>
    </nav>
  );
}