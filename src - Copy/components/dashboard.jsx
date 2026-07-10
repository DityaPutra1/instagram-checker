import {
  FaUsers,
  FaUserFriends,
  FaUserMinus,
  FaHeart,
  FaChartPie,
  FaChartLine,
} from "react-icons/fa";

export default function Dashboard({ stats }) {
  const cards = [
    {
      title: "Followers",
      value: stats.totalFollowers,
      icon: FaUsers,
      color: "from-sky-500 to-cyan-500",
    },
    {
      title: "Following",
      value: stats.totalFollowing,
      icon: FaUserFriends,
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Not Follow Back",
      value: stats.notFollowBack,
      icon: FaUserMinus,
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Mutual",
      value: stats.mutual,
      icon: FaHeart,
      color: "from-pink-500 to-fuchsia-500",
    },
    {
      title: "Fans",
      value: stats.fans,
      icon: FaChartPie,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Follow Ratio",
      value: stats.followRatio,
      icon: FaChartLine,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Ringkasan statistik akun Instagram berdasarkan data ZIP yang
          telah diunggah.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-4xl font-bold text-white">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon />
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}