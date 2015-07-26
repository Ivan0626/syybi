$(document).ready(function() {
    var navLi = $('#nav-about .nav-li');
    var navContent = $('.about-content');
    navLi.each(function(i, val) {
        $(val).click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            $(navContent[i]).addClass('active').siblings().removeClass('active');
        }).hover(function() {
            borderSlide($(val), i, 500);
        }, function() {
            var activeLi = $('#nav-about').find('.active');
            var activeLiIndex = $('#nav-about').find('.nav-li').index(activeLi);
            borderSlide(activeLi, activeLiIndex, 300);
        });
    }).eq(0).trigger('click').trigger('mouseleave');

    var url = location.href;
    var block = 'us'
    if (url.indexOf('#') > -1) {
        block = url.substr(url.indexOf('#') + 1);
        $('#nav-about .nav-li[value=' + block + ']').trigger('click').trigger('mouseleave');
    }


    function borderSlide(obj, index, speed) {
        var marginLeft = 0;
        for (var j = 0; j < index; j++) {
            marginLeft += $(navLi[j]).width();
        }
        $('#about-active').stop();
        $('#about-active').animate({
            'marginLeft': marginLeft + 'px',
            'width': obj.width() + 'px'
        }, speed || 500);
    }

    var recruitLi = $('#recruit-list .list-li');
    var recruitContent = $('.recruit-detail');
    recruitLi.each(function(i, val) {
        $(val).click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            $(recruitContent[i]).addClass('active').siblings().removeClass('active');
        });
    }).eq(0).trigger('click');

    function imgSlide() {
        var slideBox = $('#slide-box');
        var prev = $('#slide-prev');
        var next = $('#slide-next');
        var speed = 1000;
        var t;
        prev.click(function() {
            if (slideBox.is(':animated')) {
                return;
            }
            var last = $('.slide-img').last();
            slideBox.prepend(last);
            slideBox.css('marginLeft', '-' + last.width() + 'px');
            slideBox.stop().animate({
                'marginLeft': '0px'
            }, speed);
        });
        next.click(function() {
            if (slideBox.is(':animated')) {
                return;
            }
            var last = $('.slide-img').last();
            slideBox.stop().animate({
                'marginLeft': '-' + last.width() + 'px'
            }, speed, function() {
                var first = $('.slide-img').first();
                slideBox.append(first);
                slideBox.css('marginLeft', '0px');
            });
        });
        slideBox.hover(function(){
            if(t){
                clearInterval(t);
            }
        }, function(){
            t = setInterval(function(){
                next.click();
            }, 5000);
        }).mouseout();
    }
    imgSlide();
}); 