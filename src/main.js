$(function() {
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });
    // Load in the first track
    var audio = a[0];
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');
    audio.load(first);
    // Load in a track on click
    $('ol li').click(function(e) {
        e.preventDefault();
        $('.audiojs').removeClass('error');
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });

    $('.audio-control').click(function(e){
        if($(this).hasClass('fa-volume-down')){
            audio.playPause();
            $(this).removeClass('fa-volume-down').addClass('fa-volume-off');
        }else{
            audio.play();
            $(this).removeClass('fa-volume-off').addClass('fa-volume-down');
        }
    })
    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('li.playing').prev();
            if (!prev.length) prev = $('ol li').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    })


    $('.music-switch').click(function(e){
        e.preventDefault();
        $(this).toggleClass('move-left');
        $('#wrapper-music').css('opacity','1').toggleClass('show-music-list');
    });

    $('.fa-times').click(function(){
        $('.music-switch').removeClass('move-left');
        $('#wrapper-music').removeClass('show-music-list').css('opacity','0');
    });


    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        $('#back-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });


    //lazyload for the images

    $("img").lazyload({
        effect: "fadeIn"
    })

    //search funcationality

  $('a.searchIcon').click(function() {
    $('#search-container').show();
    $('#search-input').focus();
    return false;
  });

  $('.icon-close').click(function(){
    $('#search-container').hide();
    return false;
  });

    hljs.initHighlightingOnLoad();

    var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight',
    progress = document.querySelector('.progress'),
    scroll;

    document.addEventListener('scroll', function() {
        scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        progress.style.setProperty('--scroll', scroll + '%');
    });


    //event for 2018-07-13-transform-card-flip.md
    $(document).on('click','.wrapper__card .card',function(){
        $(this).toggleClass('is-fliped');
    })
    //event for 2018-07-16-transform-sample-cube-box.md
    $(document).on('click','#faceChange',function(){
        var targetCube = $(this).closest('.container').find('.card'),
            targetBox = $(this).closest('.container').find('.box')
            $style = $(this).find(':selected').attr('data-style');;
            targetCube.removeClass('show-front show-back show-left show-right show-top show-bottom').addClass($style);
            targetBox.removeClass('show-front show-back show-left show-right show-top show-bottom').addClass($style);
    })
});