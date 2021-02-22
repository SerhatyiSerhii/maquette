document.addEventListener('DOMContentLoaded', function() { // TODO: remove
    $(function() {
        //Smooth scroll to the film at Go-To menu
        $('a.top-film').on('click', function(event) {
            event.preventDefault();

            var topLink = $(this).attr('href');

            $('html').animate({
                scrollTop: $(topLink).offset().top
            }, 300);
        });

        //Hover on Go-To menu
        $('.go-to').hover(function() {
            $('.film-nav').finish().slideToggle(300);
        });

        if (window.matchMedia('(max-width: 767px)').matches) { // TODO: support screen flip

            $("#nav-wrapper").on("click", function(event) {
                event.stopPropagation(); // TODO: learn
                $(".box-menu").finish().slideToggle(300); // TODO: code duplication

                $("span").toggleClass("pressed"); // TODO: SPAN???
            });

            $(".film-nav a").on("click", function() { // TODO: bad selector
                $("span").toggleClass("pressed");
                $(".box-menu").finish().slideToggle(300);
            });

            $(document).click(function(event) { // TODO: use modern method to add event // TODO: rewrite using closest
                var arr = []

                for(var i = 0; i < $(".box-menu > li > a").length; i++){ // TODO: bad selector
                    arr.push($(".box-menu > li > a")[i]);
                }

                /*this part I don't like as I can't apply
                FOR loop. If I apply FOR loop the click on
                item in menu also hides the menu*/

                if(event.target != arr[0] && // TODO: where did event come from?
                    event.target != arr[1] &&
                    event.target != arr[2] &&
                    event.target != arr[3]) {
                    $(".box-menu").hide();
                    $("span").removeClass("pressed");
                }
            });
        }
    })
});