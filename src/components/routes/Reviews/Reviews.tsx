import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { Review } from '../../../types/Review';
import './Reviews.css'

export default function Review() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/reviews/all`);
                const data = await res.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="reviews-page">
                <div className="container py-5">
                    <h1 className="page-title">All Reviews</h1>
                    <p>Loading reviews...</p>
                </div>
            </div>
        );
    }

    return (
            <div className="reviews-page">
                <div className="container py-5">
                    <h1 className="page-title">All Reviews</h1>
                    <p className="reviews-review-count">{reviews.length} published review{reviews.length !== 1 ? 's' : ''}</p>

                    {reviews.length === 0 ? (
                        <div className="no-reviews">
                            <p>No reviews published yet.</p>
                        </div>
                    ) : (
                        <div className="review-grid">
                            {reviews.map(review => (
                                <Link
                                    key={review.Id}
                                    to={`/details/${review.MovieId}`}
                                    className="review-card-link"
                                >
                                    <div className="reviews-review-card">
                                        {/* Movie poster */}
                                        <div className="reviews-review-poster">
                                            <img src={review.MoviePosterURL} alt={review.MovieTitle} />
                                        </div>

                                        {/* Review content */}
                                        <div className="reviews-review-content">
                                            <div className="reviews-review-header">
                                                <h3 className="reviews-movie-title">{review.MovieTitle}</h3>
                                                <div className="review-rating-large">
                                                    {review.Rating}/5
                                                </div>
                                            </div>

                                            <div className="review-meta">
                                                <span className="reviewer">By {review.ReviewerName}</span>
                                                <span className="reviews-review-date">{formatDate(review.PublishedDate)}</span>
                                            </div>

                                            <p className="review-excerpt">
                                                {review.ReviewText.length > 200
                                                ? `${review.ReviewText.substring(0, 200)}...`
                                            : review.ReviewText}
                                            </p>

                                            <div className="read-more">
                                                Read full review {'>'}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
}