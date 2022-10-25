import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies, getAsyncMovies, getMovieFetchStatus } from '../../store/mainSlice';
import Skeleton from '../LoadingSkeleton/Skeleton';
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
    const movieFetchStatus = useSelector(getMovieFetchStatus)

    return (
        <div className="container row_container">
            
            {/* <h2>{title}</h2> */}
            <div className="movie_row"> 
                {
                (movieFetchStatus==1) &&
                (<>                
                    <Skeleton _width="300px" _height="450px"/>
                    <Skeleton _width="300px" _height="450px"/>
                    <Skeleton _width="300px" _height="450px"/>
                    <Skeleton _width="300px" _height="450px"/>
                    <Skeleton _width="300px" _height="450px"/>
                    <Skeleton _width="300px" _height="450px"/>
                </>)
                }  
                {
                (movieFetchStatus==2) &&
                movies.map((movie,indx) => {
                    return(
                        <MovieCard movie={movie} key={indx}/>
                    )
                })
                }
            </div>
            
            
        </div>
    
    )
}

export default MoviesList
