export interface Movie
{
    id: string;
    Title: string;
    synopsis: string;
    runtime: number; 
    PosterURL: string;
    genreId: string;
    ratingId: string;
    releaseDate?: string;
    publishedReviewCount?: number;
}