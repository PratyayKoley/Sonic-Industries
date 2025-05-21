import { Star } from "lucide-react";

const Deals_Video = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Deal Of The Week
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Grab the best deal of the week on our Smart Watch. Limited time
            offer!
          </p>
        </div>
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-white">
            <img
              alt="Blue Smartwatch"
              className="max-w-full"
              src="/smartwatch3.png"
              style={{ transform: "scale(0.8)" }}
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="text-yellow-400 fill-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Smart Watch (blue)
            </h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              illo reiciendis saepe molestias veritatis!
            </p>
            <div className="flex items-center mb-6">
              <span className="text-4xl font-bold text-indigo-600 mr-3">
                $99
              </span>
              <span className="text-xl text-gray-500 line-through">$250</span>
            </div>
            <div className="flex justify-between mb-8">
              {[
                { value: "02", label: "Days" },
                { value: "23", label: "Hours" },
                { value: "59", label: "Minutes" },
                { value: "09", label: "Seconds" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center p-2 bg-gray-100 rounded w-20"
                  style={{ opacity: 1, transform: "none" }}
                >
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors cursor-pointer"
              style={{ transform: "scale(1.1)" }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals_Video;
