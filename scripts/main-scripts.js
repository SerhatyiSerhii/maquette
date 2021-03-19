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
            showTime($('audio')[0]);
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
        var volHandTransl = $('.volume-handle').width()*-0.5;
        var maxPos = $('.volume').width() + volHandTransl;
        $('.volume-handle').css('left', maxPos + volHandTransl + 'px'); // TODO: never use magic numbers, magic strings etc. Find another way to set valume to max   Corrected
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
        $(this).toggleClass('play-active');

        if ($(this).hasClass('play-active')) {
            $('audio')[0].play();
        } else {
            $('audio')[0].pause();
        }
    });

    // Make listener button as an play-triangle once the music is finished
    $('audio').on('ended', function () {
        setTimeout(function () {
            $('.listener').removeClass('play-active')
            $('.current-length').css('width', 0);
            $('audio')[0].currentTime = 0;
            showTime($('audio')[0]);
        }, 500);
    });

    $('audio').on('playing', function () {
        progress($('audio')[0]);
        // timer = setInterval(function () {
        //     progress($('audio')[0]);
        // }, 100);
    });

    $('audio').on('pause', function () {
        // clearTimeout(timer);
        // clearInterval(timer);
        window.cancelAnimationFrame(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        $('.current-length').css('width', position + '%');

        showTime(element);

        if (position < 100) {
            // timer = setTimeout(function () {
            //     progress(element);
            // }, 50);
            timer = window.requestAnimationFrame(function() {
                progress(element);
            });
        }
    }

    // Set the music's time on progress bar click
    $('.music-length').on('click', function (event) {
        // clearTimeout(timer);
        // clearInterval(timer);
        if ($(this).closest('.soundtrack-listener').length != 0) {
            window.cancelAnimationFrame(timer);

            var barWidth = $('.music-length').innerWidth();
            var inBarXCoor = $('.current-length').offset().left
            var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

            $('.current-length').css('width', inBarPosition + '%');

            $('audio')[0].currentTime = (inBarPosition * $('audio')[0].duration) / 100;

            showTime($('audio')[0]);
        }
    });


    function showTime(element) {
        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);
        $('.timer').text(minSecCurTime + ' / ' + minSecDurat);
    }

    function calcTime(e) {
        var min = Math.floor(e / 60);
        var sec = Math.floor(e % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return min + ':' + sec;
    }

    function initSlider(index) { // TODO: make function to accept initial slide index. Set translate on slider init. Pass index 1 to initSlider     Done
        $('.slider').each(function () {
            var parent = $(this);
            var currIndex = index;
            var maxIndex = parent.find('li').last().index();
            settingTranslateX();

            parent.find('.arrow-left').on('click', function (event) {
                event.preventDefault();

                currIndex--;
                settingTranslateX();

                // if (currIndex <= 0) { // TODO: if you have separate function for setting translate, then you can check index to fit bounds in that function   Corrected
                //     currIndex = 0;
                //     settingTranslateX();
                // }
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

    // Volume bar
    $('.volume').on('mousedown', function () {

        moveVolumeHandle(event); // TODO: do you need it? if it is for click - add it explicitly to click event   Click works like mouseup.
        // The adjusting of volume with only click doesn't make any big difference
        // with mousedown, but when we intend to adjust volume with mousemove event,
        // then the click makes the big difference with the comparising with mousedown.
        // Press the mouse, but don't move it to see the result.

        $(document).on('mousemove', moveVolumeHandle); // TODO: if mouse leaves bounds of .volume this stops working. Consider add event on document    Corrected

        // TODO: hint
        // you can avoid wrapping just handler in anonymous function
        // the code below
        // $('.volume').on('mousemove', function(event) {
        //     moveVolumeHandle(event);
        // });
        // is the same as
        // $('.volume').on('mousemove', moveVolumeHandle);

        $(document).one('mouseup', function() {
            $(document).off('mousemove');
        });
    });


    // $(document).on('mouseup', function () { // TODO: you don't need to remove mousemove each time mouseup happens on document. you need it just once if it was added. Consider to add it where mousemove event added     Corrected
    //     $('.volume').off('mousemove');
    // });

    function moveVolumeHandle(event) {
        var volumeLeftCoor = $('.volume').offset().left;
        var volHandTransl = $('.volume-handle').width()*-0.5; // -5 // TODO: think of better solution instead of parsing transform. Move it with left property at least     Corrected
        var maxPos = $('.volume').width() + volHandTransl; // 91
        var volHandlPos = event.pageX - volumeLeftCoor;
        if (volHandlPos >= maxPos) {
            volHandlPos = maxPos;
        } else if (volHandlPos <= -volHandTransl) {
            volHandlPos = -volHandTransl;
        }
        $('.volume-handle').css('left', volHandlPos + volHandTransl + 'px');

        var volumeIndex = ((volHandlPos + volHandTransl) / (maxPos + volHandTransl));
        $('audio')[0].volume = volumeIndex;// TODO: you don't need to store audio in variable here   Corrected
    }

    // Playing video
    $('.btn-play').on('click', function() {
        if ($(this).closest('.slider').length != 0) {
            $(this).toggleClass('playing-video play-active');

            var image = $(this).prev();
            if ($(this).hasClass('playing-video')) {
                image.css('display', 'none');
                $(this).siblings('.video-wrapper').css('display', 'block');
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
});

