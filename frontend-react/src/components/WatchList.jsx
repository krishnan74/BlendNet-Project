import React from "react";
import StockComponent from "./StockComponent";

const WatchList = ({ watchList }) => {
  return (
    <div className="flex">
      {watchList.map((stock, index) => (
        <StockComponent key={index} stock_symbol={stock} />
      ))}
    </div>
  );
};

export default WatchList;
