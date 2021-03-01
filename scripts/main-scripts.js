// TODO: don't mix variable declarations, for now use var
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

        let firstTopFilm = $(this).attr('href', '#top-10'); // TODO: what's the point to add it here? add in template in href or data attribute

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
            $('.substrate').removeClass('visuallyHidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        let filmTitleListen = $(this).closest('.film-content').find('h2')[0];

        // Put the film title into the substrate window
        let listenerTitle = $('.listener-title'); // TODO: no need to store in variable

        listenerTitle[0].textContent = filmTitleListen.dataset.name;
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('body').removeClass('lock');
        $('.substrate').addClass('visuallyHidden');
        $('.substrate').one('transitionend', function() {
            $('.substrate').addClass('hidden');
        });
    }

    $('.close-listener').on('click', function(event) { // TODO; if you are not going to use function parameter, you can either omit it, or add underscore e.g. _event
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });
});
