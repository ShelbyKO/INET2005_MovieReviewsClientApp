import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import type { Movie } from "../../../types/Movie";
import "./Movies.css";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/movies`);
                const data = await res.json();
                setMovies(data);
                setFilteredMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Filter movies when the search query changes
    // useEffect(() => {
    //     if (searchQuery) {
    //         const filtered = movies.filter(movie =>
    //             movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setFilteredMovies(filtered);
    //     } else {
    //         setFilteredMovies(movies);
    //     }
    // }, [searchQuery, movies]);

    return (
        <div className="movies-page">
            <div className="container py-5">
                <div className="movies-header">
                    {searchQuery && (
                        <p className="search-info">
                            Showing results for: <strong>"{searchQuery}"</strong>
                            {filteredMovies.length === 0 && ' - No matches found'}
                        </p>
                    )}
                </div>

                {filteredMovies.length === 0? (
                    <div className="no-results">
                        <p>No movies found.</p>
                        <Link to="/movies" className="btn btn-primary">
                            View All Movies
                        </Link>
                    </div>
                ) : (
                    <div className="movies-grid">
                        {filteredMovies.map(movie => (
                            <Link
                                key={movie.Id}
                                to={`/details/${movie.Id}`}
                                className="movie-grid-item"
                            >
                                <div className="movie-poster-wrapper">
                                    <img
                                        src={movie.PosterURL}
                                        alt={movie.Title}
                                        className="movie-poster"
                                    />
                                    <div className="movie-overlay">
                                        <div className="movie-overlay-content">
                                            <h5>{movie.Title}</h5>
                                            <p className="genre-badge">{movie.Genre}</p>
                                            <p className="rating-badge">{movie.Rating}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-title">
                                    <p className="published-badge">Reviews: {movie.PublishedReviewCount}</p>
                                    <p className="average-rating-badge">Rating: {movie.AverageRating}/5</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )

}