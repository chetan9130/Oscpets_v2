import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";

import bcrypt from "bcryptjs";
const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      
      const result = await axios.post("http://localhost:3001/adminlogin", { email, password });
      setLoading(false);
      if (result.data.message === "Login successful") {
        setSuccess("Login successful! Redirecting to home...");
        const user = result.data.user;
        localStorage.setItem("admin", JSON.stringify(user));    
       setTimeout(() => {
        window.location.href = "/admindashboard";
       }, 2000);
      } else {
        setError(result.data.error || "Login failed. Please try again.");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-purple-100 to-pink-100 relative overflow-hidden px-4">
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="backdrop-blur-md bg-white/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-10 py-12"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/3927147b-bff0-46d6-b1bb-8df967d67e53.png" 
              alt="OSCPETS Logo" 
              className="h-10 md:h-12"
            />
          </div>
          <motion.h2
            className="text-3xl font-extrabold text-center text-purple-700 mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back!
          </motion.h2>
          <p className="text-center text-gray-600 text-sm mb-6">
            Ready for more pet adventures?
          </p>
          {error && (
            <div className="mb-4 text-center text-sm text-red-600 font-medium">
              {error}
            </div>
          )}
            {success && (
            <div className="mb-4 text-center text-sm text-green-600 font-medium">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-gray-600 text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="rounded border-gray-300 focus:ring-purple-300"
                />
                Remember me
              </label>
              <a href="#" className="text-purple-600 text-sm font-medium hover:underline">Forgot Password?</a>
            </div>
            <motion.button
              type="submit"
              className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition duration-200 disabled:opacity-50 shadow-md"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            New here?{' '}
            <a href="/register" className="text-purple-600 font-semibold hover:underline">
              Sign up for pawsome deals! 🐾
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
