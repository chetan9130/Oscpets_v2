import React from "react";

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    price: "₹899",
    image: "/lovable-uploads/Dog.png",
  },
  {
    id: 2,
    name: "Cat Toy",
    price: "₹299",
    image: "/lovable-uploads/Cat.jpg",
  },
  {
    id: 3,
    name: "Pet Shampoo",
    price: "₹499",
    image: "/lovable-uploads/shampoo.png",
  },
];

const PetStore = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Pet Products Store</h1>
      <p className="text-gray-700 mb-4">
        Browse a wide range of pet food, toys, grooming kits, and other essentials.
      </p>
      <p className="mb-6">Cart & checkout system with UPI and delivery coming soon.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-100 h-45 object-cover mx-auto mb-6 rounded"
            />
            <h2 className="text-xl font-semibold text-center">{product.name}</h2>
            <p className="text-center text-green-700 font-medium mb-2">{product.price}</p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Buy Now
              </button>
              <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetStore;
