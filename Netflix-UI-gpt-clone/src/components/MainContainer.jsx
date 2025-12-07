import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackGround from "./VideoBackGround";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  //if (movies) return null ;
  if (!movies) return <h2>loading ....</h2>;
  const mainMovie = movies[6];

  const { original_title, overview, id } = mainMovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={original_title} description={overview} />
      <VideoBackGround movieID={id} />
    </div>
  );
};

export default MainContainer;
