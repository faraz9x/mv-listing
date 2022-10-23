import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TopSlider from '../TopSlider/TopSlider'
import MoviesList from '../MovieList/MoviesList'

function Home() {
    return (
        <div>
            <TopSlider/>

            <SearchBar/>

            <MoviesList title="Movies"/>

        </div>
    )
}

export default Home
