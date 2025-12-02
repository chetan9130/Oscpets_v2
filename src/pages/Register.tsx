import React, { useState } from "react";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import bcrypt from "bcryptjs";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data && !res.data.error) {
        setSuccess("Registration successful! Redirecting to login...");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(res.data.error || "Registration failed.");
      }
    } catch (err: any) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
              Create an Account
            </motion.h2>
            <p className="text-center text-gray-600 text-sm mb-6">
              Start your journey with OSCPETS today 🐶🐱
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
            <motion.div
              className="flex flex-col md:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
                required
              />
            </motion.div>

            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              required
            />
            <motion.input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              required
            />

            <motion.button
              type="submit"
              className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition duration-200 disabled:opacity-50 shadow-md"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
            >
              {loading ? "Registering..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
