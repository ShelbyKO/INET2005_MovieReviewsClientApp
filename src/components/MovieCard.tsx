import type { Movie } from "../types/Movie";

export default function MovieCard(props: { movie: Movie }) {
    
    return (
        <div className="w-50 pb-3">
            <h3>{props.movie.title}</h3>
            <img src={props.movie.posterURL} alt={props.movie.title} className="img-fluid"/>
        </div>
    )
}