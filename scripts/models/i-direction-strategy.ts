import { ElementBuilder } from '../utilities/element-builder';

export interface IDirectionStrategy {
    buildContent(section: ElementBuilder, descriptionContent: ElementBuilder, filmContent: HTMLElement): void;
}
