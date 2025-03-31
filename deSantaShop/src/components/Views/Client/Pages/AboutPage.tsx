import React from 'react'


const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        About Us
      </h1>

      <p className="text-gray-600 text-lg text-center mb-8">
        Welcome to our website! We are committed to providing the best service for our customers.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <img
          src="https://source.unsplash.com/500x300/?team,office"
          alt="About Us"
          className="rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            We strive to provide high-quality products/services and deliver an exceptional customer experience.
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mb-4">Core Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Integrity and Quality</li>
            <li>Customer-Centric</li>
            <li>Innovation and Creativity</li>
            <li>Sustainable Development</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
