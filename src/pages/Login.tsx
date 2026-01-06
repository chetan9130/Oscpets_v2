import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";

const Login: React.FC = () => {
  const [phone, setPhone] = useState("");
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
      const res = await axios.post("/login", {
        phone,
        password,
      });

      if (res.data.success) {
        setSuccess("Login successful! Redirecting...");

        localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-purple-100 to-pink-100 px-4">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg px-10 py-12">
          <div className="flex justify-center mb-4">
            <img
              src="/lovable-uploads/3927147b-bff0-46d6-b1bb-8df967d67e53.png"
              alt="OSCPETS"
              className="h-12"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
            Welcome Back
          </h2>

          {error && <p className="text-red-600 text-center mb-3">{error}</p>}
          {success && <p className="text-green-600 text-center mb-3">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              required
              className="w-full px-4 py-3 rounded-lg border bg-gray-50"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border bg-gray-50"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm">
            New here?{" "}
            <a href="/register" className="text-purple-600 font-semibold">
              Create an account
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
