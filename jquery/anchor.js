$(document).on('click', 'a[href^="#top"]', function(event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 1000);
});

