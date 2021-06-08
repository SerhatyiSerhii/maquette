import { IComp } from '../models/i-comp';
import { AnimationService } from '../services/animation.service';
import { ServiceLocator, Services } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';

export class MediaLengthComp implements IComp {
    private container: HTMLElement;
    private currentLength: HTMLElement;
    private mediaElement: HTMLVideoElement | HTMLAudioElement;
    private animationService: AnimationService = ServiceLocator.inject<AnimationService>(Services.ANIMATION_SERVICE);

    constructor(mediaElement: HTMLVideoElement | HTMLAudioElement) {
        this.mediaElement = mediaElement;
    }

    private setMediaVolumeInBarWidth(event: MouseEvent): void {
        const barWidth = this.container.clientWidth;
        const inBarXCoor = this.currentLength.getBoundingClientRect().left;
        const inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

        this.currentLength.style.width = `${inBarPosition}%`;
        this.mediaElement.currentTime = (inBarPosition * this.mediaElement.duration) / 100;
    }

    progress(onProgress: () => void): void {
        const position = (this.mediaElement.currentTime / this.mediaElement.duration) * 100;

        this.currentLength.style.width = `${position}%`;

        onProgress();

        if (position < 100) {
            const id = requestAnimationFrame(() => {
                this.progress(onProgress);
            });

            this.animationService.setAnimationId(id);
        }
    }

    reset(): void {
        this.currentLength.style.width = String(0);
    }

    render(): HTMLElement {
        this.currentLength = new ElementBuilder('div').setClasses('current-length').build();
        this.container = new ElementBuilder('div').setClasses('media-length').setChildren(this.currentLength).build();

        this.container.addEventListener('click', (event: MouseEvent) => {
            const id = this.animationService.getAnimationId();

            cancelAnimationFrame(id);
            this.setMediaVolumeInBarWidth(event);
        });

        return this.container;
    }
}
