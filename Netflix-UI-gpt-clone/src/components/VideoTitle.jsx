import { Info, Play } from "lucide-react";
import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black/80">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-shadow">
        {title}
      </h1>

      <p className="hidden md:inline-block py-4 text-lg w-1/3 leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex space-x-4">
        <button
          className="flex items-center gap-2 
                     bg-white text-black font-bold 
                     py-2 md:py-3 px-6 md:px-8 text-lg 
                     rounded-lg 
                     transition duration-200 
                     hover:bg-opacity-70"
        >
          <Play size={24} fill="black" /> Play
        </button>

        <button
          className="hidden md:flex items-center gap-2 
                     bg-gray-600 text-white font-semibold 
                     py-2 md:py-3 px-6 md:px-8 text-lg 
                     bg-opacity-70 rounded-lg 
                     transition duration-200 
                     hover:bg-opacity-50"
        >
          <Info size={24} /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
