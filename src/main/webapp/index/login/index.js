jQuery(function($) {

    //判断地址，动态执行对应js代码
    var sHref = location.href; //获取http地址
    var aHref = sHref.split("//"); //根据"//"划分地址为两部分，
    var sCurPage = aHref[aHref.length - 1]; //取路由地址"//"后面的子串部分
    var regm = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱地址格式正则表达式

    $('#demo').hover(function(){
        var img = $(this).find('img');
        var src = img.attr('src');
        img.attr('src',src.substring(0, src.lastIndexOf('/') + 1) + 'demo-hover.png');
    }, function(){
        var img = $(this).find('img');
        var src = img.attr('src');
        img.attr('src',src.substring(0, src.lastIndexOf('/') + 1) + 'demo.png');
    });

    // user/reg 页面
    if (sCurPage.indexOf("/user/reg", 0) > -1) {
        (function() {
            // reg.html
            $("#btnAcceptEmail").bind("click", function() {
                return fGoStep(4);
            });
            $("#btnAgree").bind("click", function() {
                return fGoStep(2);
            });
            $("#btnDisagree").bind("click", function() {
                fCloseTheWindow();
            });
            $("#btnDisplayAndHide").bind("click", function() {
                return fDisplayThisHidePrev(2);
            });

            /* step 2 
             */
            (function() {
                var sEmail; //邮箱输入框的值
                var bEmailIsReged = false; //该邮箱是否已经使用
                var bCorrectInput; //邮箱格式是否正确
                var bAllowToDoAjax = true; //该邮箱刚才没有被检查过，可以发送ajax请求检验
                var aRegEmailChecked = []; //被检验过已经注册过的email地址
                $("#checkEmailForm").submit(function() {
                    return false;
                })
                $("#btnCheckEmail").click(function() {
                    $("#new_email").keyup();
                    if (bAllowToDoAjax && bCorrectInput) {
                        $.get("/ajax/user/emailcheck", {
                                inputemail: sEmail,
                                currenttime: new Date().getTime()
                            },
                            function(data) {
                                if (data.exists == "1") {
                                    bEmailIsReged = true;
                                }
                                if (data.exists == "0") {
                                    bEmailIsReged = false;
                                }
                                if (!bEmailIsReged) {
                                    return fGoStep(3);
                                } else {
                                    for (var j = 0; j < aRegEmailChecked.length; j++) {
                                        if (sEmail == aRegEmailChecked[j]) {
                                            return;
                                        }
                                    }
                                    aRegEmailChecked.push(sEmail);
                                    $("#tips_wasUsed").removeClass("hide");
                                }
                            }, "json"
                        );
                    };
                });
                $("#new_email").keyup(function() {
                    sEmail = $(this).val();
                    bCorrectInput = (sEmail.match(regm)) ? true : false; //邮箱格式是否正确
                    if (bCorrectInput) {
                        if (!$("#tips_wrongInput").hasClass("hide")) $("#tips_wrongInput").addClass("hide");
                        for (var i = 0; i < aRegEmailChecked.length; i++) {
                            if (sEmail == aRegEmailChecked[i]) {
                                if ($("#tips_wasUsed").hasClass("hide")) {
                                    $("#tips_wasUsed").removeClass("hide");
                                }
                                bAllowToDoAjax = false;
                                return;
                            }
                        }
                        if (!$("#tips_wasUsed").hasClass("hide")) {
                            $("#tips_wasUsed").addClass("hide");
                        }
                        bAllowToDoAjax = true;
                    } else {
                        if (!$("#tips_wasUsed").hasClass("hide")) $("#tips_wasUsed").addClass("hide");
                        $("#tips_wrongInput").removeClass("hide");
                    }
                });
            })();



            /***************************************** 
             *  reg-last.html 路由地址：user/reg?参数
             *
             *****************************************/
            var sPassword = ""; //密码框字符串值
            var sRePassword = ""; //重复输入框字符串值
            var bIsLongEnough = false;
            var bRePwIsWritten = false;
            //绑定提交按钮点击检验事件，确保任何操作都不能逃离验证。
            $("#regLastForm").submit(function() {
                $("#password").keyup();
                $("#re_password").keyup();
                if ((bIsLongEnough) && (sRePassword == sPassword)) {} else {
                    return false;
                }
            })
            //绑定智能验证提示事件
            $("#password").keyup(function() {
                sPassword = $(this).val();
                bIsLongEnough = (sPassword.length > 5) ? true : false;
                if (bIsLongEnough) {
                    if (!$("#tips_pwWrongInput").hasClass("hide")) $("#tips_pwWrongInput").addClass("hide");
                } else {
                    if ($("#tips_pwWrongInput").hasClass("hide")) $("#tips_pwWrongInput").removeClass("hide");
                }
                $("#re_password").keyup();
            });
            $("#re_password").keyup(function() {
                sRePassword = $(this).val();
                if (sRePassword != "") {
                    bRePwIsWritten = true;
                }
                if (sRePassword == sPassword) {
                    if (!$("#tips_pwDifferent").hasClass("hide")) {
                        $("#tips_pwDifferent").addClass("hide");
                    }
                } else if (bRePwIsWritten == true) {
                    if ($("#tips_pwDifferent").hasClass("hide")) {
                        $("#tips_pwDifferent").removeClass("hide");
                    }
                }
            });

        })(); //结束/user/reg部分的匿名函数
    }

    // login.html
    else if (sCurPage.indexOf("/login", 0) > -1) {
        (function() {
            if (document.location.href.indexOf("?next") > -1) {
                ibbdModal({
                    'infoHtml': '<p style="font-size:16px;">登录之后才能查看该页面</p>',
                    'backClose': true,
                    'autoClose': true,
                    'delay': 2000
                });
            }
            $("#login-form").submit(function() {
                var email = $("#email").val();
                var password = $("#password").val();
                //var keepLogin = ($("#keep-login").attr('checked') == 'checked') ? 1 : 0;
                if (email === "" || password === "") {
                    $(".login-info").addClass('login-error').text("请输入用户名和密码").css({
                        'padding': '4px 8px'
                    });
                    return false;
                }
                $(".login-info").removeClass('login-error').text("正在登陆......").css({
                    'padding': '4px 8px'
                });
                
                /*$.post("/login/ajax_check", {
                        "email": email,
                        "password": password,
                        'keepLogin': keepLogin
                    },
                    function(data) {
                        //IBBDtips.create( data.msg );
                        if (data.status === 1) {
                            $(".login-info").removeClass('login-error').text(data.msg).css({
                                'padding': '4px 8px'
                            });
                            window.location.href = window.location.href;
                            //window.location.reload();
                            // window.location.href = unescape(window.location.search.substr(6) || data.redirect);
                            return ;
                        } else if (data.status === 0) {
                            $("#email").select();
                            $("#password").val("");
                        }
                        $(".login-info").addClass('login-error').text(data.msg).css({
                            'padding': '4px 8px'
                        });
                    }, "json"
                );
                return false;*/
            });
        })();
    } else if (sCurPage.indexOf("/user/forget-pw", 0) > -1) {
        (function() {
            var bEmailIsReged; //邮箱被注册过，可以申请重置密码
            var aEmailChecked = []; //已经验证过的没有注册的邮箱数组
            var sEmail; //获取邮箱输入框的值
            var bCorrectInput; //邮箱格式是否正确
            var bAllowToDoAjax = true; //如果刚刚没有被检查过，则发送ajax请求判断邮箱是否被注册
            $("#forgetPwEmailForm").submit(function() {
                return false;
            });
            $("#btnDisplayAndHide").click(function() {
                $("#user_email").keyup();
                if (bAllowToDoAjax && bCorrectInput) {
                    $.get("/ajax/user/emailcheck", {
                            inputemail: sEmail,
                            currenttime: new Date().getTime()
                        },
                        function(data) {
                            if (data.exists == "1") {
                                bEmailIsReged = true;
                            }
                            if (data.exists == "0") {
                                bEmailIsReged = false;
                            }
                            if (bEmailIsReged) {
                                return fDisplayThisHidePrev(2);
                            } else {
                                for (var j = 0; j < aEmailChecked.length; j++) {
                                    if (sEmail == aEmailChecked[j]) {
                                        return;
                                    }
                                }
                                aEmailChecked.push(sEmail);
                                $("#tips_wasNotUsed").removeClass("hide");
                            }

                        }, "json"
                    );
                }
            });
            $("#user_email").keyup(function() {
                sEmail = $(this).val();
                bCorrectInput = (sEmail.match(regm)) ? true : false;
                if (bCorrectInput) {
                    if (!$("#tips_wrongInput").hasClass("hide")) $("#tips_wrongInput").addClass("hide");
                    for (var i = 0; i < aEmailChecked.length; i++) {
                        if (sEmail == aEmailChecked[i]) {
                            if ($("#tips_wasNotUsed").hasClass("hide")) {
                                $("#tips_wasNotUsed").removeClass("hide");
                            }
                            bAllowToDoAjax = false;
                            return;
                        }
                    }
                    bAllowToDoAjax = true;
                    if (!$("#tips_wasNotUsed").hasClass("hide")) {
                        $("#tips_wasNotUsed").addClass("hide");
                    }
                } else {
                    if (!$("#tips_wasNotUsed").hasClass("hide")) $("#tips_wasNotUsed").addClass("hide");
                    $("#tips_wrongInput").removeClass("hide");
                }
            });

        })();
    } else if (sCurPage.indexOf("/keywordconfig", 0) > -1) {
        (function() {
            // var oMainTable = new IBBDtable( $("#table1"), { rankOptions:{
            //  textExtraction: function(node) { 
            //      if( $(node).find("span").length > 0 ){
            //          return $(node).find("span").attr("val");
            //      }
            //      else{
            //          return node.innerHTML;
            //      }
            //        },
            //        sortList: [[2,1]]
            //       }});
            //       var nStatusOnSum = 0;      //目前关键词开启个数
            //       var nStatusOnMax = 10; //最大关键词开启个数
            //       var aKeywordAdded = [];
            //       var sOriginTableHtml =""; 
            //       //get请求获取表格数据并绘制表格
            //       $.get("/ajax/config/keywords/list", 
            //  { currenttime: new Date().getTime() },
            //  function(data){
            //      aKeywordAdded = [];
            //      oMainTable.dataTable = data.rows;
            //      oMainTable.drawTable();
            //      nStatusOnMax = data.maxLimit;                   
            //      var $Tr = $("#table1 tbody tr");
            //      for( var i = 0 ; i < $Tr.length; i++ ){
            //          nStatusOnSum++;
            //          aKeywordAdded.push( $Tr.eq(i).find("td").eq(1).text() );
            //          fTd_OnOff( $Tr.eq(i).find("td").eq(2) );
            //      }
            //      sOriginTableHtml = $("#table1 tbody").html();
            //  },"json"
            // );

            // //添加关键词
            // $("#addFromDB button").on( "click", function(){
            //  if( nStatusOnSum == nStatusOnMax ){
            //      alert("已达到最大关键词开启数量。\n如需添加新关键词，请先关闭配置表中部分关键词。")
            //      return false;
            //  }
            //  nStatusOnSum++;
            //  var sTr = "";
            //  var nTrId = $("#table1 tbody tr").length;
            //  sTr = '<tr><td>'+(nTrId+1)+'</td><td>'+$(this).parent().find("select").val()+'</td><td><span class="switch ad_on" title="点击关闭" val="1"></span></td></tr>';
            //  $("#table1 tbody").prepend(sTr);
            //  $("#table1").trigger("update");
            // });

            // //添加关键词
            // $("#addByYourself").on( "submit", function(){
            //  var sKeyword = $(this).find("input").val();
            //  if( sKeyword == "" ){
            //      alert("内容为空，请检查输入内容。");
            //      return false;
            //  }
            //  if( nStatusOnSum == nStatusOnMax ){
            //      alert("已达到最大关键词开启数量。\n如需添加新关键词，请先关闭配置表中部分关键词。")
            //      return false;
            //  }
            //  sKeyword = sKeyword.replace( /\s+/g, " ").replace( /^\s/, "" ).replace( /\s$/, "" ); //去掉字符串前后空格，中间多余空格
            //  if( aKeywordAdded.indexOf( sKeyword ) > -1 ){
            //      alert("该关键词已添加到配置表。\n请检查确认。")
            //      return false;   
            //  }
            //  nStatusOnSum++;
            //  var sTr = "";
            //  var nTrId = $("#table1 tbody tr").length;
            //  aKeywordAdded.push(sKeyword);  //把keyword添加到结果数组
            //  sTr = '<tr><td>'+(nTrId+1)+'</td><td>'+sKeyword+'</td><td><span class="switch ad_on" title="点击关闭" val="1"></span></td></tr>';
            //  $("#table1 tbody").prepend(sTr);
            //  $("#table1").trigger("update"); 
            //  $(this).find("input").val("");
            //  return false;
            // });

            // //点击开关，实现关闭
            // $(".ad_on").live("click", function() {
            //  if( nStatusOnSum > 0 ){
            //      nStatusOnSum--;
            //  }
            //  $(this).removeClass("ad_on").addClass("ad_off").attr( {"title":"点击开启", "val":"0"} );
            //  var $Tr = $(this).parent().parent();
            //  $Tr.remove();
            //  $("#table1").trigger("update");
            //  $("#table1 tbody").append($Tr);
            //  $Tr.hide();
            //  $Tr.show("300");

            // });

            // // 点击开关，实现开启      
            // $(".ad_off").live("click", function() {
            //  if( nStatusOnSum == nStatusOnMax ){
            //      alert("已达到最大关键词开启数量。\n如需添加新关键词，请先关闭配置表中部分关键词。")
            //      return false;
            //  }
            //  nStatusOnSum++;
            //  $(this).removeClass("ad_off").addClass("ad_on").attr( {"title":"点击关闭", "val":"1"} );
            //  $("#table1").trigger("update"); 
            //  var $Tr = $(this).parent().parent();
            //  $Tr.remove();
            //  $("#table1 tbody").prepend($Tr);
            //  $Tr.hide();
            //  $Tr.show("300");

            // });

            // //提交按钮事件
            // $("#keywordConfirm_btn").on("click", function(){
            //  var aPostKeywords = [],
            //      aPostStatues = [],
            //      $Tr = $("#table1 tbody tr");
            //  for( var i = 0; i < $Tr.length; i++ ){
            //      aPostKeywords.push( $Tr.eq(i).find("td").eq(1).text() );
            //      aPostStatues.push( $Tr.eq(i).find("span").attr("val") );
            //  }
            //  $.post('/ajax/config/keywords/update',
            //      {
            //          keywords:aPostKeywords.toString(),
            //          statuses:aPostStatues.toString()
            //      },
            //      function(){  
            //          sOriginTableHtml = $("#table1 tbody").html();
            //          alert("提交成功！")
            //      }
            //  );
            // });

            // //撤销操作按钮事件
            // $("#keywordReset_btn").on("click", function(){
            //  $("#table1 tbody").html(sOriginTableHtml);
            //  $("#table1").trigger("update");
            // });

            // function fTd_OnOff( $Td ){
            //          if( $Td.text() == "1" ){
            //              $Td.html( '<span class="switch ad_on" title="点击关闭" val="1"></span>' );  
            //          }
            //          else{
            //              $Td.html( '<span class="switch ad_off" title="点击开启" val="0"></span>' ); 
            //          }
            //       }

        })(); //匿名函数结束
    } //keywordconfig页面js结束


    //user-info.html    
    else if (sCurPage.indexOf("/user/user-info", 0) > -1) {
        (function() {
            $("#email_complete").bind('click', function() {
                $("#email").val('ibbdxxx@ibbd.com');
            })
        })();
    };

    /* 注册、登陆 公用函数
     * 功能：实现步骤跳转、步骤功能
     */

    function fGoStep(i) {
        $("#step" + (i - 1)).removeClass('active');
        $("#tab" + (i - 1)).removeClass('active');
        $("#step" + i).addClass('active');
        $("#tab" + i).addClass('active');
    }

    function fDisplayThisHidePrev(displaynum) {
        $("#displayAndHide" + (displaynum - 1)).hide();
        $("#displayAndHide" + displaynum).show();
    }

    function fCloseTheWindow() {
        window.opener = null;
        window.open("", '_self');
        window.close();
    }
});

/* 淘宝账号登陆处理 
 * ==================================*/
$(function() {
    $('.taobao-login').click(function() {
        var url = '/oauth?type=login';
        if (window.location.href.indexOf('plan') > -1) {
            setCookie('next', 'plan');
        };
        window.location.href = url;
    });
});
