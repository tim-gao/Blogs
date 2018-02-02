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

  //type the things about me
  var typed = new Typed('#typed', {
    //stringsElement: '#typed-strings'
    strings: ['嗨，你好有缘人，^1000欢迎访问我的个人博客。^1000 <br>你可以称呼我<strong>‘柯楠’</strong>，注意哦，我不是卡通里的那个工藤新一，我也不知道真相是否只有一个啦。^1000<br> 我是一名web开发, 经验呢不多不少，但我很喜欢折腾，更加热衷于研究新的事物。我很高兴你能从我的博客里找到你想要的东西，如果不介意请从网页底部的社交按钮关注我。在开发这条路上，总是得活到老学到老，相信分享会让我们更快的成长。^1000<br>本站还正在建设中，我会持续更新，欢迎给我留言。谢谢!'],
    typeSpeed: 150,
    startDelay: 400,
    backSpeed: 200,
  });

});