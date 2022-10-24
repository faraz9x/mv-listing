# Brief
This is a basic movie listing app consuming TMDB API and using Redux, RTK, React Router, D3 Chart and other tools useful for building React apps. 

# Screens
Home: 
On the top it has a slider which showcases every day's trending videos.
Then we have the main movie listing, which by default fetches current week's trending movies
On top of movie listing theres a search component which allows user to search for their desired movie
However, the results are limited to only first page, as pagination isnt implemented

Movie Details:
When we tap on a movie banner or card, we are taken to movie details screen.
Movie details screen shows movie info, overview and cast as well.
At the bottom we have the Review/Rating component through which user can submit their ratings
Once they submit a rating, the rating button goes away and their provided ratings are persister there using local storage and store values


Stats:
From the top right corner, we can use the chart link to go the stats screen.
This screen basically holds two charts, one is Top 10 Rated movies according to vote average, and other one is Top Rated movies acccording to the vote count.

# What could be be added or improved
Could improve TMDB implementation with sorting and filters,
Could improve D3 JS implementation
Could refactor redux and middleware code
UX improvements
Add more details in movie details page
React Router v5x was used in this implementation, however we can improve it to v6.4x to benefit from the new features
Pagination can be implemented
Filters and Sorting where possible can be added

SCSS: I used scss with this app but not to the real good effect, so we can try to implement it in its true essence
# TMDB API limitations
TMDB API comes with its own caveats and limitations.
Like when we are searching, it doesnt provide any sorting or filtering options, because of that, I could not implement sorting and filters with the search implementation.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run the project after installing dependencies, you can run:

### `npm start`


