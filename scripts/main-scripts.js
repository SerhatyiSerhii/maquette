$(function () {

    // Smooth scroll to the film at Go-To menu
    $('a.top-film').on('click', function (event) {
        event.preventDefault();

        var topLink = $(this).attr('href');

        $('html').animate({
            scrollTop: $(topLink).offset().top
        }, 300);
    });

    // Scroll to Top10 on arrow-down click
    $('.arrow-down').on('click', function (event) {
        event.preventDefault();

        $('html').animate({
            scrollTop: $('#top-10').offset().top
        });
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
    $('button').on('click', function () {
        if (this.innerHTML == 'listen') {
            $('.substrate').addClass('active');
            $('body').addClass('lock');

            // Get name of the film above the clicked button 'Listen'
            let filmTitleListen = $(this).closest('.film-content').find('h2')[0].innerText;

            // Put the film title into the substrate window
            let listenerTitle = $('.listener-title');

            listenerTitle[0].textContent = filmTitleListen;
        }
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('.substrate').removeClass('active');
        $('body').removeClass('lock');
    }

    $('.close-listener').on('click', function() {
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });
});
