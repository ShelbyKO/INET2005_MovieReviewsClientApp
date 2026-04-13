import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import type { MovieDetailsResponse } from "../../../types/MovieDetails";
import './MovieDetails.css';

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<MovieDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const starSVG = 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/movies/${id}`);

                if (!res.ok) {
                    setError(true);
                    return;
                }

                const movieData = await res.json();
                setData(movieData);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(true);
            } finally {
                setLoading(false)
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="movie-details-page">
                <div className="container py-5">
                    <p>Loading movie details...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="movie-details-page">
                <div className="container py-5">
                    <h2>Movie not found</h2>
                    <Link to="/movies" className="btn btn-primary mt-3">
                        Back to Movies
                    </Link>
                </div>
            </div>
        );
    }

    const { movie, reviews } = data;

    // Runtime formatter to convert minutes into hours, minutes 
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // date is received as a string, needs formatting
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="movie-details-page">
            <div className="container py-5">
                {/* Movie header */}
                <div className="movie-header">
                    <div className="movie-poster-large">
                        <img src={movie.PosterURL} alt={movie.Title} />
                    </div>

                    <div className="movie-info-section">
                        <h1>{movie.Title}</h1>
                        <div className="movie-meta">
                            <span className="badge bg-primary">{movie.Genre}</span>
                            <span className="badge bg-secondary">{movie.Rating}</span>
                            <span className="text-muted">{formatRuntime(movie.Runtime)}</span>
                            <span className="text-muted">{movie.ReleaseDate ? new Date(movie.ReleaseDate).getFullYear() : 'Unknown'}</span>
                        </div>

                        <div className="movie-ratings">
                            <div className="average-rating">
                                <div className="rating-number">
                                    {movie.AverageRating && movie.AverageRating > 0 ? movie.AverageRating?.toFixed(1) : 'N/A'}
                                    <span className="rating-max">/5</span>
                                </div>
                                {/* 
                                Played around with the star rating quite a bit, using generative AI as a small assist I was able to get my idea working
                                Gray stars exist in the background and are overlayed by a layer of gold stars. The width of the stars container is determined
                                based on the calculated Average rating of reviews. The overflow is then hidden to only show the gold stars.
                                */}
                                <div className="rating-stars-wrapper">
                                    <div className="rating-stars-empty">{'★'.repeat(5)}</div>
                                    <div className="rating-stars" style={{
                                        width: `${(movie.AverageRating && movie.AverageRating > 0
                                        ? (movie.AverageRating / 5) * 100
                                    : 0)}%`
                                    }}>{'★'.repeat(5)}</div>
                                </div>
                                <div className="rating-count">
                                    {movie.PublishedReviewCount} review{movie.PublishedReviewCount !== 1? 's' : ''}
                                </div>
                            </div>
                        </div>

                        <div className="movie-synopsis">
                            <h3>Synopsis</h3>
                            <p>{movie.Synopsis}</p>
                        </div>
                    </div>
                </div>

                {/* reviews */}
                <div className="reviews-section">
                    <h2>Reviews ({reviews.length})</h2>

                    {reviews.length === 0 ? (
                        <p className="text-muted">No reviews yet.</p>
                    ) : (
                        <div className="reviews-list">
                            {reviews.map(review => (
                                <div key={review.Id} className="review-item">
                                    <div className="review-header">
                                        <div>
                                            <h5 className="reviewer-name">{review.ReviewerName}</h5>
                                            <p className="review-date">{formatDate(review.PublishedDate)}</p>
                                        </div>
                                        <div className="review-rating-badge">
                                        {review.Rating}/5
                                        </div>
                                    </div>
                                    <p className="review-text">{review.ReviewText}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}