import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { ref, onValue, update } from "firebase/database";

const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00"];

const VetBooking = ({ vetId }: { vetId: string }) => {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<any>({});

  useEffect(() => {
    if (!date) return;

    const slotRef = ref(db, `vetSlots/${vetId}_${date}`);

    const unsub = onValue(slotRef, (snap) => {
      if (snap.exists()) {
        setSlots(snap.val().slots);
      } else {
        setSlots({});
      }
    });

    return () => unsub();
  }, [date, vetId]);

  const bookSlot = async (time: string) => {
    const slotRef = ref(db, `vetSlots/${vetId}_${date}`);

    await update(slotRef, {
      [`slots/${time}`]: true,
    });

    alert("✅ Slot booked!");
    window.location.href = "/payment";
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((time) => (
          <button
            key={time}
            disabled={slots[time]}
            onClick={() => bookSlot(time)}
            className={`p-2 rounded ${
              slots[time]
                ? "bg-gray-400"
                : "bg-blue-600 text-white"
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VetBooking;
