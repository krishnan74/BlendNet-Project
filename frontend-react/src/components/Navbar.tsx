import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [userid, setUserID] = useState<string>("");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userid");
    if (storedUserID) {
      setUserID(storedUserID);
    }
    console.log(storedUserID);
  }, []);

  const logout = () => {
    localStorage.removeItem("userid");
    setUserID("");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="bg-gray-800 py-4 px-10 flex justify-between">
        <div>
          <a href="/" className="text-white font-bold text-2xl">
            BlendNet Stock
          </a>
        </div>

        {userid ? (
          <div className="w-[40%] flex justify-end gap-10 items-center">
            <div>
              <a href="/dashboard" className="text-white">
                Dashboard
              </a>
            </div>
            <div>
              <a href="/watchlist" className="text-white  ">
                WatchList
              </a>
            </div>
            <div>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <a href="/login" className="text-white">
              Login
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
