$(function() {
    //Smooth scroll to the film at Go-To menu
    $('a.top-film').click(function(event) {
        event.preventDefault();
        //The Method preventDefault() of an object Event:
        //This Method cancels the default behavior of
        //an Event in a browser that is applied by a user
        //to an element of a page.

        //In our case Event is a left click of a mouse.
        //When a user clicks on a link with a class top-film
        //the link will not work. By default a link should
        //lead the user to a new page or to the specific part
        //of the active page. But the defualt behavior is
        //cancelled and nothing is going to happend.
        //BTW: the Event "click" is still spreading on other
        //elements in DOM-structure,
        //but the Event does nothing.

        var topLink = $(this).attr('href');

        $('html').animate({
            scrollTop: $(topLink).offset().top
        }, 300);
    });

    //Hover on Go-To menu
    $(".go-to").hover(function() {
        $(".film-nav").finish().slideToggle(300);
    });
});


