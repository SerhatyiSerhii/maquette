import { ServiceLocator, MOVIE_SECTION } from '../services/service-locator';
import { MovieSectionService } from '../services/movie-section.service';

export class ScrollableComp {
    private page: any;
    private startingPosition: any;
    private endingPosition: any;
    private distance: any;
    private start: any;
    private duration: any;
    private movieSection: MovieSectionService = ServiceLocator.inject<MovieSectionService>(MOVIE_SECTION);

    private step = (newTimestamp: number) => {
        let toScroll = this.startingPosition + (this.distance * (newTimestamp - this.start)) / this.duration;

        if (toScroll >= this.endingPosition) {
            toScroll = this.endingPosition;
        }

        this.page.scrollTop = toScroll;
        if (toScroll < this.endingPosition) {
            requestAnimationFrame(this.step);
        }
    }

    constructor(duration: number) {
        this.duration = duration;
    }

    private go(): void {
        this.start = performance.now();
        requestAnimationFrame(this.step);
    }


    protected scrollToFilm(movieNumber: string): void {
        this.page = document.documentElement;
        this.startingPosition = this.page.scrollTop;
        this.endingPosition = this.movieSection.getSection(movieNumber).movieSection.offsetTop;
        this.distance = this.endingPosition - this.startingPosition;
        this.go();
    }
}
