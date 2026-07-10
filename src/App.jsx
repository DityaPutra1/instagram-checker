import { useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import ResultList from "./components/ResultList";
import ChartFollowers from "./components/ChartFollowers";

import { getStats } from "./utils/analytics";
import { exportCSV } from "./utils/exportCSV";

export default function App() {
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);

  const [tab, setTab] = useState("followers");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (parsed) => {
    setData(parsed);
    setStats(getStats(parsed));
  };

  const users = useMemo(() => {
    if (!data) return [];

    return (data[tab] || []).filter((u) =>
      u.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [data, tab, keyword]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300">

      <Sidebar tab={tab} setTab={setTab} />

      <main className="lg:ml-72">

        <Navbar />

        <div className="max-w-7xl mx-auto p-6 space-y-6">

          <Upload
            setData={handleUpload}
            setLoading={setLoading}
          />

          {loading && (

            <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-12 text-center">

              <div className="w-12 h-12 mx-auto border-4 border-pink-500 border-t-transparent rounded-full animate-spin"/>

              <h2 className="mt-6 text-xl font-bold">
                Reading Instagram ZIP...
              </h2>

            </div>

          )}

          {stats && (

            <>

              <Dashboard stats={stats}/>

              <ChartFollowers data={data}/>

              <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl p-6">

                <div className="flex flex-col lg:flex-row gap-4 justify-between">

                  <Search
                    keyword={keyword}
                    setKeyword={setKeyword}
                  />

                  <button

                    onClick={()=>exportCSV(tab,users)}

                    className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-white font-semibold"

                  >

                    Export CSV

                  </button>

                </div>

                <div className="mt-6">

                  <ResultList users={users}/>

                </div>

              </div>

            </>

          )}

        </div>

      </main>

    </div>
  );
}