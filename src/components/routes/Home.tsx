import { useState, useEffect } from "react"
import {Link } from "react-router"
import type { Movie } from "../../types/Movie";
import MovieCard from "../MovieCard";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import RecentReviews from "../RecentReviews/RecentReviews";


export default function Home() {
    return (
        <>
            <MovieCarousel />

            <div className="container-fluid px-2 py-0" style={{ background: '#f8f9fa'}}>
                <div className="row">
                    <div className="col-md-8">
                        <RecentReviews />
                    </div>
                </div>
            </div>
        </>
    );
}