import { ElementBuilder } from '../utilities/element-builder';

export class TimerComp {
    private container: any;
    private mediaElement: any;

    constructor(mediaElement: any) {
        this.mediaElement = mediaElement;
    }

    private calcTime(time: number): string {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);

        const minAsString = (min < 10) ? `0${min}` : String(min);
        const secAsString = (sec < 10) ? `0${sec}`: String(sec);

        return `${minAsString}:${secAsString}`;
    }

    showTime(): void {
        const minSecCurTime = this.calcTime(this.mediaElement.currentTime);
        const minSecDurat = this.calcTime(this.mediaElement.duration);

        this.container.textContent = `${minSecCurTime} / ${minSecDurat}`;
    }

    render(): Node {
        this.container = new ElementBuilder('div').setClasses('timer').build();
        this.container.textContent = '00:00 / 00:00';

        return this.container;
    }
}
