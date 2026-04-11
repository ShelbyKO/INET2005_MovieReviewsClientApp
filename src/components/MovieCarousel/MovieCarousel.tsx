import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router';
import type { Movie } from '../../types/Movie';
import './MovieCarousel.css';

// embla-carousel.com has some pretty neat carousel examples,
// This component's code is adapted from a combination (Scale, Opacity, Sliders Per View) of exampels
// https://www.embla-carousel.com/docs/examples/predefined
export default function MovieCarousel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopMovies = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/movies/top-reviewed?limit=10`);
                const data = await res.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching top movies: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopMovies();
    }, []);

    return (
        <div className="carousel-container">
            <div className="container">
                <div className="movie-carousel">
                    <button className="carousel-arrow" aria-label="Previous movie">◂</button>
                    <div className="carousel-track">

                    </div>
                    <button className="carousel-arrow" aria-label="Next movie">▸</button>
                </div>
            </div>
        </div>
    )
}