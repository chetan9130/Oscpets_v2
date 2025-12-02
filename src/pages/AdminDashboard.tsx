import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Store,
  Stethoscope,
  LayoutDashboard,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-600">
          OSCPETS Admin
        </h2>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <LayoutDashboard /> Dashboard
          </button>

          <button
            onClick={() => navigate("/admin/agents")}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <Users /> Agents
          </button>

          <button
            onClick={() => navigate("/admin/sellers")}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <Store /> Sellers
          </button>

          <button
            onClick={() => navigate("/admin/vets")}
            className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-blue-600"
          >
            <Stethoscope /> Vets
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-600">Total Agents</h3>
            <p className="text-2xl font-bold text-blue-600">—</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-600">Total Sellers</h3>
            <p className="text-2xl font-bold text-green-600">—</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-600">Total Vets</h3>
            <p className="text-2xl font-bold text-purple-600">—</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
