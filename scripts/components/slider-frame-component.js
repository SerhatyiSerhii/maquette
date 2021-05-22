import {ServiceLocator} from '../services/service-locator.js';
import {ElementBuilder} from './element-builder.js';
import {VolumeComp} from './volume-component.js';
import {PlayBtnComp} from './play-button-component.js';
import {MediaLengthComp} from './media-length-component.js';
import {TimerComp} from './timer-component.js';

const MEDIA_SERVICE = 'mediaServiceKey';
const ANIMATION_SERVICE = 'animationServiceKey';

export class SliderFrameComp {
    #options;
    #mediaService = ServiceLocator.inject(MEDIA_SERVICE);
    #animationService = ServiceLocator.inject(ANIMATION_SERVICE);

    constructor(options) {
        this.#options = options;
    }

    render() {
        const source = new ElementBuilder('source').setAttributes({ 'src': this.#options.src }).build();
        const video = new ElementBuilder('video').setChildren(source).build();
        const timer = new TimerComp(video);

        video.addEventListener('canplay', () => {
            timer.showTime();
        });

        video.addEventListener('pause', () => {
            const id = this.#animationService.getAnimationId();

            cancelAnimationFrame(id);
        });

        const volume = new VolumeComp(video);
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

        const videoControls = new ElementBuilder('div').setClasses('video-controls').setChildren(volume.render(), mediaLength.render()).build();
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