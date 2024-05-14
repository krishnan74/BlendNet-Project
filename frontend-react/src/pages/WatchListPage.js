import React, { useEffect, useState } from "react";

const WatchListPage = () => {
  const [suggestedSymbols, setSuggestedSymbols] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [exitingWatchList, setExistingWatchList] = useState([]);

  const handleSubmit = () => {
    const userid = localStorage.getItem("userid");
    fetch(`http://localhost:8000/addToWatchList/?userid=${userid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockToBeAdded: watchlist,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchWatchList();
      });
  };

  useEffect(() => {
    getStocksList();
  }, [symbol]);

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
      setExistingWatchList(data.watch_list);
      console.log(data.watch_list);
    } catch (err) {
      console.log(err);
    }
  };

  const getStocksList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/getAllStocks?keyword=${symbol}`
      );
      var data = await response.json();
      data = data.bestMatches;

      setSuggestedSymbols(data);
    } catch (err) {
      setSuggestedSymbols([]);
      console.log(err);
    }
  };

  const handleAddToWatchlist = (symbol) => {
    for (const s of watchlist) {
      if (s === symbol) {
        return;
      }
    }
    setWatchlist([...watchlist, symbol]);
  };

  const handleRemoveStock = async (stock) => {
    var removeList = [];
    removeList.push(stock);
    const userid = localStorage.getItem("userid");
    try {
      const response = await fetch(
        `http://localhost:8000/removeFromWatchList/?userid=${userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockToBeRemoved: removeList,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      fetchWatchList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Stock Watchlist</h1>

      <div className="mb-8">
        <h1>Current Watch List</h1>
        <div className="flex gap-5 mt-3">
          {exitingWatchList?.map((stock) => (
            <div className=" bg-gray-500 pl-4 pr-3 py-1 rounded-md text-white flex items-center justify-between">
              {" "}
              {stock}
              <button
                onClick={() => handleRemoveStock(stock)}
                className="ml-2 w-5 h-5 text-black rounded-full bg-gray-400 flex justify-center
                items-center"
              >
                <p className="text-sm">x</p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="symbolInput" className="text-sm font-medium mb-1">
            Enter stock symbol:
          </label>
          <input
            type="text"
            id="symbolInput"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {suggestedSymbols?.map((s) => (
            <button
              key={s["1. symbol"]}
              onClick={() => handleAddToWatchlist(s["1. symbol"])}
              className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              {s["1. symbol"]}
            </button>
          ))}
        </div>

        <div className="flex gap-10 items-center">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md transition duration-300 hover:bg-green-600"
          >
            Add to Watchlist
          </button>
          <div>
            {watchlist.length > 0 ? (
              <div className="flex gap-5">
                {watchlist.map((stock) => (
                  <div className=" bg-gray-500 px-3 py-2 rounded-md text-white">
                    {" "}
                    {stock}{" "}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No stocks added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WatchListPage;
