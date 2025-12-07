import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addnowplayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const NowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const dispatch = useDispatch();
  const nowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addnowplayingMovies(json.results));
  };
  useEffect(() => {
    if (!NowPlayingMovies) {
      nowPlayingMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useNowPlayingMovies;
