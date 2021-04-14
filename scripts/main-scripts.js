'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Scroll to the film top
    function scrollToFilm(arg) {
        var startingPosition =  document.querySelector('html').scrollTop;
        var endingPosition = document.querySelector(arg).offsetTop;
        var distance = endingPosition - startingPosition;

        function go(duration) {
            var start = performance.now();

            function step() {
                var toScroll = startingPosition; // TODO: no need to split on several lines
                toScroll += (distance * (performance.now() - start)) / duration; // TODO: superfluous calculation performance.now() comes as parameter
                if (toScroll >= endingPosition) toScroll = endingPosition;
                document.querySelector('html').scrollTop = toScroll; // TODO: html should be saved to variable

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

    addEvent(allTopFilms, 'click', function (event) {
        event.preventDefault();
        var topLink = this.getAttribute('href');
        scrollToFilm(topLink);
    });

    // Scroll to Top10 on arrow-down click
    var arrowDown = document.getElementsByClassName('arrow-down');

    addEvent(arrowDown, 'click', function (event) {
        event.preventDefault();
        var firstTopFilm = this.getAttribute('href');
        scrollToFilm(firstTopFilm);
    });

    // Hover on Go-To menu
    var goToNav = document.getElementsByClassName('go-to');
    var filmNavMenu = document.querySelector('.film-nav');

    addEvent(goToNav, 'mouseenter', function () {
        filmNavMenu.style.display = 'block';
    });

    addEvent(goToNav, 'mouseleave', function () {
        filmNavMenu.style.display = 'none';
    });

    function toggleBurger() {
        var boxMenu = document.querySelector('.box-menu');
        var burgerImg = document.querySelector('#burger-img');

        boxMenu.style.display = (boxMenu.style.display === 'block') ? 'none' : 'block';
        burgerImg.classList.toggle('pressed');
    }

    var navWrapper = document.querySelectorAll('#nav-wrapper');

    addEvent(navWrapper, 'click', function (event) {
        event.stopPropagation();
        toggleBurger();
    });

    addEvent(allTopFilms, 'click', function () {
        if (window.innerWidth < 768) {
            toggleBurger();
        }
    });

    document.addEventListener('click', function (event) {
        if (window.innerWidth < 768 && event.target.closest('.box-menu') == undefined) {
            var boxMenu = document.querySelector('.box-menu');
            var burgerImg = document.querySelector('#burger-img');

            boxMenu.style.display = 'none';
            burgerImg.classList.remove('pressed');
        }
    });

    window.addEventListener('resize', function () {
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

    addEvent(allVolumes, 'mousedown', function (mouseDownEvent) {
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

    function putVolumeHandle(el, event) {
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

    addEvent(allPromoVideos, 'click', function () {
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

    var allVideos = document.querySelectorAll('video');

    addEvent(allVideos, 'canplay', function () {
        showTime(this);
    });

    addEvent(allVideos, 'playing', function () {
        progress(this);
    });

    addEvent(allVideos, 'pause', function () {
        cancelAnimationFrame(timer);
    });

    addEvent(allVideos, 'ended', function () {
        var thisVideo = this;
        var currentLength = thisVideo.parentNode.querySelector('.current-length');

        setTimeout(function () {
            stopVideoPlaying(thisVideo);
            currentLength.style.width = 0;
            thisVideo.currentTime = 0;
            showTime(thisVideo);
        }, 500);
    });

    var volume = document.getElementsByClassName('volume');

    for (var item of volume) {
        var volumeHandle = item.querySelector('.volume-handle');
        var volumeLable = item.querySelector('.label');

        volumeHandle.style.width = (item.clientWidth - volumeLable.clientWidth) + 'px';
    }
});
