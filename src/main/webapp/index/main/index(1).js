$(function(){
/*---------------------------------------*/
/*-----核心功能/店铺/宝贝/行业图片移动------------*/
/*---------------------------------------*/
(function(){
    var speed = 800;

    $('#shopmonitor').one('mouseenter',function(){
        $(this).find('img').animate({
            margin : 0
        },speed,'swing');
    });

    $('#itemmonitor').one('mouseenter',function(){
        $(this).find('.magnifying').fadeIn('slow');
    });
    $('#industrydata').one('mouseenter',function(){
        $(this).find('img').animate({
            margin : 0
        },speed,'swing');
    })
})();


/*-----------------------------------------------*/
/*-------------数据驱动电商的bigbanner-----------*/
/*-----------------------------------------------*/
(function(){
    var oBigPic       = $('#big-picture');
    var picWidth      = oBigPic.width();                        //图片的宽度
    var picMarginLeft = parseInt(oBigPic.css('marginLeft'));                   //图片的左边距
    var parentWidth   = oBigPic.parent('.big-banner').width();  //可视窗的宽度
    var inter         = picWidth - parentWidth;
    var timer         = null;
    var i             = 0;
    var raward        = 1;
    var ispeed        = 3000;
    var needtime      = ispeed*2;
    if(timer){ clearInterval(timer); }
    oBigPic.animate({
        marginLeft : -inter
    },ispeed,function(){
        oBigPic.animate({
            marginLeft : 0
        },ispeed);
    });
    timer = setInterval(function(){
        oBigPic.animate({
            marginLeft : -inter
        },ispeed,function(){
            oBigPic.animate({
                marginLeft : 0
            },ispeed);
        });
    },needtime);
})();




});