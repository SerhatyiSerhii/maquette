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

    // $('#nav-wrapper').on('click', function (event) { // TODO: remove jquery   Removed
    //     event.stopPropagation();
    //     toggleBurger();
    // });

    addEvent('.top-film', 'click', function () {
        if (window.innerWidth < 768) {
            toggleBurger();
        }
    });

    // $('.top-film').on('click', function () { // TODO: remove jquery   Removed
    //     if ($(window).outerWidth() < 768) {
    //         toggleBurger();
    //     }
    // });

    $(document).on('click', function (event) {
        if ($(window).outerWidth() < 768 && $(event.target).closest('.box-menu').length === 0) {
            $('.box-menu').finish().slideUp(300);
            $('#burger-img').removeClass('pressed');
        }
    });

    window.addEventListener('resize', function () {
        var boxMenu = document.getElementsByClassName('box-menu');
        var burgerIMG = document.getElementById('burger-img');

        if (window.innerWidth < 768) {
            boxMenu[0].style.display = 'none';
            burgerIMG.classList.remove('pressed');
        } else {
            boxMenu[0].style.display = 'block';
            burgerIMG.classList.remove('pressed');
        }
    });

    // $(window).on('resize', function () { // TODO: remove jquery   Removed
    //     if ($(window).outerWidth() < 768) {
    //         $('.box-menu').hide();
    //     } else {
    //         $('.box-menu').show();
    //         $('#burger-img').removeClass('pressed');
    //     }
    // });

    // Substrate window on button 'Listen' click
    var listen = document.getElementsByClassName('listen');

    for (var i = 0; i < listen.length; i++) {
        listen[i].addEventListener('click', function () {
            var body = document.body;
            var thisListen = this;
            var modaleWindow = document.getElementsByClassName('substrate');
            var modaleWindowAudio = document.getElementsByTagName('audio');
            var listenerTitle = document.getElementsByClassName('listener-title');

            body.classList.add('lock');

            for (var j = 0; j < modaleWindow.length; j++) {
                modaleWindow[j].classList.remove('hidden');
            }

            setTimeout(function () {
                for (var k = 0; k < modaleWindow.length; k++) {
                    modaleWindow[k].classList.remove('visually-hidden');
                }
            }, 20);

            // Get name of the film above the clicked button 'Listen'
            var filmTitleListen = thisListen.closest('section');

            // Put the film title into the substrate window
            for (var l = 0; l < listenerTitle.length; l++) {
                listenerTitle[l].textContent = filmTitleListen.getAttribute('data-name');
            }

            // Set the source of audio file
            var audioAtr = filmTitleListen.getAttribute('data-audio-name');;

            for (var m = 0; m < modaleWindowAudio.length; m++) {
                modaleWindowAudio[m].setAttribute('src', 'audios/' + audioAtr + '.ogg');

                // Display the duration of music
                modaleWindowAudio[m].addEventListener('canplay', function () {
                    showTime(this);
                });
            }
        });
    }

    // $('.listen').on('click', function () { // TODO: remove jquery     Removed
    //     $('body').addClass('lock');
    //     $('.substrate').removeClass('hidden');
    //     setTimeout(function () {
    //         $('.substrate').removeClass('visually-hidden');
    //     }, 20);

    //     // Get name of the film above the clicked button 'Listen'
    //     var filmTitleListen = $(this).closest('section');

    //     // Put the film title into the substrate window
    //     $('.listener-title').text(filmTitleListen.attr('data-name'));

    //     // Set the source of audio file
    //     var audioAtr = filmTitleListen.attr('data-audio-name');
    //     $('audio').attr('src', 'audios/' + audioAtr + '.ogg');


    //     // Display the duration of music
    //     $('audio').on('canplay', function () {
    //         showTime(this);
    //     });
    // });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        var body = document.body;
        var modaleWindow = document.getElementsByClassName('substrate');
        var audio = document.getElementsByTagName('audio');
        var modWindListener = document.getElementsByClassName('listener');
        var currentLength = document.getElementsByClassName('current-length');

        body.classList.remove('lock');

        for (var i = 0; i < modaleWindow.length; i++) {
            modaleWindow[i].classList.add('visually-hidden');

            modaleWindow[i].addEventListener('transitionend', function closeMdlWindow(event) {
                var thisModaleWindow = this;
                if (event.propertyName === 'opacity') {
                    thisModaleWindow.classList.add('hidden');
                    thisModaleWindow.removeEventListener('transitionend', closeMdlWindow);
                }
            });
        }

        // Set the volume index to default
        var label = document.getElementsByClassName('label');
        var volume;
        var borderWidth;

        for (var m = 0; m < label.length; m++) {
            if (label[m].closest('.substrate') != null) {
                volume = parseInt(getComputedStyle(label[m].closest('.volume')).getPropertyValue('width'));
                borderWidth = parseInt(getComputedStyle(label[m].closest('.volume')).getPropertyValue('border-width'));
                label = parseInt(getComputedStyle(label[m]).getPropertyValue('width'));
            }
        }
        var maxPos = volume - label - borderWidth * 2;

        // Stop playing music on modal window close
        for (var j = 0; j < audio.length; j++) {
            audio[j].pause();
            audio[j].currentTime = 0;
            audio[j].parentNode.querySelector('.volume').querySelector('.volume-handle').style.width = maxPos + 'px';
            audio[j].volume = 1;
        }

        for (var k = 0; k < modWindListener.length; k++) {
            modWindListener[k].classList.remove('play-active');
        }

        for (var l = 0; l < currentLength.length; l++) {
            if (currentLength[l].closest('.soundtrack-listener') != undefined) {
                currentLength[l].style.width = 0;
            }
        }
    }



    // function closeListener() { // TODO: remove jquery     Removed
    //     $('body').removeClass('lock');
    //     $('.substrate').addClass('visually-hidden');
    //     $('.substrate').on('transitionend', function closeMdlWindow(e) {
    //         if (e.originalEvent.propertyName === 'opacity') {
    //             $('.substrate').addClass('hidden');
    //             $('.substrate').off('transitionend', closeMdlWindow);
    //         }
    //     });

    //     // Stop playing music on modal window close
    //     var audio = $('audio')[0];
    //     audio.pause();
    //     audio.currentTime = 0;

    //     $('.listener').removeClass('play-active');
    //     $('.current-length').css('width', 0);

    //     // Set the volume index to default
    //     var label = $('.label').width(); // TODO: do we need -1?     Corrected
    //     var maxPos = $('.volume').width() - label;
    //     $('audio').next().find('.volume-handle').css('width', maxPos + 'px');
    //     audio.volume = 1;
    // }

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
            // var thisListener = this; // TODO: no need     Removed
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

    // Make listener button as an play-triangle once the music is finished

    // for (var i = 0; i < audio.length; i++) { // TODO: can be but as I know, we have only one audio    Corrected
        // audio[i].addEventListener('ended', function () {
        //     var thisAudio = this;
        //     var listener = thisAudio.parentNode.querySelector('.listener');

        //     setTimeout(function () {
        //         listener.classList.remove('play-active');
        //         thisAudio.parentNode.querySelector('.media-length').querySelector('.current-length').style.width = 0;
        //         thisAudio.currentTime = 0;
        //         showTime(thisAudio);
        //     }, 500);
        // });

        // audio[i].addEventListener('playing', function () {
        //     progress(this);
        // });

        // audio[i].addEventListener('pause', function () {
        //     cancelAnimationFrame(timer);
        // });
    // }

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

        if (element.closest('.soundtrack-listener') != undefined) {
            element.parentNode.querySelector('.media-length').querySelector('.current-length').style.width = position + '%';
        } else {
            element.parentNode.querySelector('.video-controls').querySelector('.media-length').querySelector('.current-length').style.width = position + '%';
        }

        showTime(element);

        if (position < 100) {
            timer = requestAnimationFrame(function () {
                progress(element);
            });
        }
    }

    // function progress(element) { // TODO: remove jquery   Removed
    //     var position = (element.currentTime / element.duration) * 100;

    //     var linkToElem = $(element);

    //     if (linkToElem.parent('.soundtrack-listener').length === 1) {
    //         linkToElem.siblings('.media-length').find('.current-length').css('width', position + '%');
    //     } else {
    //         linkToElem.siblings('.video-controls').find('.current-length').css('width', position + '%');
    //     }

    //     showTime(element);

    //     if (position < 100) {
    //         timer = requestAnimationFrame(function () {
    //             progress(element);
    //         });
    //     }
    // }

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
        var inBarXCoor = elemCurLength.getBoundingClientRect().left; // TODO: maybe current-length in variable?     Corrected
        var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
        elemCurLength.style.width = inBarPosition + '%';

        if (element.closest('.soundtrack-listener') != undefined) {
            elemAudio.currentTime = (inBarPosition * elemAudio.duration) / 100; // TODO: maybe audio in variable?    Corrected

            showTime(element.parentNode.querySelector('audio'));
        } else {
            var elemVideo = element.closest('.video-controls').parentNode.querySelector('video');

            elemVideo.currentTime = (inBarPosition * elemVideo.duration) / 100; // TODO: maybe video in variable?    Corrected

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
            var videoControlsSibling = thisVideo.parentNode.querySelector('.video-controls');

            // TODO: so why not simplified?     Corrected
            // Can be simplified
            // var videoControlsSibling = thisVideo.parentNode.querySelector('.video-controls');

            var mediaLength = videoControlsSibling.querySelector('.media-length');
            var currentLength = mediaLength.querySelector('.current-length');

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
