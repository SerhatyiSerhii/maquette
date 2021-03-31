'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Scroll to the film top
    function scrollToFilm(arg) {
        $('html').animate({
            scrollTop: $(arg).offset().top
        }, 300);
    }

    // Smooth scroll to the film at Go-To menu
    $('a.top-film').on('click', function (event) {
        event.preventDefault();

        var topLink = $(this).attr('href');
        scrollToFilm(topLink);
    });

    // Scroll to Top10 on arrow-down click
    $('.arrow-down').on('click', function (event) {
        event.preventDefault();

        var firstTopFilm = $(this).attr('href');
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

        if (window.innerWidth < 768) {
            boxMenu.style.display = 'none'; // TODO: query selector allows you to avoid indexer     Corrected
            burgerIMG.classList.remove('pressed'); // TODO: in previous version you did not have this here
            // Yes, but previous version had a little bug: once widnow is resized, the dropdown menu is closed, but
            // burger is not shown. At the moment once the dropdown menu is closed
            // the burger is shown.
        } else {
            boxMenu.style.display = 'block';
            burgerIMG.classList.remove('pressed');
        }
    });

    // $(window).on('resize', function () {
    //     if ($(window).outerWidth() < 768) {
    //         $('.box-menu').hide();
    //     } else {
    //         $('.box-menu').show();
    //         $('#burger-img').removeClass('pressed');
    //     }
    // });

    // Substrate window on button 'Listen' click

    addEvent('.listen', 'click', function () {
        // var thisListen = this; // TODO: no need   Deleted
        // TODO: too many loops for one instance of each element
        // you definetely know that you have only one modal window while your site works
        // so what's the point to look for all elements?
        // also in muy opinion querySelector and querySelectorAll are much convenient than getElementsBy*

        // Actually this section doesn't require any loops. My first thought was that the
        // additional substrate window can be added into the site.
        var modaleWindow = document.querySelector('.substrate');
        var modaleWindowAudio = document.querySelector('audio');
        var listenerTitle = document.querySelector('.listener-title');

        document.body.classList.add('lock');

        modaleWindow.classList.remove('hidden');

        setTimeout(function () {
            modaleWindow.classList.remove('visually-hidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        var filmTitleListen = this.closest('section');

        // Put the film title into the substrate window
        listenerTitle.textContent = filmTitleListen.dataset.name; // TODO: you can access data-attributes through dataset property   Corrected

        // Set the source of audio file
        var audioAtr = filmTitleListen.dataset.audioName; // TODO: you can access data-attributes through dataset property   Corrected

        modaleWindowAudio.setAttribute('src', 'audios/' + audioAtr + '.ogg');

        modaleWindowAudio.addEventListener('canplay', function () {
            showTime(this);
        });
    });

    // var listen = document.getElementsByClassName('listen'); // TODO: why not through addEvent?    Corrected

    // for (var i = 0; i < listen.length; i++) {
    //     listen[i].addEventListener('click', function () {
    //         var body = document.body;
    //         var thisListen = this; // TODO: no need  Corrected
    //         // TODO: too many loops for one instance of each element
    //         // you definetely know that you have only one modal window while your site works
    //         // so what's the point to look for all elements?
    //         // also in muy opinion querySelector and querySelectorAll are much convenient than getElementsBy*
    //         var modaleWindow = document.getElementsByClassName('substrate');
    //         var modaleWindowAudio = document.getElementsByTagName('audio');
    //         var listenerTitle = document.getElementsByClassName('listener-title');

    //         body.classList.add('lock');

    //         for (var j = 0; j < modaleWindow.length; j++) {
    //             modaleWindow[j].classList.remove('hidden');
    //         }

    //         setTimeout(function () {
    //             for (var k = 0; k < modaleWindow.length; k++) {
    //                 modaleWindow[k].classList.remove('visually-hidden');
    //             }
    //         }, 20);

    //         // Get name of the film above the clicked button 'Listen'
    //         var filmTitleListen = thisListen.closest('section');

    //         // Put the film title into the substrate window
    //         for (var l = 0; l < listenerTitle.length; l++) {
    //             listenerTitle[l].textContent = filmTitleListen.getAttribute('data-name'); // TODO: you can access data-attributes through dataset property    Corrected
    //         }

    //         // Set the source of audio file
    //         var audioAtr = filmTitleListen.getAttribute('data-audio-name'); // TODO: you can access data-attributes through dataset property     Corrected

    //         for (var m = 0; m < modaleWindowAudio.length; m++) {
    //             modaleWindowAudio[m].setAttribute('src', 'audios/' + audioAtr + '.ogg');

    //             // Display the duration of music
    //             modaleWindowAudio[m].addEventListener('canplay', function () {
    //                 showTime(this);
    //             });
    //         }
    //     });
    // }

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        // var body = document.body; // TODO: no need   Removed

        // TODO: the same: too many loops    Corrected
        var modaleWindow = document.querySelector('.substrate');

        // TODO: you don't need to search through whole document if you have parent element for all of these     Corrected
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
        var label = modaleWindow.querySelector('.label'); // TODO: here you store in this variable elements collection and lower - width of this element. Why?
        // This is to calculate the maximum position volume-handle
        // should be moved once the modale window is closed
        var labelWidth = getComputedStyle(label).getPropertyValue('width');
        var volumeWidth = getComputedStyle(label.closest('.volume')).getPropertyValue('width');
        var borderWidth = getComputedStyle(label.closest('.volume')).getPropertyValue('border-width');

        if (label.closest('.substrate') != undefined) { // TODO: here is null and a little bit lower undefined. Better to keep one style     Corrected
            volumeWidth = parseInt(volumeWidth); // TODO: looks like here and three lines lower a perfect case for variable     Corrected
            borderWidth = parseInt(borderWidth);
            labelWidth = parseInt(labelWidth);
        }

        var maxPos = volumeWidth - labelWidth - borderWidth * 2;
        label.parentNode.style.width = maxPos + 'px';

        // Stop playing music on modal window close
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;

        modWindListener.classList.remove('play-active');

        if (currentLength.closest('.soundtrack-listener') != undefined) {
            currentLength.style.width = 0;
        }
    }

    var modWindCloser = document.getElementsByClassName('close-listener');

    modWindCloser[0].addEventListener('click', function () {
        closeListener();
    });

    var substrate = document.getElementsByClassName('substrate');

    substrate[0].addEventListener('click', function (event) {
        if (event.target.closest('.soundtrack-listener') == undefined) {
            closeListener();
        }
    });

    var listener = document.getElementsByClassName('listener');

    for (var i = 0; i < listener.length; i++) {
        listener[i].addEventListener('click', function () {
            var allVideos = document.getElementsByTagName('video');

            this.classList.toggle('play-active');

            for (var j = 0; j < allVideos.length; j++) {
                stopVideoPlayingJS(allVideos[j]);
            }

            if (this.classList.contains('play-active')) {
                this.parentNode.querySelector('audio').play();
            } else {
                this.parentNode.querySelector('audio').pause();
            }
        });
    }

    function stopVideoPlayingJS(element) {
        var elementParent = element.parentNode;

        element.pause();
        elementParent.parentNode.querySelector('.btn-play').classList.remove('playing-video', 'play-active');
        elementParent.style.display = 'none';
        elementParent.parentNode.querySelector('img').style.display = 'block';
    }

    function stopVideoPlaying(element) {

        var elementParent = $(element).parent();

        element.pause();
        elementParent.siblings('.btn-play').removeClass('playing-video play-active');
        elementParent.css('display', 'none');
        elementParent.siblings('img').css('display', 'block');
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

        // if (element.closest('.soundtrack-listener') != undefined) {
        //     element.parentNode.querySelector('.current-length').style.width = position + '%'; // TODO: too many query selectors, aren't?     Corrected
        // } else {
        //     element.parentNode.querySelector('.current-length').style.width = position + '%';
        // }

        element.parentNode.querySelector('.current-length').style.width = position + '%';

        showTime(element);

        if (position < 100) {
            timer = requestAnimationFrame(function () {
                progress(element);
            });
        }
    }

    var mediaLength = document.getElementsByClassName('media-length');

    for (var i = 0; i < mediaLength.length; i++) {
        mediaLength[i].addEventListener('click', function (event) {
            var musicLength = this;

            cancelAnimationFrame(timer);
            setMediaVolumeInBarWidthJS(musicLength, event);
        });
    }

    function setMediaVolumeInBarWidthJS(element, event) {
        var barWidth = element.clientWidth;
        var elemCurLength = element.querySelector('.current-length');
        var elemAudio = element.parentNode.querySelector('audio');
        var inBarXCoor = elemCurLength.getBoundingClientRect().left;
        var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
        elemCurLength.style.width = inBarPosition + '%';

        if (element.closest('.soundtrack-listener') != undefined) {
            elemAudio.currentTime = (inBarPosition * elemAudio.duration) / 100;

            showTime(elemAudio); // TODO: looks like this is in variable?    Corrected
        } else {
            var elemVideo = element.closest('.video-controls').parentNode.querySelector('video');

            elemVideo.currentTime = (inBarPosition * elemVideo.duration) / 100;

            showTime(element.closest('.video-wrapper').querySelector('video'));
        }
    }

    function showTime(element) {
        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);
        $(element).siblings('.timer').text(minSecCurTime + ' / ' + minSecDurat);
    }

    function calcTime(time) {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return min + ':' + sec;
    }

    function initSlider(index) {
        $('.slider').each(function () {
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
    $('.promo-video').on('click', function () {
        var promoVideo = $(this);
        var videoWrapper = promoVideo.siblings('.video-wrapper');

        if (promoVideo.closest('.slider').length != 0) {
            promoVideo.toggleClass('playing-video play-active');

            var image = $(this).prev();
            if (promoVideo.hasClass('playing-video')) {
                image.css('display', 'none');
                videoWrapper.css('display', 'block');
            } else {
                image.css('display', 'block');
                videoWrapper.css('display', 'none');
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

    var video = document.getElementsByTagName('video');

    for (var i = 0; i < video.length; i++) {
        video[i].addEventListener('canplay', function () {
            showTime(this);
        });

        video[i].addEventListener('playing', function () {
            progress(this);
        });

        video[i].addEventListener('pause', function () {
            cancelAnimationFrame(timer);
        });

        video[i].addEventListener('ended', function () {
            var thisVideo = this;
            // var videoControlsSibling = thisVideo.parentNode.querySelector('.video-controls'); // TODO: no need    Corrected
            // var mediaLength = videoControlsSibling.querySelector('.media-length'); // TODO: no need   Corrected
            var currentLength = thisVideo.parentNode.querySelector('.current-length');

            setTimeout(function () {
                stopVideoPlaying(thisVideo);
                currentLength.style.width = 0;
                thisVideo.currentTime = 0;
                showTime(thisVideo);
            }, 500);
        });
    }

    $('.volume').each(function () {
        var volumeBar = $(this);
        var volumeHandle = volumeBar.find('.volume-handle');
        var volumeLable = volumeHandle.find('.label');

        volumeHandle.css('width', volumeBar.width() - volumeLable.width() + 'px');
    });
});
