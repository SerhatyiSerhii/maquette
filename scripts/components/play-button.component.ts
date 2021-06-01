import { ElementBuilder } from '../utilities/element-builder';

export class PlayBtnComp {
    private buttonEl: any;
    private handler: any;

    constructor(handler: object) {
        this.handler = handler;
    }

    removePlayState(): void {
        this.buttonEl.classList.remove('play-active');
    }

    render(): Node {
        this.buttonEl = new ElementBuilder('button').setClasses('btn-play').build();

        this.buttonEl.addEventListener('click', () => {
            this.buttonEl.classList.toggle('play-active');

            const isActive = this.buttonEl.classList.contains('play-active');

            this.handler(isActive);
        });

        return this.buttonEl;
    }
}
