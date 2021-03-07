// TODO: remove all addEventListener and removeEventListener and use jQuery for this    Corrected
// TODO: some comments are superfluous  Deleted several comments
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
        setTimeout(function() {
            $('.substrate').removeClass('visually-hidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        var filmTitleListen = $(this).closest('section');

        // Put the film title into the substrate window
        $('.listener-title')[0].textContent = filmTitleListen.attr('data-name');// TODO: use jquery  Corrected

        // Set the name of an audio file to the corresponding movie into data-attribute of audio tag
        // $('.substrate').attr('data-audio-name', filmTitleListen.attr('data-audio-name')); // TODO: does substrate window need this attribute?    Corrected. At the moment the data attribute is setting to audio tag
        $('audio').attr('data-audio-name', filmTitleListen.attr('data-audio-name'));

        // Set the source of audio file
        var audioAtr = $('audio').attr('data-audio-name');
        $('audio').attr('src', 'audios/' + audioAtr + '.ogg');


        // Display the duration of music
        $('audio').on('canplay',function() {
            showTime($('audio')[0]);
        });
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('body').removeClass('lock');
        $('.substrate').addClass('visually-hidden');
        $('.substrate').on('transitionend', function some(e) {
            if (e.originalEvent.propertyName === 'opacity') {
                $('.substrate').addClass('hidden');
                $('.substrate').off('transitionend', some);
            }
        });

        // Stop playing music on modal window close
        $('audio')[0].pause();
        $('audio')[0].currentTime = 0;

        $('.listener').removeClass('play-active');
        //inBar.style.width = 0; // TODO: use jQuery for this   Corrected
        $('.current-length').css('width', 0);
    }

    $('.close-listener').on('click', function() {
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });

    // Play or pause the music of a movie
    $('.listener').on('click', function() {
        $(this).toggleClass('play-active');

        if ($(this).hasClass('play-active')) {
            $('audio')[0].play();
        } else {
            $('audio')[0].pause();
        }
    });

    // var audioElement = new Audio(); // TODO: add it as html element in template, and use jqeury to select from template  Corrected

    //var bar = $('.music-length')[0]; // TODO: don't store in global variable, only in local when you need it   Corrected
    //var inBar = $('.current-length')[0]; // TODO: don't store in global variable, only in local when you need it   Corrected

    // Make listener button as an play-triangle once the music is finished
    $('audio').on('ended', function() {
        setTimeout(function() {
            $('.listener').removeClass('play-active')
            //inBar.style.width = 0; // TODO: use jquery    Corrected
            $('.current-length').css('width', 0);
            $('audio')[0].currentTime = 0;
            showTime($('audio')[0]);
        }, 500);
    });

    $('audio').on('playing', function(e) {
        progress($('audio')[0]);
    });

    $('audio').on('pause', function() {
        clearTimeout(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        //inBar.style.width = position + '%';// TODO: use jquery    Corrected
        $('.current-length').css('width', position + '%');

        if (position < 100) {
            timer = setTimeout(function() {
                progress(element);
                console.log('I\'m logging infinetely!!!!!!!!!!!!!'); // TODO: wow, try to run and stop music. Then look into console. Try to figure out, what's wrong and fix   Corrected
                showTime(element);
            }, 50);
        }
        //showTime(element); // TODO: why do you call it after setTimeout?   Corrected
    }

    // Set the music's time on progress bar click
    $('.music-length').on('click', function(event) {
        clearTimeout(timer);

        // var barWidth = bar.clientWidth;// TODO: use jquery   Corrected
        var barWidth = $('.music-length').innerWidth();


        //var inBarXCoor = $('.current-length')[0].getBoundingClientRect().left; // TODO: I believe, jquery also has method for this     Corrected
        var inBarXCoor = $('.current-length').offset().left

        var inBarPosition = ((event.pageX - inBarXCoor)/barWidth)*100;
        //inBar.style.width = inBarPosition + '%';// TODO: use jquery Corrected
        $('.current-length').css('width', inBarPosition + '%');

        $('audio')[0].currentTime = (inBarPosition * $('audio')[0].duration)/100;

        showTime($('audio')[0]);
    });


    function showTime(element) {
        // var min = Math.floor($('audio')[0].currentTime / 60); // TODO: code duplication start    Corrected
        // sec = (sec < 10) ? '0' + sec : sec; // TODO: code duplication end    Corrected
        // $('.timer')[0].textContent = min + ':' + sec;// TODO: use jquery     Corrected
        //totalTime(element) // TODO: why current time calculate total time?    Corrected

        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);
        $('.timer').text(minSecCurTime[0] + ':' + minSecCurTime[1]);
        $('.timer').text($('.timer')[0].textContent + ' / ' + minSecDurat[0] + ':' + minSecDurat[1]);
    }
});

function calcTime(e) {
    var min = Math.floor(e / 60);
    var sec = Math.floor(e % 60);

    min = (min < 10) ? '0' + min : min;
    sec = (sec < 10) ? '0' + sec : sec;
    return [min, sec];
}
