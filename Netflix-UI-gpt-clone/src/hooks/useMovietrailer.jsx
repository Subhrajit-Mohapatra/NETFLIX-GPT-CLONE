import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovietrailer = (MovieID) => {
  const movieTrailer = useSelector((store) => store.movies.trailerVideo);
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        MovieID +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter(
      (video) => video.type === "Trailer" && video.name === "Official Trailer"
    );
    const trailer = filterData[0];
    dispatch(addtrailerVideo(trailer));
  };
  useEffect(() => {
    if (!movieTrailer) {
      getMovieTrailer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMovietrailer;
