import { IComp } from '../models/i-comp';
import { IMovie } from '../models/i-movie';
import { ISliderFrameOptions } from '../models/i-slider-frame-options';
import { dataBase } from '../services/database';
import { MovieSectionService } from '../services/movie-section.service';
import { MOVIE_SECTION_SERVICE, ServiceLocator } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';
import { MainSectionComp } from './main-section.component';
import { MovieSectionComp } from './movie-section.component';
import { SignUpComp } from './signup.component';
import { SliderComp } from './slider.component';

export class WrapperComp implements IComp {
    private movieSectionService: MovieSectionService = ServiceLocator.inject<MovieSectionService>(MOVIE_SECTION_SERVICE);
    private slider: SliderComp[] = [];

    setWrapperChildren(): HTMLElement[] {
        let totalPositions: number = 10; // TODO: don't you have any dynamic data to calculate this?
        const wrapperChildren: HTMLElement[] = [new MainSectionComp(300).render()];
        const sliderFrames: ISliderFrameOptions[] = [];

        while (totalPositions) {
            const movieOptions: IMovie = dataBase.find( (item) => {
                if (item.position === totalPositions) {
                    return item;
                }
            });

            let componenetInstance: MovieSectionComp = new MovieSectionComp(movieOptions);

            this.movieSectionService.addSection((movieOptions.position >= 10) ? movieOptions.position.toString() : `0${movieOptions.position}`, componenetInstance); // TODO: what for?

            if (movieOptions.hasOwnProperty('video')) {
                sliderFrames.push(movieOptions.video);
            }

            if (totalPositions === 8 || totalPositions === 5 || totalPositions === 2) { // TODO: really?
                let sliderCompInstance: SliderComp = new SliderComp(sliderFrames.reverse(), 1);
                this.slider.push(sliderCompInstance);

                wrapperChildren.push(componenetInstance.render(), sliderCompInstance.render());
                sliderFrames.splice(0, sliderFrames.length);
            } else {
                wrapperChildren.push(componenetInstance.render());
            }

            totalPositions--;
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
