import { Link } from 'react-router';
import './Footer.css';

// A client facing Movie Review Web App By Shelby Oakes
// Updated: April 12, 2026

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container">
      <div className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>Movie Reviews</h5>
            <p>Your source for honest movie reviews and ratings.</p>
          </div>

          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Movie Reviews. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}