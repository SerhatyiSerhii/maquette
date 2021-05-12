'use strict';

function stopVideoPlaying(element) {
    var elementParent = element.parentNode;

    element.pause();

    var children = elementParent.parentNode.children;

    for (var child of children) {
        if (child.hasAttribute('src')) {
            child.style.display = 'block';
        } else if (child.classList.contains('btn-play', 'promo-video')) {
            child.classList.remove('play-active');
        };
    }
}

function AnimationService() { }

AnimationService._requestAnimationFrameId = null;

AnimationService.setAnimationId = function (id) {
    AnimationService._requestAnimationFrameId = id;
}

AnimationService.getAnimationId = function () {
    return AnimationService._requestAnimationFrameId;
}

// Modale window component
function ModalWindowComp(audioSrc, movieName) {
    this._container = null;
    this._audio = null;
    this._button = null;
    this._mediaLength = null;
    this._timer = null;
    this._title = null;
    this._volume = null;
    this._audioSrc = audioSrc;
    this._movieName = movieName;
}

ModalWindowComp.prototype._closeListener = function () {
    var self = this;

    document.body.classList.remove('lock');

    this._container.classList.add('visually-hidden');

    this._container.addEventListener('transitionend', function closeMdlWindow(event) {
        if (event.propertyName === 'opacity') {
            document.body.removeChild(self._container); // TODO: what if last child changed? you have modal window in container property     Corrected
            self._container.removeEventListener('transitionend', closeMdlWindow);
        }
    });

    this._audio.pause();
    this._audio.currentTime = 0;
    this._audio.volume = 1;

    this._button.removePlayState();

    this._mediaLength.reset();
}

ModalWindowComp.prototype.removeHiddenClass = function () {
    // this._container.classList.remove('hidden'); // TODO: what is the sense of this class?     Only set style display:none. Removed such class.
    this._container.style.display = 'flex';
}

ModalWindowComp.prototype.showModalWindow = function () {
    this._container.classList.remove('visually-hidden');
}

// ModalWindowComp.prototype.setAudioSrc = function (audioAtr) { // TODO: title and src must be sent through constructor    Corrected
//     this._audio.setAttribute('src', 'audios/' + audioAtr + '.ogg');
// }

// ModalWindowComp.prototype.setTitle = function (titleAtr) {
//     this._title.textContent = titleAtr;
// }

// TODO: good idea and bad implementation
ModalWindowComp.prototype.init = function () {

    return this._volume.init();
}

ModalWindowComp.prototype.render = function () {
    var self = this;
    this._audio = new ElementBuilder('audio').build();
    this._audio.setAttribute('src', 'audios/' + this._audioSrc + '.ogg');

    this._volume = new VolumeComp(this._audio);
    var volume = this._volume.render();

    this._button = new PlayBtnComp(btnHandler);
    var buttonEl = this._button.render();

    this._mediaLength = new MediaLengthComp(this._audio);
    var mediaLength = this._mediaLength.render();

    this._timer = new TimerComp(this._audio);
    var timer = this._timer.render();

    this._title = new ElementBuilder('h2').setClasses('listener-title').build();
    this._title.textContent = this._movieName;

    var cross = new ElementBuilder('span').setClasses('close-listener-cross').build();

    var closeModWin = new ElementBuilder('a').setClasses('close-listener').setChildren([cross]).build();

    var modWind = new ElementBuilder('div').setClasses('soundtrack-listener').setChildren([this._audio, volume, this._title, buttonEl, mediaLength, timer, closeModWin]).build();

    this._container = new ElementBuilder('div').setClasses('substrate', 'visually-hidden').setChildren([modWind]).build();

    this._container.addEventListener('click', function (event) {
        var element = event.target;

        while (element != null && element !== modWind) {
            element = element.parentNode;
        }

        if (element == null) {
            self._closeListener();
        }
    });

    closeModWin.addEventListener('click', function () {
        self._closeListener();
    });

    this._audio.addEventListener('canplay', function () {
        self._timer.showTime();
    });

    this._audio.addEventListener('ended', function () {
        setTimeout(function () {
            self._button.removePlayState();
            self._mediaLength.reset();
            self._audio.currentTime = 0;
            self._timer.showTime();
        }, 500)
    });

    this._audio.addEventListener('playing', function () {
        self._mediaLength.progress(function () {
            self._timer.showTime();
        });
    });

    this._audio.addEventListener('pause', function () {
        var id = AnimationService.getAnimationId();

        cancelAnimationFrame(id);
    });

    function btnHandler(isActive) {
        var allVideos = document.getElementsByTagName('video');

        for (var j = 0; j < allVideos.length; j++) {
            stopVideoPlaying(allVideos[j]);
        }

        if (isActive) {
            self._audio.play();
        } else {
            self._audio.pause();
        }
    }

    document.body.classList.add('lock');

    return this._container;
}

function ListenBtnComp(movieName, audioName) {
    this._container = null;
    this._movieName = movieName;
    this._audioName = audioName;
}

// TODO:
// firstly, these methods look like private.
// secondly, you don't need these attributes at all anymore
// we used data attributes as 'data sources' just to show, that html elements can store some data inside.
// but now you can get data from closure, so you don't need to store in data attributes
// Corrected

ListenBtnComp.prototype.render = function () {
    var self = this;

    this._container = new ElementBuilder('button').setClasses('listen').build();

    this._container.textContent = 'listen';

    this._container.addEventListener('click', function () {

        var modalWindow = new ModalWindowComp(self._audioName, self._movieName);

        document.body.appendChild(modalWindow.render());

        setTimeout(function () {
            modalWindow.removeHiddenClass();
            modalWindow.init();
            setTimeout(function () {
                modalWindow.showModalWindow();
            }, 20);
        }, 20);
    });

    return this._container;
}

function PlayBtnComp(handler) {
    this._buttonEl = null;
    this._handler = handler;
}

PlayBtnComp.prototype.removePlayState = function () {
    this._buttonEl.classList.remove('play-active');
}

PlayBtnComp.prototype.render = function () {
    this._buttonEl = new ElementBuilder('button').setClasses('btn-play').build();

    var self = this;

    this._buttonEl.addEventListener('click', function () {
        self._buttonEl.classList.toggle('play-active');

        var isActive = self._buttonEl.classList.contains('play-active');

        self._handler(isActive);
    });

    return this._buttonEl;
}

function MediaLengthComp(mediaElement) {
    this._container = null;
    this._currentLength = null;
    this._mediaElement = mediaElement;
}

MediaLengthComp.prototype._setMediaVolumeInBarWidth = function (event) {
    var barWidth = this._container.clientWidth;
    var inBarXCoor = this._currentLength.getBoundingClientRect().left;
    var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
    this._currentLength.style.width = inBarPosition + '%';

    this._mediaElement.currentTime = (inBarPosition * this._mediaElement.duration) / 100;
}

MediaLengthComp.prototype.progress = function (onProgress) {
    var self = this;

    var position = (this._mediaElement.currentTime / this._mediaElement.duration) * 100;

    this._currentLength.style.width = position + '%';

    onProgress();

    if (position < 100) {
        var id = requestAnimationFrame(function () {
            self.progress(onProgress);
        });

        AnimationService.setAnimationId(id);
    }
}

MediaLengthComp.prototype.reset = function () {
    this._currentLength.style.width = 0;
}

MediaLengthComp.prototype.render = function () {
    this._currentLength = new ElementBuilder('div').setClasses('current-length').build();

    this._container = new ElementBuilder('div').setClasses('media-length').setChildren([this._currentLength]).build();

    var self = this;

    this._container.addEventListener('click', function () {
        var id = AnimationService.getAnimationId();

        cancelAnimationFrame(id);
        self._setMediaVolumeInBarWidth(event);
    });

    return this._container;
}

function VolumeComp(mediaElement) {
    this._container = null;
    this._label = null;
    this._volumeHandle = null;
    this._mediaElement = mediaElement;
}

VolumeComp.prototype.init = function () {
    return this._volumeHandle.style.width = (this._container.clientWidth - this._label.clientWidth) + 'px';
}

VolumeComp.prototype._putVolumeHandle = function (event) {
    var halfLabel = this._label.clientWidth / 2;
    var volumeLeftCoor = this._volumeHandle.getBoundingClientRect().left;
    var volHandlPos = event.pageX - volumeLeftCoor;
    var elMaxWidth = this._container.clientWidth - halfLabel;

    if (volHandlPos >= elMaxWidth) {
        volHandlPos = elMaxWidth;
    } else if (volHandlPos <= halfLabel) {
        volHandlPos = halfLabel;
    }

    var calcCenterOfLable = volHandlPos - halfLabel;

    this._volumeHandle.style.width = calcCenterOfLable + 'px';

    var volumeIndex = (calcCenterOfLable) / (this._container.clientWidth - halfLabel * 2);

    this._mediaElement.volume = volumeIndex;
}

VolumeComp.prototype.render = function () {
    this._label = new ElementBuilder('div').setClasses('label').build();
    this._volumeHandle = new ElementBuilder('div').setClasses('volume-handle').setChildren([this._label]).build();
    this._container = new ElementBuilder('div').setClasses('volume').setChildren([this._volumeHandle]).build();

    var self = this;

    this._container.addEventListener('mousedown', function (mouseDownEvent) {

        self._putVolumeHandle(mouseDownEvent);

        document.addEventListener('mousemove', moveLable);

        function moveLable(event) {
            self._putVolumeHandle(event);
        }

        document.addEventListener('mouseup', function oneMouseUp() {
            document.removeEventListener('mousemove', moveLable);
            document.removeEventListener('mouseup', oneMouseUp);
        });
    });

    return this._container;
}

function TimerComp(mediaElement) {
    this._container = null;
    this._mediaElement = mediaElement;
}

TimerComp.prototype._calcTime = function (time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);

    min = (min < 10) ? '0' + min : min;
    sec = (sec < 10) ? '0' + sec : sec;
    return min + ':' + sec;
}

TimerComp.prototype.showTime = function () {
    var minSecCurTime = this._calcTime(this._mediaElement.currentTime);
    var minSecDurat = this._calcTime(this._mediaElement.duration);

    this._container.textContent = minSecCurTime + ' / ' + minSecDurat;
}

TimerComp.prototype.render = function () {

    this._container = new ElementBuilder('div').setClasses('timer').build();

    this._container.textContent = '00:00 / 00:00';

    return this._container;
}

function ElementBuilder(elementName) {
    this._tagName = elementName;
    this._classes = null;
    this._attributes = null;
    this._children = null;
}

ElementBuilder.prototype.setClasses = function (...classes) {

    this._classes = classes;

    return this;
}

ElementBuilder.prototype.setAttributes = function (obj) {

    this._attributes = obj;

    return this;
}

ElementBuilder.prototype.setChildren = function (children) {

    this._children = children;

    return this;
}

ElementBuilder.prototype.build = function () {
    var element = document.createElement(this._tagName);

    if (this._classes != null) {
        for (var item of this._classes) {
            element.classList.add(item);
        }
    }

    for (var key in this._attributes) {
        if (this._attributes.hasOwnProperty(key)) {
            element.setAttribute(key, this._attributes[key]);
        }
    }

    if (this._children != null) {
        for (var child of this._children) {
            element.appendChild(child);
        }
    }

    return element;
}

document.addEventListener('DOMContentLoaded', function () {

    function setAttribute(element, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                element.setAttribute(key, obj[key]);
            }
        }
    }

    function makeElem(element, ...classes) {
        var elem = document.createElement(element);

        for (var item of classes) {
            elem.classList.add(item);
        }

        return elem;
    }

    function insert(map) {
        map.forEach(function (value, key) {
            for (var item of value) {
                key.appendChild(item);
            }
        });
    }

    // Adding header
    function createHeader(array) {

        var makeHeader = makeElem('header');

        var makeContainer = makeElem('div', 'container');

        var makeLogo = makeElem('a', 'logo');
        setAttribute(makeLogo, { 'href': '#' })

        var makeLogoImg = makeElem('img');
        setAttribute(makeLogoImg, { 'src': 'images/the-top-logo.svg', 'alt': 'the-top-logo' });

        var makeNav = makeElem('nav');

        var makeNavWrapper = makeElem('div');
        setAttribute(makeNavWrapper, { 'id': 'nav-wrapper' })

        makeNavWrapper.addEventListener('click', function (event) {
            event.stopPropagation();
            toggleBurger();
        });

        var makeBurger = makeElem('span');
        setAttribute(makeBurger, { 'id': 'burger-img' })

        var makeUl = makeElem('ul', 'box-menu');

        var mainMap = new Map([
            [makeHeader, [makeContainer]],
            [makeLogo, [makeLogoImg]],
            [makeContainer, [makeLogo, makeNav]],
            [makeNav, [makeNavWrapper, makeUl]],
            [makeNavWrapper, [makeBurger]],
            [document.body, [makeHeader]]
        ]);

        insert(mainMap);

        var navigation = ['Search', 'Add to the Favorites', 'FAQ', 'Go to'];

        navigation.forEach(function (item) {
            var makeListItm = makeElem('li');

            var makeLink = makeElem('a', 'box-menu-item');
            setAttribute(makeLink, { 'href': '#' });
            makeLink.textContent = item;

            var navigationMap = new Map([
                [makeUl, [makeListItm]],
                [makeListItm, [makeLink]]
            ]);

            insert(navigationMap);

            if (item === 'Go to') {
                makeListItm.classList.add('go-to');

                var makeFilmNav = makeElem('ul', 'film-nav');

                makeListItm.addEventListener('mouseenter', function () {
                    makeFilmNav.style.display = 'block';
                });

                makeListItm.addEventListener('mouseleave', function () {
                    makeFilmNav.style.display = 'none';
                });

                var goToMap = new Map();
                goToMap.set(makeListItm, [makeFilmNav]);
                insert(goToMap);

                for (var element of array) {
                    var makeListItm = makeElem('li');

                    var makeLink = makeElem('a', 'top-film');
                    setAttribute(makeLink, { 'href': '#top-' + element });
                    makeLink.textContent = '.' + element;

                    var topFilmMap = new Map([
                        [makeFilmNav, [makeListItm]],
                        [makeListItm, [makeLink]]
                    ]);

                    insert(topFilmMap);

                    makeLink.addEventListener('click', function (event) {
                        event.preventDefault();
                        var topLink = this.getAttribute('href');
                        scrollToFilm(topLink);

                        if (window.innerWidth < 768) {
                            toggleBurger();
                        }
                    });
                }
            }
        });

        document.addEventListener('click', function (event) {
            if (window.innerWidth < 768 && event.target.closest('.box-menu') == undefined) {
                makeUl.style.display = 'none';
                makeBurger.classList.remove('pressed');
            }
        });

        window.addEventListener('resize', function () {
            makeBurger.classList.remove('pressed');
            makeUl.style.display = (window.innerWidth < 768) ? 'none' : 'block';
        });

        function toggleBurger() {
            makeUl.style.display = (makeUl.style.display === 'block') ? 'none' : 'block';
            makeBurger.classList.toggle('pressed');
        }
    }

    // Adding main Section
    function createMainSection(main) {

        var makeSection = makeElem('section', 'main-section');

        var makeContainer = makeElem('div', 'container');

        var makeH1 = makeElem('h1');

        var makeSpan = makeElem('span', 'accent-text');
        makeSpan.textContent = 'The 10';

        var makeMainP = makeElem('p');
        makeMainP.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.'

        var makeArrowDown = makeElem('a', 'arrow-down', 'arrow');
        setAttribute(makeArrowDown, { 'href': '#top-10' });
        makeArrowDown.innerHTML = (
            `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" />
            </svg>`
        );

        makeArrowDown.addEventListener('click', function (event) {
            event.preventDefault();
            var firstTopFilm = this.getAttribute('href');
            scrollToFilm(firstTopFilm);
        });

        var map = new Map([
            [makeSection, [makeContainer]],
            [makeH1, [makeSpan, document.createElement('br'), document.createTextNode('Best Movie Soundtracks of All-Time')]],
            [makeContainer, [makeH1, makeMainP, makeArrowDown]],
            [main, [makeSection]]
        ]);

        insert(map);
    }

    // Adding movie section
    function createMovieSection(mainObj, main) {

        var makeSection = makeElem('section', mainObj.sectionClass, 'direction-description');
        setAttribute(makeSection, { 'id': 'top-' + mainObj.position, 'data-name': mainObj.name, 'data-audio-name': mainObj.audioName });

        var makeContainer = makeElem('div', 'container');

        var makeDescriptionContent = makeElem('div', 'description-content');

        if (mainObj.sectionClass === 'central-direction-description') {
            makeSection.classList.add(mainObj.imgClass);
        } else {
            var makeFilmImage = makeElem('div', 'film-image');

            var makeImage = makeElem('img');
            setAttribute(makeImage, { 'src': mainObj.imgSrc, 'alt': mainObj.imgAlt });

            var imgMap = new Map();
            imgMap.set(makeFilmImage, [makeImage]);
            insert(imgMap);
        }

        var makeFilmContent = makeElem('div', 'film-content');

        var makeFilmTitleContent = makeElem('div', 'film-title-content');

        var makeSpan = makeElem('span');
        makeSpan.textContent = '.' + mainObj.position;

        var makeH2 = makeElem('h2');
        makeH2.textContent = mainObj.name;

        var makeFilmDescripContent = makeElem('div', 'film-description-content');

        var makeAboutFilm = makeElem('p');
        makeAboutFilm.textContent = mainObj.about;

        var button = new ListenBtnComp(mainObj.name, mainObj.audioName);

        var map = new Map([
            [makeSection, [makeContainer]],
            [makeContainer, [makeDescriptionContent]],
            [makeFilmTitleContent, [makeSpan, makeH2]],
            [makeFilmContent, [makeFilmTitleContent, makeFilmDescripContent]],
            [makeFilmDescripContent, [makeAboutFilm, button.render()]],
            [main, [makeSection]]
        ]);

        insert(map);

        var sectionMap = new Map();

        switch (mainObj.sectionClass) {
            case 'straight-direction-description':
                sectionMap.set(makeDescriptionContent, [makeFilmImage, makeFilmContent]);
                break;
            case 'reverse-direction-description':
                sectionMap.set(makeDescriptionContent, [makeFilmContent, makeFilmImage]);
                break;
            default:
                sectionMap.set(makeDescriptionContent, [makeFilmContent]);
                break;
        }

        insert(sectionMap);
    }

    // Adding slider
    function createSlider(array, main) {
        var makeSection = makeElem('section', 'slider');

        var makeContainer = makeElem('div', 'container');

        var makeSlidesWrapper = makeElem('div', 'slides-wrapper');

        var arrows = [
            {
                classDirection: 'arrow-left',
                svg: (
                    `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27 41.5L2 21.5M2 21.5L28 1M2 21.5L60 21.5" stroke-width="2" />
                    </svg>`
                )
            },
            {
                classDirection: 'arrow-right',
                svg: (
                    `<svg width="60" height="43" viewBox="0 0 60 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33 41.5L58 21.5M58 21.5L32 1M58 21.5L0 21.5" stroke-width="2" />
                    </svg>`
                )
            }
        ];

        var arrowElements = [];

        arrows.forEach(function (element) {
            var makeArrow = makeElem('a', element.classDirection, 'arrow');
            setAttribute(makeArrow, { 'href': '#' });
            makeArrow.innerHTML = element.svg;
            arrowElements.push(makeArrow);

            var arrowsMap = new Map([
                [makeSlidesWrapper, [makeArrow]]
            ]);

            insert(arrowsMap);
        });

        var makeUL = makeElem('ul');

        array.forEach(function (element) {
            var makeListItm = makeElem('li');

            var makeFrame = makeElem('div', 'frame');

            var makeVideoWrapper = makeElem('div', 'video-wrapper');

            var makeVideo = makeElem('video');

            makeVideo.addEventListener('canplay', function () {
                timer.showTime();
            });

            makeVideo.addEventListener('pause', function () {
                var id = AnimationService.getAnimationId();

                cancelAnimationFrame(id);
            });

            var makeSource = makeElem('source');
            setAttribute(makeSource, { 'src': element.src });

            var timer = new TimerComp(makeVideo);

            var makeVideoControls = makeElem('div', 'video-controls');

            var volume = new VolumeComp(makeVideo);

            var makeVolume = volume.render();

            var mediaLength = new MediaLengthComp(makeVideo);

            makeVideo.addEventListener('playing', function () {
                mediaLength.progress(function () {
                    timer.showTime();
                });
            });

            makeVideo.addEventListener('ended', function () {
                var thisVideo = this;

                setTimeout(function () {
                    stopVideoPlaying(thisVideo);
                    mediaLength.reset();
                    thisVideo.currentTime = 0;
                }, 500);
            });

            var makeImage = makeElem('img');
            setAttribute(makeImage, { 'src': element.imgSrc, 'alt': element.imgAlt });

            var button = new PlayBtnComp(handler);

            function handler(isActive) {

                makeImage.style.display = isActive ? 'none' : 'block';

                var currentVideo = makeVideo;
                var allVideos = document.querySelectorAll('video');

                for (var video of allVideos) {
                    if (video !== currentVideo) {
                        stopVideoPlaying(video);
                    }
                }

                if (isActive) {
                    currentVideo.play();
                } else {
                    currentVideo.pause();
                }
            }



            function initSlider(index) {
                var currIndex = index;
                var maxIndex = array.length - 1;
                settingTranslateX();

                var arrowLeft = arrowElements[0];
                var arrowRight = arrowElements[1];

                arrowLeft.addEventListener('click', function (event) {
                    event.preventDefault();

                    currIndex--;
                    settingTranslateX();
                });

                arrowRight.addEventListener('click', function (event) {
                    event.preventDefault();

                    currIndex++;
                    settingTranslateX();
                });

                function settingTranslateX() {
                    if (currIndex <= 0) {
                        currIndex = 0;
                    } else if (currIndex >= maxIndex) {
                        currIndex = maxIndex;
                    }
                    makeUL.style.transform = 'translateX(' + -currIndex * 100 + '%)';
                }
            }

            initSlider(1);

            var arrayMap = new Map([
                [makeUL, [makeListItm]],
                [makeListItm, [makeFrame]],
                [makeFrame, [makeVideoWrapper, makeImage, button.render()]],
                [makeVideoWrapper, [makeVideo, timer.render(), makeVideoControls]],
                [makeVideo, [makeSource]],
                [makeVideoControls, [makeVolume, mediaLength.render()]]
            ]);

            insert(arrayMap);
        });

        var map = new Map([
            [makeSection, [makeContainer]],
            [makeContainer, [makeSlidesWrapper]],
            [makeSlidesWrapper, [makeUL]],
            [main, [makeSection]]
        ]);

        insert(map);
    }

    // Adding Sign Up section
    function createSignUp(main) {
        var makeSignUp = makeElem('section', 'sign-up');

        var makeContainer = makeElem('div', 'container');

        var makeAppeal = makeElem('div', 'appeal');

        var makeH2 = makeElem('h2');
        makeH2.textContent = 'Sign up to receive the latest updates and news';

        var makeForm = makeElem('form');

        var makeEmailSpace = makeElem('div', 'email-space');

        var map = new Map([
            [makeSignUp, [makeContainer]],
            [makeContainer, [makeAppeal]],
            [makeAppeal, [makeH2, makeForm]],
            [makeForm, [makeEmailSpace]],
            [makeEmailSpace, [document.createElement('input'), document.createElement('input')]],
            [main, [makeSignUp]]
        ]);

        insert(map);

        var submitBtn = makeEmailSpace.children;

        var enterEmail = submitBtn[0];
        var submitBtn = submitBtn[1];

        setAttribute(enterEmail, { 'type': 'text', 'name': 'email', 'placeholder': 'enter your email', 'autocomplete': 'off' });

        setAttribute(submitBtn, { 'type': 'submit', 'value': 'submit' });
    }


    // Adding footer element to page
    function createFooter() {
        var makeFooter = makeElem('footer');

        var makeContainer = makeElem('div', 'container');

        // Adding branches into footer
        var containerBranches = ['policy', 'social-media'];

        containerBranches.forEach(function (element) {
            var makeUL = makeElem('ul', element);

            var branchesMap = new Map([
                [makeContainer, [makeUL]]
            ]);

            insert(branchesMap);
        });

        // Adding policies
        var policies = ['privacy policy', 'cookie policy'];

        policies.forEach(function (element) {
            var makeListItm = makeElem('li');
            var makeLink = makeElem('a');
            setAttribute(makeLink, { 'href': '#' });
            makeLink.textContent = element;

            var policiesMap = new Map([
                [makeListItm, [makeLink]],
                [makeContainer.firstChild, [makeListItm]]
            ]);

            insert(policiesMap);
        });

        // Adding social media buttons
        var sMChildren = [
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

        for (var i = 0; i < sMChildren.length; i++) {
            var makeListItm = makeElem('li');
            var makeLink = makeElem('a', 'circle');
            setAttribute(makeLink, { 'href': '#' });
            makeLink.innerHTML = sMChildren[i];

            var socMedMap = new Map([
                [makeListItm, [makeLink]],
                [makeContainer.lastChild, [makeListItm]]
            ]);

            insert(socMedMap);
        }

        var map = new Map([
            [makeFooter, [makeContainer]],
            [document.body, [makeFooter]]
        ]);

        insert(map);
    }

    function setVolumeAfterAppend() {
        var volume = document.getElementsByClassName('volume');

        for (var item of volume) {
            var volumeHandle = item.querySelector('.volume-handle');
            var volumeLable = item.querySelector('.label');

            volumeHandle.style.width = (item.clientWidth - volumeLable.clientWidth) + 'px';
        }
    }

    createHeader(['10', '09', '08', '07', '06', '05', '04', '03', '02', '01']);
    var makeMain = document.body.appendChild(document.createElement('main'));
    createMainSection(makeMain);
    createMovieSection(
        {
            sectionClass: 'straight-direction-description',
            position: '10',
            name: 'GUARDIANS OF THE GALAXY VOL. 2',
            audioName: 'guardinas-of-the-galaxy-vol-2',
            imgSrc: 'images/guardians.jpg',
            imgAlt: 'guardians of the galaxy',
            about: `While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians
            of the Galaxy Vol. 2 that improved on the formula. The first film featured songs that were
            fun and upbeat but didn't have much to do with the film's story.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'reverse-direction-description',
            position: '09',
            name: 'JURASSIC PARK',
            audioName: 'jurassic-park',
            imgSrc: 'images/jurassic.jpg',
            imgAlt: 'jurassic park',
            about: `John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score for
            Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further
            brought to life by Williams' music.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'central-direction-description',
            imgClass: 'star-wars',
            position: '08',
            name: 'STAR WARS: A NEW HOPE',
            audioName: 'star-wars-a-new-hope',
            about: `When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That
            was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and
            so many more great tracks.`
        },
        makeMain
    );
    createSlider(
        [
            {
                src: 'videos/star-wars-a-new-hope.mp4',
                imgSrc: 'images/conference_room.jpg',
                imgAlt: 'Dart Waider at the conference room'
            },

            {
                src: 'videos/jurassic-park.mp4',
                imgSrc: 'images/dino_pet.jpg',
                imgAlt: 'petting the dino'
            },

            {
                src: 'videos/guardinas-of-the-galaxy-vol-2.mp4',
                imgSrc: 'images/little_tree.jpg',
                imgAlt: 'little tree presses a button'
            }
        ],
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'straight-direction-description',
            position: '07',
            name: 'BABY DRIVER',
            audioName: 'baby-driver',
            imgSrc: 'images/baby_driver.jpg',
            imgAlt: 'baby-driver',
            about: `Baby Driver's soundtrack is similar to Guardians of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop
            to the film's many beats. However, what Edgar Wright did with the music was so far beyond
            that.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'reverse-direction-description',
            position: '06',
            name: 'GOODFELLAS',
            audioName: 'goodfellas',
            imgSrc: 'images/goodfellas.jpg',
            imgAlt: 'goodfellas',
            about: `Martin Scorcese's movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else
            in between. It's a crime movie that isn't afraid to deal with the dark side of life. Going
            along with every scene is a great soundtrack full of hand-picked songs that compliment every
            moment they appear in.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'central-direction-description',
            imgClass: 'runner',
            position: '05',
            name: 'BLADE RUNNER',
            audioName: 'blade-runner',
            about: `It's astounding that Blade Runner didn't become as popular as other movies released in its time. It arguably has one of the
            best soundtracks in movie history, with every tune being a perfect match with the action
            on-screen.`
        },
        makeMain
    );
    createSlider(
        [
            {
                src: 'videos/blade-runner.mp4',
                imgSrc: 'images/bladerunner.jpg',
                imgAlt: 'bladerunner heroes'
            },

            {
                src: 'videos/goodfellas.mp4',
                imgSrc: 'images/culture.jpg',
                imgAlt: 'high buildings'
            },

            {
                src: 'videos/baby-driver.mp4',
                imgSrc: 'images/Baby-Driver_driver.jpg',
                imgAlt: 'driver'
            }
        ],
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'straight-direction-description',
            position: '04',
            name: 'O BROTHER, WHERE ART THOU?',
            audioName: 'o-brother-where-art-thou',
            imgSrc: 'images/o-brother.jpg',
            imgAlt: 'o brother where art thou',
            about: `O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a
            group of convicts who go on a wild journey to find a treasure of sorts. With this film based
            in a stylistic period in history, the soundtrack was designed to match it.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'reverse-direction-description',
            position: '03',
            name: '2001: A SPACE ODYSSEY',
            audioName: '2001-a-space-odyssey',
            imgSrc: 'images/davebowman.jpg',
            imgAlt: 'space odyssey',
            about: `The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication
            are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes
            and motifs to narrow down a tone that makes the movie feel all its own.`
        },
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'central-direction-description',
            imgClass: 'godfuther',
            position: '02',
            name: 'THE GODFATHER',
            audioName: 'the-godfather',
            about: `The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is
            part of it. Because the movie deals with crime, gangs, and the works, the music is designed
            to reflect that.`
        },
        makeMain
    );
    createSlider(
        [
            {
                src: 'videos/o-brother-where-art-thou.mp4',
                imgSrc: 'images/o-brother-image.jpg',
                imgAlt: 'confess before the end'
            },

            {
                src: 'videos/the-godfather.mp4',
                imgSrc: 'images/group33.jpg',
                imgAlt: 'gungsters discussing a deal'
            },

            {
                src: 'videos/2001-a-space-odyssey.mp4',
                imgSrc: 'images/amanda.jpg',
                imgAlt: 'amanda from a space odyssey'
            }
        ],
        makeMain
    );
    createMovieSection(
        {
            sectionClass: 'reverse-direction-description',
            position: '01',
            name: 'THE LORD OF THE RINGS',
            audioName: 'the-lord-of-the-rings',
            imgSrc: 'images/frodo.jpg',
            imgAlt: 'Frodo and the ring',
            about: `Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy
            remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference
            with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music
            all his own.`
        },
        makeMain
    );
    createSignUp(makeMain);
    createFooter();
    setVolumeAfterAppend();

    // Scroll to the film top
    function scrollToFilm(arg) {
        var page = document.documentElement;
        var startingPosition = page.scrollTop;
        var endingPosition = document.querySelector(arg).offsetTop;
        var distance = endingPosition - startingPosition;

        function go(duration) {
            var start = performance.now();

            function step(newTimestamp) {
                var toScroll = startingPosition + (distance * (newTimestamp - start)) / duration;
                if (toScroll >= endingPosition) {
                    toScroll = endingPosition;
                }
                page.scrollTop = toScroll;

                if (toScroll < endingPosition) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        }

        go(300);
    }
});
