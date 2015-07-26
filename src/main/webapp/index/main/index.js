function imgSlide() {
    var slideBox = $('#slide-box');
    var prev = $('#slide-prev');
    var next = $('#slide-next');
    var count = $('.slide-img').length;
    var speed = 1000;
    var t;
    $('#slide-box').css({
        'display': 'block',
        'width': 100 * count + '%'
    })
    $('.slide-item').css({
        'width': 100 / count + '%'
    })
    prev.click(function() {
        if (slideBox.is(':animated')) {
            return;
        }
        var last = $('.slide-item').last();
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
        var last = $('.slide-item').last();
        slideBox.stop().animate({
            'marginLeft': '-' + last.width() + 'px'
        }, speed, function() {
            var first = $('.slide-item').first();
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

if (getCookie('error') === 1) {
    ibbdModal({
        infoHtml: '<p>登录失败，请重新登录</p>',
        backClose: true,
        autoClose: true
    });
    delCookie('error');
};