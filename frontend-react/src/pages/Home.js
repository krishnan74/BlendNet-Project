import React, { useEffect, useState } from "react";
import StockComponent from "../components/StockComponent";


const Home = () => {
  const [suggestedSymbols, setSuggestedSymbols] = useState([]);
  const [symbol, setSymbol] = useState("BA");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Adding ${symbol} to watchlist`);
    setSymbol("");
  };

  useEffect(() => {
    getStocksList();
  }, [symbol]);

  const getStocksList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/getAllStocks?keyword=${symbol}`
      );
      const data = await response.json();
      setSuggestedSymbols(data);
      console.log(data);
    } catch (err) {
      setSuggestedSymbols([]);
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Stock Watchlist</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {suggestedSymbols.map((s) => (
            <button
              key={s["1. symbol"]}
              onClick={() => setSymbol(s["1. symbol"])}
              className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
            >
              {s["1. symbol"]}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow-md transition duration-300 hover:bg-green-600"
        >
          Add to Watchlist
        </button>
      </form>


    </div>
  );
};

export default Home;
