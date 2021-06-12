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
    private slider: SliderComp[] = [];
    private dataService: DataService = ServiceLocator.inject<DataService>(Services.DATA_SERVICE);

    setWrapperChildren(element: HTMLElement): HTMLElement {
        const main = element; // TODO: what for?

        main.appendChild(new MainSectionComp(300).render());

        const centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];
        let centralClassesPosition = 0;

        this.dataService.getAllMovies(data => {
            const allMoviesAsync = data; // TODO: what for?

            for (let i = allMoviesAsync.length - 1; i >= 0; i--) {
                const optionsAsync = allMoviesAsync[i];
                const indicatorAsync = i % 3;
                let strategyAsync: IDirectionStrategy;

                if (indicatorAsync === 0 || indicatorAsync === 2) {
                    strategyAsync = new AsideDirectionStrategy(optionsAsync.bannerPath, optionsAsync.shortDescription, indicatorAsync === 0)
                } else {
                    strategyAsync = new CentralDirectionStrategy(centralClasses[centralClassesPosition]);

                    centralClassesPosition++;
                }

                const componenetInstance = new MovieSectionComp(optionsAsync, strategyAsync);

                this.movieSectionService.addSection(optionsAsync.id, componenetInstance);

                main.appendChild(componenetInstance.render());

                if (i % 3 === 1) {
                    const sliderOptions: IVideo[] = [];

                    for (let j = i + 2; j >= i; j--) {
                        sliderOptions.push(allMoviesAsync[j].video);
                    }

                    const slider = new SliderComp(sliderOptions, 1);

                    this.slider.push(slider);
                    main.appendChild(slider.render());
                }
            }

            main.appendChild(new SignUpComp().render());
        });

        return main;
    }

    init(): void {
        // TODO: so to have this inited you decided to fetch data one more time
        // what if you had a millions of data which took about 10 seconds to fetch it, would you call it one more time?
        // since main is already in the dom when data arrived - you can get rid of this method and call init directly when slider appended
        this.dataService.getAllMovies(() => {
            for (let slideItem of this.slider) {
                slideItem.init();
            }
        })
    }

    render(): HTMLElement {
        const singleMain = new ElementBuilder('main').build();

        const readyMain = this.setWrapperChildren(singleMain); // TODO: what the difference between single main and ready main?

        return readyMain;
    }
}
