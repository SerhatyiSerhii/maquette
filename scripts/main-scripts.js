// TODO: stop playing media if another media started    Corrected
$(function () {
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

    $('#nav-wrapper').on('click', function (event) {
        event.stopPropagation();
        toggleBurger();
    });

    $('.top-film').on('click', function () {
        if ($(window).outerWidth() < 768) {
            toggleBurger();
        }
    });

    $(document).on('click', function (event) {
        if ($(window).outerWidth() < 768 && $(event.target).closest('.box-menu').length === 0) {
            $('.box-menu').finish().slideUp(300);
            $('#burger-img').removeClass('pressed');
        }
    });


    $(window).on('resize', function () {
        if ($(window).outerWidth() < 768) {
            $('.box-menu').hide();
        } else {
            $('.box-menu').show();
            $('#burger-img').removeClass('pressed');
        }
    });

    // Substrate window on button 'Listen' click
    $('.listen').on('click', function () {
        $('body').addClass('lock');
        $('.substrate').removeClass('hidden');
        setTimeout(function () {
            $('.substrate').removeClass('visually-hidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        var filmTitleListen = $(this).closest('section');

        // Put the film title into the substrate window
        $('.listener-title').text(filmTitleListen.attr('data-name'));

        // Set the source of audio file
        var audioAtr = filmTitleListen.attr('data-audio-name');
        $('audio').attr('src', 'audios/' + audioAtr + '.ogg');


        // Display the duration of music
        $('audio').on('canplay', function () {
            showTime(this); // TODO: WAT? What the difference between $(this)[0] and this   Corrected
        });
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('body').removeClass('lock');
        $('.substrate').addClass('visually-hidden');
        $('.substrate').on('transitionend', function closeMdlWindow(e) {
            if (e.originalEvent.propertyName === 'opacity') {
                $('.substrate').addClass('hidden');
                $('.substrate').off('transitionend', closeMdlWindow);
            }
        });

        // Stop playing music on modal window close
        var audio = $('audio')[0];
        audio.pause();
        audio.currentTime = 0;

        $('.listener').removeClass('play-active');
        $('.current-length').css('width', 0);

        // Set the volume index to default
        var label = $('.label').width() * -1;
        var maxPos = $('.volume').width() + label;
        $('audio').next().find('.volume-handle').css('width', maxPos + 'px');
        // $('audio').next().find('.label').css('left', maxPos + 'px'); // TODO: making label a volume-handle child will prevent from setting position for label     Corrected
        audio.volume = 1;
    }

    $('.close-listener').on('click', function () {
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });

    // Play or pause the music of a movie
    $('.listener').on('click', function () {

        var listener = $(this);

        listener.toggleClass('play-active'); // TODO: $(this) can be stored in variable     Corrected

        $('video').each(function() { // Stop video on audio play
            var video = $(this);
            video[0].pause();
            video.parent().siblings('.btn-play').removeClass('playing-video play-active');
            video.parent().css('display', 'none');
            video.parent().siblings('img').css('display', 'block');
        });

        if (listener.hasClass('play-active')) {
            listener.siblings('audio')[0].play();
        } else {
            listener.siblings('audio')[0].pause();
        }
    });

    // Make listener button as an play-triangle once the music is finished
    $('audio').on('ended', function () {
        var audio = $(this);
        setTimeout(function () {
            $('.listener').removeClass('play-active')
            audio.siblings('.media-length').find('.current-length').css('width', 0);
            audio[0].currentTime = 0;
            showTime(audio); // TODO: WAT? Corrected
        }, 500);
    });

    $('audio').on('playing', function () {
        progress(this); // TODO: WAT?   Corrected
    });

    $('audio').on('pause', function () {
        cancelAnimationFrame(timer); // TODO: can be used without window    Corrected
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        if ($(element).parent('.soundtrack-listener').length === 1) {
            $(element).siblings('.media-length').find('.current-length').css('width', position + '%');
        } else {
            $(element).siblings('.video-controls').find('.current-length').css('width', position + '%');
        }

        showTime(element);

        if (position < 100) {
            timer = requestAnimationFrame(function () { // TODO: can be used without window     Corrected
                progress(element);
            });
        }
    }

    // Set the music's time on progress bar click && video's time
    $('.media-length').on('click', function () { // TODO: many code duplication     Corrected

        var musicLength = $(this);

        cancelAnimationFrame(timer);

        setMediaVolumeInBarWidth(musicLength, event);
    });

    function setMediaVolumeInBarWidth(element, event) {
        var barWidth = element.innerWidth();
        var inBarXCoor = element.find('.current-length').offset().left;
        var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
        element.find('.current-length').css('width', inBarPosition + '%');

        if (element.closest('.soundtrack-listener').length != 0) {
            element.siblings('audio')[0].currentTime = (inBarPosition * element.siblings('audio')[0].duration) / 100;

            showTime(element.siblings('audio')[0]);
        } else {

            element.closest('.video-controls').siblings('video')[0].currentTime = (inBarPosition * element.closest('.video-controls').siblings('video')[0].duration) / 100;

            showTime(element.closest('.video-wrapper').find('video')[0]);
        }
    }

    function showTime(element) {
        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);
        $(element).siblings('.timer').text(minSecCurTime + ' / ' + minSecDurat);
    }

    function calcTime(e) {
        var min = Math.floor(e / 60);
        var sec = Math.floor(e % 60);

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

    $('.volume').on('mousedown', function () {
        var currentVolume = $(this);

        putVolumeHandle(currentVolume, event);

        $(document).on('mousemove', function () {
            putVolumeHandle(currentVolume, event);
        });

        $(document).on('mouseup', function () {
            $(document).off('mousemove');
        });
    });

    function putVolumeHandle(el, event) {
        // TODO: why -0.5?   Corrected
        var halfLabel = el.find('.label').width() / 2; // TODO: what is 5? what if label width cahnged - will you edit comment?     Corrected
        var volumeLeftCoor = el.find('.volume-handle').offset().left;
        var volHandlPos = event.pageX - volumeLeftCoor; // TODO: where event come from?     Corrected

        if (volHandlPos >= el.width() - halfLabel) {
            volHandlPos = el.width() - halfLabel;
        } else if (volHandlPos <= halfLabel) {
            volHandlPos = halfLabel;
        }
        // el.find('.label').css('left', volHandlPos + halfLabel + 'px'); // TODO: making label a child of volume handle will remove this line   Corrected
        el.find('.volume-handle').css('width', volHandlPos - halfLabel + 'px');

        var volumeIndex = (volHandlPos - halfLabel) / (el.width() - halfLabel * 2);

        if (el.parent('.soundtrack-listener').length == 1) {
            el.siblings('audio')[0].volume = volumeIndex;
        } else {
            el.parent().siblings('video')[0].volume = volumeIndex;
        }
    }

    // Playing video & video controls
    $('.promo-video').on('click', function () { // TODO: consider add specific class for video buttons   Corrected

        var promoVideo = $(this);
        var videoWrapper = promoVideo.siblings('.video-wrapper');

        if (promoVideo.closest('.slider').length != 0) { // TODO: consider addint $(this) to variable    Corrected
            promoVideo.toggleClass('playing-video play-active');

            var image = $(this).prev();
            if (promoVideo.hasClass('playing-video')) {
                image.css('display', 'none');
                videoWrapper.css('display', 'block'); // TODO: you can even add $(this).siblings('.video-wrapper') to variable   Corrected
            } else {
                image.css('display', 'block');
                videoWrapper.css('display', 'none');
            }

            var currentVideo = promoVideo.siblings('.video-wrapper').find('video')[0];
            var allVideos = $('video');

            for (var i = 0; i < allVideos.length; i++) {
                if (allVideos[i] != currentVideo) {
                    allVideos[i].pause();
                    $(allVideos[i]).parent().siblings('.btn-play').removeClass('playing-video play-active');
                    $(allVideos[i]).parent().siblings('img').css('display', 'block');
                    $(allVideos[i]).parent().css('display', 'none');
                }
            }

            if (currentVideo.paused) {
                currentVideo.play();
            } else {
                currentVideo.pause();
            }
        }
    });

    $('video').on('canplay', function () {
        showTime(this); // TODO: WAT?    Corrected
    });

    $('video').on('playing', function () {
        progress(this); // TODO: WAT?   Corrected
    });

    $('video').on('pause', function () {
        cancelAnimationFrame(timer); // TODO: can be used without window     Corrected
    });

    $('video').on('ended', function () {
        var video = $(this);
        // TODO: remove     Corrected
        // setTimeout(function () { // To update inner bar once video is finished
        //     progress(video[0]); // as offset().left has decimals and this decimals
        // }, 50);                 // sometimes are visible on inner bar when cliscked to the end.
        setTimeout(function () {
            video.parent().siblings('.btn-play').removeClass('playing-video play-active');
            video.siblings('.video-controls').find('.current-length').css('width', 0);
            video[0].currentTime = 0;
            showTime(video);  // TODO: WAT?   Corrected
            video.parent().css('display', 'none');
            video.parent().siblings('img').css('display', 'block');
        }, 500);
    });

    $('.volume').each(function() {
        var volumeBar = $(this);
        var volumeHandle = volumeBar.find('.volume-handle');
        var volumeLable = volumeHandle.find('.label');

        volumeHandle.css('width', volumeBar.width() - volumeLable.width() + 'px');
    });
});
