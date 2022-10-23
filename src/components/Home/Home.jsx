import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import TopSlider from '../TopSlider/TopSlider'

function Home() {
    return (
        <div>
            <TopSlider/>

            <SearchBar/>

            <MovieList/>

        </div>
    )
}

export default Home
