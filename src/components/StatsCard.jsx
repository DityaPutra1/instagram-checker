import "./StatsCard.css";
import {
  FaUsers,
  FaUserFriends,
  FaHandshake,
  FaHeart,
  FaUserMinus,
} from "react-icons/fa";

export default function StatsCard({ data }) {
  const cards = [
    {
      title: "Followers",
      value: data.totalFollowers,
      icon: <FaUsers />,
      color: "#4F46E5",
    },
    {
      title: "Following",
      value: data.totalFollowing,
      icon: <FaUserFriends />,
      color: "#2563EB",
    },
    {
      title: "Mutual",
      value: data.totalMutual,
      icon: <FaHandshake />,
      color: "#16A34A",
    },
    {
      title: "Fans",
      value: data.totalFans,
      icon: <FaHeart />,
      color: "#EC4899",
    },
    {
      title: "Not Follow Back",
      value: data.totalNotFollowBack,
      icon: <FaUserMinus />,
      color: "#DC2626",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card) => (
        <div
          className="stats-card"
          key={card.title}
          style={{ borderTop: `5px solid ${card.color}` }}
        >
          <div className="stats-icon" style={{ color: card.color }}>
            {card.icon}
          </div>

          <div className="stats-info">
            <h4>{card.title}</h4>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}