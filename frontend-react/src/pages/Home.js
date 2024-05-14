import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center bg-gray-100 py-12 px-4">
      <div className="flex flex-col items-center w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            All Your Stock Market Data in One Place
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Monitor the stocks you're interested in and get valuable insights
            into prices, market trends, and more.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <a
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-md shadow-lg transition duration-300 ease-in-out"
          >
            Get Started
          </a>
          
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 md:w-3/4 mx-auto">
            Our platform provides comprehensive stock market data and tools to
            help you make informed investment decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Real-Time Data
            </h3>
            <p className="text-gray-600">
              Get access to real-time stock market data, including prices,
              volumes, and trends.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customizable Watchlists
            </h3>
            <p className="text-gray-600">
              Create and manage custom watchlists to track your favorite stocks
              and investments.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Analytical Tools
            </h3>
            <p className="text-gray-600">
              Utilize powerful analytical tools to analyze market trends,
              patterns, and indicators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
