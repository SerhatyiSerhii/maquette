// TODO: why is it static? what did we implement service locator for?
// also why register, why inject? This is a little bit different than service locator

// Ok, got it. Corrected.
export class MovieSectionService {
    #movieSectionContainer = {};

    addSection(moviePosition, movie) {
        this.#movieSectionContainer[moviePosition] = movie;
    }

    getSection(moviePosition) {
        return this.#movieSectionContainer[moviePosition];
    }
}
