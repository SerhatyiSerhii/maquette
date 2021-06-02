import { MovieSectionComp } from "../components/movie-section.component";

export class MovieSectionService {
    private movieSectionContainer: {[key: string]: MovieSectionComp} = {};

    addSection(moviePosition: string, movie: MovieSectionComp): void {
        this.movieSectionContainer[moviePosition] = movie;
    }

    getSection(moviePosition: string): MovieSectionComp {
        return this.movieSectionContainer[moviePosition];
    }
}
