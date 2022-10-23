import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiConfig from '../../config/apiConfig'
import { getAsyncTopMovies, getTopMovies } from '../../store/mainSlice';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './topSlider.scss'

function TopSlider() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncTopMovies());
        return () => {
            //cleanup
        }
    }, [dispatch])

    const topMovies = useSelector(getTopMovies)?.slice(0,4);// [];

    return (
        <div>
        <Swiper
                modules={[Autoplay ]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 2000}}
                navigation
                pagination={{ clickable: true }}
        >
            {
                topMovies.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <SliderItem movie={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))
            }
        </Swiper>
        </div>
    )
}

function SliderItem({movie, className}) {

    const {imgBase,imgBaseSmall}= apiConfig;
      
    function truncateString(_string,_length) {
        return _string?.length > _length ? _string.substr(0, _length-1) + '...': _string
    }

    return (
        <div className={`hero-slide__item  ${className}`}
            style={{
                backgroundImage: `url(${imgBase + movie?.backdrop_path})`,
            }}
        >
            <div className="container top_slide">
                <div className="top_slide_content">
                    <h1 className="top_slide_title"> {movie.title || movie.name || movie.original_name} </h1>
                    <h2 className="top_slide_title">
                        {truncateString(movie.overview, 150)}
                    </h2>
                    <div className="top_slide_buttons">
                        <button className="top_slide_button">Play</button>
                        <button className="top_slide_button">Favorite</button>
                    </div>

                    <div className="top_slide_fadeout"></div>

                </div>
                <div className="poster">
                    <img src={imgBaseSmall + movie.poster_path} alt="" />
                </div>
               
            </div>
            <div className="top_slide_overlay"></div>
        </div>
    )
}
export default TopSlider
