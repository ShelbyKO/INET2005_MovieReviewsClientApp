import { Link } from 'react-router';
import './Navbar.css';

export default function Navbar() {
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
                                src="/MovieReviewsLogo.svg"
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
            </div>
        </nav>
    )
}