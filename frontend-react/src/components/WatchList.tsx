import React from "react";
import StockComponent from "./StockComponent";

interface WatchListProps {
  watchList: string[];
}

const WatchList: React.FC<WatchListProps> = ({ watchList }) => {
  return (
    <div className="grid grid-cols-2 gap-10">
      {watchList.map((stock, index) => (
        <StockComponent key={index} stock_symbol={stock} />
      ))}
    </div>
  );
};

export default WatchList;
