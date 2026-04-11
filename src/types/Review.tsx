export interface Review
{
    id: number;
    rating: number;
    reviewText: string;
    publishedDate: string;
    movieId: number;
    movieTitle: string;
    moviePosterURL: string;
    reviewerName: string;
}