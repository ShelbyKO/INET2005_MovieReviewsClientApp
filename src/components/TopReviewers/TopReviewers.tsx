import { useState, useEffect } from 'react';
import type { Reviewer } from '../../types/Reviewer';
import './TopReviewers.css'

// A client facing Movie Review Web App By Shelby Oakes
// Updated: April 12, 2026

export default function TopReviewers() {
    const [reviewers, setReviewers] = useState<Reviewer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_HOST}/api/reviewers/top?limit=6`
                );
                const data = await res.json();
                setReviewers(data);
            } catch (error) {
                console.error('Error fetching top reviewers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewers();
    }, []);

    if (loading) {
        return (
            <div className="top-reviews">
                <h2 className="mb-4">Top Reviewers</h2>
                <p className="text-muted">Loading reviewers...</p>
            </div>
        );
    }
    if (reviewers.length === 0) {
        return (
            <div className="top-reviewers">
                <h2 className="mb-4">Top Reviewers</h2>
                <p className="text-muted">No reviewers yet.</p>
            </div>
        );
    }

    return (
        <div className="top-reviewers">
            <h2 className="top-reviewers">Top Reviewers</h2>
            <div className="reviewers-list">
                {reviewers.map((reviewer, index) => (
                    <div key={index} className="reviewer-item">
                        <span className="reviewer-name">{reviewer.Name}</span>
                        <span className="review-count">{reviewer.ReviewCount} Reviews</span>
                    </div>
                ))}
            </div>
        </div>
    );
}