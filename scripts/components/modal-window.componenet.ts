import { IComp } from '../models/i-comp';
import { AnimationService } from '../services/animation.service';
import { MediaService } from '../services/media.service';
import { ServiceLocator, Services } from '../services/service-locator';
import { ElementBuilder } from '../utilities/element-builder';
import { MediaLengthComp } from './media-length.component';
import { PlayBtnComp } from './play-button.component';
import { TimerComp } from './timer.component';
import { VolumeComp } from './volume.component';

export class ModalWindowComp implements IComp {
    private container: HTMLElement;
    private audio: HTMLAudioElement;
    private button: PlayBtnComp;
    private mediaLength: MediaLengthComp;
    private volume: VolumeComp;
    private movieName: string;
    private audioSrc: string;
    private mediaService: MediaService = ServiceLocator.inject<MediaService>(Services.MEDIA_SERVICE);
    private animationService: AnimationService = ServiceLocator.inject<AnimationService>(Services.ANIMATION_SERVICE);

    constructor(audioSrc: string, movieName: string) {
        this.audioSrc = audioSrc;
        this.movieName = movieName;
    }

    private closeListener(): void {
        document.body.classList.remove('lock');

        this.container.classList.add('visually-hidden');

        const closeMdlWindow = (event: TransitionEvent) => {
            if (event.propertyName === 'opacity') {
                document.body.removeChild(this.container);
                this.container.removeEventListener('transitionend', closeMdlWindow);
            }
        }

        this.container.addEventListener('transitionend', closeMdlWindow);

        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.volume = 1;

        this.button.removePlayState();
        this.mediaLength.reset();
    }

    public showModalWindow(): void {
        this.container.classList.remove('visually-hidden');
    }

    public init(): void {
        this.volume.init();
    }

    public render(): HTMLElement {
        const btnHandler = (isActive: boolean) => {

            if (isActive) {
                this.mediaService.notifyMediaPlaying();

                this.audio.play();
            } else {
                this.audio.pause();
            }
        }

        this.audio = new ElementBuilder<HTMLAudioElement>('audio').setAttributes({ 'src': this.audioSrc }).build();

        this.volume = new VolumeComp(this.audio);
        const volume = this.volume.render();

        this.button = new PlayBtnComp(btnHandler);
        const buttonElement = this.button.render();

        this.mediaLength = new MediaLengthComp(this.audio);
        const mediaLength = this.mediaLength.render();

        const timer = new TimerComp(this.audio);
        const timerElement = timer.render();

        const title = new ElementBuilder('h2').setClasses('listener-title').build();
        title.textContent = this.movieName;

        const cross = new ElementBuilder('span').setClasses('close-listener-cross').build();
        const closeModWin = new ElementBuilder('a').setClasses('close-listener').setChildren(cross).build();
        const modWind = new ElementBuilder('div').setClasses('soundtrack-listener').setChildren(this.audio, volume, title, buttonElement, mediaLength, timerElement, closeModWin).build();

        this.container = new ElementBuilder('div').setClasses('substrate', 'visually-hidden').setChildren(modWind).build();

        this.container.addEventListener('click', (event: MouseEvent) => {
            let element = event.target as Node;

            while (element != null && element !== modWind) {
                element = element.parentNode;
            }

            if (element == null) {
                this.closeListener();
            }
        });

        closeModWin.addEventListener('click', () => {
            this.closeListener()
        });

        this.audio.addEventListener('canplay', () => {
            timer.showTime();
        });

        this.audio.addEventListener('ended', () => {
            setTimeout(() => {
                this.button.removePlayState();
                this.mediaLength.reset();
                this.audio.currentTime = 0;
                timer.showTime();
            }, 500)
        });

        this.audio.addEventListener('playing', () => {
            this.mediaLength.progress(() => {
                timer.showTime();
            });
        });

        this.audio.addEventListener('pause', () => {
            const id = this.animationService.getAnimationId();

            cancelAnimationFrame(id);
        });

        document.body.classList.add('lock');

        return this.container;
    }
}
