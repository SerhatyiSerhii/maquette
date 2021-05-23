import { ElementBuilder } from '../utilities/element-builder.js';

export class PlayBtnComp {
    #buttonEl;
    #handler;

    constructor(handler) {
        this.#handler = handler;
    }

    removePlayState() {
        this.#buttonEl.classList.remove('play-active');
    }

    render() {
        this.#buttonEl = new ElementBuilder('button').setClasses('btn-play').build();

        this.#buttonEl.addEventListener('click', () => {
            this.#buttonEl.classList.toggle('play-active');

            const isActive = this.#buttonEl.classList.contains('play-active');

            this.#handler(isActive);
        });

        return this.#buttonEl;
    }
}
