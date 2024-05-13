import React, { useEffect, useState } from "react";

const StockComponent = ({ stock_symbol }) => {
  const [stockData, setStockData] = useState({});
  const [number, setNumber] = useState(10);

  useEffect(() => {
    getStockData();
  }, [stock_symbol]);

  const getStockData = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock_symbol}&interval=5min&apikey=demo`
      );
      const data = await response.json();
      setStockData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const timeSeriesData = stockData["Time Series (5min)"] || {}; // Ensure timeSeriesData is an object

  // Extract meta stockData properties with null check
  const symbol = stockData["Meta Data"]
    ? stockData["Meta Data"]["2. Symbol"]
    : "";
  const lastRefreshed = stockData["Meta Data"]
    ? stockData["Meta Data"]["3. Last Refreshed"]
    : "";
  const timeZone = stockData["Meta Data"]
    ? stockData["Meta Data"]["6. Time Zone"]
    : "";
  const information = stockData["Meta Data"]
    ? stockData["Meta Data"]["1. Information"]
    : "";

  const limitedTimeSeriesData = Object.entries(timeSeriesData)
    .slice(0, number)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <p className="text-lg font-bold mb-2">Symbol: {symbol}</p>
        <p className="text-sm">Last Refreshed: {lastRefreshed}</p>
        <p className="text-sm">Time Zone: {timeZone}</p>
        <p className="text-sm">Information: {information}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-4">Time Series (5min)</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Timestamp</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Open</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">High</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Low</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Close</th>
              <th className="py-2 px-4 bg-gray-200 text-gray-700">Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(limitedTimeSeriesData).map(([timestamp, data]) => (
              <tr key={timestamp} className="border-b border-gray-200">
                <td className="py-2 px-4">{timestamp}</td>
                <td className="py-2 px-4">{data["1. open"]}</td>
                <td className="py-2 px-4">{data["2. high"]}</td>
                <td className="py-2 px-4">{data["3. low"]}</td>
                <td className="py-2 px-4">{data["4. close"]}</td>
                <td className="py-2 px-4">{data["5. volume"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={() => setNumber(number + 10)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockComponent;
