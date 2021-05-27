export class MovieSectionService {
    static #movieSectionContainer = {};

    static register(moviePosition, movie) {
        MovieSectionService.#movieSectionContainer[moviePosition] = movie;
    }

    static inject(moviePosition) {
        return MovieSectionService.#movieSectionContainer[moviePosition];
    }
}
