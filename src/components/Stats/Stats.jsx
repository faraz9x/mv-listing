import React, { useEffect, useRef, useState } from 'react';
import Chart from './Chart'
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncTopMovies, getTopMovies } from '../../store/mainSlice';


function Stats() {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAsyncTopMovies());
        return () => {
            //cleanup
        }
    }, [dispatch])
    
    const movies = useSelector(getTopMovies);// [];

    const sample1 = movies?.slice(0,10).map((m) => {
        return {movie:m.title, value: m.vote_average}
    });
    
    const sample2 = movies?.slice(0,10).map((m) => {
        return {movie:m.title, value: m.vote_count}
    })


    return (
        <div className="container">
            <div className="stats">
                <div className="chart">
                    <h1 className="styled_heading">Top Rated Movies</h1>
                    <Chart chartData={sample1}/>
                </div>
                <div className="chart">
                    <h1 className="styled_heading">Most Rated Movies</h1>
                    <Chart chartData={sample2}/>
                </div>                
            </div>
        </div>
    )
}

export default Stats
