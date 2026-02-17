import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
    <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 border border-white/20">
      
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
       <input
  type="email"
  placeholder="Email Address"
  required
  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  required
  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
  onChange={(e) => setPassword(e.target.value)}
/>


        <button
          type="submit"
          className="w-full bg-white text-blue-700 font-semibold p-3 rounded-lg hover:bg-blue-100 transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="text-white text-sm text-center mt-5">
        Don’t have an account?{" "}
        <Link to="/register" className="font-semibold underline">
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
