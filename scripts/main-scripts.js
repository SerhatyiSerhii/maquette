'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Scroll to the film top
    function scrollToFilm(arg) {
        $('html').animate({
            scrollTop: $(arg).offset().top
        }, 300);
    }

    // Smooth scroll to the film at Go-To menu
    addEvent('a.top-film', 'click', function (event) { // TODO: I believe 'a' can be skipped from selector
        event.preventDefault();
        var topLink = this.getAttribute('href');
        scrollToFilm(topLink);
    });

    // Scroll to Top10 on arrow-down click
    addEvent('.arrow-down', 'click', function (event) {
        event.preventDefault();
        var firstTopFilm = this.getAttribute('href');
        scrollToFilm(firstTopFilm);
    });

    // Hover on Go-To menu
    $('.go-to').hover(function () {
        $('.film-nav').finish().slideToggle(300);
    });

    function toggleBurger() {
        $('.box-menu').finish().slideToggle(300);
        $('#burger-img').toggleClass('pressed');
    }

    addEvent('#nav-wrapper', 'click', function (event) {
        event.stopPropagation();
        toggleBurger();
    });

    addEvent('.top-film', 'click', function () {
        if (window.innerWidth < 768) {
            toggleBurger();
        }
    });

    $(document).on('click', function (event) {
        if ($(window).outerWidth() < 768 && $(event.target).closest('.box-menu').length === 0) {
            $('.box-menu').finish().slideUp(300);
            $('#burger-img').removeClass('pressed');
        }
    });

    window.addEventListener('resize', function () {
        var boxMenu = document.querySelector('.box-menu');
        var burgerIMG = document.getElementById('burger-img');

        burgerIMG.classList.remove('pressed');
        window.innerWidth < 768 ? boxMenu.style.display = 'none' : boxMenu.style.display = 'block'; // TODO: code duplication in one line
    });

    // Substrate window on button 'Listen' click
    addEvent('.listen', 'click', function () {
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

        // Set the volume index to default
        var volume = modaleWindow.querySelector('.volume');
        var volumeWidth = volume.clientWidth;
        var label = volume.querySelector('.label');
        var labelWidth = label.offsetWidth;
        var maxPos = volumeWidth - labelWidth;
        label.parentNode.style.width = maxPos + 'px'; // TODO: since you set it to max when modal open - you do not need it here

        // Stop playing music on modal window close
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;

        modWindListener.classList.remove('play-active');

        if (currentLength.closest('.soundtrack-listener') != undefined) {
            currentLength.style.width = 0;
        }
    }

    addEvent('.close-listener', 'click', function () {
        closeListener();
    });

    addEvent('.substrate', 'click', function (event) {
        if (event.target.closest('.soundtrack-listener') == undefined) {
            closeListener();
        }
    });

    addEvent('.listener', 'click', function () {
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

    addEvent('audio', 'ended', function () {
        var thisAudio = this;
        var listener = thisAudio.parentNode.querySelector('.listener');

        setTimeout(function () {
            listener.classList.remove('play-active');
            thisAudio.parentNode.querySelector('.media-length').querySelector('.current-length').style.width = 0;
            thisAudio.currentTime = 0;
            showTime(thisAudio);
        }, 500);
    });

    addEvent('audio', 'playing', function () {
        progress(this);
    });

    addEvent('audio', 'pause', function () {
        cancelAnimationFrame(timer);
    });

    function addEvent(selector, event, handler) {
        var elems = document.querySelectorAll(selector);

        for (var i = 0; i < elems.length; i++) {
            elems[i].addEventListener(event, handler);
        }
    }

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

    addEvent('.media-length', 'click', function (event) {
        var musicLength = this; // TODO: no need

        cancelAnimationFrame(timer);
        setMediaVolumeInBarWidth(musicLength, event);
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
        $('.slider').each(function () { // TODO: remove jquery
            var parent = $(this);
            var currIndex = index;
            var maxIndex = parent.find('li').last().index();
            settingTranslateX();

            parent.find('.arrow-left').on('click', function (event) {
                event.preventDefault();

                currIndex--;
                settingTranslateX();
            })

            parent.find('.arrow-right').on('click', function (event) {
                event.preventDefault();

                currIndex++;
                settingTranslateX();
            })

            function settingTranslateX() {
                if (currIndex <= 0) {
                    currIndex = 0;
                } else if (currIndex >= maxIndex) {
                    currIndex = maxIndex;
                }
                parent.find('ul').css('transform', 'translateX(' + -currIndex * 100 + '%)');
            }
        })
    }
    initSlider(1);

    $('.volume').on('mousedown', function (mouseDownEvent) {
        var currentVolume = $(this);

        putVolumeHandle(currentVolume, mouseDownEvent);

        $(document).on('mousemove', function (event) {
            putVolumeHandle(currentVolume, event);
        });

        $(document).on('mouseup', function () {
            $(document).off('mousemove');
        });
    });

    function putVolumeHandle(el, event) {
        var halfLabel = el.find('.label').width() / 2;
        var volumeLeftCoor = el.find('.volume-handle').offset().left;
        var volHandlPos = event.pageX - volumeLeftCoor;

        if (volHandlPos >= el.width() - halfLabel) {
            volHandlPos = el.width() - halfLabel;
        } else if (volHandlPos <= halfLabel) {
            volHandlPos = halfLabel;
        }

        el.find('.volume-handle').css('width', volHandlPos - halfLabel + 'px');

        var volumeIndex = (volHandlPos - halfLabel) / (el.width() - halfLabel * 2);

        if (el.parent('.soundtrack-listener').length == 1) {
            el.siblings('audio')[0].volume = volumeIndex;
        } else {
            el.parent().siblings('video')[0].volume = volumeIndex;
        }
    }

    // Playing video & video controls
    $('.promo-video').on('click', function () { // TODO: remove jquery
        var promoVideo = $(this);
        var videoWrapper = promoVideo.siblings('.video-wrapper'); // TODO: looks like unused variable

        if (promoVideo.closest('.slider').length != 0) {
            promoVideo.toggleClass('playing-video play-active');

            var image = $(this).prev();
            if (promoVideo.hasClass('playing-video')) { // TODO: another case for ternary operator
                image.css('display', 'none');
            } else {
                image.css('display', 'block');
            }

            var currentVideo = promoVideo.siblings('.video-wrapper').find('video')[0];
            var allVideos = $('video');

            for (var i = 0; i < allVideos.length; i++) {
                if (allVideos[i] != currentVideo) {
                    stopVideoPlaying(allVideos[i]);
                }
            }

            if (currentVideo.paused) {
                currentVideo.play();
            } else {
                currentVideo.pause();
            }
        }
    });

    addEvent('video', 'canplay', function () {
        showTime(this);
    });

    addEvent('video', 'playing', function () {
        progress(this);
    });

    addEvent('video', 'pause', function () {
        cancelAnimationFrame(timer);
    });

    addEvent('video', 'ended', function () {
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
        var volumeBar = item; // TODO: no need. if you want item to be named as volumeBar - just name it in loop declaration
        var volumeHandle = volumeBar.querySelector('.volume-handle');
        var volumeLable = volumeBar.querySelector('.label');

        volumeHandle.style.width = (volumeBar.clientWidth - volumeLable.clientWidth) + 'px';
    }
});
