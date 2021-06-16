import { IComp } from '../models/i-comp';
import { ElementBuilder } from '../utilities/element-builder';

export class TimerComp implements IComp {
    private container: HTMLElement;
    private mediaElement: HTMLAudioElement;

    constructor(mediaElement: HTMLAudioElement) {
        this.mediaElement = mediaElement;
    }

    private calcTime(time: number): string {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);

        const minAsString = (min < 10) ? `0${min}` : min.toString();
        const secAsString = (sec < 10) ? `0${sec}` : sec.toString();

        return `${minAsString}:${secAsString}`;
    }

    public showTime(): void {
        const minSecCurTime = this.calcTime(this.mediaElement.currentTime);
        const minSecDurat = this.calcTime(this.mediaElement.duration);

        this.container.textContent = `${minSecCurTime} / ${minSecDurat}`;
    }

    public render(): HTMLElement {
        this.container = new ElementBuilder('div').setClasses('timer').build();
        this.container.textContent = '00:00 / 00:00';

        return this.container;
    }
}
