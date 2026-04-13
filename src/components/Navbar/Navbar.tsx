import { useState, useEffect} from 'react';
import {useNavigate } from 'react-router';
import { Link } from 'react-router';
import './Navbar.css';

// A client facing Movie Review Web App By Shelby Oakes
// Updated: April 12, 2026

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    // Seach bar handler
    const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/movies?search=${searchTerm}`);
            setSearchTerm('');
        }
    }

    return (
        <nav className="navbar-custom">
            <div className="container-fluid">
                <div className="navbar-content">
                    {/* Movie's button to the left */}
                    <div className="nav-left">
                        <Link to="/movies">
                            <button className="btn btn-outline-light">MOVIES</button>
                        </Link>
                    </div>

                    {/* Logo */}
                    <div className="nav-center">
                        <Link to="/">
                            <img
                                src="/MovieReviewsLogoWhite.svg"
                                alt="Movie Reviews Logo"
                                className="navbar-logo"
                            />
                        </Link>
                    </div>

                    {/* Reviews button to the righr */}
                    <div className="nav-right">
                        <Link to="/reviews">
                            <button className="btn btn-outline-light">REVIEWS</button>
                        </Link>
                    </div>

                    
                </div>
                <div className="carousel-search-wrapper">
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
                </div>
            </div>
        </nav>
    )
}