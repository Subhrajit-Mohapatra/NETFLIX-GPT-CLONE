import React, { useEffect } from "react";
import { addtrendingMovies } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies = () => {
  const trending = useSelector((store) => store.movies.trendingMovies);
  const dispatch = useDispatch();
  const trendingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addtrendingMovies(json.results));
  };
  useEffect(() => {
    if (!trending) {
      trendingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTrendingMovies;
