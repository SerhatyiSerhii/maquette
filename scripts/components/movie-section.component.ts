import { ElementBuilder } from '../utilities/element-builder';
import { FilmContentComp } from './film-content.component';
import { IMovieSectionOptions } from '../models/i-movie-section-options';
import { IComp } from '../models/i-comp';
import { audioDataBase } from '../services/database';
import { IAudio } from '../models/i-audio';

export class MovieSectionComp implements IComp {
    private options: IMovieSectionOptions;
    private filmContent: FilmContentComp;
    private section: HTMLElement;
    private audioDataBase: IAudio[] = audioDataBase;

    constructor(options: IMovieSectionOptions) {
        this.options = options;
    }

    get movieSection(): HTMLElement {
        return this.section;
    }

    getAudioPath(): string {
        const audioPath = this.audioDataBase.find( (item) => {
            if (item.id === this.options.id) {
                return item;
            }
        });

        return audioPath.audioPath;
    }

    render(): HTMLElement {
        const section = new ElementBuilder('section').setAttributes({ 'id': (this.options.position >= 10) ? `top-${this.options.position}` : `top-0${this.options.position}`});

        const picture = new ElementBuilder('img');

        if (this.options.position % 3 === 0 || this.options.position % 3 === 1) {
            picture.setAttributes({'src': this.options.bannerPath, 'alt': this.options.shortDescription});
        }

        const filmImage = new ElementBuilder('div').setClasses('film-image').setChildren(picture.build()).build();
        this.filmContent = new FilmContentComp((this.options.position >=10) ? this.options.position.toString() : `0${this.options.position}`, this.options.name, this.options.description, this.getAudioPath());
        const descriptionContent = new ElementBuilder('div').setClasses('description-content');

        switch (this.options.position % 3) {
            case 0:
                section.setClasses('reverse-direction-description', 'direction-description');
                descriptionContent.setChildren(this.filmContent.render(), filmImage);
                break;
            case 1:
                section.setClasses('straight-direction-description', 'direction-description');
                descriptionContent.setChildren(filmImage, this.filmContent.render());
                break;
            case 2:
                switch (this.options.position) {
                    case 8:
                        section.setClasses('central-direction-description', 'star-wars');
                        break;
                    case 5:
                        section.setClasses('central-direction-description', 'runner');
                        break;
                    case 2:
                        section.setClasses('central-direction-description', 'godfuther');
                        break;
                }
                descriptionContent.setChildren(this.filmContent.render());
                break;
        }

        const container = new ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();

        this.section = section.setChildren(container).build();

        return this.section;
    }
}
