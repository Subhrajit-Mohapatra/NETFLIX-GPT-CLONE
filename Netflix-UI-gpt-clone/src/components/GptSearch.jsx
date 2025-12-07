import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL, LOGO } from "../utils/constants";

const GptSearch = () => {
  return (
    // Add min-h-screen to this main div for content to stretch, 
    // and pt-[35%] is a common trick to push content down the screen 
    // (adjust this value based on desired position).
    <div className="min-h-screen"> 
      {/* Background Image Container - MUST be positioned absolutely/fixed */}
      <div className="fixed inset-0 overflow-hidden">
        <img
          src={BG_URL}
          alt="banner"
          className=" object-cover w-full h-full"
        />
      </div>

      {/* Content Layer (Search Bar and Suggestions) - Use z-10 for layering */}
      <div className="pt-40 md:pt-48 relative z-10"> 
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;