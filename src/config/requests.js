import apiConfig from './apiConfig'

const requestSuffix = `api_key=${apiConfig.TMDB_API_KEY}&language=${apiConfig.TMDB_Language}`;
const requests = {
    getGenre: "/genre/movie/list?include_adult=false&certification_country=US&certification.lte=PG-13&"+requestSuffix,
    getTopRated: "/movie/top_rated?"+requestSuffix,
    getTrending: "/trending/movie/week?"+requestSuffix,
    searchByText: "/search/movie?"+requestSuffix,
    getMovies: "/discover/movie/?with_watch_monetization_types=flatrate&include_adult=false&certification_country=US&certification.lte=PG-13&"+requestSuffix,
    // https://api.themoviedb.org/3/ discover/movie?include_adult=false&page=1&with_watch_monetization_types=flatrate
    getMovieDetail: requestSuffix, //the first part is set from middleware
}

export default requests;