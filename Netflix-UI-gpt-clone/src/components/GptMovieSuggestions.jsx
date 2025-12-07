import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gemini);

  // If there are no names, don't render anything
  if (!movieNames) return null;

  return (
    <div className="mt-8 mx-auto w-[90%] md:w-[80%] bg-black/70 text-white p-6 rounded-xl backdrop-blur-md">
      
      <div className="flex flex-col gap-8">
      
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName} // Ensure movieResults[index] actually contains movies
            movies={movieResults[index]}
          />
        ))}
  
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
