import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageconstants";
import gemini from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addgeminiMovies } from "../utils/geminiSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handelSearch = async () => {
    const gptQuery =
      "You are a highly skilled movie recommendation assistant and suggest some movies for the query " +
      searchText.current.value +
      ". only give names nothing else, of 5 best movies, comma separated like the example given ahead. Example:Golmal,Padosan,Barfi,Kantara";
    const gptRes = await gemini.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: gptQuery,
    });
    const geminiMovies = gptRes.text
      .split(",") // split by comma
      .map((movie) => movie.trim());
    const promiseArr = geminiMovies.map((movies) => searchMovieTMDB(movies));
    const tmdbRes = await Promise.all(promiseArr);

    dispatch(
      addgeminiMovies({ movieNames: geminiMovies, movieResults: tmdbRes })
    );
  };

  return (
    <div className="flex justify-center">
      <form
        className="bg-gray-800/90 p-4 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-4 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] backdrop-blur-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="flex-grow px-5 py-3 rounded-md bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
        />
        <button
          className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold rounded-md transition-all duration-200 shadow-md"
          onClick={handelSearch}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
