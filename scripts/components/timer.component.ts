import { ElementBuilder } from '../utilities/element-builder';

export class TimerComp {
    private container;
    private mediaElement;

    constructor(mediaElement) {
        this.mediaElement = mediaElement;
    }

    private calcTime(time) {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);

        const minAsString = (min < 10) ? `0${min}` : String(min);
        const secAsString = (sec < 10) ? `0${sec}`: String(sec);

        return `${minAsString}:${secAsString}`;
    }

    showTime() {
        const minSecCurTime = this.calcTime(this.mediaElement.currentTime);
        const minSecDurat = this.calcTime(this.mediaElement.duration);

        this.container.textContent = `${minSecCurTime} / ${minSecDurat}`;
    }

    render() {
        this.container = new ElementBuilder('div').setClasses('timer').build();
        this.container.textContent = '00:00 / 00:00';

        return this.container;
    }
}
