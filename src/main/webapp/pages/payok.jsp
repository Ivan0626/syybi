<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>支付成功 - 电商指数</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8 ">
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords"
	content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description"
	content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright"
	content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/font-awesome.min.css">
<style>
.span-orange {
	color: #e97025;
}

.span-large {
	font-size: 24px;
}

#crumbs {
	margin-left: 0;
	margin-right: 0
}

#crumbs div {
	padding-left: 0;
	padding-right: 0
}

#crumbs div span {
	display: block;
	height: 30px;
	background: #3498db;
	text-align: center;
	padding: 3px 0 0 0;
	position: relative;
	margin: 0 10px 0 0;
	font-size: 16px;
	text-decoration: none;
	color: #fff;
}

#crumbs div span:after {
	content: "";
	border-top: 15px solid transparent;
	border-bottom: 15px solid transparent;
	border-left: 15px solid #3498db;
	position: absolute;
	right: -15px;
	top: 0;
	z-index: 1;
}

#crumbs div span:before {
	content: "";
	border-top: 15px solid transparent;
	border-bottom: 15px solid transparent;
	border-left: 15px solid #ffffff;
	position: absolute;
	left: 0;
	top: 0;
}

#crumbs div:first-child span {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}

#crumbs div:first-child span:before {
	display: none;
}

#crumbs div:last-child span {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	margin-right: 0px;
}

#crumbs div:last-child span:after {
	display: none;
}

#crumbs div.crumb-complete span {
	background: #3498db;
}

#crumbs div.crumb-complete span:after {
	border-left-color: #3498db;
}

#crumbs div.crumb-current span {
	background: orange;
}

#crumbs div.crumb-current span:after {
	border-left-color: orange;
}

#crumbs div.crumb-pending span {
	background: #ccc;
}

#crumbs div.crumb-pending span:after {
	border-left-color: #ccc;
}
</style>

</head>

<body data-spy="scroll" data-target="#navbar-example2">

	<!-- #section:basics/content.breadcrumbs -->
	<div class="breadcrumbs" id="breadcrumbs">
		<script type="text/javascript">
			try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
		</script>
		<ul class="breadcrumb">
			<li>
				<i class="ace-icon fa fa-home home-icon"></i>
				<a href="#">首页</a>
			</li>
			<li><a href="#">用户中心</a></li>
			<li class="active">支付成功</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<%@ include file="/pages/aceSettings.jsp"%>
		<div class="row">
			<div>
				<h1 id="getstart" class="header-with-boder">支付成功</h1>
				<div id="crumbs" class="row">
					<div class="col-md-4 crumb-complete">
						<span>确认订单</span>
					</div>
					<div class="col-md-4 crumb-complete">
						<span>支付</span>
					</div>
					<div class="col-md-4 crumb-current">
						<span>支付成功</span>
					</div>
				</div>
					
				<div class="row" style="margin-top: 20px">
					<div class="col-md-12">
						<div class="panel panel-default">
							<div class="panel-heading">
								<c:if test="${orderHandleSuccess }">
									<h1><span class="label label-success">订单处理成功</span></h1>
								</c:if>
								<c:if test="${!orderHandleSuccess }">
									<h1><span class="label label-info">订单处理失败，请联系客服：0755-84164626</span></h1>
								</c:if>
							</div>
							<div class="panel-body">
								<div>订单编号：${out_trade_no }</div>
								<div>支付宝交易号：${trade_no }</div>
							</div>
						</div>
					</div>
				</div>
	
				<div class="row">
					<div class="col-md-12">
						<p class="text-right">
							<input type="button" name="ctl00$ctl00$cp_body$Pay_3$Button_PayOK"
								value="返回用户中心" id="cp_body_Pay_3_Button_PayOK"
								class="btn btn-warning" style="width: 100px;">
						</p>
					</div>
				</div>
	
				<div id="end" class="inner"></div>
				<!-- end -->
			</div>
			<!-- content -->
		
		</div>
	</div>	
</body>
</html>