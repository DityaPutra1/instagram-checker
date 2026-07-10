import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ChartFollowers({ data }) {
  const followers = data?.followers?.length || 0;
  const following = data?.following?.length || 0;
  const mutual = data?.mutual?.length || 0;
  const fans = data?.fans?.length || 0;
  const notFollowBack = data?.notFollowBack?.length || 0;

  const lineData = Array.from(
    { length: Math.max(followers, 1) },
    (_, index) => ({
      day: index + 1,
      followers: index + 1,
    })
  );

  const pieData = [
    {
      name: "Followers",
      value: followers,
    },
    {
      name: "Following",
      value: following,
    },
    {
      name: "Mutual",
      value: mutual,
    },
    {
      name: "Fans",
      value: fans,
    },
    {
      name: "Not Follow Back",
      value: notFollowBack,
    },
  ];

  const COLORS = [
    "#38bdf8",
    "#8b5cf6",
    "#ec4899",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
        <h2 className="mb-1 text-xl font-bold text-white">
          Followers Growth
        </h2>

        <p className="mb-6 text-sm text-slate-400">
          Simulasi pertumbuhan berdasarkan jumlah followers.
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis
                dataKey="day"
                stroke="#94a3b8"
              />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="followers"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
        <h2 className="mb-1 text-xl font-bold text-white">
          Account Distribution
        </h2>

        <p className="mb-6 text-sm text-slate-400">
          Distribusi data Instagram yang telah dianalisis.
        </p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}