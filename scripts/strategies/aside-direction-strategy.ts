import { IDirectionStrategy } from "../models/i-direction-strategy";
import { ElementBuilder } from '../utilities/element-builder';

export class AsideDirectionStrategy implements IDirectionStrategy {
    constructor(private bannerPath: string, private shortDescription: string, private straight: boolean) { }

    public buildContent(section: ElementBuilder, descriptionContent: ElementBuilder, filmContent: HTMLElement): void {
        const picture = new ElementBuilder('img');

        picture.setAttributes({ 'src': this.bannerPath, 'alt': this.shortDescription });

        const filmImage = new ElementBuilder('div').setClasses('film-image').setChildren(picture.build()).build();

        if (this.straight) {
            section.setClasses('straight-direction-description', 'direction-description');
            descriptionContent.setChildren(filmImage, filmContent);
        } else {
            section.setClasses('reverse-direction-description', 'direction-description');
            descriptionContent.setChildren(filmContent, filmImage);
        }
    }
}
