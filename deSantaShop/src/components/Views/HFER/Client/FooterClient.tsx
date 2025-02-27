import React from 'react';

const FooterClient = () => {
  return (
    <div className="bg-black bg-opacity-90 text-white">
      {/* Newsletter */}
      <div className="container mx-auto text-center py-10">
        <h3 className="text-3xl font-bold">Register for our newsletter</h3>
        <h4 className="text-lg font-light">Get voucher 15% when you sign up</h4>
        <div className="flex justify-center mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-1/3 px-6 py-3 text-black placeholder-gray-600 border border-white focus:outline-none rounded-l-full"
          />
          <button className="bg-white text-black font-semibold px-8 py-3 rounded-r-full hover:bg-gray-300">
            Follow
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <footer className="bg-white text-gray-800 py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 text-center md:text-left">
          {/* About Us */}
          <div>
            <h5 className="font-semibold mb-4">About Us</h5>
            <p className="text-sm">Address: London</p>
            <p className="text-sm">Hotline: (+84) 3 888 888</p>
            <p className="text-sm">Email: example.com</p>
          </div>

          {/* Trends */}
          <div>
            <h5 className="font-semibold mb-4">Trends</h5>
            <p className="text-sm">Promotional Products</p>
            <p className="text-sm">Featured Products</p>
            <p className="text-sm">All Products</p>
          </div>

          {/* Open */}
          <div>
            <h5 className="font-semibold mb-4">Open</h5>
            <p className="text-sm">Monday - Saturday</p>
            <p className="text-sm">Morning 08:00 - Afternoon 17:00</p>
          </div>

          {/* Album */}
          <div>
            <h5 className="font-semibold mb-4">ALBUM</h5>
            <div className="grid grid-cols-3 gap-2">
              <img src="#" alt="image1" className="w-full h-16 object-cover rounded-md" />
              <img src="#" alt="image2" className="w-full h-16 object-cover rounded-md" />
              <img src="#" alt="image3" className="w-full h-16 object-cover rounded-md" />
              <img src="#" alt="image4" className="w-full h-16 object-cover rounded-md" />
              <img src="#" alt="image5" className="w-full h-16 object-cover rounded-md" />
              <img src="#" alt="image6" className="w-full h-16 object-cover rounded-md" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="my-6 border-gray-300" />
        <div className="text-center text-sm text-gray-600">
          <p>Copyright &copy; 2025 de Santa Shop</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterClient;
