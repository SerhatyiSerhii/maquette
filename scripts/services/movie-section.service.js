export class MovieSectionService {
    #movieSectionContainer = {};

    addSection(moviePosition, movie) {
        this.#movieSectionContainer[moviePosition] = movie;
    }

    getSection(moviePosition) {
        return this.#movieSectionContainer[moviePosition];
    }
}
