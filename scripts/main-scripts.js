// TODO: don't mix variable declarations, for now use var
// Corrected
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

        var firstTopFilm = $(this).attr('href'); // TODO: what's the point to add it here? add in template in href or data attribute
        // Corrected
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
        var filmTitleListen = $(this).closest('section')[0];

        // Put the film title into the substrate window
        // var listenerTitle = $('.listener-title'); // TODO: no need to store in variable
        // Corrected
        $('.listener-title')[0].textContent = filmTitleListen.dataset.name;

        // Set the name of an audio file to the corresponding movie into data-attribute of substrate window
        $('.substrate')[0].setAttribute('data-audio-name', filmTitleListen.dataset.audioName);

        // Set the source of audio file
        var audioAtr = $('.substrate')[0].dataset.audioName;
        audioElement.setAttribute('src', 'audios/' + audioAtr + '.ogg');

        // Display the duration of music
        audioElement.addEventListener('canplay', function() {
            currentTime(audioElement);
        });
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('body').removeClass('lock');
        $('.substrate').addClass('visually-hidden');
        $('.substrate')[0].addEventListener('transitionend', function some(e) {
            if (e.propertyName === 'opacity') {
                $('.substrate').addClass('hidden');
                $('.substrate')[0].removeEventListener('transitionend', some);
            }
        });

        // Stop playing music on modal window close
        audioElement.pause();
        audioElement.currentTime = 0;
        $('.listener').removeClass('play-active');
        inBar.style.width = 0;
    }

    $('.close-listener').on('click', function() { // TODO; if you are not going to use function parameter, you can either omit it, or add underscore e.g. _event
        // Corrected
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
            audioElement.play();
        } else {
            audioElement.pause();
        }
    });

    //  Announcement of audio element
    var audioElement = new Audio();

    // Links to outer progress bar and inner progress bar
    var bar = $('.music-length')[0];
    var inBar = $('.current-length')[0];

    // Make listener button as an play-triangle once the music is finished
    audioElement.addEventListener('ended', function() {
        setTimeout(function() {
            $('.listener').removeClass('play-active')
            inBar.style.width = 0;
            audioElement.currentTime = 0;
        }, 500);
    })

    audioElement.addEventListener('playing', function() {
        progress(audioElement);
    });

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        inBar.style.width = position + '%';

        if (position < 100) {
            setTimeout(function() {
                progress(element);
            });
        }

        currentTime(element);
    }

    // Set the music's time on progress bar click
    bar.addEventListener('click', function(event) {
        // Get the inner width of outer progress bar
        var barWidth = bar.clientWidth;
        // Get the x coordinates of inner progress bar's left side
        var inBarXCoor = inBar.getBoundingClientRect().left;
        // Get the value of inner progres bar on click
        var inBarPosition = ((event.pageX - inBarXCoor)/barWidth)*100;
        inBar.style.width = inBarPosition + '%';
        // Convert the value of inner progress bar into music seconds
        audioElement.currentTime = (inBarPosition * audioElement.duration)/100;
    });


    function currentTime(element) {
        var min = Math.floor(audioElement.currentTime / 60);
        var sec = Math.floor(audioElement.currentTime % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        $('.timer')[0].textContent = min + ':' + sec;
        totalTime(element)
    }

    function totalTime(element) {
        var min = Math.floor(audioElement.duration / 60);
        var sec = Math.floor(audioElement.duration % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        $('.timer')[0].textContent += ' / ' + min + ':' + sec;
    }
});
