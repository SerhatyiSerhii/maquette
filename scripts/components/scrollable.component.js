import { MovieSectionService } from '../services/movie-section.service.js';

export class ScrollableComp {
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;

    #step = (newTimestamp) => {
        let toScroll = this.#startingPosition + (this.#distance * (newTimestamp - this.#start)) / this.#duration;

        if (toScroll >= this.#endingPosition) {
            toScroll = this.#endingPosition;
        }

        this.#page.scrollTop = toScroll;
        if (toScroll < this.#endingPosition) {
            requestAnimationFrame(this.#step);
        }
    }

    constructor(duration) {
        this.#duration = duration;
    }

    #go() {
        this.#start = performance.now();
        requestAnimationFrame(this.#step);
    }


    _scrollToFilm(movieNumber) {
        this.#page = document.documentElement;
        this.#startingPosition = this.#page.scrollTop;
        // TODO: MOVIE_SECTION:
        // and here you will use 'movie-key' to get movie section from service
        // this way we will remove uqery selector from here
        // this.#endingPosition = document.querySelector(arg).offsetTop;

        // Done

        this.#endingPosition = MovieSectionService.inject(movieNumber).offsetTop;
        this.#distance = this.#endingPosition - this.#startingPosition;
        this.#go();
    }
}
