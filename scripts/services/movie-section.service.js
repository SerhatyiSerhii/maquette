// TODO: why is it static? what did we implement service locator for?
// also why register, why inject? This is a little bit different than service locator
export class MovieSectionService {
    static #movieSectionContainer = {};

    static register(moviePosition, movie) {
        MovieSectionService.#movieSectionContainer[moviePosition] = movie;
    }

    static inject(moviePosition) {
        return MovieSectionService.#movieSectionContainer[moviePosition];
    }
}
