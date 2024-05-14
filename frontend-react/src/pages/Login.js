import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const userid = data.userid;
      localStorage.setItem("userid", userid);

      console.log(data);
    } catch (err) {
      console.log(err);
    }

    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <form
        className="flex flex-col justify-center border-black border px-10 py-20 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center font-bold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-400 p-2 m-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-400 p-2 m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded"
        >
          Login
        </button>
      </form>

      <div className="mt-5">
        <p>
          Don't have an account?{" "}
          <a href="/register " className="font-bold underline">
            Click here
          </a>{" "}
          to create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
