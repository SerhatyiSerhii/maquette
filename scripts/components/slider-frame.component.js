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
    #volumeArr = []; // TODO: what is this? how many volumes does slider frame have?

    constructor(options) {
        this.#options = options;
    }

    init() {
        for (let volumeItem of this.#volumeArr) {
            volumeItem.init();
        }
    }

    render() {
        const source = new ElementBuilder('source').setAttributes({ 'src': this.#options.src }).build();
        const video = new ElementBuilder('video').setChildren(source).build();
        const timer = new TimerComp(video);

        video.addEventListener('canplay', () => {
            timer.showTime();
            this.#volumeArr.push(this.#volume);

            this.init(); // TODO: DO NOT CALL INIT METHOD HERE!!! THIS ONE MUST BE CALLED ONLY IN ANOTHER INIT METHOD!!!
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