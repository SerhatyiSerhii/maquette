import { IComp } from '../models/i-comp';
import { IDirectionStrategy } from '../models/i-direction-strategy';
import { IVideo } from '../models/i-video';
import { DataService } from '../services/data.service';
import { MovieSectionService } from '../services/movie-section.service';
import { ServiceLocator, Services } from '../services/service-locator';
import { AsideDirectionStrategy } from '../strategies/aside-direction-strategy';
import { CentralDirectionStrategy } from '../strategies/central-direction-strategy';
import { ElementBuilder } from '../utilities/element-builder';
import { MainSectionComp } from './main-section.component';
import { MovieSectionComp } from './movie-section.component';
import { SignUpComp } from './sign-up.component';
import { SliderComp } from './slider.component';

export class WrapperComp implements IComp {
    private movieSectionService: MovieSectionService = ServiceLocator.inject<MovieSectionService>(Services.MOVIE_SECTION_SERVICE);
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.DATA_SERVICE);
    private centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];

    private async makeMovieSection(passedElement: HTMLElement): Promise<void> {
        let centralClassesPosition = 0;

        const movies = await this.dataService.getAllMovies();

        for (let i = movies.length - 1; i >= 0; i--) {
            const optionsAsync = movies[i];
            const indicatorAsync = i % 3;
            let strategyAsync: IDirectionStrategy;

            if (indicatorAsync === 0 || indicatorAsync === 2) {
                strategyAsync = new AsideDirectionStrategy(optionsAsync.bannerPath, optionsAsync.shortDescription, indicatorAsync === 0)
            } else {
                strategyAsync = new CentralDirectionStrategy(this.centralClasses[centralClassesPosition]);

                centralClassesPosition++;
            }

            const componenetInstance = new MovieSectionComp(optionsAsync, strategyAsync);

            this.movieSectionService.addSection(optionsAsync.id, componenetInstance);

            passedElement.appendChild(componenetInstance.render());

            if (i % 3 === 1) {
                const sliderOptions: IVideo[] = [];

                for (let j = i + 2; j >= i; j--) {
                    sliderOptions.push(movies[j].video);
                }

                const slider = new SliderComp(sliderOptions, 1);

                passedElement.appendChild(slider.render());

                slider.init();
            }
        }

        passedElement.appendChild(new SignUpComp().render());
    }

    public setWrapperChildren(element: HTMLElement): HTMLElement {
        element.appendChild(new MainSectionComp(300).render());

        this.makeMovieSection(element);

        return element;
    }

    public render(): HTMLElement {
        return this.setWrapperChildren(new ElementBuilder('main').build());
    }
}
