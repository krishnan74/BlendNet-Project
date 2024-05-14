import React from "react";
import WatchList from "../components/WatchList";

const Dashboard = () => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetchWatchList();
  }, []);

  const fetchWatchList = async () => {
    const userid = localStorage.getItem("userid");
    try {
      const response = await fetch(
        `http://localhost:8000/getWatchList/?userid=${userid}`
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
      Dashboard
      <WatchList watchList={watchList} />
    </div>
  );
};

export default Dashboard;
