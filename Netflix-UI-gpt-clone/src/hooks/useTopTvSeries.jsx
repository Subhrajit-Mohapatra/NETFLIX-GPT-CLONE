import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";;
import { API_OPTIONS } from "../utils/constants";
import { addpopularTvSeries} from "../utils/movieSlice";

const useTopTvSeries = () => {
  const tvSeries= useSelector((store) => store.movies.popularTvSeries);
  const dispatch = useDispatch();
  const topTvSeries = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    
    dispatch(addpopularTvSeries(json.results));
  };
  useEffect(() => {
    if (!tvSeries) {
      topTvSeries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTopTvSeries;
