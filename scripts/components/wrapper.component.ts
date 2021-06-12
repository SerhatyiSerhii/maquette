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
        // TODO: use async method here

        const main = element;

        main.appendChild(new MainSectionComp(300).render());

        const centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];
        let centralClassesPosition = 0;

        this.dataService.getAllMoviesAsync(data => {

            const allMoviesAsync = data;

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

        // const allMovies = this.dataService.getAllMovies();

        // const wrapperChildren: HTMLElement[] = [new MainSectionComp(300).render()];

        // const centralClasses: string[] = ['star-wars', 'runner', 'godfuther'];
        // let centralClassesPosition = 0;

        // for (let i = allMovies.length - 1; i >= 0; i--) {
        //     const options = allMovies[i];

        //     const indicator = i % 3;

        //     let strategy: IDirectionStrategy;

        //     if (indicator === 0 || indicator === 2) {

        //         strategy = new AsideDirectionStrategy(options.bannerPath, options.shortDescription, indicator === 0)

        //     } else {

        //         strategy = new CentralDirectionStrategy(centralClasses[centralClassesPosition]);

        //         centralClassesPosition++;
        //     }

        //     const componenetInstance = new MovieSectionComp(options, strategy);

        //     this.movieSectionService.addSection(options.id, componenetInstance);

        //     wrapperChildren.push(componenetInstance.render());

        //     if (i % 3 === 1) {
        //         const sliderOptions: IVideo[] = [];

        //         for (let j = i + 2; j >= i; j--) {
        //             sliderOptions.push(allMovies[j].video);
        //         }

        //         const slider = new SliderComp(sliderOptions, 1);

        //         this.slider.push(slider);

        //         wrapperChildren.push(slider.render());
        //     }
        // }

        // wrapperChildren.push(new SignUpComp().render());

        // return wrapperChildren;
    }

    init(): void {
        // for (let slideItem of this.slider) {
        //     slideItem.init();
        // }

        this.dataService.getAllMoviesAsync(() => {
            for (let slideItem of this.slider) {
                slideItem.init();
            }
        })
    }

    render(): HTMLElement {

        const singleMain = new ElementBuilder('main').build();

        const readyMain = this.setWrapperChildren(singleMain);

        return readyMain;

        // return new ElementBuilder('main').setChildren(...this.setWrapperChildren()).build();
    }
}
