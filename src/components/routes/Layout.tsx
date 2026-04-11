import { Outlet } from "react-router"
import { Link } from "react-router"

export default function Layout() {
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid mb-4">
                    <Link className="navbar-brand" to="/">
                        <img src="/MovieReviewsLogo.svg" alt="MovieReviews"/>
                    </Link>
                </div>
            </nav>
            <main className="container">
                <Outlet />
            </main>
            <footer className="container-fluid">
                <p>Copyright 2026 - Movie Reviews</p>
            </footer>
        </>
    )
}