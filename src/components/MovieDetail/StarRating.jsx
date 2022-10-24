import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGuestSession, createGuestSession, submitRating, getRatedMovie,addRatedMovie, removeRatedCache } from "../../store/mainSlice";
import './movie_detail.scss';

const StarRating = ({movieid}) => {
    const [rating, setRating] = useState(false);
    const [hover, setHover] = useState(0);

    const dispatch = useDispatch();
    const storeRatedMovie = useSelector(getRatedMovie);
    // console.log("storerated",storeRatedMovie);

    const getRatedMovies = function (params) {
    const rm = JSON.parse(localStorage.getItem("ratedMovies")||"[]");
    console.log("rmmm",rm,movieid);
    const _ratedMovie = rm.find(x=> x.id==movieid) || false
    if(_ratedMovie){
        console.log("addiiing stuff");
        dispatch(addRatedMovie(_ratedMovie));
        setRating(_ratedMovie.stars)
    }    
  }

  useEffect(() => {
    dispatch(createGuestSession());
    getRatedMovies();
      return () => {
        dispatch(removeRatedCache())
      }
  }, [dispatch]);

  useEffect(() => {
        getRatedMovies();
        return () => {
        dispatch(removeRatedCache())
        }
  }, [])



  function submitRatingHandler() {
    dispatch(submitRating({id:movieid,stars:rating}));
  }

//   const starsArray

  return (
    <div className="star_rating">
    <h1 className="styled_heading">{(!storeRatedMovie)? 'Rate This Movie':'You Rated this movie '}</h1>
    <div className="star_buttons">
      {[...Array(10)].map((star, index) => {
        index += 1;
        return (
            
            <button
                type="button"
                key={index}
                className={ (index <= (hover || rating) )? "on" : "off"}
                onClick={() => setRating(index)}
                
            >
                <span className="star rating_star">&#9733;</span>
            </button>

            
        );
      })}
      {/* onMouseEnter={() => setHover(index)}
      onMouseLeave={() => setHover(rating)} */}
      </div>
    {(!storeRatedMovie) &&
        <button className="rating_submit_button" onClick={submitRatingHandler}>
            Submit Rating 
        </button>
    }

    </div>
  );
};

export default StarRating;
