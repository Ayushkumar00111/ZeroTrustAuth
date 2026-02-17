import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
    <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-96 border border-white/20">
      
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-white text-indigo-700 font-semibold p-3 rounded-lg hover:bg-indigo-100 transition duration-300"
        >
          Register
        </button>
      </form>

      <p className="text-white text-sm text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold underline">
          Login
        </Link>
      </p>
    </div>
  </div>
);

};

export default Register;
