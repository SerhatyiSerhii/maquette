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
        $('.volume-handle').css('left', '91px');
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
        //progress($('audio')[0]);
        timer = setInterval(function() {
            progress($('audio')[0]);
            console.log('test');
        }, 100);
    });

    $('audio').on('pause', function () {
        // clearTimeout(timer);
        clearInterval(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        $('.current-length').css('width', position + '%');

        showTime(element);

        // if (position < 100) {
        //     timer = setTimeout(function () {
        //         progress(element);
        //     }, 50);
        // }
    }

    // Set the music's time on progress bar click
    $('.music-length').on('click', function (event) {
        // clearTimeout(timer);
        clearInterval(timer);

        var barWidth = $('.music-length').innerWidth();
        var inBarXCoor = $('.current-length').offset().left
        var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

        $('.current-length').css('width', inBarPosition + '%');

        $('audio')[0].currentTime = (inBarPosition * $('audio')[0].duration) / 100;

        showTime($('audio')[0]);
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

    // Move slides on side-dirrection arrows click
    function initSlider() { // TODO: rename function to something like initSlider   Corrected
        $('.slider').each(function () {
            // TODO:
            // implementation looks perfect but can be significantly simplified
            // you don't actually need width to calculate translate percentage
            // index is enough
            // you have min index - 0
            // you found max index
            // instead currTranslate you can set current active index - 1 (or 0 when you delete transform: traslate from css)
            // and this indices - min, max, and current - are enough to calculate required translate
            // Corrected
            var parent = $(this);

            var currIndex = 0;

            var maxIndex = parent.find('li').last().index();


            parent.find('.arrow-left').on('click', function (event) {
                event.preventDefault();

                currIndex--;
                settingTranslateX();

                if (currIndex <= 0) {
                    currIndex = 0;
                    settingTranslateX(); // TODO: you do absolutely the same in else, do you really need to wrap it in if/else?   Corrected
                }
            })

            parent.find('.arrow-right').on('click', function (event) {
                event.preventDefault();

                currIndex++;
                settingTranslateX();

                if (currIndex >= maxIndex) {
                    currIndex = maxIndex;
                    settingTranslateX(); // TODO: the same   Corrected
                }
            })

            function settingTranslateX() {
                parent.find('ul').css('transform', 'translateX(' + -currIndex*100 + '%)');
            }
        })
    }
    initSlider();

    // Volume bar
    $('.volume').on('mousedown', function(event) {
        moveVolumeHandle(event);

        $('.volume').on('mousemove', function(event) {
            moveVolumeHandle(event);
        });
    });

    $('.volume').on('mouseup', function() {
        $('.volume').off('mousemove');
    });

    $(document).on('mouseup', function() {
        $('.volume').off('mousemove');
    });

    function moveVolumeHandle(event) {
        var volumeLeftCoor = $('.volume').offset().left;
        var volHandTransl = parseInt($('.volume-handle').css('transform').split(',')[4], 10); // -5
        var maxPos = $('.volume').width() + volHandTransl; // 91
        var volHandlPos = event.pageX - volumeLeftCoor;
            if (volHandlPos >= maxPos) {
                volHandlPos = maxPos;
            } else if (volHandlPos <= -volHandTransl) {
                volHandlPos = -volHandTransl;
            }
        $('.volume-handle').css('left', volHandlPos + 'px');

        var volumeIndex = ((volHandlPos + volHandTransl) / (maxPos + volHandTransl));
        var audio = $('audio')[0];
        audio.volume = volumeIndex;
    }
});

