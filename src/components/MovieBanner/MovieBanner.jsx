import React from 'react'
import apiConfig from '../../config/apiConfig'
import './movie_banner.scss'
import { AiFillStar, AiOutlineClockCircle, AiTwotoneCalendar } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';

function MovieBanner({movie, className}) {
    const isDetail = useLocation().pathname.indexOf('movie/')>-1;

    
    
    const {imgBase,imgBaseSmall}= apiConfig;
    
    function truncateString(_string,_length) {
        return _string?.length > _length ? _string.substr(0, _length-1) + '...': _string
    }



    return (
        <div className={`banner_wrapper  ${className} ${(isDetail)?'isDetail':''}`}
            style={{
                backgroundImage: `url(${imgBase + movie?.backdrop_path})`,
            }}
        >
            <div className={`container banner`}>
                <Link to={`/movie/${movie?.id}`} style={{position:"relative", zIndex:"2"}}>
                    <div className="banner_content">
                        <h1 className="banner_title"> {movie?.title || movie?.name || movie?.original_name} </h1>
                        
                        <div className="banner_buttons">
                            <span className="star">{<AiFillStar/>}</span>
                            <span>{Math.round(movie?.vote_average)}</span>
                            <span><small>({movie?.vote_count})</small></span>
                            <span><AiTwotoneCalendar/></span>
                            <span>{movie?.release_date}</span>
                        </div>
                        <div className="banner_buttons">
                            {movie?.genres?.map((genre,indx) => {
                            return  <span key={indx} className="genres_item">{genre?.name}</span>
                            })
                            }

                        </div>
                        {(!isDetail) &&
                            <h2 className="banner_title">
                            {truncateString(movie?.overview, 150)}
                            </h2>
                        }

                        <div className="banner_fadeout"></div>

                    </div>
                </Link>
                <div className="poster">
                    <img src={imgBaseSmall + movie?.poster_path} alt="" />
                </div>
               
            </div>
            <div className="banner_overlay"></div>
        </div>
    )
}

export default MovieBanner
