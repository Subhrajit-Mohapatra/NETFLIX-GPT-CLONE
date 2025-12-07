import React, { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { HeartIcon } from "lucide-react";

const MovieCard = ({ poster }) => {
  const [liked, setLiked] = useState(false);
  const handelLike = () => {
    setLiked(!liked);
  };

  if (!poster) return null;

  return (
    <div className="relative w-36 md:w-48 pr-4 group">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + poster}
        className="rounded-lg shadow-md"
      />

      <div
        className="absolute top-2 right-6 bg-black/50 p-1 rounded-full cursor-pointer 
                   text-white hover:text-red-500 hover:scale-110 
                   transition-all duration-200 z-10"
        onClick={handelLike}
      >
        <HeartIcon
          size={20}
          fill={liked ? "red" : "none"}
          stroke={liked ? "red" : "white"}
        />
      </div>
    </div>
  );
};

export default MovieCard;
