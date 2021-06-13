import { IComp } from '../models/i-comp';
import { IDirectionStrategy } from '../models/i-direction-strategy';
import { IMovie } from '../models/i-movie';
import { ElementBuilder } from '../utilities/element-builder';
import { generateMoviePosition } from '../utilities/generate-movie-position';
import { FilmContentComp } from './film-content.component';

export class MovieSectionComp implements IComp {
    private options: IMovie;
    private section: HTMLElement;
    private directionStrategy: IDirectionStrategy;

    constructor(options: IMovie, directionStrategy: IDirectionStrategy) {
        this.options = options;
        this.directionStrategy = directionStrategy;
    }

    get movieSection(): HTMLElement {
        return this.section;
    }

    render(): HTMLElement {
        const section = new ElementBuilder('section');

        const descriptionContent = new ElementBuilder('div').setClasses('description-content');

        const filmContent = new FilmContentComp(
            generateMoviePosition(this.options.position),
            this.options.name,
            this.options.description,
            this.options.id
        ).render();

        this.directionStrategy.buildContent(section, descriptionContent, filmContent);

        const container = new ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();

        this.section = section.setChildren(container).build();

        return this.section;
    }
}
