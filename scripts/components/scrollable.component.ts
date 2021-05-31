import { ServiceLocator, MOVIE_SECTION } from '../services/service-locator';
import { MovieSectionService } from '../services/movie-section.service';

export class ScrollableComp {
    private page;
    private startingPosition;
    private endingPosition;
    private distance;
    private start;
    private duration;
    private movieSection = ServiceLocator.inject<MovieSectionService>(MOVIE_SECTION);

    private step = (newTimestamp) => {
        let toScroll = this.startingPosition + (this.distance * (newTimestamp - this.start)) / this.duration;

        if (toScroll >= this.endingPosition) {
            toScroll = this.endingPosition;
        }

        this.page.scrollTop = toScroll;
        if (toScroll < this.endingPosition) {
            requestAnimationFrame(this.step);
        }
    }

    constructor(duration) {
        this.duration = duration;
    }

    private go() {
        this.start = performance.now();
        requestAnimationFrame(this.step);
    }


    protected scrollToFilm(movieNumber) {
        this.page = document.documentElement;
        this.startingPosition = this.page.scrollTop;
        this.endingPosition = this.movieSection.getSection(movieNumber).movieSection.offsetTop;
        this.distance = this.endingPosition - this.startingPosition;
        this.go();
    }
}
