import { IComp } from '../models/i-comp';
import { ISliderFrameOptions } from '../models/i-slider-frame-options';
import { AnimationService } from '../services/animation.service';
import { MediaService } from '../services/media.service';
import { ANIMATION_SERVICE, MEDIA_SERVICE, ServiceLocator } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';
import { MediaLengthComp } from './media-length.component';
import { PlayBtnComp } from './play-button.component';
import { TimerComp } from './timer.component';
import { VolumeComp } from './volume.component';

export class SliderFrameComp implements IComp {
    private options: ISliderFrameOptions; // TODO: it was easier to use IMovie interface instead of change this one. More over - this one is superfluous now
    private mediaService: MediaService = ServiceLocator.inject<MediaService>(MEDIA_SERVICE);
    private animationService: AnimationService = ServiceLocator.inject<AnimationService>(ANIMATION_SERVICE);
    private volume: VolumeComp;

    constructor(options: ISliderFrameOptions) {
        this.options = options;
    }

    init(): void {
        this.volume.init();
    }

    render(): HTMLElement {
        const source = new ElementBuilder('source').setAttributes({ 'src': this.options.path }).build();
        const video = new ElementBuilder<HTMLVideoElement>('video').setChildren(source).build();
        const timer = new TimerComp(video);

        video.addEventListener('canplay', () => {
            timer.showTime();
        });

        video.addEventListener('pause', () => {
            const id = this.animationService.getAnimationId();

            cancelAnimationFrame(id);
        });

        this.volume = new VolumeComp(video);
        const mediaLength = new MediaLengthComp(video);

        video.addEventListener('playing', () => {
            mediaLength.progress(() => {
                timer.showTime();
            });
        });

        video.addEventListener('ended', () => {
            setTimeout(() => {
                this.mediaService.notifyMediaPlaying();
                mediaLength.reset();
                video.currentTime = 0;
            }, 500);
        });

        const videoControls = new ElementBuilder('div').setClasses('video-controls').setChildren(this.volume.render(), mediaLength.render()).build();
        const videoWrapper = new ElementBuilder('div').setClasses('video-wrapper').setChildren(video, timer.render(), videoControls).build();
        const image = new ElementBuilder('img').setAttributes({ 'src': this.options.bannerPath, 'alt': this.options.bannerDescription }).build();

        const handler = (isActive: boolean) => {

            image.style.display = isActive ? 'none' : 'block';

            if (isActive) {
                this.mediaService.notifyMediaPlaying(this);

                video.play();
            } else {
                video.pause();
            }
        }

        const button = new PlayBtnComp(handler);

        this.mediaService.registerMediaPlaying((eventComp: SliderFrameComp) => {
            if (eventComp !== this) {
                image.style.display = 'block';
                video.pause();
                button.removePlayState();
            }
        });

        const frame = new ElementBuilder('div').setClasses('frame').setChildren(videoWrapper, image, button.render()).build();
        const listItem = new ElementBuilder('li').setChildren(frame).build();

        return listItem;
    }
}
