import { IDirectionStrategy } from "../models/i-direction-strategy";
import { ElementBuilder } from '../utilities/element-builder';

export class CentralDirectionStrategy implements IDirectionStrategy {
    constructor (private cssClass: string) {}

    buildContent(section: ElementBuilder, descriptionContent: ElementBuilder, filmContent: HTMLElement): void {
        section.setClasses('central-direction-description', this.cssClass);
        descriptionContent.setChildren(filmContent);
    }
}