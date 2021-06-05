import { IComp } from '../models/i-comp';
import { IMovie } from '../models/i-movie';
import { IVideo } from '../models/i-video';
import { MovieSectionService } from '../services/movie-section.service';
import { MOVIE_SECTION_SERVICE, DATA_SERVICE, ServiceLocator } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';
import { MainSectionComp } from './main-section.component';
import { MovieSectionComp } from './movie-section.component';
import { SignUpComp } from './signup.component';
import { SliderComp } from './slider.component';
import { DataService } from '../services/data.service';
import { AsideDirectionStrategy } from '../strategies/aside-direction-strategy';
import { CentralDirectionStrategy } from '../strategies/central-direction-strategy';
import { IDirectionStrategy } from '../models/i-direction-strategy';

export class WrapperComp implements IComp {
    private movieSectionService: MovieSectionService = ServiceLocator.inject<MovieSectionService>(MOVIE_SECTION_SERVICE);
    private slider: SliderComp[] = [];
    private dataService: DataService = ServiceLocator.inject<DataService>(DATA_SERVICE);

    setWrapperChildren(): HTMLElement[] {
        const allMovies = this.dataService.getAllMovies();


        const wrapperChildren: HTMLElement[] = [new MainSectionComp(300).render()];

        const centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];
        let centralClassesPosition = 0;

        for (let i = allMovies.length - 1; i >= 0; i--) {
            const options = allMovies[i];

            const indicator = i % 3;

            let strategy: IDirectionStrategy;

            if (indicator === 0 || indicator === 2) {

                strategy = new AsideDirectionStrategy(options.bannerPath, options.shortDescription, indicator === 0)

            } else {

                strategy = new CentralDirectionStrategy(centralClasses[centralClassesPosition]);

                centralClassesPosition++;
            }

            const componenetInstance = new MovieSectionComp(options, strategy);

            this.movieSectionService.addSection(options.id, componenetInstance);

            wrapperChildren.push(componenetInstance.render());

            if (i % 3 === 1) {
                const sliderOptions: IVideo[] = [];

                for (let j = i + 2; j >= i; j--) {
                    sliderOptions.push(allMovies[j].video);
                }

                const slider = new SliderComp(sliderOptions, 1);

                this.slider.push(slider);

                wrapperChildren.push(slider.render());

                centralClassesPosition++
            }
        }

        wrapperChildren.push(new SignUpComp().render());

        return wrapperChildren;
    }

    init(): void {
        for (let slideItem of this.slider) {
            slideItem.init();
        }
    }

    render(): HTMLElement {
        return new ElementBuilder('main').setChildren(...this.setWrapperChildren()).build();
    }
}
