import { Outlet } from "react-router"
import { Link } from "react-router"
import Navbar from "../Navbar/Navbar"

export default function Layout() {
    return (
        <>
            {/* <nav className="navbar">
                    <div className="navbar-content">
                        <Link className="navbar-brand" to="/">
                            <img className="navbar-brand" src="/MovieReviewsLogo.svg" alt="MovieReviews"/>
                        </Link>
                    </div>
            </nav> */}
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
            <footer className="container-fluid">
                <p>Copyright 2026 - Movie Reviews</p>
            </footer>
        </>
    )
}