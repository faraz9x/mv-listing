import React from 'react'
import { Link } from 'react-router-dom';
import apiConfig from '../../config/apiConfig';
import './movie_card.scss'

function MovieCard({movie}) {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="movie_card">
                <div className="movie_thumbnail">
                    <img src={apiConfig.imgBaseSmall+movie.poster_path} alt=""/>
                </div>

                <div className="movie_info">
                    <h2>{movie.title}</h2>
                </div>

                <div className="movie_buttons">

                </div>
            </div>
        </Link>
    )
}

export default MovieCard
