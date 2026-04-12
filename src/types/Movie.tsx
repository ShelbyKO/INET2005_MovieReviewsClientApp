export interface Movie
{
    Id: number;
    Title: string;
    Synopsis: string;
    Runtime: number; 
    PosterURL: string;
    Genre: string;
    Rating: string;
    ReleaseDate?: string;
    PublishedReviewCount?: number;
    AverageRating?: number;
}