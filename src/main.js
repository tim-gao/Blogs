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
});