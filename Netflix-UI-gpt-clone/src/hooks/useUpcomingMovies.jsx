import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addupcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const upcomig = useSelector((store) => store.movies.upcomingMovies);
  const dispatch = useDispatch();
  const upcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addupcomingMovies(json.results));
  };
  useEffect(() => {
    if (!upcomig) {
      upcomingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUpcomingMovies;
