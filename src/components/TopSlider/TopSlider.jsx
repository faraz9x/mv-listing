import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncTrendingMovies, getTrendingFetchStatus, getTrendingMovies } from '../../store/mainSlice';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './topSlider.scss'
import Skeleton from '../LoadingSkeleton/Skeleton';
import MovieBanner from '../MovieBanner/MovieBanner';

function TopSlider() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsyncTrendingMovies());
        return () => {
            //cleanup
        }
    }, [dispatch])

    const topMovies = useSelector(getTrendingMovies)?.slice(0,4);// [];
    const trendingFetchStatus = useSelector(getTrendingFetchStatus)

    return (
        <div> 
            {(trendingFetchStatus===0 || trendingFetchStatus===1) &&
                (<>                
                    <Skeleton _width="100%" _height="55vh"/>
                </>)
            }
            {(trendingFetchStatus===2) &&
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
                                <MovieBanner movie={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            
            }       
        </div>
    )
}


export default TopSlider
