import { MovieSectionService } from '../services/movie-section.service';
import { ServiceLocator, Services } from '../services/service-locator';

export abstract class ScrollableComp {
    private page: HTMLElement;
    private startingPosition: number;
    private endingPosition: number;
    private distance: number;
    private start: number;
    private duration: number;
    private movieSection: MovieSectionService = ServiceLocator.inject<MovieSectionService>(Services.MOVIE_SECTION_SERVICE);

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


    protected scrollToFilm(movieId: number): void {
        this.page = document.documentElement;
        this.startingPosition = this.page.scrollTop;
        this.endingPosition = this.movieSection.getSection(movieId).movieSection.offsetTop;
        this.distance = this.endingPosition - this.startingPosition;
        this.go();
    }
}
