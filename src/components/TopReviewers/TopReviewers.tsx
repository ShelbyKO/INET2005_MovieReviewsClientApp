import { useState, useEffect } from 'react';
import type { Reviewer } from '../../types/Reviewer';
import './TopReviewers.css'

export default function TopReviewers() {
    const [reviewers, setReviewers] = useState<Reviewer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_HOST}/api/reviewers/top?limit=0`
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

    if (reviewers.length === 0) {
        return (
            <div className="top-reviewers">
                <h2 className="mb-4">Top Reviewers</h2>
                <p className="text-muted">No reviewers yet.</p>
            </div>
        );
    }
}