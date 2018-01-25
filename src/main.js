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
        $('#wrapper-music').show().toggleClass('show-music-list');
    });

    $('.fa-times').click(function(){
        $('.music-switch').removeClass('move-left');
        $('#wrapper-music').removeClass('show-music-list');
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

    // create the mouse tail
  var c = $('canvas.tail')[0];
  var ctx = c.getContext('2d');
  $(window).resize(function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }).resize();

  var ball = {
    x: 0,
    y: 0,
  }
  var tail = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

  function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tail[0].x, tail[0].y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tail[1].x, tail[1].y, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tail[2].x, tail[2].y, 2, 0, 2 * Math.PI);
    ctx.fill();

    TweenMax.to(tail[0], 0.2, { x: ball.x, y: ball.y });
    TweenMax.to(tail[1], 0.2, { x: tail[0].x, y: tail[0].y });
    TweenMax.to(tail[2], 0.2, { x: tail[1].x, y: tail[1].y });
  }

  loop();
  window.addEventListener('mousemove', function (event) {
    TweenMax.to(ball, 0.4, { x: event.offsetX, y: event.offsetY });
  }, false);
});