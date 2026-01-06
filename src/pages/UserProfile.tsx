import Header from "@/components/Header";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  phone?: string;
}


const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return <p className="p-8">Please login to view profile</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Header />
    <br /><br />
      <h1 className="text-3xl font-bold">👤 My Profile</h1>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 space-y-3">
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
       
        <p>
          <strong>Phone:</strong> {user.phone ?? "Not provided"}
        </p>
        <button
                className="bg-red-600 text-white px-3 py-1 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
          
              <button
                className="bg-red-600 text-white px-3 py-1 rounded"
               
              >
                Logout
              </button>


      </div>
    </div>
  );
};

export default UserProfile;
