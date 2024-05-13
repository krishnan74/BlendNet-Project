import React, { useEffect, useState } from "react";
import WatchList from "../components/WatchList";


const WatchListPage = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/getWatchList?userid=66421943a7c52d33895a1dcb"
      );
      const data = await response.json();
      setWatchList(data.watch_list);
      console.log(data.watch_list);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      My Watch List
      <WatchList watchList={watchList} />
    </div>
  );
};

export default WatchListPage;
