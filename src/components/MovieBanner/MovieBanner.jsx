import React from 'react'
import apiConfig from '../../config/apiConfig'

function MovieBanner({movie, className}) {

    const {imgBase,imgBaseSmall}= apiConfig;
    
    function truncateString(_string,_length) {
        return _string?.length > _length ? _string.substr(0, _length-1) + '...': _string
    }

    return (
        <div className={`banner_wrapper  ${className}`}
            style={{
                backgroundImage: `url(${imgBase + movie?.backdrop_path})`,
            }}
        >
            <div className="container banner">
                <div className="banner_content">
                    <h1 className="banner_title"> {movie.title || movie.name || movie.original_name} </h1>
                    <h2 className="banner_title">
                        {truncateString(movie.overview, 150)}
                    </h2>
                    <div className="banner_buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">Favorite</button>
                    </div>

                    <div className="banner_fadeout"></div>

                </div>
                <div className="poster">
                    <img src={imgBaseSmall + movie.poster_path} alt="" />
                </div>
               
            </div>
            <div className="banner_overlay"></div>
        </div>
    )
}

export default MovieBanner
