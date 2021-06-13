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

    setWrapperChildren(element: HTMLElement): HTMLElement {
        element.appendChild(new MainSectionComp(300).render());

        const centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];
        let centralClassesPosition = 0;

        this.dataService.getAllMovies(data => {
            for (let i = data.length - 1; i >= 0; i--) {
                const optionsAsync = data[i];
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

                element.appendChild(componenetInstance.render());

                if (i % 3 === 1) {
                    const sliderOptions: IVideo[] = [];

                    for (let j = i + 2; j >= i; j--) {
                        sliderOptions.push(data[j].video);
                    }

                    const slider = new SliderComp(sliderOptions, 1);

                    element.appendChild(slider.render());

                    slider.init();
                }
            }

            element.appendChild(new SignUpComp().render());
        });

        return element;
    }

    render(): HTMLElement {
        return this.setWrapperChildren(new ElementBuilder('main').build());
    }
}
