$(function() {

    var bEmail = false,
        bPasswd = false,
        bRepasswd = false,
        bAgree = true,
        bUsername = false;


    $('#input-username').focus(function(){
    	$(this)
        .css({
            'borderColor': '#63aee0'
        })
        .siblings('.icon').css({
            'backgroundPosition': '-20px center',
            'borderColor': '#63aee0'
        })
        .siblings('.tip').removeClass('input-ok').text('用户名不能为空').css('color', '#8c8c8c').show();
    })
    .blur(function(){
    	
    	 var self = $(this);
    	 self
         .css({
             'borderColor': '#cccccc'
         })
         .siblings('.icon').css({
             'backgroundPosition': '15px center',
             'borderColor': '#cccccc'
         });
         var input = self.val();
         if($.trim(input) != ""){
        	 self.siblings('.tip').text('').addClass('input-ok');
        	 
        	 $.get(path+'/r/RegisterServlet', {
                 'inputusername': self.val(),
                 'method': 'existUsername'
             }, function(result) {
                 if (result.exists === 0) { //用户名有效
                	 self.siblings('.tip').text('').addClass('input-ok');
                	 bUsername = true;
                 } else { //用户名无效
                	 self.siblings('.tip').removeClass('input-ok').text('用户名已被注册').css('color', '#e74c3c').show();
                     bUsername = false;
                 }
                 testAll();
             }, 'json');
         }else{
        	 self.siblings('.tip').removeClass('input-ok').text('用户名不能为空').css('color', '#e74c3c').show();
        	 bUsername = false;
         }
         testAll();
    });
    
    $('#input-email')
        .focus(function() {
            $(this)
                .css({
                    'borderColor': '#63aee0'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '-20px center',
                    'borderColor': '#63aee0'
                })
                .siblings('.tip').removeClass('input-ok').text('申请成功后您会收到验证邮件').css('color', '#8c8c8c').show();
        })
        .blur(function() {
            var self = $(this);
            var input = self.val();
            var regm = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[a-zA-Z]+)+$/; //电子邮件正则表达式
            self
                .css({
                    'borderColor': '#cccccc'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '15px center',
                    'borderColor': '#cccccc'
                });
            //邮箱格式是否正确
            if (input === '') { //空值判断
                self.siblings('.tip').text('邮箱不能为空').css('color', '#e74c3c').show();
                bEmail = false;
            } else { //非空值
                var bCorrectInput = (input.match(regm)) ? true : false;
                if (!bCorrectInput) { //正则判断
                    self.siblings('.tip').text('格式错误，请重新输入').css('color', '#e74c3c').show();
                    bEmail = false;
                } else { //输入正确处理
                    $.get(path+'/r/RegisterServlet', {
                        'inputemail': input,
                        'method': 'existEmail'
                    }, function(result) {
                        if (result.exists === 0) { //邮箱有效
                            self.siblings('.tip').text('').addClass('input-ok').show();
                            bEmail = true;
                        } else { //邮箱无效
                            self.siblings('.tip').text('邮箱已被注册').css('color', '#e74c3c').show();
                            bEmail = false;
                        }
                        testAll();
                    }, 'json');
                }
            }
            testAll();
        });

    $('#input-pw')
        .focus(function() {
            $(this)
                .css({
                    'borderColor': '#63aee0'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '-20px center',
                    'borderColor': '#63aee0'
                })
                .siblings('.tip').removeClass('input-ok').text('不少于6位，只能使用字母和数字的组合，如abc123').css('color', '#8c8c8c').show();
        })
        .blur(function() {
            var self = $(this);
            var input = self.val();
            var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)(^[a-zA-Z0-9]{6,}$)/;
            self
                .css({
                    'borderColor': '#cccccc'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '15px center',
                    'borderColor': '#cccccc'
                });
            if (input === '') {
                self.siblings('.tip').text('长度不小于6位，不能单独使用字母或数字').css('color', '#e74c3c').show();
                bPasswd = false;
            } else if (reg.test(input)) {
                bPasswd = true;
                self.siblings('.tip').text('').addClass('input-ok');
            } else {
                self.siblings('.tip').text('长度不小于6位，不能单独使用字母或数字').css('color', '#e74c3c').show();
                bPasswd = false;
            }
            testAll();
        })
        .keyup(function() {
            var self = $(this);
            var passwd = self.val();
            var repasswd = $('#input-repw').val();
            var reg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)(^[a-zA-Z0-9]{6,}$)/;
            if (reg.test(passwd)) {
                self.siblings('.tip').text('').addClass('input-ok');
                $('#input-repw').attr('disabled', false);
                if (repasswd !== '') {
                    if(passwd === repasswd){
                        $('#input-repw').siblings('.tip').text('').addClass('input-ok');
                        bRepasswd = true;
                    } else{
                        $('#input-repw').siblings('.tip').removeClass('input-ok').text('两次密码输入不一致').css('color', '#e74c3c').show();
                        bRepasswd = false;                      
                    }
                } else {

                }
            } else {
                $('#input-repw').attr('disabled', true).siblings('.tip').removeClass('input-ok').text('');
                self.siblings('.tip').removeClass('input-ok').text('长度不小于6位，不能单独使用字母或数字');
                bRepasswd = false;
            }
            testAll();
        });

    $('#input-repw')
        .focus(function() {
            $(this)
                .css({
                    'borderColor': '#63aee0'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '-24px center',
                    'borderColor': '#63aee0'
                })
                .siblings('.tip').removeClass('input-ok').text('').css('color', '#8c8c8c').show();
        })
        .blur(function() {
            var self = $(this);
            var repasswd = self.val();
            var passwd = $('#input-pw').val();
            self
                .css({
                    'borderColor': '#cccccc'
                })
                .siblings('.icon').css({
                    'backgroundPosition': '15px center',
                    'borderColor': '#cccccc'
                });
            if (repasswd === passwd) {
                if (bPasswd === true) {
                    bRepasswd = true;
                    self.siblings('.tip').text('').addClass('input-ok');
                }
            } else {
                bRepasswd = false;
                self.siblings('.tip').removeClass('input-ok').text('两次密码输入不一致').css('color', '#e74c3c').show();
            }
            testAll();
        })
        .keyup(function() {
            var self = $(this);
            var repasswd = self.val();
            var passwd = $('#input-pw').val();
            if (repasswd === passwd) {
                if (bPasswd === true) {
                    bRepasswd = true;
                    self.siblings('.tip').text('').addClass('input-ok');
                }
            } else {
                bRepasswd = false;
                self.siblings('.tip').removeClass('input-ok').text('两次密码输入不一致').css('color', '#e74c3c').show();
            }
            testAll();
        });

    $('#input-agree')
        .change(function() {
            if ($(this).attr('checked') === 'checked') {
                bAgree = true;
            } else {
                bAgree = false;
            }
            testAll();
        });


    function testAll() {
        if (bEmail === true && bPasswd === true && bRepasswd === true && bAgree === true && bUsername === true) {
            $('#apply').removeClass('btn-disabled');
        } else {
            $('#apply').addClass('btn-disabled');
        }
    }

    /*注册信息提交
    =============================*/
    $('#apply').click(function() {
        if ($(this).hasClass('btn-disabled')) {
            return;
        } else {
        	var email = $('#input-email').val();
            var passwd = $('#input-repw').val();
            var username = $('#input-username').val();
            
            $.post(path+'/r/RegisterServlet', {
                'email': email,
                'passwd': passwd,
                'username': username,
                'method': "register",
                'p': $("#pusername").val()
            }, function(result) {
            	
                if (result.status === 1) {
                    $('#register-email').text(email);
                    //$('#resend-email').attr('href', path+'/RegisterServlet?method=resend&email=' + email);
                    if (email.indexOf('gmail') > -1) {
                        $('#to-mailbox').attr('href','http://mail.google.com');
                    } else {
                        $('#to-mailbox').attr('href','http://mail.' + email.split('@')[1]);
                    }
                    $('.register-first').hide();
                    $('.register-second').show();
                };
            }, 'json');
        }
    });
    
    $('#resend-email').click(function(){
    	var email = $('#input-email').val();
    	$.post(path+'/r/RegisterServlet', {
            'email': email,
            'method': "resend"
        }, function(result) {
            if (result.status === 1) {
                
            	$(".modal-title").text("温馨提示");
        		$(".modal-body >p").text("验证邮件已重新发送，请进入邮箱进行激活");
        		$("#alert_modal").modal('show');
            	
            };
        }, 'json');
    	
    });
    
});