import { useState, useEffect} from 'react';
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
    const [searchTerm, setSearchTerm] = useState('');
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

    // Seach bar handler
    const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/movies?search=${searchTerm}`);
            setSearchTerm('');
        }
    }

    // Previous and Next button handlers
    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    };

    // Get 5 visible movies based on the current index
    const getVisibleMovies = () => {
        if (movies.length === 0) return [];
        const visible = [];
        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + movies.length) % movies.length;
            visible.push({
                movie: movies[index],
                position: i,
            });
        }
        return visible;
    }

    // This will be used to assign a class to the card based on its position in the carousel
    const getCardClass = (position: number) => {
        if (position === 0) return 'featured';
        if (position === -1 || position === 1) return 'side-near';
        return 'side';
    };

    // This will be used to modify the width of a card based on its position in the carousel
    const getCardWidth = (position: number) => {
        if (position === 0) return '230px';
        if (position === -1 || position === 1) return '200px';
        return '160px';
    }

    if (loading) {
        return (
            <div className="carousel-container">
                <div className="container">
                    <div className="text-center text-white py-5">
                        <p>Loading top movies...</p>
                    </div>   
                </div>
            </div>
        );
    }

    if (movies.length === 0) {
        return (
            <div className="carousel-container">
                <div className="container">
                    <div className="text-center text-white py-5">
                        <p>No movies available</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="carousel-container">
            <div className="container">
                {/* <div className="carousel-search-wrapper">
                    <form className="carousel-search-form" onSubmit={handleSearch}>
                        <input
                            className="form-control search-input"
                            type="search"
                            placeholder="Search for movies"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-light search-btn" type="submit">
                            🔎︎
                        </button>
                    </form>
                </div> */}
                <div className="movie-carousel">
                    <button className="carousel-arrow" onClick={handlePrevious} aria-label="Previous movie">◂</button>
                    <div className="carousel-track">
                        {getVisibleMovies().map(({ movie, position }, idx) => (
                            <div
                                key={idx}
                                className={`movie-card ${getCardClass(position)}`}
                                style={{
                                    flex: `0 0 ${getCardWidth(position)}`,
                                    zIndex: position === 0 ? 10 : 5 - Math.abs(position)
                                }}
                            >
                                <img
                                    src={movie.PosterURL}
                                    alt={movie.Title}
                                />
                                {position === 0 && (
                                    <div className="movie-info">
                                        <h4>{movie.Title}</h4>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="carousel-arrow" onClick={handleNext} aria-label="Next movie">▸</button>
                </div>
            </div>
        </div>
    )
}