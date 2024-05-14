import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Clicked")
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      const response = await fetch("http://localhost:8000/register/", {
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
        <h1 className="text-2xl text-center font-bold">Register</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="border border-gray-400 p-2 m-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-400 p-2 m-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-400 p-2 m-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded"
        >
          Register
        </button>
      </form>

      <div className="mt-5">
        <p>
          Already have an account? <a href="/login" className="font-bold underline">Click here</a> to login
        </p>
      </div>
    </div>
  );
};

export default Register;
