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

        let firstTopFilm = $(this).attr('href', '#top-10');

        // $('html').animate({ // TODO: duplication, make function for html animation   Corrected
        //     scrollTop: $(firstTopFilm).offset().top // TODO: hardcode, store id info in data- attribute or href  Corrected
        // });
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
        // TODO: to add event for right buttons use specific selector, not button content
        // Corrected
        $('body').addClass('lock');
        $('.substrate').removeClass('hidden');
        setTimeout(function() {
            $('.substrate').removeClass('visuallyHidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'

        // TODO: for such casses better to use data- attributes on elements and read data from these attributes, but not from content.
        // Corrected
        // let filmTitleListen = $(this).closest('.film-content').find('h2')[0].textContent; // TODO: textContent is better property.  Corrected
        let filmTitleListen = $(this).closest('.film-content').find('h2')[0];

        // Put the film title into the substrate window
        let listenerTitle = $('.listener-title');

        // listenerTitle[0].textContent = filmTitleListen;
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

    $('.close-listener').on('click', function(event) {
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });
});
