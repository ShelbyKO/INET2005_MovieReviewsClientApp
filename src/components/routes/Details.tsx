import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Movie } from "../../types/Movie";


export default function Details() {
    let {id} = useParams()
    const [movie, setMovie] = useState<Movie | null>(null)
    
    
    useEffect(() => {
            const fetchData = async () => {
                const res = await fetch(import.meta.env.VITE_API_HOST + '/api/movies' + id); // https://localhost:7195/api/movies/2
                const movie = await res.json();
                setMovie(movie)
            }
    
            fetchData()
        }, [])

    return <>
        <h1>Details - display trail by id = {id}</h1>
        <p>
            Go to homepage. <Link to="/">Home</Link>
        </p>
    </>
}