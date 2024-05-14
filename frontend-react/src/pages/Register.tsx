import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);

      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();

      const userid = data.userid;
      localStorage.setItem("userid", userid);
      
      window.location.href = "/dashboard";
    } catch (err) {
      setError((err as Error).message || "Failed to register");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <form
        className="flex flex-col justify-center border-black border px-10 py-20 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center font-bold">Register</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
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
