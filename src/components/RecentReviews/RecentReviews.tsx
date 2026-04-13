import { useNavigate } from "react-router";
import type { Review } from "../../types/Review";
import './RecentReviews.css';
import { useState } from "react";
import { useEffect } from "react";


export default function RecentReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_HOST}/api/reviews/recent?limit=3`
                );
                const data = await res.json();
                console.log(data);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching recent reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    if (loading) {
        return (
            <div className="recent-reviews">
                <h2 className="mb-4">Recent Reviews</h2>
                <p className="text-muted">Loading reviews...</p>
            </div>
        );
    }
    
    if (reviews.length === 0) {
        return (
            <div className="recent-reviews">
                <h2 className="mb-4">Recent Reviews</h2>
                <p className="text-muted">No reviews yet</p>
            </div>
        )
    }

    return (
        <div className="recent-reviews">
            <h2 className="mb-4">Recent Reviews</h2>
            {reviews.map(review => (
                <div
                    key={review.Id}
                    className="review-card"
                    onClick={() => navigate(`/details/${review.MovieId}`)}
                >
                    <img
                        src={review.MoviePosterURL}
                        alt={review.MovieTitle}
                        className="review-poster"
                    />
                    <div className="review-content">
                        <h5 className="mb-1">{review.MovieTitle}</h5>
                        <p className="text-muted mb-2">Reviewed by {review.ReviewerName}</p>
                        <p className="review-excerpt mb-0">
                            "{review.ReviewText.substring(0, 100)}..."
                        </p>
                    </div>
                    <div className="review-rating">
                        {review.Rating}/5
                    </div>
                </div>
            ))}
        </div>
    );
}