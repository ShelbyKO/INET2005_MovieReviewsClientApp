export interface Movie
{
    id: string;
    title: string;
    synopsis: string;
    runtime: number; 
    posterURL: string;
    genreId: string;
    ratingId: string;
    releaseDate?: string;
    publishedReviewCount?: number;
}