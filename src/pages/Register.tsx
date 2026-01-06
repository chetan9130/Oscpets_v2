import React, { useState } from "react";
import axios from "../lib/axios";
import { motion } from "framer-motion";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /\S+@\S+\.\S+/.test(email);

  const validatePhone = (phone: string) =>
    /^[6-9]\d{9}$/.test(phone); // Indian mobile validation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName || !lastName || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      if (res.data?.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setPassword("");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        setError(res.data?.error || "Registration failed.");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          "Registration failed. Please try again."
      );
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
        <motion.div
          className="backdrop-blur-md bg-white/80 rounded-3xl shadow-lg px-10 py-12"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src="/lovable-uploads/3927147b-bff0-46d6-b1bb-8df967d67e53.png"
              alt="OSCPETS Logo"
              className="h-10 md:h-12"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2">
            Create an Account
          </h2>

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
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-purple-300"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-purple-300"
              required
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-purple-300"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-purple-300"
              required
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-50"
              whileTap={{ scale: 0.97 }}
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
