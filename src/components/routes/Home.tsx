
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import RecentReviews from "../RecentReviews/RecentReviews";
import TopReviewers from "../TopReviewers/TopReviewers"

export default function Home() {
    return (
        <>
            <MovieCarousel />

            <div className="container-fluid px-2 py-0 rounded" style={{ background: '#f8f9fa'}}>
                <div className="row">
                    <div className="col-md-8">
                        <RecentReviews />
                    </div>
                    <div className="col-md-4">
                        <TopReviewers />
                    </div>
                </div>
            </div>
        </>
    );
}