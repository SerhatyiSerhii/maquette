$(function () {
    //Smooth scroll to the film at Go-To menu
    $('a.top-film').on('click', function (event) {
        event.preventDefault();

        var topLink = $(this).attr('href');

        $('html').animate({
            scrollTop: $(topLink).offset().top
        }, 300);
    });

    //Hover on Go-To menu
    $('.go-to').hover(function () {
        $('.film-nav').finish().slideToggle(300);
    });

    // var windowWidth = $(window).outerWidth();

    // if (windowWidth <= 767) { // TODO: support screen flip

    //     function toggle() {
    //         $('.box-menu').finish().slideToggle(300); // TODO: code duplication     Removed code duplication
    //         $('#burger-img').toggleClass('pressed'); // TODO: SPAN???   Corrected
    //     }

    //     $('#nav-wrapper').on('click', function (event) {
    //         event.stopPropagation(); // TODO: learn     Completed
    //         toggle();
    //     });

    //     $('.top-film').on('click', function () { // TODO: bad selector    Corrected
    //         toggle();
    //     });

    //     $(document).on('click', function (event) { // TODO: use modern method to add event    Corrected // TODO: rewrite using closest   Made with closest

    //         if ($(event.target).closest(".box-menu").length === 0) {
    //             $('.box-menu').finish().slideUp(300);
    //             $('#burger-img').removeClass('pressed');
    //         }
    //     });
    // }

    function addActive () {

        function activeBox () {
            $('.box-menu').toggleClass('active');
            if ($('.box-menu').hasClass('active')) {
                $('.active').css('display', 'block');
            } else {
                $('.box-menu').removeAttr('style');
            }
            $('#burger-img').toggleClass('pressed');
        }

        function removeActiveBox () {
            $('.box-menu').removeClass('active');
            if ($('.box-menu').hasClass('active')) {
                $('.active').css('display', 'block');
            } else {
                $('.box-menu').removeAttr('style');
            }
            $('#burger-img').removeClass('pressed');
        }

        $('#nav-wrapper').on('click', function (event) {
            event.stopPropagation();
            activeBox ();
        });

        $('.top-film').on('click', function () {
            removeActiveBox ();
        });

        $(document).on('click', function (event) {
            if ($(event.target).closest('.box-menu').length === 0) {
                removeActiveBox ();
            }
        });
    }

    addActive();
});
