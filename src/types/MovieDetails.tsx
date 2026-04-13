export interface MovieDetails {
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

export interface MovieReview {
    Id: number;
    Rating: number;
    ReviewText: string;
    PublishedDate: string;
    ReviewerName: string;
}

// export all movie details and an reviews that belong to the movie
export interface MovieDetailsResponse {
    movie: MovieDetails;
    reviews: MovieReview[];
}