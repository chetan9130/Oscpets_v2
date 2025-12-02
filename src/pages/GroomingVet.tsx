import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

const VetsOnly = () => {
  const [vets, setVets] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const vetsRef = ref(db, "vets");

    onValue(vetsRef, (snapshot) => {
      const data = snapshot.val();
      const list = data
        ? Object.keys(data).map((id) => ({
            id,
            ...data[id],
          }))
        : [];
      setVets(list);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Book Veterinary Doctor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vets.map((vet) => (
          <div
            key={vet.id}
            className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition"
          >
            <img
              src={vet.image}
              alt={vet.name}
              className="w-full h-40 object-cover rounded-xl"
            />

            <h2 className="text-xl font-bold mt-3">{vet.name}</h2>
            <p className="text-sm text-gray-600">
              {vet.specialization}
            </p>
            <p className="text-sm text-gray-600">
              {vet.location}
            </p>
            <p className="text-green-600 font-bold">
              ₹{vet.fee}
            </p>

            <button
              onClick={() => navigate(`/book/${vet.id}`)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetsOnly;
