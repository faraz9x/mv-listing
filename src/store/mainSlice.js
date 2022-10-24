import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../config/axiosInstance';
import GenreMapper from "../config/genre";
import requests from "../config/requests";

export const getAsyncMovies = createAsyncThunk('movies/getAsyncMovies',
    async(searchText=false) => {
        let request = null;
        if (!searchText) {
             request = await axiosInstance.get(requests.getMovies);
        } else {
             request = await axiosInstance.get(`${requests.searchByText}&query=${searchText}`);
        }
        const data =  request.data.results;
        data.map((d) => {
          if(d.genre_ids){
            d.genres = GenreMapper(d.genre_ids);
          }
        });       
        
        return data;
})
export const getAsyncTrendingMovies = createAsyncThunk('movies/getTrendingMovies',
    async() => {
        const request = await axiosInstance.get(requests.getTrending);
        const data =  request.data.results;

        data.map((d) => {
          if(d.genre_ids){
            d.genres = GenreMapper(d.genre_ids);
          }
        });     
          
        return data;
})

export const getAsyncTopMovies = createAsyncThunk('movies/getTopMovies',
    async() => {
        const request = await axiosInstance.get(requests.getTopRated);
        const data =  request.data.results;

        data.map((d) => {
          if(d.genre_ids){
            d.genres = GenreMapper(d.genre_ids);
          }
        });     
          
        return data;
})

export const getAsyncMovieDetail = createAsyncThunk('movies/getAsyncMovieDetail',
    async(id) => {
        
        const request = await axiosInstance.get(`movie/${id}?${requests.getMovieDetail}`);
        const data = request.data;
        if(data.genre_ids){
          data.genres = GenreMapper(data.genre_ids);
        }
        return data;
});


export const createGuestSession = createAsyncThunk('movies/createGuestSession',
    async(arg, { getState }) => {
        const state = getState();
        console.log("Checking", state.mainSlice.guestSession);
        if(typeof state.mainSlice.guestSession === 'object')
            return await setTimeout(() => {
              return state.guestSession;
            }, 200);

        const request = await axiosInstance.get(requests.guestSession);
        
        return request.data;
});

export const submitRating = createAsyncThunk('movies/submitRating',
    async({id,stars}) => {
        const gid = "b1e7f8840437d9dc5caaa4e850a2fa95";
        const request = await axiosInstance.post(`movie/${id}/rating?guest_session_id=${gid}&${requests.submitRating}`,
                                                  { "value": stars } );
        const data = request.data;

        if(data.success){
          const rm = JSON.parse(localStorage.getItem("ratedMovies")||"[]");
          rm.push({id,stars});
          localStorage.setItem("ratedMovies",JSON.stringify(rm));
          console.log("local",localStorage.getItem("ratedMovies"));
        }
        
        return {id,stars};
});

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState:{
        movies:[],
        movieFetchStatus:0,
        trendingMovies:[],
        trendingFetchStatus:0,
        topMovies:[],
        movieDetail:null,
        guestSession:false,
        ratedMovie:false,

    },
    reducers:{
        clearMovieDetail: (state) => {
            state.movieDetail = {};
        },
        addRatedMovie: (state, action)=>{
          console.log("ADDING RATED MOVIE");
          state.ratedMovie = action;
        },
        removeRatedCache: (state)=>{
          state.ratedMovie = false;
        }
    },
    extraReducers:{
        [getAsyncMovies.pending]:(state) => {
            console.log('Pending');
            return {...state, movieFetchStatus:1}
        },
        [getAsyncMovies.fulfilled]:(state,{payload}) => {
            console.log('Success');
            console.log(payload);
            return {...state, movies:payload, movieFetchStatus:2 }
        },
        [getAsyncMovies.rejected]:(state) => {
            console.log('Rejected');
            return {...state, movieFetchStatus:3}
        },


        [getAsyncTrendingMovies.pending]: (state) => {
          return { ...state, trendingFetchStatus:1};
        },
        [getAsyncTrendingMovies.fulfilled]: (state, { payload }) => {
          return { ...state, trendingMovies: payload,trendingFetchStatus:2 };
        },
        [getAsyncTrendingMovies.rejected]: (state) => {
          return { ...state, trendingFetchStatus:3 };
        },
        

        [getAsyncTopMovies.fulfilled]: (state, { payload }) => {
          return { ...state, topMovies: payload,trendingFetchStatus:2 };
        },

        [getAsyncMovieDetail.pending]: (state) => {
          return { ...state, detailFetchStatus:1 };
        },
        [getAsyncMovieDetail.fulfilled]: (state, { payload }) => {
          return { ...state,movieDetail:payload, detailFetchStatus:2 };
        },
        [getAsyncMovieDetail.rejected]: (state) => {
          return { ...state, detailFetchStatus:3 };
        },

        [createGuestSession.fulfilled]: (state, { payload }) => {
          return { ...state,guestSession:payload };
        },

        [submitRating.fulfilled]: (state, { payload }) => {
        
          return { ...state,ratedMovie:payload };
        },
        
    }
})


export const getAllMovies = (state) => state.mainSlice.movies;
export const getMovieDetail = (state) => state.mainSlice.movieDetail;
export const getTrendingMovies = (state) => state.mainSlice.trendingMovies;
export const getTopMovies = (state) => state.mainSlice.topMovies;
export const getMovieFetchStatus = (state) => state.mainSlice.movieFetchStatus;
export const getTrendingFetchStatus = (state) => state.mainSlice.trendingFetchStatus;
export const getGuestSession = (state) => state.mainSlice.guestSession;
export const getRatedMovie = (state) => state.mainSlice.ratedMovie;
export const { clearMovieDetail,addRatedMovie, removeRatedCache } = mainSlice.actions;
export default mainSlice;