import apiConfig from './apiConfig'

const requestSuffix = `api_key=${apiConfig.TMDB_API_KEY}&language=${apiConfig.TMDB_Language}`;
const requests = {
    getGenre: "/genre/movie/list?include_adult=false&certification_country=US&certification.lte=PG-13&" + requestSuffix,
    getTopRated: "/movie/top_rated?" + requestSuffix,
    getTrending: "/trending/movie/week?" + requestSuffix,
    searchByText: "/search/movie?" + requestSuffix,
    getMovies: "/discover/movie/?with_watch_monetization_types=flatrate&include_adult=false&certification_country=US&certification.lte=PG-13&" + requestSuffix,
    // https://api.themoviedb.org/3/ discover/movie?include_adult=false&page=1&with_watch_monetization_types=flatrate
    getMovieDetail:"append_to_response=videos,images,credits&"+ requestSuffix, //the first part is set from middleware
    guestSession: "authentication/guest_session/new?"+ requestSuffix,
    submitRating: requestSuffix
    
}

export default requests;