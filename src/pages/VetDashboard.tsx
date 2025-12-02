import { useState } from "react";
import { db } from "../lib/firebase";
import { ref, set } from "firebase/database";

const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00"];

const VetDashboard = () => {
  const [vetId, setVetId] = useState("");
  const [date, setDate] = useState("");

  const createSlots = async () => {
    const slotsObj: any = {};
    timeSlots.forEach((t) => (slotsObj[t] = false));

    await set(ref(db, `vetSlots/${vetId}_${date}`), {
      vetId,
      date,
      slots: slotsObj,
    });

    alert("✅ Slots created (Realtime DB)");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Vet Slot Manager</h2>

      <input
        placeholder="Vet ID"
        onChange={(e) => setVetId(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      <button
        onClick={createSlots}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Create Slots
      </button>
    </div>
  );
};

export default VetDashboard;
