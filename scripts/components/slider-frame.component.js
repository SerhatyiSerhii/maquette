import { ANIMATION_SERVICE, MEDIA_SERVICE, ServiceLocator } from '../services/service-locator.js';
import { ElementBuilder } from '../utilities/element-builder.js';
import { MediaLengthComp } from './media-length.component.js';
import { PlayBtnComp } from './play-button.component.js';
import { TimerComp } from './timer.component.js';
import { VolumeComp } from './volume.component.js';

export class SliderFrameComp {
    #options;
    #mediaService = ServiceLocator.inject(MEDIA_SERVICE);
    #animationService = ServiceLocator.inject(ANIMATION_SERVICE);
    #volume;

    constructor(options) {
        this.#options = options;
    }

    render() {
        const source = new ElementBuilder('source').setAttributes({ 'src': this.#options.src }).build();
        const video = new ElementBuilder('video').setChildren(source).build();
        const timer = new TimerComp(video);

        video.addEventListener('canplay', () => {
            timer.showTime();

            // this.init(); // TODO: DO NOT CALL INIT METHOD HERE!!! THIS ONE MUST BE CALLED ONLY IN ANOTHER INIT METHOD!!!

            // Volume.init method should be called here or in playing EventListener. If i put the Volume.init method after the volume component is rendered (line 63 after 60),
            // it will put the volume-handle to 0, but not to 1. But here it puts the volume to 1.
            // If I put Volume.init method to slider-frame.component init method and call it at slider.component,
            // it will put volume-handle to 0 at the last video of every slider, but it will not apply volume-handle putting for first and second videos of every slider.
            // It's strange as on line 60 it supposed to work, but it doesn't.

            this.#volume.init();
        });

        video.addEventListener('pause', () => {
            const id = this.#animationService.getAnimationId();

            cancelAnimationFrame(id);
        });

        this.#volume = new VolumeComp(video);
        const mediaLength = new MediaLengthComp(video);

        video.addEventListener('playing', () => {
            mediaLength.progress(() => {
                timer.showTime();
            });
        });

        video.addEventListener('ended', () => {
            setTimeout(() => {
                this.#mediaService.notifyMediaPlaying();
                mediaLength.reset();
                video.currentTime = 0;
            }, 500);
        });

        const videoControls = new ElementBuilder('div').setClasses('video-controls').setChildren(this.#volume.render(), mediaLength.render()).build();
        const videoWrapper = new ElementBuilder('div').setClasses('video-wrapper').setChildren(video, timer.render(), videoControls).build();
        const image = new ElementBuilder('img').setAttributes({ 'src': this.#options.imgSrc, 'alt': this.#options.imgAlt }).build();

        const handler = (isActive) => {

            image.style.display = isActive ? 'none' : 'block';

            if (isActive) {
                this.#mediaService.notifyMediaPlaying(this);

                video.play();
            } else {
                video.pause();
            }
        }

        const button = new PlayBtnComp(handler);

        this.#mediaService.registerMediaPlaying((eventComp) => {
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
