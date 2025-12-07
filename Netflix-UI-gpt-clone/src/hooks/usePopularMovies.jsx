import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const popular = useSelector((store) => store.movies.popularMovies);
  const dispatch = useDispatch();
  const popularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addpopularMovies(json.results));
  };
  useEffect(() => {
    if (!popular) {
      popularMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePopularMovies;
