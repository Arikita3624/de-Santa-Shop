import React from "react";

const ProductsClient = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 flex gap-6">
      <div className="w-1/4 p-4 border-r">
        <h3 className="text-2xl font-bold mb-4">Categories</h3>
        <div className="space-y-2 text-lg">
          <div className="cursor-pointer hover:text-blue-600">T-Shirt</div>
          <div className="cursor-pointer hover:text-blue-600">Shirt</div>
          <div className="cursor-pointer hover:text-blue-600">Hoodie</div>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h3 className="text-2xl font-bold mb-4">Products List</h3>
        <div className="grid grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <img
                src="https://via.placeholder.com/200"
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold mt-2">Product Name</h4>
              <p className="text-red-500 text-lg font-bold">200,000₫</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
