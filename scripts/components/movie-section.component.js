import { ElementBuilder } from '../utilities/element-builder.js';
import { FilmContentComp } from './film-content.component.js';

export class MovieSectionComp {
    #options;
    #filmContent;
    #section;

    constructor(options) {
        this.#options = options;
    }

    get movieSection() {
        return this.#section;
    }

    render() {
        const section = new ElementBuilder('section').setClasses(this.#options.sectionClass, 'direction-description').setAttributes({ 'id': `top-${this.#options.position}` });

        const picture = new ElementBuilder('img');

        if (this.#options.sectionClass === 'central-direction-description') {
            section.setClasses(this.#options.sectionClass, this.#options.imgClass);
        } else {
            picture.setAttributes({ 'src': this.#options.imgSrc, 'alt': this.#options.imgAlt });
        }

        const filmImage = new ElementBuilder('div').setClasses('film-image').setChildren(picture.build()).build();
        this.#filmContent = new FilmContentComp(this.#options.position, this.#options.name, this.#options.about, this.#options.audioName);
        const descriptionContent = new ElementBuilder('div').setClasses('description-content');

        switch (this.#options.sectionClass) {
            case 'straight-direction-description':
                descriptionContent.setChildren(filmImage, this.#filmContent.render());
                break;
            case 'reverse-direction-description':
                descriptionContent.setChildren(this.#filmContent.render(), filmImage);
                break;
            default:
                descriptionContent.setChildren(this.#filmContent.render());
                break;
        }

        const container = new ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();

        this.#section = section.setChildren(container).build();

        // this.#movieService.addSection(this.#options.position, this); // TODO: better to do it where movie section created    Corrected

        return this.#section;
    }
}
