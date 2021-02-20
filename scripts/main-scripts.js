document.addEventListener('DOMContentLoaded', function() {
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

        if (window.matchMedia('(max-width: 767px)').matches) {

            $("#nav-wrapper").on("click", function(event) {
                event.stopPropagation();
                $(".box-menu").finish().slideToggle(300);

                $("span").toggleClass("pressed");
            });

            $(".film-nav a").on("click", function() {
                $("span").toggleClass("pressed");
                $(".box-menu").finish().slideToggle(300);
            });

            $(document).click(function() {
                var arr = []

                for(var i = 0; i < $(".box-menu > li > a").length; i++){
                    arr.push($(".box-menu > li > a")[i]);
                }

                /*this part I don't like as I can't apply
                FOR loop. If I apply FOR loop the click on
                item in menu also hides the menu*/

                if(event.target != arr[0] &&
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