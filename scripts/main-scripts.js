// TODO: stop playing media if another media started
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
            showTime($(this)[0]); // TODO: WAT? What the difference between $(this)[0] and this
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
        $('audio').next().find('.label').css('left', maxPos + 'px'); // TODO: making label a volume-handle child will prevent from setting position for label
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
        $(this).toggleClass('play-active'); // TODO: $(this) can be stored in variable

        if ($(this).hasClass('play-active')) {
            $(this).siblings('audio')[0].play();
        } else {
            $(this).siblings('audio')[0].pause();
        }
    });

    // Make listener button as an play-triangle once the music is finished
    $('audio').on('ended', function () {
        var audio = $(this);
        setTimeout(function () {
            $('.listener').removeClass('play-active')
            audio.siblings('.music-length').find('.current-length').css('width', 0);
            audio[0].currentTime = 0;
            showTime(audio[0]); // TODO: WAT?
        }, 500);
    });

    $('audio').on('playing', function () {
        progress($(this)[0]); // TODO: WAT?
    });

    $('audio').on('pause', function () {
        window.cancelAnimationFrame(timer); // TODO: can be used without window
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        if ($(element).parent('.soundtrack-listener').length === 1) {
            $(element).siblings('.music-length').find('.current-length').css('width', position + '%');
        } else {
            $(element).siblings('.video-controls').find('.current-length').css('width', position + '%');
        }

        showTime(element);

        if (position < 100) {
            timer = window.requestAnimationFrame(function () { // TODO: can be used without window
                progress(element);
            });
        }
    }

    // Set the music's time on progress bar click && video's time
    $('.music-length').on('click', function () { // TODO: many code duplication
        if ($(this).closest('.soundtrack-listener').length != 0) { // TODO: maybe $(this) to variable?
            window.cancelAnimationFrame(timer); // TODO: can be used without window

            var barWidth = $(this).innerWidth();
            var inBarXCoor = $(this).find('.current-length').offset().left;
            var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

            $(this).find('.current-length').css('width', inBarPosition + '%');

            $(this).siblings('audio')[0].currentTime = (inBarPosition * $(this).siblings('audio')[0].duration) / 100;

            showTime($(this).siblings('audio')[0]);
        } else {
            window.cancelAnimationFrame(timer); // TODO: can be used without window

            var barWidth = $(this).innerWidth();
            var inBarXCoor = $(this).find('.current-length').offset().left;
            var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
            $(this).find('.current-length').css('width', inBarPosition + '%');

            $(this).closest('.video-controls').siblings('video')[0].currentTime = (inBarPosition * $(this).closest('.video-controls').siblings('video')[0].duration) / 100;
            showTime($(this).closest('.video-wrapper').find('video')[0]);
        }
    });

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

        putVolumeHandle(currentVolume);

        $(document).on('mousemove', function () {
            putVolumeHandle(currentVolume);
        });

        $(document).on('mouseup', function () {
            $(document).off('mousemove');
        });
    });

    function putVolumeHandle(el) {
        // TODO: why -0.5?
        var halfLabel = el.find('.label').width() * -0.5; // -5 // TODO: what is 5? what if label width cahnged - will you edit comment?
        var volumeLeftCoor = el.find('.volume-handle').offset().left;
        var volHandlPos = event.pageX - volumeLeftCoor; // TODO: where event come from?

        if (volHandlPos >= el.width() + halfLabel) {
            volHandlPos = el.width() + halfLabel;
        } else if (volHandlPos <= -halfLabel) {
            volHandlPos = -halfLabel;
        }
        var halfLabel = el.find('.label').width() * -0.5; // TODO: looks like you have just already calculated it
        el.find('.label').css('left', volHandlPos + halfLabel + 'px'); // TODO: making label a child of volume handle will remove this line
        el.find('.volume-handle').css('width', volHandlPos + halfLabel + 'px');

        var volumeIndex = (volHandlPos + halfLabel) / (el.width() + halfLabel * 2);

        if (el.parent('.soundtrack-listener').length == 1) {
            el.siblings('audio')[0].volume = volumeIndex;
        } else {
            el.parent().siblings('video')[0].volume = volumeIndex;
        }
    }

    // Playing video & video controls
    $('.btn-play').on('click', function () { // TODO: consider add specific class for video buttons
        if ($(this).closest('.slider').length != 0) { // TODO: consider addint $(this) to variable
            $(this).toggleClass('playing-video play-active');

            var image = $(this).prev();
            if ($(this).hasClass('playing-video')) {
                image.css('display', 'none');
                $(this).siblings('.video-wrapper').css('display', 'block'); // TODO: you can even add $(this).siblings('.video-wrapper') to variable
            } else {
                image.css('display', 'block');
                $(this).siblings('.video-wrapper').css('display', 'none');
            }

            var video = $(this).siblings('.video-wrapper').find('video')[0];

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    });

    $('video').on('canplay', function () {
        showTime($(this)[0]); // TODO: WAT?
    });

    $('video').on('playing', function () {
        progress($(this)[0]); // TODO: WAT?
    });

    $('video').on('pause', function () {
        window.cancelAnimationFrame(timer); // TODO: can be used without window
    });

    $('video').on('ended', function () {
        var video = $(this);
        // TODO: remove
        setTimeout(function () { // To update inner bar once video is finished
            progress(video[0]); // as offset().left has decimals and this decimals
        }, 50);                 // sometimes are visible on inner bar when cliscked to the end.
        setTimeout(function () {
            video.parent().siblings('.btn-play').removeClass('playing-video play-active');
            video.siblings('.video-controls').find('.current-length').css('width', 0);
            video[0].currentTime = 0;
            showTime(video[0]);  // TODO: WAT?
            video.parent().css('display', 'none');
            video.parent().siblings('img').css('display', 'block');
        }, 500);
    });
});
