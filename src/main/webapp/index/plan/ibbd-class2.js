/*
 *	IBBD模态
 *	ibbdModal({
 *		infoHtml: '<p>哈哈</p>',	// 模态中显示的内容，可以是jquery对象也可以是html代码
 *		backClose: true,			// 为true时点击背景遮罩层模态消失，默认为false
 *		autoClose: true,			// 为true时点击模态在3秒后自动小时，默认为false
 *		delay: 3000					// 模态显示时间，autoClose为true时delay才生效，默认为2500毫秒
 *		...
 *	})
 ==========================================*/

function ibbdModal(options) {
	var modalBack = $('<div/>', {
		'class': 'modal-back'
	});
	var modalFront = $('<div/>', {
		'class': 'modal-front'
	});
	var modalBox = $('<div/>', {
		'class': 'modal-box'
	});
	var modalClose = $('<div/>', {
		'class': 'modal-close',
		'text': '×'
	});
	var infoHtml = options.infoHtml || '';
	var backClose = options.backClose || false;
	var autoClose = options.autoClose || false;
	var delay = options.delay || 2500;
	if (backClose === true) {
		modalBack.on('click', function() {
			modalFront.remove();
			modalBack.remove();
		});
	}
	modalClose.on('click', function() {
		modalFront.remove();
		modalBack.remove();
	});
	modalBox.append(options.infoHtml);
	modalBox.find('p').addClass('modal-msg');
	modalBox.find('p:last-child').removeClass('modal-msg');
	modalBox.append('<p class="modal-error"></p>');
	modalFront.append(modalClose).append(modalBox);
	$('body').append(modalBack).append(modalFront);
	if (autoClose === true) {
		setTimeout(function() {
			modalFront.animate({
				'top': '20%',
				'opacity': 0
			}, 600, function() {
				modalFront.remove();
				modalBack.remove();
			})
		}, delay);
	};
}


/*
 *	IBBD提示
 *	ibbdTip({
 *		target: $('#container'),	//jQuery对象
 *		msg: 'haha',				//文本内容
 *		type: 'info',				//提示框样式，info（蓝色）、success（绿色）、error（红色），默认是info
 *		delay: 3000					//提示框多久消失，单位毫秒，默认是3000ms
 *		...
 *	})
 ==========================================*/
function ibbdTip(options) {
	var target = options.target;
	if (target === undefined || target.length < 1) {
		target = false;
	};
	var msg = options.tip || '操作成功';
	var type = options.type || '';
	var delay = options.delay || 3000;
	var tip = $('<div/>', {
		'class': 'ibbd-tip'
	});
	var tipDiv = $('<div/>', {
		'class': 'ibbd-tip-div'
	});
	var tipMsg = $('<div/>', {
		'class': 'ibbd-tip-msg'
	});

	tipMsg.text(msg);
	tipDiv.append(tipArrow).append(tipMsg);
	tip.addClass(type).append(tipDiv);
	$('body').append(tip);

	if (target === false) {
		tip.css({
			'position': 'fixed'
		});
		var tipW = tip[0].offsetWidth,
			tipX = ($(window).width() - tipW) / 2,
			tipY = '45%';
	} else {
		var tipArrow = $('<div/>', {
			'class': 'ibbd-tip-arrow'
		});
		var targetW = target[0].offsetWidth,
			targetH = target[0].offsetHeight,
			targetX = target.offset().left,
			targetY = target.offset().top,
			tipW = tip[0].offsetWidth,
			tipH = tip[0].offsetHeight,
			tipX = targetX + targetW + 10,
			tipY = targetY + (targetH - tipH) / 2;
		tipDiv.append(tipArrow);
		tip.css({
			'position': 'absolute'
		});
	}
	tip.css({
		'opacity': 0,
		'top': tipY,
		'left': tipX
	}).animate({
		'opacity': 1
	}, 500, function() {
		setTimeout(function() {
			tip.animate({
				'opacity': 0
			}, 500, function() {
				tip.remove();
			});
		}, delay || 3000);
	});
}

/* 计算线性回归方程 
 * ==================================*/

function linearRegression(dataArray) {
	var sumX = 0,
		sumX2 = 0,
		sumY = 0,
		sumXY = 0,
		SSXY = 0,
		SSX = 0,
		intercept = 0 //截距
		slope = 0; //斜率
	for (var i = 0, len = dataArray.length, count = 0; i < len; i++) {
		if (dataArray[i] <= 0 || !dataArray[i]) {
			continue;
		};
		sumX += count;
		sumX2 += count * count;
		sumY += dataArray[i];
		sumXY += count * dataArray[i];
		count ++;
	}
	SSXY = sumXY - (sumX * sumY / count);
	SSX = sumX2 - (sumX * sumX / count);
	slope = SSXY / SSX;
	intercept = sumY / count - slope * sumX / count;
	return {
		startY: parseFloat((intercept).toFixed(2)),
		endY: parseFloat((slope * count + intercept).toFixed(2))
	}

}

/*获取cookie函数*/

function getCookie(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}

/*设置cookie函数*/

function setCookie(name, value, path, day) {
	day = day || 0;
	var expires = "";
	if (day != 0) {
		var date = new Date();
		date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	var cookie = name + "=" + escape(value) + expires;
	if (path) {
		cookie += "; path=" + path;
	}
	document.cookie = cookie;
}

/*删除cookie函数*/

function delCookie(name) {
	if (getCookie(name)) {
		document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

/* Ajax请求记录，如果在请求未完成时发送新请求，将中断旧请求 
 * ==================================*/
// var jqxhrArray = [];
// $(document).ajaxSend(function(event, jqxhr, settings) {
// 	for (var i in jqxhrArray) {
// 		if (settings.url.indexOf(jqxhrArray[i].url) > -1) {
// 			jqxhrArray[i].jqxhr.abort();
// 			jqxhrArray.splice(i, 1);
// 		}
// 	}
// 	jqxhrArray.push({
// 		'jqxhr': jqxhr,
// 		'url': settings.url.split('?', 1)[0]
// 	});
// })


/*
 *	IBBD对话框
 *	ibbdDialog(
 *		action: 'hide',			// 点击对话款关闭按钮时的操作，remove是移除元素，hide是隐藏元素，默认是hide
 *		...
 *	)
 ==========================================*/
function ibbdDialog(options) {
	var action = options.action || 'hide'; 
	var dialog = $('<div/>', {
		'class': 'ibbd-dialog'
	});
	var dialogFront = $('<div/>', {
		'class': 'ibbd-dialog-front'
	});
	var dialogBack = $('<div/>', {
		'class': 'ibbd-dialog-back'
	});
	var dialogHead = $('<div/>', {
		'class': 'ibbd-dialog-head'
	});
	var dialogNeck = $('<div/>', {
		'class': 'ibbd-dialog-neck'
	});
	var dialogBody = $('<div/>', {
		'class': 'ibbd-dialog-body'
	});
	var dialogFoot = $('<div/>', {
		'class': 'ibbd-dialog-foot'
	});
	var dialogClose = $('<span/>', {
		'class': 'ibbd-dialog-close',
		'text': 'x'
	});
	dialogHead.append(dialogClose);
	dialogFront.append(dialogHead).append(dialogNeck).append(dialogBody).append(dialogFoot);
	dialog.append(dialogFront).append(dialogBack);
	if (action == 'remove') {
		dialogBack.on('click', function() {
			dialog.remove();
		})
		dialogClose.on('click', function() {
			dialog.remove();
		});
	} else {
		dialogBack.click('click', function() {
			dialog.hide();
		})
		dialogClose.on('click', function() {
			dialog.hide();
		});
	};
	return dialog;
}

function ibbdMask() {
	var mask = $('<div/>', {
		'class': 'ibbd-mask'
	});
	return mask;
}

function ibbdUpdateTip(cookie, url, x, y, notlast){
	if (!url) {
		return;
	};
    var update_tip = getCookie(cookie);
    if (update_tip == 1) {
        return;
    } else {
    	if (notlast !== true) {
	        setCookie(cookie, '1', '', 7);
    	};
        var mask = ibbdMask();
        var img = $('<img/>', {
            src: 'http://' + window.location.host + url
        });
        img
            .css({
                'position': 'absolute',
                'zIndex': '5001',
                'cursor': 'pointer'
            })
            .bind('click', function() {
                img.remove();
                mask.remove();
                $('body').css({
                    'width': 'auto',
                    'height': 'auto',
                    'overflowY': 'auto'
                })
            });
        $('body').css({
            'width': $(window).width(),
            'height': $(window).height(),
            'overflowY': 'hidden'
        }).append(mask).append(img);
        if ((x === undefined || x === '') && (y === undefined || y === '')) {
        	img.hide().load(function(){
        		img.css({
        			'left': ($(window).width() - img.width()) / 2,
        			'top': ($(window).height() - img.height()) / 2
        		}).show();
        	})
        } else {
        	img.css({
        		'left': x,
        		'top': y
        	})
        };
    };
};

/*
 * jQuery Placeholder plugin
 */
(function($) {
	$.Placeholder = {
		settings: {
			color: "rgb(169,169,169)", // darkGrey does not work in ie
			dataName: "original-font-color" // the name of the data tag used by this module
		},

		// -- Bind event to components --
		init: function(settings) {
			// Return when 'placeholder' is supported by browser
			if ('placeholder' in document.createElement('input') === true) {
				return;
			}
			// Merge default settings with the ones provided
			if (settings) {
				$.extend($.Placeholder.settings, settings);
			}

			// -- Util Methods --	
			var getContent = function(element) {
				return $(element).val();
			};

			var setContent = function(element, content) {
				$(element).val(content);
			};

			var getPlaceholder = function(element) {
				return $(element).attr("placeholder");
			};

			var isContentEmpty = function(element) {
				var content = getContent(element);
				return (content.length === 0) || content == getPlaceholder(element);
			};

			var setPlaceholderStyle = function(element) {
				$(element).data($.Placeholder.settings.dataName, $(element).css("color"));
				$(element).css("color", $.Placeholder.settings.color);
			};

			var clearPlaceholderStyle = function(element) {
				$(element).css("color", $(element).data($.Placeholder.settings.dataName));
				$(element).removeData($.Placeholder.settings.dataName);
			};

			var showPlaceholder = function(element) {
				setContent(element, getPlaceholder(element));
				setPlaceholderStyle(element);
			};

			var hidePlaceholder = function(element) {
				if ($(element).data($.Placeholder.settings.dataName)) {
					setContent(element, "");
					clearPlaceholderStyle(element);
				}
			};

			// -- Event Handlers --
			var inputFocused = function() {
				if (isContentEmpty(this)) {
					hidePlaceholder(this);
				}
			};

			var inputBlurred = function() {
				if (isContentEmpty(this)) {
					showPlaceholder(this);
				}
			};

			var parentFormSubmitted = function() {
				if (isContentEmpty(this)) {
					hidePlaceholder(this);
				}
			};

			// -- Execution --
			$("textarea, input[type='text']").each(function(index, element) {
				if ($(element).attr("placeholder")) {
					$(element).focus(inputFocused);
					$(element).blur(inputBlurred);
					$(element).bind("parentformsubmitted", parentFormSubmitted);

					// triggers show place holder on module init
					$(element).trigger("blur");
					// triggers form submitted event on parent form submit
					$(element).parents("form").submit(function() {
						$(element).trigger("parentformsubmitted");
					});
				}
			});

			return this;
		},

		// When form is submitted by JS, call this before submit to avoid submitting the placeholder value
		cleanBeforeSubmit: function(theForm) {
			// Choose all forms if not given
			if (!theForm) {
				theForm = $("form");
			}

			// Triggering this event will do the necessary cleanup
			$(theForm).find("textarea, input[type='text']").trigger("parentformsubmitted");

			return theForm;
		}
	}
})(jQuery);
$.Placeholder.init();


(function() {
	var industry = getCookie('industry');
	$('#select-keyword').change(function() {
        setCookie('industry', $('#select-keyword').val(), '/');
	});
	if (industry) {
		$('#select-keyword').find('option[value="' + industry + '"]').attr('selected', true);
	};
})();


/* 应用中心左边导航栏 
 * ==================================*/
$(function() {
	$('.left-app-nav').find('.active').find('.sub-nav').css('display', 'block');
	if ($('.left-app-nav').find('.active').length > 0) {
		$('.left-app-nav').find('.active').siblings('li').find('.sub-nav').css('display', 'none');
	} else {
		$('.left-app-nav').find('.sub-nav').css('display', 'none');
	}
	$('.left-app-nav').find('.app-title').click(function() {
		var $item = $(this).parent();
		if ($item.hasClass('active')) {
			$item.removeClass('active');
			$item.find('.sub-nav').slideUp(500);
		} else {
			$item.addClass('active');
			$item.find('.sub-nav').slideDown(500).css('display', 'block');
			$item.siblings('.active').removeClass('active').find('.sub-nav').slideUp(500);
		}
	})
})

$(function() {
	$("#version").hover(function(){
		var offsetImg = $("#version-img").offset();
		var offsetLeft = offsetImg.left - 25;
		$(".version-info").css({"display":"block","visibility":"visible"});
		$(".version-info").offset({left:offsetLeft});
	},function(){
		$(".version-info").css({"display":"none","visibility":"hidden"})
	});	

	$("#fback").click(function(){
		$("#feedback-content").css({"display":"none"});
	});

	$("#feedback").submit(function(){
		var feedbackText = trim($("#feedback-text").val());
		if (feedbackText=="") {
			$("#feedback-content").css({"display":"block"});
			$("#feedback-content span").text("请输入内容。");
			$("#feedback-content span").css("color","rgb(225,86,147)");
		}else{
			var feedInfo = {
			    fbInfo : feedbackText
		    };
		    $.post('/user/ajax_get_feedback_info', feedInfo, function(result){
			    if (result.code==1) {
				    $("#feedback-content").css("display","block");
				    $("#feedback-content span").text("提交成功");
				    $("#feedback-content span").css("color","#51a351");
				    setTimeout(function(){closeDialog();},500);
				
			    }
			    if (result.code==0) {
				    $("#feedback-content").css({"display":"block"});
				    $("#feedback-content span").text("提交失败，请重新提交。");
				    $("#feedback-content span").css("color","rgb(225,86,147)");
			    };
			    if (result.code==-1) {
				    $("#feedback-content").css({"display":"block"});
				    $("#feedback-content span").text("请输入内容。");
				    $("#feedback-content span").css("color","rgb(225,86,147)");
			    };
		    } ,'json');
		}
		
		return false;
	});

	function closeDialog(){
	    $("#fb-modal").modal("hide");
	    $("#feedback-content").css("display","none");
	    $("#feedback-text").val('');
	}

	function trim(str){ 
	    return str.replace(/(^\s*)|(\s*$)/g, ""); 
	}
});

function drawTabButton(container, data, callback) {
	var $tabNav = $('<ul/>', {
		'class': 'nav nav-tabs'
	});
	$container = container;
	for (var i=0, l=data.length; i < l; i++) {
		var $tabButton = $('<li/>');
		var $a = $('<a/>', {
			'data-toggle': 'tab'
		});
		if ($.isPlainObject(data[i])) {
			for (var key in data[i]){
				$a.data(key, data[i][key]);
			}
			$a.text(data[i].text);
		} else {
			$a.text(data[i])
		}
		if (callback) {
			$a.on('click', callback);
		};
		$tabButton.append($a);
		$tabNav.append($tabButton);
	}
	$tabNav.find('li').first().addClass('active').find('a').click();
	$container.empty().append($tabNav);
}

