import { AnimationService } from '../services/animation.service';
import { ServiceLocator, ANIMATION_SERVICE } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';

export class MediaLengthComp {
    private container: any;
    private currentLength: any;
    private mediaElement: any;
    private animationService: AnimationService = ServiceLocator.inject<AnimationService>(ANIMATION_SERVICE);

    constructor(mediaElement: object) {
        this.mediaElement = mediaElement;
    }

    private setMediaVolumeInBarWidth(event: any): void {
        const barWidth = this.container.clientWidth;
        const inBarXCoor = this.currentLength.getBoundingClientRect().left;
        const inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

        this.currentLength.style.width = `${inBarPosition}%`;
        this.mediaElement.currentTime = (inBarPosition * this.mediaElement.duration) / 100;
    }

    progress(onProgress: Function): void {
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
        this.currentLength.style.width = 0;
    }

    render(): Node {
        this.currentLength = new ElementBuilder('div').setClasses('current-length').build();
        this.container = new ElementBuilder('div').setClasses('media-length').setChildren(this.currentLength).build();

        this.container.addEventListener('click', (event: any) => {
            const id = this.animationService.getAnimationId();

            cancelAnimationFrame(id);
            this.setMediaVolumeInBarWidth(event);
        });

        return this.container;
    }
}
