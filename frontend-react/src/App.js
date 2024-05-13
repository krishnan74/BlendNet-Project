import React from "react";
import Home from "./pages/Home";
import WatchListPage from "./pages/WatchListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
