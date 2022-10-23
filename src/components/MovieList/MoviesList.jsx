import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAsyncMovies } from '../../store/mainSlice';
import MovieCard from '../MovieCard/MovieCard';
import "./movie_row.scss";

function MoviesList({title}) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAsyncMovies());
        return () => {
            //cleanup
        }
    }, [dispatch])
    
    const movies = useSelector(getAllMovies);// [];

    return (
        <div className="container row_container">
            
            <h2>{title}</h2>
            <div className="movie_row">            
                {
                    movies.map((movie) => {
                        return(
                            <MovieCard movie={movie}/>
                        )
                    })
                }
            </div>
            
            
        </div>
    
    )
}

export default MoviesList
