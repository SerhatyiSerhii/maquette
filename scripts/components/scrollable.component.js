import { ServiceLocator, MOVIE_SECTION } from '../services/service-locator.js';

export class ScrollableComp {
    #page;
    #startingPosition;
    #endingPosition;
    #distance;
    #start;
    #duration;
    #movieSection = ServiceLocator.inject(MOVIE_SECTION);

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
        this.#endingPosition = this.#movieSection.getSection(movieNumber).movieSection.offsetTop;
        this.#distance = this.#endingPosition - this.#startingPosition;
        this.#go();
    }
}
