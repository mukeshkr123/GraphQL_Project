import { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import "./MoviesList.css"; // Import your CSS for styling.

const GET_ALL_MOVIES = gql`
  query Movies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const MoviesList = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const [showMovie, setShowMovie] = useState(false); // Track if a movie is fetched

  const { data: moviesData } = useQuery(GET_ALL_MOVIES);
  const [fetchMovie, { data, error }] = useLazyQuery(GET_MOVIE_BY_NAME);

  const handleSearch = () => {
    if (movieSearched) {
      fetchMovie({
        variables: {
          name: movieSearched,
        },
      });
      setShowMovie(true);
    }
  };

  return (
    <>
      {moviesData && <h1>Total Movies: {moviesData.movies.length}</h1>}
      <div>
        <input
          type="text"
          placeholder="Search Movies...."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button onClick={handleSearch}>Fetch Movies</button>
      </div>
      {showMovie && (
        <div className="movies-list">
          {data && data.movie ? (
            <div>
              <h1 className="movie-name">Name: {data.movie.name}</h1>
              <p className="movie-year">
                Year of Publication: {data.movie.yearOfPublication}
              </p>
            </div>
          ) : error ? (
            <p>There was an error in fetching data</p>
          ) : (
            <p>No movie found with the provided name</p>
          )}
        </div>
      )}
    </>
  );
};

export default MoviesList;
