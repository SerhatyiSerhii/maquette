import { ElementBuilder } from '../utilities/element-builder.js';

export class TimerComp {
    #container;
    #mediaElement;

    constructor(mediaElement) {
        this.#mediaElement = mediaElement;
    }

    #calcTime(time) {
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);

        min = (min < 10) ? `0${min}` : min;
        sec = (sec < 10) ? `0${sec}` : sec;

        return `${min}:${sec}`;
    }

    showTime() {
        const minSecCurTime = this.#calcTime(this.#mediaElement.currentTime);
        const minSecDurat = this.#calcTime(this.#mediaElement.duration);

        this.#container.textContent = `${minSecCurTime} / ${minSecDurat}`;
    }

    render() {
        this.#container = new ElementBuilder('div').setClasses('timer').build();
        this.#container.textContent = '00:00 / 00:00';

        return this.#container;
    }
}
