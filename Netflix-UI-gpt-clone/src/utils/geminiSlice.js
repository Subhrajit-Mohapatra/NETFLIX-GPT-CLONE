import { createSlice } from "@reduxjs/toolkit";

const geminiSlice=createSlice({
   name:'gemini',
   initialState:{
      showPage:false,
      movieResults:null,
      movieNames:null,
   },
   reducers:{
      toggleGeminiSearch:(state)=>{
           state.showPage=!state.showPage;
      },
      addgeminiMovies:(state,action)=>{
         const{movieNames,movieResults}=action.payload;   
             state.movieNames=movieNames;
             state.movieResults=movieResults
      }
   }
});
export const {toggleGeminiSearch,addgeminiMovies}=geminiSlice.actions;
export default geminiSlice.reducer;