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
        setTimeout(function () {
            $('.substrate').removeClass('visually-hidden');
        }, 20);

        // Get name of the film above the clicked button 'Listen'
        var filmTitleListen = $(this).closest('section');

        // Put the film title into the substrate window
        $('.listener-title').text(filmTitleListen.attr('data-name'));

        // Set the source of audio file
        var audioAtr = filmTitleListen.attr('data-audio-name');
        $('audio').attr('src', 'audios/' + audioAtr + '.ogg');


        // Display the duration of music
        $('audio').on('canplay', function () {
            showTime($(this)[0]);
        });
    });

    // For closing substrate window and showing scroll on the page
    function closeListener() {
        $('body').removeClass('lock');
        $('.substrate').addClass('visually-hidden');
        $('.substrate').on('transitionend', function closeMdlWindow(e) {
            if (e.originalEvent.propertyName === 'opacity') {
                $('.substrate').addClass('hidden');
                $('.substrate').off('transitionend', closeMdlWindow);
            }
        });

        // Stop playing music on modal window close
        var audio = $('audio')[0];
        audio.pause();
        audio.currentTime = 0;

        $('.listener').removeClass('play-active');
        $('.current-length').css('width', 0);

        // Set the volume index to default
        var label = $('.label').width()*-1;
        var maxPos = $('.volume').width() + label;
        $('audio').next().find('.volume-handle').css('width', maxPos + 'px');
        $('audio').next().find('.label').css('left', maxPos + 'px');
        audio.volume = 1;
    }

    $('.close-listener').on('click', function () {
        closeListener();
    });

    $('.substrate').on('click', function (event) {
        if ($(event.target).closest('.soundtrack-listener').length === 0) {
            closeListener();
        }
    });

    // Play or pause the music of a movie
    $('.listener').on('click', function () {
        $(this).toggleClass('play-active');

        if ($(this).hasClass('play-active')) {
            $(this).siblings('audio')[0].play();
        } else {
            $(this).siblings('audio')[0].pause();
        }
    });

    // Make listener button as an play-triangle once the music is finished
    $('audio').on('ended', function () {
        var audio = $(this);
        setTimeout(function () {
            $('.listener').removeClass('play-active')
            audio.siblings('.music-length').find('.current-length').css('width', 0);
            audio[0].currentTime = 0;
            showTime(audio[0]);
        }, 500);
    });

    $('audio').on('playing', function () {
        progress($(this)[0]);
        // timer = setInterval(function () {
        //     progress($('audio')[0]);
        // }, 100);
    });

    $('audio').on('pause', function () {
        // clearTimeout(timer);
        // clearInterval(timer);
        window.cancelAnimationFrame(timer);
    });

    var timer;

    function progress(element) {
        var position = (element.currentTime / element.duration) * 100;

        if ($(element).parent('.soundtrack-listener').length === 1) {
            $(element).siblings('.music-length').find('.current-length').css('width', position + '%');
        } else {
            $(element).siblings('.video-controls').find('.current-length').css('width', position + '%');
        }

        showTime(element);

        if (position < 100) {
            // timer = setTimeout(function () {
            //     progress(element);
            // }, 50);
            timer = window.requestAnimationFrame(function() {
                progress(element);
            });
        }
    }

    // Set the music's time on progress bar click && video's time
    $('.music-length').on('click', function () {
        // clearTimeout(timer);
        // clearInterval(timer);
        if ($(this).closest('.soundtrack-listener').length != 0) {
            window.cancelAnimationFrame(timer);

            var barWidth = $(this).innerWidth();
            var inBarXCoor = $(this).find('.current-length').offset().left;
            var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;

            $(this).find('.current-length').css('width', inBarPosition + '%');

            $(this).siblings('audio')[0].currentTime = (inBarPosition * $(this).siblings('audio')[0].duration) / 100;

            showTime($(this).siblings('audio')[0]);
        } else {
            window.cancelAnimationFrame(timer);

            var barWidth = $(this).innerWidth();
            var inBarXCoor = $(this).find('.current-length').offset().left;
            var inBarPosition = ((event.pageX - inBarXCoor) / barWidth) * 100;
            $(this).find('.current-length').css('width', inBarPosition + '%');

            $(this).closest('.video-controls').siblings('video')[0].currentTime = (inBarPosition * $(this).closest('.video-controls').siblings('video')[0].duration) / 100;
            showTime($(this).closest('.video-wrapper').find('video')[0]);
        }
    });

    function showTime(element) {
        var minSecCurTime = calcTime(element.currentTime);
        var minSecDurat = calcTime(element.duration);
        $(element).siblings('.timer').text(minSecCurTime + ' / ' + minSecDurat);
    }

    function calcTime(e) {
        var min = Math.floor(e / 60);
        var sec = Math.floor(e % 60);

        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;
        return min + ':' + sec;
    }

    function initSlider(index) { // TODO: make function to accept initial slide index. Set translate on slider init. Pass index 1 to initSlider     Done
        $('.slider').each(function () {
            var parent = $(this);
            var currIndex = index;
            var maxIndex = parent.find('li').last().index();
            settingTranslateX();

            parent.find('.arrow-left').on('click', function (event) {
                event.preventDefault();

                currIndex--;
                settingTranslateX();

                // if (currIndex <= 0) { // TODO: if you have separate function for setting translate, then you can check index to fit bounds in that function   Corrected
                //     currIndex = 0;
                //     settingTranslateX();
                // }
            })

            parent.find('.arrow-right').on('click', function (event) {
                event.preventDefault();

                currIndex++;
                settingTranslateX();
            })

            function settingTranslateX() {
                if (currIndex <= 0) {
                    currIndex = 0;
                } else if (currIndex >= maxIndex) {
                    currIndex = maxIndex;
                }
                parent.find('ul').css('transform', 'translateX(' + -currIndex * 100 + '%)');
            }
        })
    }
    initSlider(1);

    // Volume bar
    // $('.volume').on('mousedown', function () {
    //     var currentVolume = $(this);

    //     moveVolumeHandle($(this)); // TODO: do you need it? if it is for click - add it explicitly to click event   Click works like mouseup.
    //     // The adjusting of volume with only click doesn't make any big difference
    //     // with mousedown, but when we intend to adjust volume with mousemove event,
    //     // then the click makes the big difference with the comparising with mousedown.
    //     // Press the mouse, but don't move it to see the result.

    //     $(document).on('mousemove', function() {
    //         moveVolumeHandle(currentVolume);
    //     }); // TODO: if mouse leaves bounds of .volume this stops working. Consider add event on document    Corrected

    //     // TODO: hint
    //     // you can avoid wrapping just handler in anonymous function
    //     // the code below
    //     // $('.volume').on('mousemove', function(event) {
    //     //     moveVolumeHandle(event);
    //     // });
    //     // is the same as
    //     // $('.volume').on('mousemove', moveVolumeHandle);

    //     $(document).one('mouseup', function() {
    //         $(document).off('mousemove');
    //     });
    // });

    $('.volume').on('mousedown', function() {
        var currentVolume = $(this);

        putVolumeHandle(currentVolume);

        $(document).on('mousemove', function() {
            putVolumeHandle(currentVolume);
        });

        $(document).on('mouseup', function() {
            $(document).off('mousemove');
        });
    });

    function putVolumeHandle(el) {
        var halfLabel = el.find('.label').width()*-0.5; // -5
        var volumeLeftCoor = el.find('.volume-handle').offset().left;
        var volHandlPos = event.pageX - volumeLeftCoor;

        if (volHandlPos >= el.width() + halfLabel) {
            volHandlPos = el.width() + halfLabel;
        } else if (volHandlPos <= -halfLabel) {
            volHandlPos = -halfLabel;
        }
        var halfLabel = el.find('.label').width()*-0.5;
        el.find('.label').css('left', volHandlPos + halfLabel + 'px');
        el.find('.volume-handle').css('width', volHandlPos + halfLabel + 'px');

        var volumeIndex = (volHandlPos + halfLabel) / (el.width() + halfLabel * 2);

        if (el.parent('.soundtrack-listener').length == 1) {
            el.siblings('audio')[0].volume = volumeIndex;
        } else {
            el.parent().siblings('video')[0].volume = volumeIndex;
        }
    }

    // $(document).on('mouseup', function () { // TODO: you don't need to remove mousemove each time mouseup happens on document. you need it just once if it was added. Consider to add it where mousemove event added     Corrected
    //     $('.volume').off('mousemove');
    // });

    function moveVolumeHandle(el) {
        var volumeLeftCoor = el.offset().left;
        var volHandTransl = el.find('.volume-handle').width()*-0.5; // -5 // TODO: think of better solution instead of parsing transform. Move it with left property at least     Corrected
        var maxPos = el.width() + volHandTransl; // 91
        var volHandlPos = event.pageX - volumeLeftCoor;
        if (volHandlPos >= maxPos) {
            volHandlPos = maxPos;
        } else if (volHandlPos <= -volHandTransl) {
            volHandlPos = -volHandTransl;
        }
        el.find('.volume-handle').css('left', volHandlPos + volHandTransl + 'px');

        var volumeIndex = ((volHandlPos + volHandTransl) / (maxPos + volHandTransl));
        // el.siblings('audio')[0].volume = volumeIndex;// TODO: you don't need to store audio in variable here   Corrected

        if (el.parent('.soundtrack-listener').length == 1) {
            el.siblings('audio')[0].volume = volumeIndex;
        } else {
            el.parent().siblings('video')[0].volume = volumeIndex;
        }
    }

    // Playing video & video controls
    $('.btn-play').on('click', function() {
        if ($(this).closest('.slider').length != 0) {
            $(this).toggleClass('playing-video play-active');

            var image = $(this).prev();
            if ($(this).hasClass('playing-video')) {
                image.css('display', 'none');
                $(this).siblings('.video-wrapper').css('display', 'block');
            } else {
                image.css('display', 'block');
                $(this).siblings('.video-wrapper').css('display', 'none');
            }

            var video = $(this).siblings('.video-wrapper').find('video')[0];

            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
    });

    $('video').on('canplay', function() {
        showTime($(this)[0]);
    });

    $('video').on('playing', function() {
        progress($(this)[0]);
    });

    $('video').on('pause', function() {
        window.cancelAnimationFrame(timer);
    });

    $('video').on('ended', function() {
        var video = $(this);
        setTimeout(function() { // To update inner bar once video is finished
            progress(video[0]); // as offset().left has decimals and this decimals
        }, 50);                 // sometimes are visible on inner bar when cliscked to the end.
        setTimeout(function() {
            video.parent().siblings('.btn-play').removeClass('playing-video play-active');
            video.siblings('.video-controls').find('.current-length').css('width', 0);
            video[0].currentTime = 0;
            showTime(video[0]);
            video.parent().css('display', 'none');
            video.parent().siblings('img').css('display', 'block');
        }, 500);
    });
});

