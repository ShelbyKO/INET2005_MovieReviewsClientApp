export interface Review
{
    Id: number;
    Rating: number;
    ReviewText: string;
    publishedDate: string;
    movieId: number;
    movieTitle: string;
    MoviePosterURL: string;
    ReviewerName: string;
}