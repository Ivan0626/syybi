<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="login-alone">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
	var path = "${pageContext.request.contextPath}";
</script>

<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>用户注册-电商指数</title>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/other.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/res/passport/css/login.css">
</head>

<body>
	<div class="page">
		<div class="top-bar">
			<div class="container">
				<a href="${pageContext.request.contextPath}/index/main.jsp" id="logo"> <img src="${pageContext.request.contextPath}/images/logo-white.png">
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
							<div class="register-third">
                    			<div class="register-page">
                        			<span class="current">2</span>
                        			<span class="total">/2</span>
                    			</div>
                    			<div class="register-info">
                        			<p class="register-h">激活新账户</p>
                                    <p class="register-success">激活成功！</p>
                        			<div id="login-btn">
                            			<a class="btn-large-green" href="${pageContext.request.contextPath}/index/login.jsp">马上登录</a>
                        			</div>
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
	</div>
</body>
</html>