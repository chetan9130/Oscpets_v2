import React, { useState } from "react";
import axios from "axios";

const AddAgent = () => {
  const [agent, setAgent] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    if (!agent.name || !agent.email || !agent.password) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/admin/add-agent", agent);
      setMessage("✅ Agent added successfully!");
      setAgent({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage("❌ Failed to add agent.");
    } finally {
      setLoading(false);
    }
  };
    const [preview, setPreview] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreview(URL.createObjectURL(file)); // Create temporary image URL
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Add Agent</h3>
        <div className="flex flex-col items-center">
      {/* Image Preview */}
      <img
        src={preview || "https://via.placeholder.com/150"} // fallback placeholder
        alt="Profile Preview"
        className="w-32 h-32 object-cover rounded-full border mb-4"
      />

      {/* File Input */}
      <input
        id="profile"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
        <input
          type="text"
          placeholder="Name"
          value={agent.name}
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={agent.email}
          onChange={(e) => setAgent({ ...agent, email: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={agent.password}
          onChange={(e) => setAgent({ ...agent, password: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {message && (
          <p
            className={`text-sm mb-4 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AddAgent;
