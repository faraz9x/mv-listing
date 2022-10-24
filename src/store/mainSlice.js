import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../config/axiosInstance';
import requests from "../config/requests";

export const getAsyncMovies = createAsyncThunk('movies/getAsyncMovies',
    async(searchText=false) => {
        let request = null;
        if (!searchText) {
             request = await axiosInstance.get(requests.getMovies);
        } else {
             request = await axiosInstance.get(`${requests.searchByText}&query=${searchText}`);
        }
        
        return request.data.results;
})
export const getAsyncTrendingMovies = createAsyncThunk('movies/getTopMovies',
    async() => {
        const request = await axiosInstance.get(requests.getTrending);
        
        return request.data.results;
})

export const getAsyncMovieDetail = createAsyncThunk('movies/getAsyncMovieDetail',
    async(id) => {
        alert();
        const request = await axiosInstance.get(`movie/${id}?${requests.getMovieDetail}`);
                
        return request.data;
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
    },
    reducers:{
        clearMovieDetail: (state) => {
            state.movieDetail = {};
        },
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


        [getAsyncMovieDetail.pending]: (state) => {
          return { ...state, detailFetchStatus:1 };
        },
        [getAsyncMovieDetail.fulfilled]: (state, { payload }) => {
          return { ...state,movieDetail:payload, detailFetchStatus:2 };
        },
        [getAsyncMovieDetail.rejected]: (state) => {
          return { ...state, detailFetchStatus:3 };
        },

        
    }
})


export const getAllMovies = (state) => state.mainSlice.movies;
export const getMovieDetail = (state) => state.mainSlice.movieDetail;
export const getTrendingMovies = (state) => state.mainSlice.trendingMovies;
export const getMovieFetchStatus = (state) => state.mainSlice.movieFetchStatus;
export const getTrendingFetchStatus = (state) => state.mainSlice.trendingFetchStatus;
export const { clearMovieDetail } = mainSlice.actions;
export default mainSlice;