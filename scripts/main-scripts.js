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
        $('.listener-title').text(filmTitleListen.attr('data-name'));// TODO: use jquery  Corrected // TODO: I meant setting text content through jquery    Corrected

        // Set the name of an audio file to the corresponding movie into data-attribute of audio tag
        //$('audio').attr('data-audio-name', filmTitleListen.attr('data-audio-name')); // TODO: does audio element need this?   No, it works good without this action :)

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
        $('.substrate').on('transitionend', function some(e) {
            console.log(e.originalEvent.propertyName);
            if (e.originalEvent.propertyName === 'opacity') {
                $('.substrate').addClass('hidden');
                $('.substrate').off('transitionend', some); // TODO: earlierly you use jquery method .one to add one time event
                // method .one fires at first ended transition
                // added to console the properyName of transitionend event
                // and increased substrate transition at common.scss.
                // Opacity fires after all transitions if a swift hover and
                // click on cross appeared or vice versa;
                // method .on allows to apply rule at properyName 'opacity'
                // all transitions fire and than modal window disappears smoothly
                // window disappears smoothly
            }
            // method .one works like if I put the command below without comment
            // $('.substrate').off('transitionend', some);
        });

        // Stop playing music on modal window close
        // TODO: and here you can store audio to local var  Corrected
        var audio = $('audio')[0];
        audio.pause();
        audio.currentTime = 0;

        $('.listener').removeClass('play-active');
        $('.current-length').css('width', 0);
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

    $('audio').on('playing', function () { // TODO: unused event    Corrected
        progress($('audio')[0]);
    });

    $('audio').on('pause', function () {
        clearTimeout(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        $('.current-length').css('width', position + '%');

        showTime(element);

        if (position < 100) {
            timer = setTimeout(function () {
                progress(element);
                //showTime(element); // TODO: setting time should be simultaneous to setting current bar position, not after    Corrected
            }, 50);
        }
    }

    // Set the music's time on progress bar click
    $('.music-length').on('click', function (event) {
        clearTimeout(timer);

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
        //$('.timer').text($('.timer')[0].textContent + ' / ' + minSecDurat[0] + ':' + minSecDurat[1]); // TODO: this can be set in a single line   Corrected
    }

    function calcTime(e) { // TODO: why this function defined outside, while others inside?     Corrected
        var min = Math.floor(e / 60);
        var sec = Math.floor(e % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return min + ':' + sec; // TODO: function can return ready string   Corrected
    }
});

