import React, { useEffect, useState } from "react";

const StockComponent = ({ stock_symbol }) => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    getStockData();
  });

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
  const symbol = stockData["Meta Data"] ? stockData["Meta Data"]["2. Symbol"] : "";
  const lastRefreshed = stockData["Meta Data"]
    ? stockData["Meta Data"]["3. Last Refreshed"]
    : "";
  const timeZone = stockData["Meta Data"] ? stockData["Meta Data"]["6. Time Zone"] : "";
  const information = stockData["Meta Data"]
    ? stockData["Meta Data"]["1. Information"]
    : "";

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p>Symbol: {symbol}</p>
        <p>Last Refreshed: {lastRefreshed}</p>
        <p>Time Zone: {timeZone}</p>
        <p>Information: {information}</p>
      </div>
      <div>
        <h2>Time Series (5min)</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(timeSeriesData).map(([timestamp, data]) => (
              <tr key={timestamp}>
                <td>{timestamp}</td>
                <td>{data["1. open"]}</td>
                <td>{data["2. high"]}</td>
                <td>{data["3. low"]}</td>
                <td>{data["4. close"]}</td>
                <td>{data["5. volume"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockComponent;
