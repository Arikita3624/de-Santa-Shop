import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2025-06-01T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft(distance);

      if (distance <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="w-full bg-black text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white">DEAL 50%</h2>
      <p className="text-gray-300 mt-2 text-center">
        Fashion-shop summer collection sale from 35% to 50% off
      </p>
      <div className="flex space-x-4 mt-6">
        {[{ label: "Day", value: days }, { label: "Hour", value: hours }, { label: "Minute", value: minutes }, { label: "Second", value: seconds }].map(
          (item, index) => (
            <div key={index} className="bg-white text-black text-center p-4 rounded-lg w-24">
              <span className="text-2xl font-bold">{item.value}</span>
              <p className="text-xs font-semibold mt-1">{item.label}</p>
            </div>
          )
        )}
      </div>
      <button className="mt-6 bg-yellow-400 text-black px-6 py-2 font-bold rounded-lg shadow-lg">
        See All
      </button>
    </div>
  );
};

export default CountdownTimer;
