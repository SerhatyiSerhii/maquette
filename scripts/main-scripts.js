'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Adding header
    function createHeader(array) {
        var makeHeader = document.createElement('header');

        var makeContainer = document.createElement('div');
        makeContainer.classList.add('container');
        makeHeader.appendChild(makeContainer);

        var makeLogo = document.createElement('a');
        makeLogo.classList.add('logo');
        makeLogo.setAttribute('href', '#');
        makeContainer.appendChild(makeLogo);

        var makeLogoImg = document.createElement('img');
        makeLogoImg.setAttribute('src', 'images/the-top-logo.svg');
        makeLogoImg.setAttribute('alt', 'the-top-logo');
        makeLogo.appendChild(makeLogoImg);

        var makeNav = document.createElement('nav');
        makeContainer.appendChild(makeNav);

        var makeNavWrapper = document.createElement('div');
        makeNavWrapper.setAttribute('id', 'nav-wrapper');
        makeNav.appendChild(makeNavWrapper);

        var makeBurger = document.createElement('span');
        makeBurger.setAttribute('id', 'burger-img');
        makeNavWrapper.appendChild(makeBurger);

        var makeUl = document.createElement('ul');
        makeUl.classList.add('box-menu');
        makeNav.appendChild(makeUl);

        var navigation = ['Search', 'Add to the Favorites', 'FAQ', 'Go to'];

        navigation.forEach(function (item) {
            var makeListItm = document.createElement('li');
            makeUl.appendChild(makeListItm);

            var makeLink = document.createElement('a');
            makeLink.setAttribute('href', '#');
            makeLink.classList.add('box-menu-item');
            makeLink.textContent = item;
            makeListItm.appendChild(makeLink);

            if (item === 'Go to') {
                makeListItm.classList.add('go-to');

                var makeFilmNav = document.createElement('ul');
                makeFilmNav.classList.add('film-nav');
                makeListItm.appendChild(makeFilmNav);

                makeListItm.addEventListener('mouseenter', function () {
                    makeFilmNav.style.display = 'block';
                });

                makeListItm.addEventListener('mouseleave', function () {
                    makeFilmNav.style.display = 'none';
                });

                for (var element of array) {
                    var makeListItm = document.createElement('li');
                    makeFilmNav.appendChild(makeListItm);

                    var makeLink = document.createElement('a');
                    makeLink.setAttribute('href', '#top-' + element);
                    makeLink.classList.add('top-film');
                    makeLink.textContent = '.' + element;
                    makeListItm.appendChild(makeLink);
                }
            }
        });

        document.body.appendChild(makeHeader);
    }

    // Adding main Section
    function createMainSection(main) {
        var makeSection = document.createElement('section');
        makeSection.classList.add('main-section');

        var makeContainer = document.createElement('div');
        makeContainer.classList.add('container');
        makeSection.appendChild(makeContainer);

        var makeH1 = document.createElement('h1');
        makeContainer.appendChild(makeH1);

        var makeSpan = document.createElement('span');
        makeSpan.classList.add('accent-text');
        makeSpan.textContent = 'The 10'
        makeH1.appendChild(makeSpan);
        makeH1.appendChild(document.createElement('br'));
        makeH1.appendChild(document.createTextNode('Best Movie Soundtracks of All-Time'));

        var makeMainP = document.createElement('p');
        makeMainP.textContent = 'Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.'
        makeContainer.appendChild(makeMainP);

        var makeArrowDown = document.createElement('a');
        makeArrowDown.setAttribute('href', '#top-10');
        makeArrowDown.classList.add('arrow-down', 'arrow');
        makeArrowDown.innerHTML = (
            `<svg width="43" height="60" viewBox="0 0 43 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 33L21 58M21 58L41.5 32M21 58V0" stroke-width="2" />
            </svg>`
        );
        makeContainer.appendChild(makeArrowDown);

        main.appendChild(makeSection);
    }

    // Adding movie section
    function createMovieSection(mainObj, main) {

        function setAttribute(element, obj) {
            for (var key in obj) {
                element.setAttribute(key, obj[key]);
            }
        }

        function makeElemem(element, ...classes) {
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

        var makeSection = makeElemem('section', mainObj.sectionClass, 'direction-description');
        setAttribute(makeSection, { 'id': 'top-' + mainObj.position, 'data-name': mainObj.name, 'data-audio-name': mainObj.audioName });

        var makeContainer = makeElemem('div', 'container');

        var makeDescriptionContent = makeElemem('div', 'description-content');

        if (mainObj.sectionClass === 'central-direction-description') {
            makeSection.classList.add(mainObj.imgClass);
        } else {
            var makeFilmImage = makeElemem('div', 'film-image');

            var makeImage = makeElemem('img');
            setAttribute(makeImage, { 'src': mainObj.imgSrc, 'alt': mainObj.imgAlt });

            var imgMap = new Map();
            imgMap.set(makeFilmImage, [makeImage]);
            insert(imgMap);
        }

        var makeFilmContent = makeElemem('div', 'film-content');

        var makeFilmTitleContent = makeElemem('div', 'film-title-content');

        var makeSpan = makeElemem('span');
        makeSpan.textContent = '.' + mainObj.position;

        var makeH2 = makeElemem('h2');
        makeH2.textContent = mainObj.name;

        var makeFilmDescripContent = makeElemem('div', 'film-description-content');

        var makeAboutFilm = makeElemem('p');
        makeAboutFilm.textContent = mainObj.about;

        var makeButton = makeElemem('button', 'listen');
        makeButton.textContent = 'listen';

        var map = new Map([
            [makeSection, [makeContainer]],
            [makeContainer, [makeDescriptionContent]],
            [makeFilmTitleContent, [makeSpan, makeH2]],
            [makeFilmContent, [makeFilmTitleContent, makeFilmDescripContent]],
            [makeFilmDescripContent, [makeAboutFilm, makeButton]],
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
                sectionMap.set(makeDescriptionContent, [makeFilmContent]); // TODO: better always to specify break
        }

        insert(sectionMap);
    }

    // Adding slider
    function createSlider(array, main) {
        var makeSection = document.createElement('section');
        makeSection.classList.add('slider');

        var makeContainer = document.createElement('div');
        makeContainer.classList.add('container');
        makeSection.appendChild(makeContainer);

        var makeSlidesWrapper = document.createElement('div');
        makeSlidesWrapper.classList.add('slides-wrapper');
        makeContainer.appendChild(makeSlidesWrapper);

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

        arrows.forEach(function (element) {
            var makeArrow = document.createElement('a');
            makeArrow.setAttribute('href', '#');
            makeArrow.classList.add(element.classDirection, 'arrow');
            makeArrow.innerHTML = element.svg;
            makeSlidesWrapper.appendChild(makeArrow);
        });

        var makeUL = document.createElement('ul');
        makeSlidesWrapper.appendChild(makeUL);

        array.forEach(function (element) {
            var makeListItm = document.createElement('li');
            makeUL.appendChild(makeListItm);

            var makeFrame = document.createElement('div');
            makeFrame.classList.add('frame');
            makeListItm.appendChild(makeFrame);

            var makeVideoWrapper = document.createElement('div');
            makeVideoWrapper.classList.add('video-wrapper');
            makeFrame.appendChild(makeVideoWrapper);

            var makeVideo = document.createElement('video');
            makeVideoWrapper.appendChild(makeVideo);

            makeVideo.addEventListener('canplay', function() {
                showTime(this);
            });

            makeVideo.addEventListener('playing', function () {
                progress(this);
            });

            makeVideo.addEventListener('pause', function () {
                cancelAnimationFrame(timer);
            });

            var makeSource = document.createElement('source');
            makeSource.setAttribute('src', element.src);
            makeVideo.appendChild(makeSource);

            var makeTimer = document.createElement('div');
            makeTimer.classList.add('timer', 'video-timer');
            makeTimer.textContent = '00:00 / 00:00';
            makeVideoWrapper.appendChild(makeTimer);

            var makeVideoControls = document.createElement('div');
            makeVideoControls.classList.add('video-controls');
            makeVideoWrapper.appendChild(makeVideoControls);

            var makeVolume = document.createElement('div');
            makeVolume.classList.add('volume', 'video-volume');
            makeVideoControls.appendChild(makeVolume);

            var makeVolumeHandle = document.createElement('div');
            makeVolumeHandle.classList.add('volume-handle', 'video-volume-handle');
            makeVolume.appendChild(makeVolumeHandle);

            var makeLabel = document.createElement('div');
            makeLabel.classList.add('label');
            makeVolumeHandle.appendChild(makeLabel);

            var makeMediaLength = document.createElement('div');
            makeMediaLength.classList.add('media-length', 'video-length');
            makeVideoControls.appendChild(makeMediaLength);

            var makeCurrentLength = document.createElement('div');
            makeCurrentLength.classList.add('current-length');
            makeMediaLength.appendChild(makeCurrentLength);

            makeVideo.addEventListener('ended', function () {
                var thisVideo = this;

                setTimeout(function () {
                    stopVideoPlaying(thisVideo);
                    makeCurrentLength.style.width = 0;
                    thisVideo.currentTime = 0;
                }, 500);
            });

            var makeImage = document.createElement('img');
            makeImage.setAttribute('src', element.imgSrc);
            makeImage.setAttribute('alt', element.imgAlt);
            makeFrame.appendChild(makeImage);

            var makeButton = document.createElement('button');
            makeButton.classList.add('btn-play', 'promo-video');
            makeFrame.appendChild(makeButton);
        });

        main.appendChild(makeSection);
    }

    // Adding Sign Up section
    function createSignUp(main) {
        var makeSignUp = document.createElement('section');
        makeSignUp.classList.add('sign-up');

        var makeContainer = document.createElement('div');
        makeContainer.classList.add('container');
        makeSignUp.appendChild(makeContainer);

        var makeAppeal = document.createElement('div');
        makeAppeal.classList.add('appeal');
        makeContainer.appendChild(makeAppeal);

        var makeH2 = document.createElement('h2');
        makeH2.textContent = 'Sign up to receive the latest updates and news';
        makeAppeal.appendChild(makeH2);

        var makeForm = document.createElement('form');
        makeAppeal.appendChild(makeForm);

        var makeEmailSpace = document.createElement('div');
        makeEmailSpace.classList.add('email-space');
        makeForm.appendChild(makeEmailSpace);

        var emailSpace = makeAppeal.querySelector('.email-space');

        emailSpace.appendChild(document.createElement('input'));
        emailSpace.appendChild(document.createElement('input'));

        var submitBtn = emailSpace.children;

        var enterEmail = submitBtn[0];
        var submitBtn = submitBtn[1];

        enterEmail.setAttribute('type', 'text');
        enterEmail.setAttribute('name', 'email');
        enterEmail.setAttribute('placeholder', 'enter your email');
        enterEmail.setAttribute('autocomplete', 'off');

        submitBtn.setAttribute('type', 'submit');
        submitBtn.setAttribute('value', 'submit');

        main.appendChild(makeSignUp);
    }


    // Adding footer element to page
    function createFooter() {
        var makeFooter = document.createElement('footer');

        var makeContainer = document.createElement('div');
        makeContainer.classList.add('container');
        makeFooter.appendChild(makeContainer);

        // Adding branches into footer
        var containerBranches = ['policy', 'social-media'];

        containerBranches.forEach(function (element) {
            var makeUL = document.createElement('ul');
            makeUL.classList.add(element);
            makeContainer.appendChild(makeUL);
        });

        // Adding policies
        var policies = ['privacy policy', 'cookie policy'];

        policies.forEach(function (element) {
            var makeListItm = document.createElement('li');
            var makeLink = document.createElement('a');
            makeLink.setAttribute('href', '#');
            makeLink.textContent = element;
            makeListItm.appendChild(makeLink);
            makeContainer.firstChild.appendChild(makeListItm);
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
            var makeListItm = document.createElement('li');
            var makeLink = document.createElement('a');
            makeLink.setAttribute('href', '#');
            makeLink.classList.add('circle');
            makeLink.innerHTML = sMChildren[i];
            makeListItm.appendChild(makeLink);
            makeContainer.lastChild.appendChild(makeListItm);
        }

        document.body.appendChild(makeFooter);
    }

    // Adding modale window through JS-builder
    function createModaleWindow() {
        var substrate = document.createElement('div');
        substrate.classList.add('substrate', 'visually-hidden', 'hidden');

        var soundtrackListener = document.createElement('div');
        soundtrackListener.classList.add('soundtrack-listener');
        substrate.appendChild(soundtrackListener);

        var makeAudio = document.createElement('audio');
        soundtrackListener.appendChild(makeAudio);

        var makeVolume = document.createElement('div');
        makeVolume.classList.add('volume');
        soundtrackListener.appendChild(makeVolume);

        var makeVouleHandle = document.createElement('div');
        makeVouleHandle.classList.add('volume-handle');
        makeVolume.appendChild(makeVouleHandle);

        var makeLabel = document.createElement('div');
        makeLabel.classList.add('label');
        makeVouleHandle.appendChild(makeLabel);

        var makeH2 = document.createElement('h2');
        makeH2.classList.add('listener-title');
        soundtrackListener.appendChild(makeH2);

        var makeButton = document.createElement('button');
        makeButton.classList.add('btn-play', 'listener');
        soundtrackListener.appendChild(makeButton);

        var makeMediaLength = document.createElement('div');
        makeMediaLength.classList.add('media-length');
        soundtrackListener.appendChild(makeMediaLength);

        var makeCurrentLength = document.createElement('div');
        makeCurrentLength.classList.add('current-length');
        makeMediaLength.appendChild(makeCurrentLength);

        var makeTimer = document.createElement('div');
        makeTimer.classList.add('timer');
        makeTimer.textContent = '00:00 / 00:00';
        soundtrackListener.appendChild(makeTimer);

        var makeCloseListener = document.createElement('a');
        makeCloseListener.classList.add('close-listener');
        soundtrackListener.appendChild(makeCloseListener);

        var makeCLCross = document.createElement('span');
        makeCLCross.classList.add('close-listener-cross');
        makeCloseListener.appendChild(makeCLCross);

        var body = document.body;
        body.appendChild(substrate);
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
    createModaleWindow();

    // Scroll to the film top
    function scrollToFilm(arg) {
        // as you can notice, here we also use querySelector
        // but we can't remove it by moving to js builder
        // because it is handler for header liks bound to specific sections which located in different builders
        // later we will cover how we can remove query selector even in such cases
        var page = document.querySelector('html');
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

    // Smooth scroll to the film at Go-To menu
    var allTopFilms = document.querySelectorAll('.top-film');

    addEvent(allTopFilms, 'click', function (event) { // TODO: move to builder, remove querySelector
        event.preventDefault();
        var topLink = this.getAttribute('href');
        scrollToFilm(topLink);
    });

    // Scroll to Top10 on arrow-down click
    var arrowDown = document.getElementsByClassName('arrow-down');

    addEvent(arrowDown, 'click', function (event) { // TODO: move to builder, remove querySelector
        event.preventDefault();
        var firstTopFilm = this.getAttribute('href');
        scrollToFilm(firstTopFilm);
    });

    function toggleBurger() { // TODO: move to builder, remove querySelector
        var boxMenu = document.querySelector('.box-menu');
        var burgerImg = document.querySelector('#burger-img');

        boxMenu.style.display = (boxMenu.style.display === 'block') ? 'none' : 'block';
        burgerImg.classList.toggle('pressed');
    }

    var navWrapper = document.querySelectorAll('#nav-wrapper');

    addEvent(navWrapper, 'click', function (event) { // TODO: move to builder, remove querySelector
        event.stopPropagation();
        toggleBurger();
    });

    addEvent(allTopFilms, 'click', function () { // TODO: move to builder, remove querySelector
        if (window.innerWidth < 768) {
            toggleBurger();
        }
    });

    document.addEventListener('click', function (event) { // TODO: move to builder, remove querySelector
        if (window.innerWidth < 768 && event.target.closest('.box-menu') == undefined) {
            var boxMenu = document.querySelector('.box-menu');
            var burgerImg = document.querySelector('#burger-img');

            boxMenu.style.display = 'none';
            burgerImg.classList.remove('pressed');
        }
    });

    window.addEventListener('resize', function () { // TODO: move to builder, remove querySelector
        var boxMenu = document.querySelector('.box-menu');
        var burgerIMG = document.getElementById('burger-img');

        burgerIMG.classList.remove('pressed');
        boxMenu.style.display = (window.innerWidth < 768) ? 'none' : 'block';
    });

    // Substrate window on button 'Listen' click
    var allListenBtns = document.querySelectorAll('.listen');

    addEvent(allListenBtns, 'click', function () {
        var modaleWindow = document.querySelector('.substrate');
        var modaleWindowAudio = modaleWindow.querySelector('audio');
        var listenerTitle = modaleWindow.querySelector('.listener-title');
        var volume = modaleWindow.querySelector('.volume');
        var volumeHandle = modaleWindow.querySelector('.volume-handle');
        var label = modaleWindow.querySelector('.label');

        document.body.classList.add('lock');

        modaleWindow.classList.remove('hidden');

        setTimeout(function () {
            modaleWindow.classList.remove('visually-hidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        var filmTitleListen = this.closest('section');

        // Put the film title into the substrate window
        listenerTitle.textContent = filmTitleListen.dataset.name;

        // Set the source of audio file
        var audioAtr = filmTitleListen.dataset.audioName;

        modaleWindowAudio.setAttribute('src', 'audios/' + audioAtr + '.ogg');

        modaleWindowAudio.addEventListener('canplay', function () {
            showTime(this);
        });

        // Set the volume lable to max
        volumeHandle.style.width = (volume.clientWidth - label.clientWidth) + 'px';
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        var modaleWindow = document.querySelector('.substrate');
        var audio = modaleWindow.querySelector('audio');
        var modWindListener = modaleWindow.querySelector('.listener');
        var currentLength = modaleWindow.querySelector('.current-length');

        document.body.classList.remove('lock');

        modaleWindow.classList.add('visually-hidden');

        modaleWindow.addEventListener('transitionend', function closeMdlWindow(event) {
            var thisModaleWindow = this;
            if (event.propertyName === 'opacity') {
                thisModaleWindow.classList.add('hidden');
                thisModaleWindow.removeEventListener('transitionend', closeMdlWindow);
            }
        });

        // Stop playing music on modal window close
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;

        modWindListener.classList.remove('play-active');

        if (currentLength.closest('.soundtrack-listener') != undefined) {
            currentLength.style.width = 0;
        }
    }

    var iconCloseListener = document.getElementsByClassName('close-listener');

    addEvent(iconCloseListener, 'click', function () {
        closeListener();
    });

    var substrateWindow = document.getElementsByClassName('substrate');

    addEvent(substrateWindow, 'click', function (event) {
        if (event.target.closest('.soundtrack-listener') == undefined) {
            closeListener();
        }
    });

    var allListeners = document.querySelectorAll('.listener');

    addEvent(allListeners, 'click', function () {
        var allVideos = document.getElementsByTagName('video');

        this.classList.toggle('play-active');

        for (var j = 0; j < allVideos.length; j++) {
            stopVideoPlaying(allVideos[j]);
        }

        if (this.classList.contains('play-active')) {
            this.parentNode.querySelector('audio').play();
        } else {
            this.parentNode.querySelector('audio').pause();
        }
    });

    function stopVideoPlaying(element) {
        var elementParent = element.parentNode;

        element.pause();
        elementParent.parentNode.querySelector('.btn-play').classList.remove('playing-video', 'play-active');
        elementParent.parentNode.querySelector('img').style.display = 'block';
    }

    var allAudios = document.querySelectorAll('audio');

    addEvent(allAudios, 'ended', function () {
        var thisAudio = this;
        var listener = thisAudio.parentNode.querySelector('.listener');

        setTimeout(function () {
            listener.classList.remove('play-active');
            thisAudio.parentNode.querySelector('.media-length').querySelector('.current-length').style.width = 0;
            thisAudio.currentTime = 0;
            showTime(thisAudio);
        }, 500);
    });

    addEvent(allAudios, 'playing', function () {
        progress(this);
    });

    addEvent(allAudios, 'pause', function () {
        cancelAnimationFrame(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        element.parentNode.querySelector('.current-length').style.width = position + '%';

        showTime(element);

        if (position < 100) {
            timer = requestAnimationFrame(function () {
                progress(element);
            });
        }
    }

    var allMediaLengths = document.querySelectorAll('.media-length');

    addEvent(allMediaLengths, 'click', function (event) {
        cancelAnimationFrame(timer);
        setMediaVolumeInBarWidth(this, event);
    });

    function setMediaVolumeInBarWidth(element, event) {
        var barWidth = element.clientWidth;
        var elemCurLength = element.querySelector('.current-length');
        var elemAudio = element.parentNode.querySelector('audio');
        var inBarXCoor = elemCurLength.getBoundingClientRect().left;
        var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
        elemCurLength.style.width = inBarPosition + '%';

        if (element.closest('.soundtrack-listener') != undefined) {
            elemAudio.currentTime = (inBarPosition * elemAudio.duration) / 100;

            showTime(elemAudio);
        } else {
            var elemVideo = element.closest('.video-controls').parentNode.querySelector('video');

            elemVideo.currentTime = (inBarPosition * elemVideo.duration) / 100;

            showTime(element.closest('.video-wrapper').querySelector('video'));
        }
    }

    function showTime(element) {
        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);

        element.parentNode.querySelector('.timer').textContent = minSecCurTime + ' / ' + minSecDurat;
    }

    function calcTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return min + ':' + sec;
    }

    function initSlider(index) {

        var slider = document.querySelectorAll('.slider');

        slider.forEach(function (item) {
            var currIndex = index;
            var maxIndex = item.querySelectorAll('li').length - 1;
            settingTranslateX();

            var arrowLeft = item.querySelector('.arrow-left');
            var arrowRight = item.querySelector('.arrow-right');

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
                item.querySelector('ul').style.transform = 'translateX(' + -currIndex * 100 + '%)';
            }
        });
    }
    initSlider(1);

    var allVolumes = document.querySelectorAll('.volume');

    addEvent(allVolumes, 'mousedown', function (mouseDownEvent) { // TODO: move to builder, remove querySelector
        var currentVolume = this;

        putVolumeHandle(currentVolume, mouseDownEvent);

        document.addEventListener('mousemove', moveLable);

        function moveLable(event) {
            putVolumeHandle(currentVolume, event);
        }

        document.addEventListener('mouseup', function oneMouseUp() {
            document.removeEventListener('mousemove', moveLable);
            document.removeEventListener('mouseup', oneMouseUp);
        });
    })

    function putVolumeHandle(el, event) { // TODO: move to builder, remove querySelector
        var halfLabel = el.querySelector('.label').clientWidth / 2;
        var volumeLeftCoor = el.querySelector('.volume-handle').getBoundingClientRect().left;
        var volHandlPos = event.pageX - volumeLeftCoor;
        var elMaxWidth = el.clientWidth - halfLabel;

        if (volHandlPos >= elMaxWidth) {
            volHandlPos = elMaxWidth;
        } else if (volHandlPos <= halfLabel) {
            volHandlPos = halfLabel;
        }

        var calcCenterOfLable = volHandlPos - halfLabel;

        el.querySelector('.volume-handle').style.width = calcCenterOfLable + 'px';

        var volumeIndex = (calcCenterOfLable) / (el.clientWidth - halfLabel * 2);

        if (el.closest('.soundtrack-listener') != undefined) {
            el.parentNode.querySelector('audio').volume = volumeIndex;
        } else {
            el.closest('.video-wrapper').querySelector('video').volume = volumeIndex;
        }
    }

    // Playing video & video controls
    var allPromoVideos = document.querySelectorAll('.promo-video');

    addEvent(allPromoVideos, 'click', function () { // TODO: move to builder. For now you can't remove querySelector here, where you get all videos
        if (this.closest('.slider') != undefined) {
            this.classList.toggle('playing-video');
            this.classList.toggle('play-active');

            var image = this.previousElementSibling;
            image.style.display = this.classList.contains('playing-video') ? 'none' : 'block';

            var currentVideo = this.parentNode.querySelector('video');
            var allVideos = document.querySelectorAll('video');

            for (var video of allVideos) {
                if (video !== currentVideo) {
                    stopVideoPlaying(video);
                }
            }

            if (currentVideo.paused) {
                currentVideo.play();
            } else {
                currentVideo.pause();
            }
        }

    });

    function addEvent(collection, event, handler) {
        for (var item of collection) {
            item.addEventListener(event, handler);
        }
    }

    var volume = document.getElementsByClassName('volume');

    for (var item of volume) { // TODO: create function like "afterAppend" and move everything here to that function
        var volumeHandle = item.querySelector('.volume-handle');
        var volumeLable = item.querySelector('.label');

        volumeHandle.style.width = (item.clientWidth - volumeLable.clientWidth) + 'px';
    }
});
