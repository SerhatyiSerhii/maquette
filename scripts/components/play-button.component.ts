import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';

export class PlayBtnComp implements IComp {
    private buttonEl: HTMLElement;
    private handler: (isActive: boolean) => void;

    constructor(handler: (isActive: boolean) => void) {
        this.handler = handler;
    }

    removePlayState(): void {
        this.buttonEl.classList.remove('play-active');
    }

    render(): HTMLElement {
        this.buttonEl = new ElementBuilder('button').setClasses('btn-play').build();

        this.buttonEl.addEventListener('click', () => {
            this.buttonEl.classList.toggle('play-active');

            const isActive = this.buttonEl.classList.contains('play-active');

            this.handler(isActive);
        });

        return this.buttonEl;
    }
}
