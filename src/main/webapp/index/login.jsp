<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.Base64Util" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
</script>

<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>登录-电商指数</title>

<link href="${pageContext.request.contextPath}/css/bootstrap.min.css" rel="stylesheet">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/index/login/other.css">

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">


</head>

<body>
	<div class="page">
		<div class="top-bar">
			<div class="container">
				<a href="${pageContext.request.contextPath}/f/Index" id="logo"> <img src="${pageContext.request.contextPath}/images/logo-white.png">
				</a>
				<div class="top-bar-nav">
					<ul>
						<li class="nav-item"><a
							href="${pageContext.request.contextPath}/index/login.jsp">登录</a>
						</li>
						<li class="nav-item"><a
							href="${pageContext.request.contextPath}/index/register.jsp">注册</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="main-wrap">
			<div class="login-wrap">
				<div class="login-bg"></div>
				<div class="container">
					<img class="frontground" src="${pageContext.request.contextPath}/index/login/login-fg.png">
					
					<a href='${pageContext.request.contextPath}/u/UserServlet?method=login&p=<%=Base64Util.getBASE64("demo") %>' id="demo" >
						<img src="${pageContext.request.contextPath}/index/login/demo.png">
					</a>
					<div class="login-box">
						<div class="bg-transparent"></div>
						<div class="login-board">
							<!-- <a href="javascript:void(0);" class="btn-taobao-login taobao-login">淘宝帐号登录</a> -->
							<%String error = (String) request.getParameter("error");%>
							<div class="login-form">
								<p class="login-info <%=error==null?"":"login-error"%>">
									<%=error==null?"":"用户或密码错误, 请重试."%>
								</p>
								<form id="login-form" method="post" action="${pageContext.request.contextPath}/u/UserServlet?method=login">
									<p>登录：</p>
									<input type="text" name="username" id="username" placeholder="邮箱/用户名" title="邮箱/用户名">
									<input type="password" name="password" id="password" placeholder="密码" title="密码"> 
									<!-- 
									<label for="keep-login">
										<input type="checkbox" name="keep-login" id="keep-login">记住登录状态
									</label>
									 -->
									<button type="submit" class="btn-blue">登录</button>
								</form>
								<a id="forget-password" href="javascript:void(0);">忘记密码？</a>
								<a href="${pageContext.request.contextPath}/index/register.jsp">免费注册</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		<!-- 
		<div class="footer">
			<div class="copyright white"><a href="http://www.miitbeian.gov.cn">粤ICP备14080510号</a>. © 2015 SANYANYU. All Rights Reserved.</div>
			<div class="footer-nav white">
				<ul>
					<li class="footer-nav-item"><a
						href="${pageContext.request.contextPath}/index/about.jsp#us">关于我们</a></li>
					<li class="footer-nav-item"><a
						href="${pageContext.request.contextPath}/index/about.jsp#recruit">加入我们</a></li>
					<li class="footer-nav-item"><a
						href="${pageContext.request.contextPath}/index/about.jsp#terms">服务条款</a></li>
					<li class="footer-nav-item"><a
						href="${pageContext.request.contextPath}/index/about.jsp#contact">联系我们</a></li>
				</ul>
			</div>
		</div>
		 -->
		<div class="modal fade" id="alert_modal">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title"></h4>
		      </div>
		      <div class="modal-body">
		        <p></p>
		      </div>
		      <div class="modal-footer">
		        <button id="alert_confirm" type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
		      </div>
		    </div><!-- /.modal-content -->
		  </div><!-- /.modal-dialog -->
		</div><!-- /.modal -->
		
		<script src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js"></script>
		<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
		<script type="text/javascript">
		var path = "${pageContext.request.contextPath}";
		$(function() {

			$('#demo').hover(function(){
		        var img = $(this).find('img');
		        var src = img.attr('src');
		        img.attr('src',src.substring(0, src.lastIndexOf('/') + 1) + 'demo-hover.png');
		    }, function(){
		        var img = $(this).find('img');
		        var src = img.attr('src');
		        img.attr('src',src.substring(0, src.lastIndexOf('/') + 1) + 'demo.png');
		    });
			
			$("form").submit(function() {
				var username = $("#username").val();
                var password = $("#password").val();
                //var keepLogin = ($("#keep-login").attr('checked') == 'checked') ? 1 : 0;
                if (username === "" || password === "") {
                    $(".login-info").addClass('login-error').text("请输入用户名和密码").css({
                        'padding': '4px 8px'
                    });
                    return false;
                }
                $(".login-info").removeClass('login-error').text("正在登陆......").css({
                    'padding': '4px 8px'
                });
			});
			
			$('#forget-password').click(function(){
		    	var username = $('#username').val();
		    	
		    	var regm = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[a-zA-Z]+)+$/; //电子邮件正则表达式
		    	
		    	if($.trim(username) == ''){
		    		$(".modal-title").text("温馨提示");
	        		$(".modal-body >p").text("请输入您的注册邮箱");
	        		$("#alert_modal").modal('show');
		    	}else{
		    		
		    		var bCorrectInput = (username.match(regm)) ? true : false;
		    		alert(bCorrectInput);
	                if (!bCorrectInput) { //正则判断
	                	
	                	$(".modal-title").text("温馨提示");
		        		$(".modal-body >p").text("格式错误，请重新输入");
		        		$("#alert_modal").modal('show');
	                }else{
	                	$.post(path+'/r/RegisterServlet', {
				            'email': username,
				            'method': "forgetPassword"
				        }, function(result) {
				            if (result.status === 1) {
				                
				            	$(".modal-title").text("温馨提示");
				        		$(".modal-body >p").text("密码已发至您邮箱:"+username+"，请注意查收");
				        		$("#alert_modal").modal('show');
				            	
				            };
				        }, 'json');
	                }
		    	}
		    	
		    });

		});
	</script>
		