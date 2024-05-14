import React, { useEffect, useState } from "react";
import StockComponent from "../components/StockComponent";

const Home = () => {
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col p-10 w-[60%]">
        <p className="text-4xl font-bold tracking-wide">
          All your StockMarket prices in one place
        </p>
        <p className="text-lg font-normal w-[80%]">
          Monitor the stocks that you've bought and get fast and better insights
          on the prices and marketcap
        </p>

        <a href="/login" className="border border-black rounded-lg px-10 py-3 w-fit">
          Get Started
        </a>
      </div>
      <div className="w-[40%]">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Home;
