import { MovieSectionComp } from "../components/movie-section.component";

export class MovieSectionService {
    private movieSectionContainer: { [movieId: number]: MovieSectionComp } = {};

    public addSection(movieId: number, movie: MovieSectionComp): void {
        this.movieSectionContainer[movieId] = movie;
    }

    public getSection(movieId: number): MovieSectionComp {
        return this.movieSectionContainer[movieId];
    }
}
