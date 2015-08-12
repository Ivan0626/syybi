<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>支付 - 电商指数</title>

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
			<li class="active">支付</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<%@ include file="/pages/aceSettings.jsp"%>

		<div class="row">
			<div>
				<h1 id="getstart" class="header-with-boder">支付</h1>
				<div id="crumbs" class="row">
					<div class="col-md-4 crumb-complete">
						<span>确认订单</span>
					</div>
					<div class="col-md-4 crumb-current">
						<span>支付</span>
					</div>
					<div class="col-md-4 crumb-pending">
						<span>支付成功</span>
					</div>
				</div>
				<form method="post"
					action="${pageContext.request.contextPath}/a/OrderServlet?method=pay"
					id="form_Pay">
					
					<input type="hidden" name="WIDout_trade_no" value="${baseOrder.orderCode }">
					<input type="hidden" name="WIDsubject" value="${baseOrder.orderName }">
					<input type="hidden" name="WIDtotal_fee" value="${baseOrder.amount }">
					<input type="hidden" name="WIDbody" value="${baseOrder.detail }">
					<input type="hidden" name="WIDshow_url" value="http://${pageContext.request.localAddr }:${pageContext.request.localPort}${pageContext.request.contextPath}/f/Plan">
					
					<input type="hidden" name="usePoints" value="${baseOrder.usePoints }">
					<input type="hidden" name="validStartDate" value="${baseOrder.validStartDate }">
					<input type="hidden" name="validEndDate" value="${baseOrder.validEndDate }">
					
					<div class="row" style="margin-top: 20px">
						<div class="col-md-12">
							<div class="panel panel-default">
								<div class="panel-heading">${baseOrder.orderName }</div>
								<div class="panel-body">
									<div>订单编号：${baseOrder.orderCode }</div>
									<div>订单金额：${baseOrder.amount }</div>
									<div>订单详情：${baseOrder.detail }</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<ul class="nav nav-tabs">
										<li class="active"><a
											href="#alipay"
											data-toggle="tab">支付宝支付</a></li>
										<!-- 	
										<li class=""><a
											href="http://www.bazhuayu.com/pay?tradeId=74c07115-f1e7-492d-9e49-7398458241d9#ebank"
											data-toggle="tab">网银支付</a></li>
										 -->	
										<li class=""><a
											href="#offline"
											data-toggle="tab">线下支付</a></li>
									</ul>
									<div class="tab-content">
										<div class="tab-pane active" id="alipay" style="padding: 15px;">
											<div class="row">
												<div class="col-md-12">
													<input id="cp_body_Pay_3_RadioButton_Alipay" type="radio"
														name="ctl00$ctl00$cp_body$Pay_3$PayType"
														value="RadioButton_Alipay" checked="checked"> <label
														for="RadioButton_Alipay"> <img
														src="${pageContext.request.contextPath}/images/pay_zhifubao.gif"
														title="使用支付宝支付" class="img-thumbnail payment">
													</label>
												</div>
											</div>
										</div>
										<!-- 
										<div class="tab-pane" id="ebank" style="padding: 15px;">
											<div class="row">
												<div class="col-md-3">
													<div>
														<input id="cp_body_Pay_3_RadioButton_ICBC" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_ICBC"> <label
															for="RadioButton_ICBC"><img
															src="${pageContext.request.contextPath}/images/pic_bank_gs.gif"
															title="工商银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_JT" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_JT"> <label for="RadioButton_JT"><img
															src="${pageContext.request.contextPath}/images/pic_bank_jt.gif"
															title="交通银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_ZX" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_ZX"> <label for="RadioButton_ZX"><img
															src="${pageContext.request.contextPath}/images/pic_bank_zx.gif"
															title="中信银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_PF" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_PF"> <label for="RadioButton_PF"><img
															src="${pageContext.request.contextPath}/images/pic_bank_pf.gif"
															title="浦发银行" class="img-thumbnail payment"></label>
													</div>
												</div>
												<div class="col-md-3">
													<div>
														<input id="cp_body_Pay_3_RadioButton_CCB" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_CCB"> <label
															for="RadioButton_CCB"><img
															src="${pageContext.request.contextPath}/images/pic_bank_js.gif"
															title="建设银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_PAB" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_PAB"> <label
															for="RadioButton_PAB"><img
															src="${pageContext.request.contextPath}/images/pic_bank_sz.gif"
															title="平安银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_MS" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_MS"> <label for="RadioButton_MS"><img
															src="${pageContext.request.contextPath}/images/pic_bank_ms.gif"
															title="民生银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_BJ" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_BJ"> <label for="RadioButton_BJ"><img
															src="${pageContext.request.contextPath}/images/pic_bank_bj.gif"
															title="北京银行" class="img-thumbnail payment"></label>
													</div>
												</div>
												<div class="col-md-3">
													<div>
														<input id="cp_body_Pay_3_RadioButton_ABC" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_ABC"> <label
															for="RadioButton_ABC"><img
															src="${pageContext.request.contextPath}/images/pic_bank_ny.gif"
															title="农业银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_CMB" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_CMB"> <label
															for="RadioButton_CMB"><img
															src="${pageContext.request.contextPath}/images/pic_bank_zs.gif"
															title="招商银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_GF" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_GF"> <label for="RadioButton_GF"><img
															src="${pageContext.request.contextPath}/images/pic_bank_gf.gif"
															title="广发银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_GD" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_GD"> <label for="RadioButton_GD"><img
															src="${pageContext.request.contextPath}/images/pic_bank_gd.gif"
															title="光大银行" class="img-thumbnail payment"></label>
													</div>
												</div>
												<div class="col-md-3">
													<div>
														<input id="cp_body_Pay_3_RadioButton_BOC" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_BOC"> <label
															for="RadioButton_BOC"><img
															src="${pageContext.request.contextPath}/images/pic_bank_zg.gif"
															title="中国银行" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_YZ" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_YZ"> <label for="RadioButton_YZ"><img
															src="${pageContext.request.contextPath}/images/pic_bank_yz.gif"
															title="中国邮政" class="img-thumbnail payment"></label>
													</div>
													<div>
														<input id="cp_body_Pay_3_RadioButton_XY" type="radio"
															name="ctl00$ctl00$cp_body$Pay_3$PayType"
															value="RadioButton_XY"> <label for="RadioButton_XY"><img
															src="${pageContext.request.contextPath}/images/pic_bank_xy.gif"
															title="兴业银行" class="img-thumbnail payment"></label>
													</div>
												</div>
											</div>
										</div>
										 -->
										<!-- tab-pane -->
										<div class="tab-pane" id="offline" style="padding: 15px;">
											<div class="row">
												<div class="col-md-12">
													<ul>
														<li>公司名称：深圳市三眼鱼科技有限公司</li>
														<li>开户银行：招商银行</li>
														<li>开户银行支行：招商银行梅龙支行</li>
														<li>银行账号：
															<span style="color: red; font-size: 18px; font-weight: bold;">7559 2279 0710 401</span></li>
													</ul>
													<br>
													<p style="color: #FF9900; font-weight: bold">汇款须知：</p>
													<p>
														1. 选择线下支付时，请不要点击“确认支付”按纽。 <br>2. 汇款时，请您在汇款摘要中写上 "<span
															style="color: red">订单编号</span>" 。 <br>3.
														汇款成功后请将汇款凭证（汇款凭证扫描件或者图片、网银付款截图）、汇款人姓名、联系电话，订单编号等发送到客服邮箱，以便客服进行汇款确认。确认到账后，客服会帮助您完成订单。
													</p>
												</div>
											</div>
		
										</div>
									</div>
		
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<p class="text-right">
										<span class="">应付款：</span><span class="span-orange span-large">￥<strong>${baseOrder.amount }</strong></span>
									</p>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<p class="text-right">
										<input type="submit" name="ctl00$ctl00$cp_body$Pay_3$Button_Pay"
											value="确认支付" id="cp_body_Pay_3_Button_Pay"
											class="btn btn-warning" style="width: 100px;">
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- 
					<div class="bs-callout bs-callout-info">
						<h4>温馨提示</h4>
						<p>如需开具发票，请在付款后3个月内联系客服。发票寄出时间：每月20号统一寄出，
							15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出。</p>
					</div>
					 -->
				</form>
				<div id="end" class="inner"></div>
				<!-- end -->
			</div>
			<!-- content -->
		
		</div>
	</div>	

</body>
</html>