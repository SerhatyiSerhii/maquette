import {ServiceLocator} from '../services/service-locator.js';
import {ElementBuilder} from './element-builder.js';

const ANIMATION_SERVICE = 'animationServiceKey';

export class MediaLengthComp {
    #container;
    #currentLength;
    #mediaElement;
    #animationService = ServiceLocator.inject(ANIMATION_SERVICE);

    constructor(mediaElement) {
        this.#mediaElement = mediaElement;
    }

    #setMediaVolumeInBarWidth(event) {
        const barWidth = this.#container.clientWidth;
        const inBarXCoor = this.#currentLength.getBoundingClientRect().left;
        const inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

        this.#currentLength.style.width = `${inBarPosition}%`;
        this.#mediaElement.currentTime = (inBarPosition * this.#mediaElement.duration) / 100;
    }

    progress(onProgress) {
        const position = (this.#mediaElement.currentTime / this.#mediaElement.duration) * 100;

        this.#currentLength.style.width = `${position}%`;

        onProgress();

        if (position < 100) {
            const id = requestAnimationFrame(() => {
                this.progress(onProgress);
            });

            this.#animationService.setAnimationId(id);
        }
    }

    reset() {
        this.#currentLength.style.width = 0;
    }

    render() {
        this.#currentLength = new ElementBuilder('div').setClasses('current-length').build();
        this.#container = new ElementBuilder('div').setClasses('media-length').setChildren(this.#currentLength).build();

        this.#container.addEventListener('click', (event) => {
            const id = this.#animationService.getAnimationId();

            cancelAnimationFrame(id);
            this.#setMediaVolumeInBarWidth(event);
        });

        return this.#container;
    }
}