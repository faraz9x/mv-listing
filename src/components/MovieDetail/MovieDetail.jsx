import React, { useEffect } from 'react'
import { AiFillDollarCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiConfig from '../../config/apiConfig';
import { getAsyncMovieDetail,getMovieDetail, clearMovieDetail} from '../../store/mainSlice';
import MovieBanner from '../MovieBanner/MovieBanner';
import './movie_detail.scss'
function MovieDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {imgBase,imgBaseSmall}= apiConfig;
    const movie = useSelector(getMovieDetail);
    useEffect(() => {
        dispatch(getAsyncMovieDetail(id));
        return () => {
          dispatch(clearMovieDetail())
        };
      }, [dispatch, id]);

    function truncateString(_string,_length) {
        return _string?.length > _length ? _string.substr(0, _length-1) + '...': _string
    }
    return (
        <div>
            <MovieBanner movie={movie} className="active"/>
            <div className="container">
            <div className="movie_detail">

              <div className="info">
                <h1 className="styled_heading">Overview</h1>
                <div className="movie_overview">
                  <p >
                      {truncateString(movie?.overview, 500)}
                  </p>
                </div>

                <h1 className="styled_heading">Cast</h1>
                <div className="movie_cast">
                  {
                    (movie?.credits?.cast)?.slice(0,8).map((c) => {
                      return (c.known_for_department==="Acting")&&
                      <>
                        <div style={{width:"200px"}}>
                          <img src={`${imgBaseSmall}${c.profile_path}`} />
                          <h4>{c.name}</h4>
                        </div>
                      </>
                    })
                  }
                  
                </div>          
              </div>

              <div className="numbers">
                  <div className="number">
                    <small>Play time </small>
                    <span>{movie?.runtime} Mins</span>
                  </div>
                  <div className="number">
                    <small>Release Date </small>
                    <span>{movie?.runtime} Mins</span>
                  </div>
                  <div className="number">
                    <small>Director </small>
                    <span>
                      {
                        (movie?.credits?.crew
                          .filter(x=> x.known_for_department==="Directing")[0]
                          .name)
                      }
                    </span>
                  </div>
                  <div className="number">
                    <small>Language </small>
                    <span>{movie?.original_language}</span>
                  </div>
              </div>
            </div>
            </div>

        </div>
    )
}

export default MovieDetail
