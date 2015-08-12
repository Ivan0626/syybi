<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="login-alone">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
	var path = "${pageContext.request.contextPath}";
</script>

<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>用户注册-电商指数</title>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/other.css">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/res/passport/css/login.css">

</head>

<body>
	<input type="hidden" id="pusername" value="${param.p }">
	<div class="page">
		<div class="top-bar">
			<div class="container">
				<a href="${pageContext.request.contextPath}/f/Index" id="logo"> <img
					src="${pageContext.request.contextPath}/images/logo-white.png">
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
			<div class="register-wrap">
				<div id="register_bg"></div>
				<div class="container">
					<p class="register-m">一分钟快速注册，立刻体验</p>
					<div class="register-box">
						<div class="register-board">
							<div class="register-first">
								<div class="register-page">
									<span class="current">1</span> <span class="total">/2</span>
								</div>
								
								<div class="register-input">
									<p class="register-h">填写账户信息</p>
									<div class="input-text input-username">
										<span class="icon"
											style="border-color: rgb(204, 204, 204); background-position: 15px 50%;"></span>
										<input type="text" id="input-username" placeholder="用户名"
											title="用户名" style="border-color: rgb(204, 204, 204);">
										<span class="tip" style="color: rgb(231, 76, 60);"></span>
									</div>
									<div class="input-text input-email">
										<span class="icon"
											style="border-color: rgb(204, 204, 204); background-position: 15px 50%;"></span>
										<input type="text" id="input-email" placeholder="注册邮箱"
											title="注册邮箱" style="border-color: rgb(204, 204, 204);">
										<span class="tip" style="color: rgb(231, 76, 60);"></span>
									</div>
									<div class="input-text input-password">
										<span class="icon"
											style="border-color: rgb(204, 204, 204); background-position: 15px 50%;"></span>
										<input type="password" id="input-pw" placeholder="密码"
											title="密码" style="border-color: rgb(204, 204, 204);">
										<span class="tip" style="color: rgb(231, 76, 60);"></span>
									</div>
									<div class="input-text input-repassword">
										<span class="icon"></span> <input type="password"
											id="input-repw" placeholder="确认密码" title="确认密码"
											disabled="disabled"> <span class="tip"></span>
									</div>
								</div>
								<div class="register-action">
									<a class="btn-large-green btn-disabled register-apply"
										href="javascript:void(0);" id="apply">下一步</a>
									<p class="terms">
										<label class="checkbox"> <input type="checkbox"
											id="input-agree" class="agree" checked=""> 我同意 <a href="${pageContext.request.contextPath}/index/about.jsp#terms" target="_blank">《电商指数产品服务条款》</a></label>
									</p>
								</div>
								<!-- <div class="clearboth">
                        <a id="taobao-login" class="taobao-login" href="javascript:void(0);">无需注册，淘宝帐号直接登录</a>
                    </div> -->
							</div>
							<div class="register-second">
								<div class="register-page">
									<span class="current">2</span> <span class="total">/2</span>
								</div>
								<div class="register-info">
									<p class="register-h">激活新账户</p>
									<p class="register-success">注册成功！</p>
									<p class="register-msg">
										我们已经向您的邮箱：<span id="register-email"></span>发送了一封验证邮件，请点击邮件内的激活链接对账户进行激活
									</p>
									<a class="btn-large-green" id="to-mailbox" target="_blank">进入邮箱进行激活</a>
								</div>
								<div class="clearboth">
									<a class="pull-left" id="resend-email" href="javascript:void(0);">没收到验证邮件？</a>
									<a href="${pageContext.request.contextPath}/index/login.jsp" class="btn-blue btn-login">已激活，直接登录</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<p>Copyright © 2015 SANYANYU. All Rights Reserved.</p>
		</div>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js" charset="UTF-8"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/index.js" charset="UTF-8"></script>
		<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
		
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
	</div>
</body>
</html>