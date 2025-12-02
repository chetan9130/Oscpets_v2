import { motion } from "framer-motion";
import { useState } from "react";

const pets = [
  {
    id: 1,
    name: "Bruno",
    breed: "Golden Retriever",
    age: "2 years",
    location: "Pune",
    image: "/lovable-uploads/dog2.png",
  },
  {
    id: 2,
    name: "Milo",
    breed: "Persian Cat",
    age: "1 year",
    location: "Mumbai",
    image: "/lovable-uploads/Cat.jpg",
  },
];

const AdoptionMarketplace = () => {
  const [adoptedPet, setAdoptedPet] = useState<string | null>(null);

  const handleAdopt = (name: string) => {
    setAdoptedPet(name);
    setTimeout(() => setAdoptedPet(null), 3000); // hide after 3s
  };

  return (
    <div className="p-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Pet Adoption & Marketplace</h1>
        <p className="text-gray-700 mb-4">
          Explore pets up for adoption or list your own pets responsibly.
        </p>
        <p className="mb-6">
          Verified profiles, filters by breed, age, and location — all in one place.
        </p>
      </motion.div>

      {/* Pet Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <p className="text-gray-600">{pet.breed}</p>
            <p className="text-gray-500">{pet.age} • {pet.location}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleAdopt(pet.name)}
            >
              Adopt Now
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {adoptedPet && (
        <div className="fixed bottom-5 right-5 bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          🎉 You’ve chosen to adopt {adoptedPet}! We'll connect you with the current owner.
        </div>
      )}
    </div>
  );
};

export default AdoptionMarketplace;
