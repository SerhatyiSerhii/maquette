import { ElementBuilder } from '../utilities/element-builder.js';
import { FilmContentComp } from './film-content.component.js';

export class MovieSectionComp {
    #options;

    constructor(options) {
        this.#options = options;
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
        const filmContent = new FilmContentComp(this.#options.position, this.#options.name, this.#options.about, this.#options.audioName).render();
        const descriptionContent = new ElementBuilder('div').setClasses('description-content');

        switch (this.#options.sectionClass) {
            case 'straight-direction-description':
                descriptionContent.setChildren(filmImage, filmContent);
                break;
            case 'reverse-direction-description':
                descriptionContent.setChildren(filmContent, filmImage);
                break;
            default:
                descriptionContent.setChildren(filmContent);
                break;
        }

        const container = new ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();

        return section.setChildren(container).build();
    }
}
