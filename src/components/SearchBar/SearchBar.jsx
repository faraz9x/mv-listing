import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAsyncMovies, getMovieFetchStatus } from '../../store/mainSlice';
import './search_bar.scss'
function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();

    const movieFetchStatus = useSelector(getMovieFetchStatus)
    
    const triggerSearch = (e) => {
        if (searchText === "") return alert("Please enter search term!");
        dispatch(getAsyncMovies(searchText));
        setSearchText("");
      };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropDown = () => {
        console.log("clickedd");
        setShowDropdown(showDropdown? false:true);        
    }

    const applySort = (params) => {
        console.log("selected");
    }

    return (
        <div className="container">
            <div class="centerbox">
                {/* <form id="" className="" method="post" style={{position:"relative"}}> */}
                    <div class="main-form-container">
                        <input type="text" className="main-input main-name" placeholder="Search by movie title"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        {/* <div className="form-actions"> */}
                            {/* <button type="button" className="main-btn" onClick={toggleDropDown}>
                                <p className="search-small">Sort By</p>
                                <p className="search-large">Default</p>
                                {showDropdown &&
                                    (<ul className="search-description">
                                        <li onClick={applySort}>Release Date</li>
                                        <li onClick={applySort}>Popularity</li>
                                    </ul>)}
                            </button> */}
                            <input type="button" id="main-submit" onClick={triggerSearch} value={movieFetchStatus==1?'Searching':'Search'} />
                        {/* </div>                      */}
                        
                    </div>
                {/* </form> */}
            </div>

            <button type="button" id="main-submit-mobile">Search</button>
        </div>
    )
}

export default SearchBar
