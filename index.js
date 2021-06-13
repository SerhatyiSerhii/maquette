define("models/i-comp", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utilities/element-builder", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ElementBuilder = void 0;
    class ElementBuilder {
        constructor(elementName) {
            this.children = [];
            this.tagName = elementName;
        }
        setClasses(...classes) {
            this.classes = classes;
            return this;
        }
        setAttributes(obj) {
            this.attributes = obj;
            return this;
        }
        setChildren(...children) {
            this.children = children;
            return this;
        }
        build() {
            const element = document.createElement(this.tagName);
            if (this.classes != null) {
                for (let item of this.classes) {
                    element.classList.add(item);
                }
            }
            for (let key in this.attributes) {
                if (this.attributes.hasOwnProperty(key)) {
                    element.setAttribute(key, this.attributes[key]);
                }
            }
            if (this.children != null) {
                for (let child of this.children) {
                    element.appendChild(child);
                }
            }
            return element;
        }
    }
    exports.ElementBuilder = ElementBuilder;
});
define("components/footer.component", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FooterComp = void 0;
    class FooterComp {
        constructor() {
            this.socialMediaIcons = [
                `<svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 2.85104C28.8977 3.33827 27.7123 3.66309 26.4614 3.81699C27.7329 3.06381 28.7115 1.8624 29.1706 0.44255C27.9809 1.13829 26.6626 1.64963 25.2604 1.91913C24.1403 0.734746 22.5426 0 20.773 0C17.3737 0 14.6176 2.72551 14.6176 6.08648C14.6176 6.56236 14.6738 7.02548 14.7783 7.47512C9.66408 7.21909 5.12769 4.79287 2.09301 1.11063C1.55998 2.01062 1.26007 3.0638 1.26007 4.17585C1.26007 6.2886 2.34388 8.14887 3.99697 9.24461C2.98778 9.21411 2.03828 8.93397 1.20677 8.48433C1.20677 8.50277 1.20677 8.52972 1.20677 8.55596C1.20677 11.5084 3.32891 13.9673 6.14186 14.5268C5.62802 14.6673 5.08434 14.7453 4.52431 14.7453C4.12703 14.7453 3.7397 14.7006 3.36445 14.6332C4.14764 17.046 6.41974 18.8098 9.11187 18.8623C7.00536 20.492 4.35232 21.4679 1.46759 21.4679C0.969393 21.4679 0.481854 21.4395 0 21.3814C2.72695 23.1041 5.96276 24.1133 9.43665 24.1133C20.7559 24.1133 26.949 14.8375 26.949 6.79002C26.949 6.52619 26.9404 6.26378 26.9284 6.00421C28.1365 5.15244 29.1777 4.07869 30 2.85104Z" fill="url(#paint0_linear)" />
            <defs>
                <linearGradient id="paint0_linear" x1="4.58258" y1="0.930489" x2="26.1831" y2="22.5762" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" />
            </linearGradient>
            </defs>
        </svg>`,
                `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.1115 30.4209H8.14633C3.65538 30.4209 0 26.747 0 22.2307V8.19024C0 3.67391 3.65538 0 8.14633 0H22.1115C26.6024 0 30.2578 3.67391 30.2578 8.19024V22.2307C30.2578 26.747 26.6024 30.4209 22.1115 30.4209ZM8.14633 2.34007C4.93784 2.34007 2.32752 4.96446 2.32752 8.19024V22.2307C2.32752 25.4564 4.93784 28.0808 8.14633 28.0808H22.1115C25.32 28.0808 27.9303 25.4564 27.9303 22.2307V8.19024C27.9303 4.96446 25.32 2.34007 22.1115 2.34007H8.14633Z" fill="white" />
            <path d="M15.1463 23.4131C10.6554 23.4131 7 19.7391 7 15.2227C7 10.7062 10.6554 7.03223 15.1463 7.03223C19.6372 7.03223 23.2926 10.7062 23.2926 15.2227C23.2926 19.7391 19.6372 23.4131 15.1463 23.4131ZM15.1463 9.37235C11.9378 9.37235 9.32751 11.9968 9.32751 15.2227C9.32751 18.4485 11.9378 21.073 15.1463 21.073C18.3548 21.073 20.9651 18.4485 20.9651 15.2227C20.9651 11.9968 18.3548 9.37235 15.1463 9.37235Z" fill="white" />
            <path d="M24.7456 7.5293C25.7097 7.5293 26.4912 6.74339 26.4912 5.77393C26.4912 4.80446 25.7097 4.01855 24.7456 4.01855C23.7815 4.01855 23 4.80446 23 5.77393C23 6.74339 23.7815 7.5293 24.7456 7.5293Z" fill="white" />
        </svg>`,
                `<svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.71507 9.53953H6.13306V19.874H2.2999V9.53953H0V6.35969H2.2999V4.44383C2.30143 1.65511 3.41841 0 6.5869 0H9.19958V3.17984H7.4463C6.21279 3.17984 6.13306 3.65682 6.13306 4.54956V6.35969H9.19958L8.71507 9.53953Z" fill="white" />
        </svg>`
            ];
        }
        render() {
            const socialMediaArr = this.socialMediaIcons.map(iconElement => {
                const aTag = new element_builder_1.ElementBuilder('a').setAttributes({ 'href': '#' }).setClasses('circle').build();
                aTag.innerHTML = iconElement;
                return new element_builder_1.ElementBuilder('li').setChildren(aTag).build();
            });
            const socialMediaUL = new element_builder_1.ElementBuilder('ul').setClasses('social-media').setChildren(...socialMediaArr).build();
            const policiesLIArr = ['privacy policy', 'cookie policy'].map((policy) => {
                const aTag = new element_builder_1.ElementBuilder('a').setAttributes({ 'href': '#' }).build();
                aTag.textContent = policy;
                return new element_builder_1.ElementBuilder('li').setChildren(aTag).build();
                ;
            });
            const policyUL = new element_builder_1.ElementBuilder('ul').setClasses('policy').setChildren(...policiesLIArr).build();
            const container = new element_builder_1.ElementBuilder('container').setClasses('container').setChildren(policyUL, socialMediaUL).build();
            return new element_builder_1.ElementBuilder('footer').setChildren(container).build();
        }
    }
    exports.FooterComp = FooterComp;
});
define("models/i-audio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/i-video", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/i-movie", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/database", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.audioDataBase = exports.dataBase = void 0;
    exports.dataBase = [
        {
            id: 12,
            position: 1,
            name: 'The Lord of the Rings',
            bannerPath: 'images/frodo.jpg',
            shortDescription: 'Frodo and the ring',
            description: `Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music all his own.`
        },
        {
            id: 34,
            position: 2,
            name: 'The Godfather',
            description: `The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.`,
            video: {
                path: 'videos/the-godfather.mp4',
                bannerPath: 'images/group33.jpg',
                bannerDescription: 'gungsters discussing a deal'
            }
        },
        {
            id: 56,
            position: 3,
            name: '2001: A Space Odyssey',
            bannerPath: 'images/davebowman.jpg',
            shortDescription: 'space odyssey',
            description: `The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes and motifs to narrow down a tone that makes the movie feel all its own.`,
            video: {
                path: 'videos/2001-a-space-odyssey.mp4',
                bannerPath: 'images/amanda.jpg',
                bannerDescription: 'amanda from a space odyssey'
            }
        },
        {
            id: 78,
            position: 4,
            name: 'O Brother, Where Art Thou?',
            bannerPath: 'images/o-brother.jpg',
            shortDescription: 'o brother where art thou',
            description: `O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a group of convicts who go on a wild journey to find a treasure of sorts. With this film based in a stylistic period in history, the soundtrack was designed to match it.`,
            video: {
                path: 'videos/o-brother-where-art-thou.mp4',
                bannerPath: 'images/o-brother-image.jpg',
                bannerDescription: 'confess before the end'
            }
        },
        {
            id: 90,
            position: 5,
            name: 'Blade Runner',
            description: `It's astounding that Blade Runner didn't become as popular as other movies released in its time. It arguably has one of the best soundtracks in movie history, with every tune being a perfect match with the action on-screen.`,
            video: {
                path: 'videos/blade-runner.mp4',
                bannerPath: 'images/bladerunner.jpg',
                bannerDescription: 'bladerunner heroes'
            }
        },
        {
            id: 10,
            position: 6,
            name: 'Goodfellas',
            bannerPath: 'images/goodfellas.jpg',
            shortDescription: 'goodfellas',
            description: `Martin Scorcese's movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else in between. It's a crime movie that isn't afraid to deal with the dark side of life. Going along with every scene is a great soundtrack full of hand-picked songs that compliment every moment they appear in.`,
            video: {
                path: 'videos/goodfellas.mp4',
                bannerPath: 'images/culture.jpg',
                bannerDescription: 'high buildings'
            }
        },
        {
            id: 29,
            position: 7,
            name: 'Baby Driver',
            bannerPath: 'images/baby_driver.jpg',
            shortDescription: 'baby-driver',
            description: `Baby Driver's soundtrack is similar to Guardians of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop to the film's many beats. However, what Edgar Wright did with the music was so far beyond that.`,
            video: {
                path: 'videos/baby-driver.mp4',
                bannerPath: 'images/Baby-Driver_driver.jpg',
                bannerDescription: 'driver'
            }
        },
        {
            id: 38,
            position: 8,
            name: 'Star Wars: A New Hope',
            description: `When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and so many more great tracks.`,
            video: {
                path: 'videos/star-wars-a-new-hope.mp4',
                bannerPath: 'images/conference_room.jpg',
                bannerDescription: 'Dart Waider at the conference room'
            }
        },
        {
            id: 47,
            position: 9,
            name: 'Jurassic Park',
            bannerPath: 'images/jurassic.jpg',
            shortDescription: 'jurassic park',
            description: `John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score for Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further brought to life by Williams' music.`,
            video: {
                path: 'videos/jurassic-park.mp4',
                bannerPath: 'images/dino_pet.jpg',
                bannerDescription: 'petting the dino',
            }
        },
        {
            id: 65,
            position: 10,
            name: 'Guardians of the Galaxy vol. 2',
            bannerPath: 'images/guardians.jpg',
            shortDescription: 'guardians of the galaxy',
            description: `While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians of the Galaxy Vol. 2 that improved on the formula. The first film featured songs that were fun and upbeat but didn't have much to do with the film's story.`,
            video: {
                path: 'videos/guardinas-of-the-galaxy-vol-2.mp4',
                bannerPath: 'images/little_tree.jpg',
                bannerDescription: 'little tree presses a button'
            }
        }
    ];
    exports.audioDataBase = [
        {
            id: 12,
            audioPath: 'audios/the-lord-of-the-rings.ogg'
        },
        {
            id: 34,
            audioPath: 'audios/the-godfather.ogg'
        },
        {
            id: 56,
            audioPath: 'audios/2001-a-space-odyssey.ogg'
        },
        {
            id: 78,
            audioPath: 'audios/o-brother-where-art-thou.ogg'
        },
        {
            id: 90,
            audioPath: 'audios/blade-runner.ogg'
        },
        {
            id: 10,
            audioPath: 'audios/goodfellas.ogg'
        },
        {
            id: 29,
            audioPath: 'audios/baby-driver.ogg'
        },
        {
            id: 38,
            audioPath: 'audios/star-wars-a-new-hope.ogg'
        },
        {
            id: 47,
            audioPath: 'audios/jurassic-park.ogg'
        },
        {
            id: 65,
            audioPath: 'audios/guardinas-of-the-galaxy-vol-2.ogg'
        }
    ];
});
define("services/data.service", ["require", "exports", "services/database"], function (require, exports, database_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataService = void 0;
    class DataService {
        getAllMovies(callback) {
            setTimeout(() => {
                callback(database_1.dataBase);
            }, 300);
        }
        getAudioSourceById(id, callback) {
            setTimeout(() => {
                callback(database_1.audioDataBase.find(entity => entity.id === id));
            }, 300);
        }
    }
    exports.DataService = DataService;
});
define("services/service-locator", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Services = exports.ServiceLocator = void 0;
    // Implemented Service Locator instead of Dependency Injector to simplify development
    class ServiceLocator {
        static register(key, service) {
            ServiceLocator.serviceContainer[key] = service;
        }
        static inject(key) {
            return ServiceLocator.serviceContainer[key];
        }
    }
    exports.ServiceLocator = ServiceLocator;
    ServiceLocator.serviceContainer = {};
    var Services;
    (function (Services) {
        Services["MEDIA_SERVICE"] = "mediaServiceKey";
        Services["ANIMATION_SERVICE"] = "animationServiceKey";
        Services["MOVIE_SECTION_SERVICE"] = "movieSectionServiceKey";
        Services["DATA_SERVICE"] = "dataServiceKey";
    })(Services = exports.Services || (exports.Services = {}));
});
define("utilities/generate-movie-position", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateMoviePosition = void 0;
    const generateMoviePosition = (position) => {
        return `.${position >= 10 ? position : `0` + position}`;
    };
    exports.generateMoviePosition = generateMoviePosition;
});
define("models/i-direction-strategy", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("services/animation.service", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AnimationService = void 0;
    class AnimationService {
        getAnimationId() {
            return this.requestAnimationFrameId;
        }
        setAnimationId(id) {
            this.requestAnimationFrameId = id;
        }
    }
    exports.AnimationService = AnimationService;
});
define("components/media-length.component", ["require", "exports", "services/service-locator", "utilities/element-builder"], function (require, exports, service_locator_1, element_builder_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MediaLengthComp = void 0;
    class MediaLengthComp {
        constructor(mediaElement) {
            this.animationService = service_locator_1.ServiceLocator.inject(service_locator_1.Services.ANIMATION_SERVICE);
            this.mediaElement = mediaElement;
        }
        setMediaVolumeInBarWidth(event) {
            const barWidth = this.container.clientWidth;
            const inBarXCoor = this.currentLength.getBoundingClientRect().left;
            const inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
            this.currentLength.style.width = `${inBarPosition}%`;
            this.mediaElement.currentTime = (inBarPosition * this.mediaElement.duration) / 100;
        }
        progress(onProgress) {
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
        reset() {
            this.currentLength.style.width = String(0);
        }
        render() {
            this.currentLength = new element_builder_2.ElementBuilder('div').setClasses('current-length').build();
            this.container = new element_builder_2.ElementBuilder('div').setClasses('media-length').setChildren(this.currentLength).build();
            this.container.addEventListener('click', (event) => {
                const id = this.animationService.getAnimationId();
                cancelAnimationFrame(id);
                this.setMediaVolumeInBarWidth(event);
            });
            return this.container;
        }
    }
    exports.MediaLengthComp = MediaLengthComp;
});
define("components/play-button.component", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PlayBtnComp = void 0;
    class PlayBtnComp {
        constructor(handler) {
            this.handler = handler;
        }
        removePlayState() {
            this.buttonEl.classList.remove('play-active');
        }
        render() {
            this.buttonEl = new element_builder_3.ElementBuilder('button').setClasses('btn-play').build();
            this.buttonEl.addEventListener('click', () => {
                this.buttonEl.classList.toggle('play-active');
                const isActive = this.buttonEl.classList.contains('play-active');
                this.handler(isActive);
            });
            return this.buttonEl;
        }
    }
    exports.PlayBtnComp = PlayBtnComp;
});
define("components/timer.component", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimerComp = void 0;
    class TimerComp {
        constructor(mediaElement) {
            this.mediaElement = mediaElement;
        }
        calcTime(time) {
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            const minAsString = (min < 10) ? `0${min}` : min.toString();
            const secAsString = (sec < 10) ? `0${sec}` : sec.toString();
            return `${minAsString}:${secAsString}`;
        }
        showTime() {
            const minSecCurTime = this.calcTime(this.mediaElement.currentTime);
            const minSecDurat = this.calcTime(this.mediaElement.duration);
            this.container.textContent = `${minSecCurTime} / ${minSecDurat}`;
        }
        render() {
            this.container = new element_builder_4.ElementBuilder('div').setClasses('timer').build();
            this.container.textContent = '00:00 / 00:00';
            return this.container;
        }
    }
    exports.TimerComp = TimerComp;
});
define("components/volume.component", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VolumeComp = void 0;
    class VolumeComp {
        constructor(mediaElement) {
            this.mediaElement = mediaElement;
        }
        init() {
            this.volumeHandle.style.width = `${this.container.clientWidth - this.label.clientWidth}px`;
        }
        putVolumeHandle(event) {
            const halfLabel = this.label.clientWidth / 2;
            const volumeLeftCoor = this.volumeHandle.getBoundingClientRect().left;
            let volHandlPos = event.pageX - volumeLeftCoor;
            const elMaxWidth = this.container.clientWidth - halfLabel;
            if (volHandlPos >= elMaxWidth) {
                volHandlPos = elMaxWidth;
            }
            else if (volHandlPos <= halfLabel) {
                volHandlPos = halfLabel;
            }
            const calcCenterOfLable = volHandlPos - halfLabel;
            const volumeIndex = (calcCenterOfLable) / (this.container.clientWidth - halfLabel * 2);
            this.volumeHandle.style.width = `${calcCenterOfLable}px`;
            this.mediaElement.volume = volumeIndex;
        }
        render() {
            this.label = new element_builder_5.ElementBuilder('div').setClasses('label').build();
            this.volumeHandle = new element_builder_5.ElementBuilder('div').setClasses('volume-handle').setChildren(this.label).build();
            this.container = new element_builder_5.ElementBuilder('div').setClasses('volume').setChildren(this.volumeHandle).build();
            this.container.addEventListener('mousedown', (mouseDownEvent) => {
                this.putVolumeHandle(mouseDownEvent);
                const moveLable = (event) => {
                    this.putVolumeHandle(event);
                };
                document.addEventListener('mousemove', moveLable);
                const oneMouseUp = () => {
                    document.removeEventListener('mousemove', moveLable);
                    document.removeEventListener('mouseup', oneMouseUp);
                };
                document.addEventListener('mouseup', oneMouseUp);
            });
            return this.container;
        }
    }
    exports.VolumeComp = VolumeComp;
});
define("components/slider-frame.component", ["require", "exports", "services/service-locator", "utilities/element-builder", "components/media-length.component", "components/play-button.component", "components/timer.component", "components/volume.component"], function (require, exports, service_locator_2, element_builder_6, media_length_component_1, play_button_component_1, timer_component_1, volume_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SliderFrameComp = void 0;
    class SliderFrameComp {
        constructor(options) {
            this.mediaService = service_locator_2.ServiceLocator.inject(service_locator_2.Services.MEDIA_SERVICE);
            this.animationService = service_locator_2.ServiceLocator.inject(service_locator_2.Services.ANIMATION_SERVICE);
            this.options = options;
        }
        init() {
            this.volume.init();
        }
        render() {
            const source = new element_builder_6.ElementBuilder('source').setAttributes({ 'src': this.options.path }).build();
            const video = new element_builder_6.ElementBuilder('video').setChildren(source).build();
            const timer = new timer_component_1.TimerComp(video);
            video.addEventListener('canplay', () => {
                timer.showTime();
            });
            video.addEventListener('pause', () => {
                const id = this.animationService.getAnimationId();
                cancelAnimationFrame(id);
            });
            this.volume = new volume_component_1.VolumeComp(video);
            const mediaLength = new media_length_component_1.MediaLengthComp(video);
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
            const videoControls = new element_builder_6.ElementBuilder('div').setClasses('video-controls').setChildren(this.volume.render(), mediaLength.render()).build();
            const videoWrapper = new element_builder_6.ElementBuilder('div').setClasses('video-wrapper').setChildren(video, timer.render(), videoControls).build();
            const image = new element_builder_6.ElementBuilder('img').setAttributes({ 'src': this.options.bannerPath, 'alt': this.options.bannerDescription }).build();
            const handler = (isActive) => {
                image.style.display = isActive ? 'none' : 'block';
                if (isActive) {
                    this.mediaService.notifyMediaPlaying(this);
                    video.play();
                }
                else {
                    video.pause();
                }
            };
            const button = new play_button_component_1.PlayBtnComp(handler);
            this.mediaService.registerMediaPlaying((eventComp) => {
                if (eventComp !== this) {
                    image.style.display = 'block';
                    video.pause();
                    button.removePlayState();
                }
            });
            const frame = new element_builder_6.ElementBuilder('div').setClasses('frame').setChildren(videoWrapper, image, button.render()).build();
            const listItem = new element_builder_6.ElementBuilder('li').setChildren(frame).build();
            return listItem;
        }
    }
    exports.SliderFrameComp = SliderFrameComp;
});
define("services/media.service", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MediaService = void 0;
    class MediaService {
        constructor() {
            this.listeners = [];
        }
        registerMediaPlaying(listener) {
            this.listeners.push(listener);
        }
        notifyMediaPlaying(eventComp) {
            for (let listener of this.listeners) {
                listener(eventComp);
            }
        }
    }
    exports.MediaService = MediaService;
});
define("components/modal-window.componenet", ["require", "exports", "services/service-locator", "utilities/element-builder", "components/media-length.component", "components/play-button.component", "components/timer.component", "components/volume.component"], function (require, exports, service_locator_3, element_builder_7, media_length_component_2, play_button_component_2, timer_component_2, volume_component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModalWindowComp = void 0;
    class ModalWindowComp {
        constructor(audioSrc, movieName) {
            this.mediaService = service_locator_3.ServiceLocator.inject(service_locator_3.Services.MEDIA_SERVICE);
            this.animationService = service_locator_3.ServiceLocator.inject(service_locator_3.Services.ANIMATION_SERVICE);
            this.audioSrc = audioSrc;
            this.movieName = movieName;
        }
        closeListener() {
            document.body.classList.remove('lock');
            this.container.classList.add('visually-hidden');
            const closeMdlWindow = (event) => {
                if (event.propertyName === 'opacity') {
                    document.body.removeChild(this.container);
                    this.container.removeEventListener('transitionend', closeMdlWindow);
                }
            };
            this.container.addEventListener('transitionend', closeMdlWindow);
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.volume = 1;
            this.button.removePlayState();
            this.mediaLength.reset();
        }
        showModalWindow() {
            this.container.classList.remove('visually-hidden');
        }
        init() {
            this.volume.init();
        }
        render() {
            const btnHandler = (isActive) => {
                if (isActive) {
                    this.mediaService.notifyMediaPlaying();
                    this.audio.play();
                }
                else {
                    this.audio.pause();
                }
            };
            this.audio = new element_builder_7.ElementBuilder('audio').setAttributes({ 'src': this.audioSrc }).build();
            this.volume = new volume_component_2.VolumeComp(this.audio);
            const volume = this.volume.render();
            this.button = new play_button_component_2.PlayBtnComp(btnHandler);
            const buttonElement = this.button.render();
            this.mediaLength = new media_length_component_2.MediaLengthComp(this.audio);
            const mediaLength = this.mediaLength.render();
            const timer = new timer_component_2.TimerComp(this.audio);
            const timerElement = timer.render();
            const title = new element_builder_7.ElementBuilder('h2').setClasses('listener-title').build();
            title.textContent = this.movieName;
            const cross = new element_builder_7.ElementBuilder('span').setClasses('close-listener-cross').build();
            const closeModWin = new element_builder_7.ElementBuilder('a').setClasses('close-listener').setChildren(cross).build();
            const modWind = new element_builder_7.ElementBuilder('div').setClasses('soundtrack-listener').setChildren(this.audio, volume, title, buttonElement, mediaLength, timerElement, closeModWin).build();
            this.container = new element_builder_7.ElementBuilder('div').setClasses('substrate', 'visually-hidden').setChildren(modWind).build();
            this.container.addEventListener('click', (event) => {
                let element = event.target;
                while (element != null && element !== modWind) {
                    element = element.parentNode;
                }
                if (element == null) {
                    this.closeListener();
                }
            });
            closeModWin.addEventListener('click', () => {
                this.closeListener();
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
                }, 500);
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
    exports.ModalWindowComp = ModalWindowComp;
});
define("components/listen-button.component", ["require", "exports", "services/service-locator", "utilities/element-builder", "components/modal-window.componenet"], function (require, exports, service_locator_4, element_builder_8, modal_window_componenet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListenBtnComp = void 0;
    class ListenBtnComp {
        constructor(movieName, movieId) {
            this.dataService = service_locator_4.ServiceLocator.inject(service_locator_4.Services.DATA_SERVICE);
            this.movieName = movieName;
            this.movieId = movieId;
        }
        render() {
            const listenBtn = new element_builder_8.ElementBuilder('button').setClasses('listen').build();
            listenBtn.textContent = 'listen';
            listenBtn.addEventListener('click', () => {
                this.dataService.getAudioSourceById(this.movieId, (audio) => {
                    const modalWindow = new modal_window_componenet_1.ModalWindowComp(audio.audioPath, this.movieName);
                    document.body.appendChild(modalWindow.render());
                    modalWindow.init();
                    modalWindow.showModalWindow();
                });
            });
            return listenBtn;
        }
    }
    exports.ListenBtnComp = ListenBtnComp;
});
define("components/film-content.component", ["require", "exports", "utilities/element-builder", "components/listen-button.component"], function (require, exports, element_builder_9, listen_button_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilmContentComp = void 0;
    class FilmContentComp {
        constructor(positionMovie, titleMovie, aboutMovie, movieId) {
            this.positionMovie = positionMovie;
            this.titleMovie = titleMovie;
            this.aboutMovie = aboutMovie;
            this.movieId = movieId;
        }
        render() {
            const movieNumber = new element_builder_9.ElementBuilder('span').build();
            movieNumber.textContent = this.positionMovie;
            const movieTitle = new element_builder_9.ElementBuilder('h2').build();
            movieTitle.textContent = this.titleMovie;
            const compTitle = new element_builder_9.ElementBuilder('div').setClasses('film-title-content').setChildren(movieNumber, movieTitle).build();
            const movieAbout = new element_builder_9.ElementBuilder('p').build();
            movieAbout.textContent = this.aboutMovie;
            this.listenButton = new listen_button_component_1.ListenBtnComp(this.titleMovie, this.movieId);
            const compDescription = new element_builder_9.ElementBuilder('div').setClasses('film-description-content').setChildren(movieAbout, this.listenButton.render()).build();
            const filmContent = new element_builder_9.ElementBuilder('div').setClasses('film-content').setChildren(compTitle, compDescription).build();
            return filmContent;
        }
    }
    exports.FilmContentComp = FilmContentComp;
});
define("components/movie-section.component", ["require", "exports", "utilities/element-builder", "utilities/generate-movie-position", "components/film-content.component"], function (require, exports, element_builder_10, generate_movie_position_1, film_content_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MovieSectionComp = void 0;
    class MovieSectionComp {
        constructor(options, directionStrategy) {
            this.options = options;
            this.directionStrategy = directionStrategy;
        }
        get movieSection() {
            return this.section;
        }
        render() {
            const section = new element_builder_10.ElementBuilder('section');
            const descriptionContent = new element_builder_10.ElementBuilder('div').setClasses('description-content');
            const filmContent = new film_content_component_1.FilmContentComp(generate_movie_position_1.generateMoviePosition(this.options.position), this.options.name, this.options.description, this.options.id).render();
            this.directionStrategy.buildContent(section, descriptionContent, filmContent);
            const container = new element_builder_10.ElementBuilder('div').setClasses('container').setChildren(descriptionContent.build()).build();
            this.section = section.setChildren(container).build();
            return this.section;
        }
    }
    exports.MovieSectionComp = MovieSectionComp;
});
define("services/movie-section.service", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MovieSectionService = void 0;
    class MovieSectionService {
        constructor() {
            this.movieSectionContainer = {};
        }
        addSection(movieId, movie) {
            this.movieSectionContainer[movieId] = movie;
        }
        getSection(movieId) {
            return this.movieSectionContainer[movieId];
        }
    }
    exports.MovieSectionService = MovieSectionService;
});
define("components/scrollable.component", ["require", "exports", "services/service-locator"], function (require, exports, service_locator_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScrollableComp = void 0;
    class ScrollableComp {
        constructor(duration) {
            this.movieSection = service_locator_5.ServiceLocator.inject(service_locator_5.Services.MOVIE_SECTION_SERVICE);
            this.step = (newTimestamp) => {
                let toScroll = this.startingPosition + (this.distance * (newTimestamp - this.start)) / this.duration;
                if (toScroll >= this.endingPosition) {
                    toScroll = this.endingPosition;
                }
                this.page.scrollTop = toScroll;
                if (toScroll < this.endingPosition) {
                    requestAnimationFrame(this.step);
                }
            };
            this.duration = duration;
        }
        go() {
            this.start = performance.now();
            requestAnimationFrame(this.step);
        }
        scrollToFilm(movieId) {
            this.page = document.documentElement;
            this.startingPosition = this.page.scrollTop;
            this.endingPosition = this.movieSection.getSection(movieId).movieSection.offsetTop;
            this.distance = this.endingPosition - this.startingPosition;
            this.go();
        }
    }
    exports.ScrollableComp = ScrollableComp;
});
define("components/header.component", ["require", "exports", "services/service-locator", "utilities/element-builder", "utilities/generate-movie-position", "components/scrollable.component"], function (require, exports, service_locator_6, element_builder_11, generate_movie_position_2, scrollable_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeaderComp = void 0;
    class HeaderComp extends scrollable_component_1.ScrollableComp {
        constructor() {
            super(...arguments);
            this.dataService = service_locator_6.ServiceLocator.inject(service_locator_6.Services.DATA_SERVICE);
        }
        toggleBurger() {
            this.boxMenu.style.display = (this.boxMenu.style.display === 'block') ? 'none' : 'block';
            this.burgerImg.classList.toggle('pressed');
        }
        createGoToMenu() {
            const filmNav = new element_builder_11.ElementBuilder('ul').setClasses('film-nav').build();
            this.dataService.getAllMovies(data => {
                data
                    .map(movie => {
                    const linkToFilm = new element_builder_11.ElementBuilder('a').setClasses('top-film').build();
                    linkToFilm.textContent = generate_movie_position_2.generateMoviePosition(movie.position);
                    linkToFilm.addEventListener('click', (event) => {
                        event.preventDefault();
                        this.scrollToFilm(movie.id);
                        if (window.innerWidth < 768) {
                            this.toggleBurger();
                        }
                    });
                    return new element_builder_11.ElementBuilder('li').setChildren(linkToFilm).build();
                })
                    .reverse()
                    .forEach(child => {
                    filmNav.appendChild(child);
                });
            });
            return filmNav;
        }
        displayGoToMenuOnHover(goToMenuUnit, lastChildOfUnit) {
            goToMenuUnit.addEventListener('mouseenter', () => {
                lastChildOfUnit.style.display = 'block';
            });
            goToMenuUnit.addEventListener('mouseleave', () => {
                lastChildOfUnit.style.display = 'none';
            });
        }
        render() {
            this.boxMenu = new element_builder_11.ElementBuilder('ul')
                .setClasses('box-menu')
                .setChildren(...['search', 'add to the favorites', 'faq', 'go to'].map(searchMenu => {
                const linkTo = new element_builder_11.ElementBuilder('a').setClasses('box-menu-item').setAttributes({ 'href': '#' }).build();
                linkTo.textContent = searchMenu;
                const boxMenuNav = new element_builder_11.ElementBuilder('li');
                if (searchMenu === 'go to') {
                    boxMenuNav.setClasses('go-to');
                    const goToMenu = this.createGoToMenu();
                    const childOfBoxMenuNav = boxMenuNav.setChildren(linkTo, goToMenu).build();
                    this.displayGoToMenuOnHover(childOfBoxMenuNav, goToMenu);
                    return childOfBoxMenuNav;
                }
                return boxMenuNav.setChildren(linkTo).build();
            })).build();
            this.burgerImg = new element_builder_11.ElementBuilder('span').setAttributes({ 'id': 'burger-img' }).build();
            const navWrapper = new element_builder_11.ElementBuilder('div').setAttributes({ 'id': 'nav-wrapper' }).setChildren(this.burgerImg).build();
            navWrapper.addEventListener('click', event => {
                event.stopPropagation();
                this.toggleBurger();
            });
            document.addEventListener('click', event => {
                const target = event.target;
                if (window.innerWidth < 768 && target.closest('.box-menu') == undefined) {
                    this.boxMenu.style.display = 'none';
                    this.burgerImg.classList.remove('pressed');
                }
            });
            window.addEventListener('resize', () => {
                this.burgerImg.classList.remove('pressed');
                this.boxMenu.style.display = (window.innerWidth < 768) ? 'none' : 'block';
            });
            const nav = new element_builder_11.ElementBuilder('nav').setChildren(navWrapper, this.boxMenu).build();
            const logoImg = new element_builder_11.ElementBuilder('img').setAttributes({ 'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo' }).build();
            const logo = new element_builder_11.ElementBuilder('a').setClasses('logo').setAttributes({ 'href': '#' }).setChildren(logoImg).build();
            const container = new element_builder_11.ElementBuilder('div').setClasses('container').setChildren(logo, nav).build();
            return new element_builder_11.ElementBuilder('header').setChildren(container).build();
        }
    }
    exports.HeaderComp = HeaderComp;
});
define("strategies/aside-direction-strategy", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AsideDirectionStrategy = void 0;
    class AsideDirectionStrategy {
        constructor(bannerPath, shortDescription, straight) {
            this.bannerPath = bannerPath;
            this.shortDescription = shortDescription;
            this.straight = straight;
        }
        buildContent(section, descriptionContent, filmContent) {
            const picture = new element_builder_12.ElementBuilder('img');
            picture.setAttributes({ 'src': this.bannerPath, 'alt': this.shortDescription });
            const filmImage = new element_builder_12.ElementBuilder('div').setClasses('film-image').setChildren(picture.build()).build();
            if (this.straight) {
                section.setClasses('straight-direction-description', 'direction-description');
                descriptionContent.setChildren(filmImage, filmContent);
            }
            else {
                section.setClasses('reverse-direction-description', 'direction-description');
                descriptionContent.setChildren(filmContent, filmImage);
            }
        }
    }
    exports.AsideDirectionStrategy = AsideDirectionStrategy;
});
define("strategies/central-direction-strategy", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CentralDirectionStrategy = void 0;
    class CentralDirectionStrategy {
        constructor(cssClass) {
            this.cssClass = cssClass;
        }
        buildContent(section, descriptionContent, filmContent) {
            section.setClasses('central-direction-description', this.cssClass);
            descriptionContent.setChildren(filmContent);
        }
    }
    exports.CentralDirectionStrategy = CentralDirectionStrategy;
});
define("components/main-section.component", ["require", "exports", "services/service-locator", "utilities/element-builder", "components/scrollable.component"], function (require, exports, service_locator_7, element_builder_13, scrollable_component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainSectionComp = void 0;
    class MainSectionComp extends scrollable_component_2.ScrollableComp {
        constructor() {
            super(...arguments);
            this.arrowDown = `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" /></svg>`;
            this.dataService = service_locator_7.ServiceLocator.inject(service_locator_7.Services.DATA_SERVICE);
        }
        render() {
            const accentText = new element_builder_13.ElementBuilder('span').setClasses('accent-text').build();
            accentText.textContent = 'The 10';
            const mainThemeSentence = new element_builder_13.ElementBuilder('span').build();
            mainThemeSentence.innerHTML = '<br> Best Movie Soundtracks of All-Time';
            const mainTitle = new element_builder_13.ElementBuilder('h1').setChildren(accentText, mainThemeSentence).build();
            const mainSentence = new element_builder_13.ElementBuilder('p').build();
            mainSentence.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.';
            const arrowDown = new element_builder_13.ElementBuilder('a').setClasses('arrow-down', 'arrow').build();
            arrowDown.innerHTML = this.arrowDown;
            this.dataService.getAllMovies((movies) => {
                const lastMovie = movies[movies.length - 1];
                arrowDown.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.scrollToFilm(lastMovie.id);
                });
            });
            const container = new element_builder_13.ElementBuilder('div').setClasses('container').setChildren(mainTitle, mainSentence, arrowDown).build();
            const section = new element_builder_13.ElementBuilder('section').setClasses('main-section').setChildren(container).build();
            return section;
        }
    }
    exports.MainSectionComp = MainSectionComp;
});
define("components/sign-up.component", ["require", "exports", "utilities/element-builder"], function (require, exports, element_builder_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SignUpComp = void 0;
    class SignUpComp {
        render() {
            const textInput = new element_builder_14.ElementBuilder('input').setAttributes({ 'type': 'text', 'name': 'email', 'placeholder': 'enter your email', 'autocomplete': 'off' }).build();
            const submitInput = new element_builder_14.ElementBuilder('input').setAttributes({ 'type': 'submit', 'value': 'submit' }).build();
            const emailSpace = new element_builder_14.ElementBuilder('div').setClasses('email-space').setChildren(textInput, submitInput).build();
            const form = new element_builder_14.ElementBuilder('form').setChildren(emailSpace).build();
            const sighUpTitle = new element_builder_14.ElementBuilder('h2').build();
            sighUpTitle.textContent = 'Sign up to receive the latest updates and news';
            const appeal = new element_builder_14.ElementBuilder('div').setClasses('appeal').setChildren(sighUpTitle, form).build();
            const container = new element_builder_14.ElementBuilder('container').setChildren(appeal).build();
            return new element_builder_14.ElementBuilder('section').setClasses('sign-up').setChildren(container).build();
        }
    }
    exports.SignUpComp = SignUpComp;
});
define("components/slider.component", ["require", "exports", "utilities/element-builder", "components/slider-frame.component"], function (require, exports, element_builder_15, slider_frame_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SliderComp = void 0;
    class SliderComp {
        constructor(content, initialIndex) {
            this.arrowLeft = `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 41.5L2 21.5M2 21.5L28 1M2 21.5L60 21.5" stroke-width="2" /></svg>`;
            this.arrowRight = `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 41.5L58 21.5M58 21.5L32 1M58 21.5L0 21.5" stroke-width="2" /></svg>`;
            this.sliderFrameComponent = [];
            this.content = content;
            this.currentIndex = initialIndex;
            this.maxIndex = this.content.length - 1;
        }
        createArrow(arrowDirection, svg) {
            const arrow = new element_builder_15.ElementBuilder('a').setClasses(arrowDirection, 'arrow').setAttributes({ 'href': '#' }).build();
            arrow.innerHTML = svg;
            return arrow;
        }
        settingTranslateX() {
            if (this.currentIndex <= 0) {
                this.currentIndex = 0;
            }
            else if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = this.maxIndex;
            }
            this.framesLine.style.transform = `translateX(${-this.currentIndex * 100}%)`;
        }
        init() {
            for (let slideFrameItem of this.sliderFrameComponent) {
                slideFrameItem.init();
            }
        }
        render() {
            const sliderFrames = this.content.map((frameOptions) => {
                const slide = new slider_frame_component_1.SliderFrameComp(frameOptions);
                this.sliderFrameComponent.push(slide);
                return slide.render();
            });
            this.framesLine = new element_builder_15.ElementBuilder('ul').setChildren(...sliderFrames).build();
            const arrowLeft = this.createArrow('arrow-left', this.arrowLeft);
            const arrowRight = this.createArrow('arrow-right', this.arrowRight);
            arrowLeft.addEventListener('click', (event) => {
                event.preventDefault();
                this.currentIndex--;
                this.settingTranslateX();
            });
            arrowRight.addEventListener('click', (event) => {
                event.preventDefault();
                this.currentIndex++;
                this.settingTranslateX();
            });
            this.settingTranslateX();
            const slidesWrapper = new element_builder_15.ElementBuilder('div').setClasses('slides-wrapper').setChildren(arrowLeft, arrowRight, this.framesLine).build();
            const container = new element_builder_15.ElementBuilder('div').setClasses('container').setChildren(slidesWrapper).build();
            const section = new element_builder_15.ElementBuilder('section').setClasses('slider').setChildren(container).build();
            return section;
        }
    }
    exports.SliderComp = SliderComp;
});
define("components/wrapper.component", ["require", "exports", "services/service-locator", "strategies/aside-direction-strategy", "strategies/central-direction-strategy", "utilities/element-builder", "components/main-section.component", "components/movie-section.component", "components/sign-up.component", "components/slider.component"], function (require, exports, service_locator_8, aside_direction_strategy_1, central_direction_strategy_1, element_builder_16, main_section_component_1, movie_section_component_1, sign_up_component_1, slider_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WrapperComp = void 0;
    class WrapperComp {
        constructor() {
            this.movieSectionService = service_locator_8.ServiceLocator.inject(service_locator_8.Services.MOVIE_SECTION_SERVICE);
            this.dataService = service_locator_8.ServiceLocator.inject(service_locator_8.Services.DATA_SERVICE);
        }
        setWrapperChildren(element) {
            element.appendChild(new main_section_component_1.MainSectionComp(300).render());
            const centralClasses = ['star-wars', 'runner', 'godfuther'];
            let centralClassesPosition = 0;
            this.dataService.getAllMovies(data => {
                for (let i = data.length - 1; i >= 0; i--) {
                    const optionsAsync = data[i];
                    const indicatorAsync = i % 3;
                    let strategyAsync;
                    if (indicatorAsync === 0 || indicatorAsync === 2) {
                        strategyAsync = new aside_direction_strategy_1.AsideDirectionStrategy(optionsAsync.bannerPath, optionsAsync.shortDescription, indicatorAsync === 0);
                    }
                    else {
                        strategyAsync = new central_direction_strategy_1.CentralDirectionStrategy(centralClasses[centralClassesPosition]);
                        centralClassesPosition++;
                    }
                    const componenetInstance = new movie_section_component_1.MovieSectionComp(optionsAsync, strategyAsync);
                    this.movieSectionService.addSection(optionsAsync.id, componenetInstance);
                    element.appendChild(componenetInstance.render());
                    if (i % 3 === 1) {
                        const sliderOptions = [];
                        for (let j = i + 2; j >= i; j--) {
                            sliderOptions.push(data[j].video);
                        }
                        const slider = new slider_component_1.SliderComp(sliderOptions, 1);
                        element.appendChild(slider.render());
                        slider.init();
                    }
                }
                element.appendChild(new sign_up_component_1.SignUpComp().render());
            });
            return element;
        }
        render() {
            return this.setWrapperChildren(new element_builder_16.ElementBuilder('main').build());
        }
    }
    exports.WrapperComp = WrapperComp;
});
define("components/application.componenet", ["require", "exports", "components/footer.component", "components/header.component", "components/wrapper.component"], function (require, exports, footer_component_1, header_component_1, wrapper_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppComp = void 0;
    class AppComp {
        init() {
            document.body.appendChild(new header_component_1.HeaderComp(300).render());
            document.body.appendChild(new wrapper_component_1.WrapperComp().render());
            document.body.appendChild(new footer_component_1.FooterComp().render());
        }
    }
    exports.AppComp = AppComp;
});
define("index", ["require", "exports", "components/application.componenet", "services/animation.service", "services/data.service", "services/media.service", "services/movie-section.service", "services/service-locator"], function (require, exports, application_componenet_1, animation_service_1, data_service_1, media_service_1, movie_section_service_1, service_locator_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    'use strict';
    service_locator_9.ServiceLocator.register(service_locator_9.Services.MEDIA_SERVICE, new media_service_1.MediaService());
    service_locator_9.ServiceLocator.register(service_locator_9.Services.ANIMATION_SERVICE, new animation_service_1.AnimationService());
    service_locator_9.ServiceLocator.register(service_locator_9.Services.MOVIE_SECTION_SERVICE, new movie_section_service_1.MovieSectionService());
    service_locator_9.ServiceLocator.register(service_locator_9.Services.DATA_SERVICE, new data_service_1.DataService());
    new application_componenet_1.AppComp().init();
});
//# sourceMappingURL=index.js.map