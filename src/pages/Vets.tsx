import React, { useState } from "react";

const Vets = () => {
  const [form, setForm] = useState({
    name: "",
    petType: "",
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can send this data to Firebase, backend, etc.
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Book a Vet Appointment</h1>

      {submitted ? (
        <div className="text-green-700 font-medium text-center">
          Appointment booked successfully for {form.date} at {form.time}!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <select
            name="petType"
            value={form.petType}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Bird">Bird</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default Vets;
