import { useState } from "react";
import { db } from "../lib/firebase";
import { ref, push, set } from "firebase/database";

const AdminAddVet = () => {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    fee: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addVet = async () => {
    const newRef = push(ref(db, "vets"));

    await set(newRef, {
      ...form,
      fee: Number(form.fee),
    });

    alert("✅ Vet added to realtime DB");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Add Vet</h2>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
      ))}

      <button
        onClick={addVet}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Add Vet
      </button>
    </div>
  );
};

export default AdminAddVet;
