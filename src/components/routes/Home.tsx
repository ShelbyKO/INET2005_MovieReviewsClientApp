import { useState, useEffect } from "react"
import {Link } from "react-router"
import type { Movie } from "../../types/Movie";
import MovieCard from "../MovieCard";
import MovieCarousel from "../MovieCarousel/MovieCarousel";
import RecentReviews from "../RecentReviews/RecentReviews";


export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(import.meta.env.VITE_API_HOST + '/api/movies'); // https://localhost:7195/api/movies
            const movies = await res.json();
            setMovies(movies)
        }

        fetchData()
    }, [])

    return <>
        <h1>Home</h1>
        <>
            <MovieCarousel /> {}
        </>
        <>
            <RecentReviews /> {}
        </>
    </>
}