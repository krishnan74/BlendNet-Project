import React, { useEffect, useState } from "react";
import WatchList from "../components/WatchList";

const Dashboard = () => {
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    const userid = localStorage.getItem("userid");
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/getWatchList/?userid=${userid}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch watchlist");
      }
      const data = await response.json();
      console.log(data);
      setWatchList(data.watch_list);
    } catch (err) {
      setError("Failed to fetch watchlist");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10">
      <h1 className="text-3xl font-bold mt-8 mb-4">Dashboard</h1>
      {
        watchList.length === 0 ? <p>No stocks in watchlist, add stocks to get information</p> :
        <>
          <section className="mb-8">
            <WatchList watchList={watchList} />
          </section>
        </>
      }
    </div>
  );
};

export default Dashboard;
