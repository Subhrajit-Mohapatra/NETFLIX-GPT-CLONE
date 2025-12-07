import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
  name:'movies',
  initialState:{
    nowPlayingMovies:null,
    trailerVideo:null,
    popularMovies:null,
    upcomingMovies:null,
    trendingMovies:null,
    popularTvSeries:null,
  },
  reducers:{
    addnowplayingMovies:(state,action)=>{
        state.nowPlayingMovies=action.payload;
    },
    addpopularMovies:(state,action)=>{
           state.popularMovies=action.payload;
    },
    addupcomingMovies:(state,action)=>{
           state.upcomingMovies=action.payload;
    },
    addtrendingMovies:(state,action)=>{
           state.trendingMovies=action.payload;
    },
    addtrailerVideo:(state,action)=>{
      state.trailerVideo=action.payload;
    },
     addpopularTvSeries:(state,action)=>{
      state.popularTvSeries=action.payload;
    },
  }

})
export const{addnowplayingMovies,addtrailerVideo,addpopularMovies,
           addupcomingMovies,addtrendingMovies,addpopularTvSeries
}=movieSlice.actions;
export default movieSlice.reducer;