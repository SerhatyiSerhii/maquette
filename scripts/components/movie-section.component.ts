import { ElementBuilder } from '../utilities/element-builder';
import { FilmContentComp } from './film-content.component';

export class MovieSectionComp {
    private options: any;
    private filmContent: any;
    private section: any;

    constructor(options: object) {
        this.options = options;
    }

    get movieSection(): this {
        return this.section;
    }

    render(): Node {
        const section = new ElementBuilder('section').setClasses(this.options.sectionClass, 'direction-description').setAttributes({ 'id': `top-${this.options.position}` });

        const picture = new ElementBuilder('img');

        if (this.options.sectionClass === 'central-direction-description') {
            section.setClasses(this.options.sectionClass, this.options.imgClass);
        } else {
            picture.setAttributes({ 'src': this.options.imgSrc, 'alt': this.options.imgAlt });
        }

        const filmImage = new ElementBuilder('div').setClasses('film-image').setChildren(picture.build()).build();
        this.filmContent = new FilmContentComp(this.options.position, this.options.name, this.options.about, this.options.audioName);
        const descriptionContent = new ElementBuilder('div').setClasses('description-content');

        switch (this.options.sectionClass) {
            case 'straight-direction-description':
                descriptionContent.setChildren(filmImage, this.filmContent.render());
                break;
            case 'reverse-direction-description':
                descriptionContent.setChildren(this.filmContent.render(), filmImage);
                break;
            default:
                descriptionContent.setChildren(this.filmContent.render());
                break;
        }

        const container = new ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();

        this.section = section.setChildren(container).build();

        return this.section;
    }
}