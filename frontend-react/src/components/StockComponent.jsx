import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const StockComponent = ({ stock_symbol }) => {
  const [stockData, setStockData] = useState({});
  const [number, setNumber] = useState(5);
  const [chartDisplay, setChartDisplay] = useState(true);

  useEffect(() => {
    getStockData();
  }, [stock_symbol]);

  const getStockData = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock_symbol}&interval=5min&apikey=demo`
      );
      const data = await response.json();
      console.log(data);
      setStockData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const timeSeriesData = stockData["Time Series (5min)"] || {}; // Ensure timeSeriesData is an object

  console.log(timeSeriesData);
  const timeStamps = Object.keys(timeSeriesData).slice(0, number).reverse();
  const chartData = {
    labels: timeStamps.map((timestamp) => timestamp.slice(-8)),

    datasets: [
      {
        label: "Open",
        data: Object.values(timeSeriesData)
          .slice(0, number)
          .reverse()
          .map((data) => data["1. open"]),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "High",

        data: Object.values(timeSeriesData)

          .slice(0, number)
          .reverse()
          .map((data) => data["2. high"]),
        fill: false,
        borderColor: "rgba(75,75,192,1)",
      },
      {
        label: "Low",
        data: Object.values(timeSeriesData)
          .slice(0, number)
          .reverse()
          .map((data) => data["3. low"]),
        fill: false,
        borderColor: "rgba(192,75,75,1)",
      },
      {
        label: "Close",
        data: Object.values(timeSeriesData)

          .slice(0, number)
          .map((data) => data["4. close"]),
        fill: false,
        borderColor: "rgba(192,192,75,1)",
      },
    ],
  };

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <p className="text-xl font-bold mb-2">{symbol}</p>
        <p className="text-sm">Last Refreshed: {lastRefreshed}</p>
        <p className="text-sm">Time Zone: {timeZone}</p>
        <p className="text-sm">Information: {information}</p>
        <h2 className="text-lg font-bold mb-2 mt-4">Stock prices over time</h2>
      </div>
      {chartDisplay ? (
        <div>
          <Line data={chartData} />
        </div>
      ) : (
        <div>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">
                    Timestamp
                  </th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">Open</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">High</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">Low</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">Close</th>
                  <th className="py-2 px-4 bg-gray-200 text-gray-700">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(limitedTimeSeriesData).map(
                  ([timestamp, data]) => (
                    <tr key={timestamp} className="border-b border-gray-200">
                      <td className="py-2 px-4">{timestamp}</td>
                      <td className="py-2 px-4">{data["1. open"]}</td>
                      <td className="py-2 px-4">{data["2. high"]}</td>
                      <td className="py-2 px-4">{data["3. low"]}</td>
                      <td className="py-2 px-4">{data["4. close"]}</td>
                      <td className="py-2 px-4">{data["5. volume"]}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="mt-4 flex gap-10">
              <button
                onClick={() => setNumber(number + 5)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Load More
              </button>
              <button></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockComponent;
