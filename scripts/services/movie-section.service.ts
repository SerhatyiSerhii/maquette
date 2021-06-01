export class MovieSectionService {
    private movieSectionContainer: {[key: string]: any} = {};

    addSection(moviePosition: string, movie: any): void {
        this.movieSectionContainer[moviePosition] = movie;
    }

    getSection(moviePosition: string): any {
        return this.movieSectionContainer[moviePosition];
    }
}
