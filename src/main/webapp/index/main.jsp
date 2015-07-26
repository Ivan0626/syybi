<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>	
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>电商指数-电商数据管理平台</title>
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords" content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description" content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright" content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/index/main/index.css">

<style type="text/css">

.main-feature{
	clear: both;
}

.main-feature-title {
	color: #00479d;
	font-size: 26px;
	margin-top: 40px;
}

.main-into-list {
	overflow: hidden
}

.main-into-list li {
	float: left;
	width: 286px;
	text-align: center;
	margin: 50px 0 100px 32px;
	padding-top: 170px
}

.main-list-data {
	background: url(${pageContext.request.contextPath}/index/main/data-gif_f1e4bfb.gif) center
		top no-repeat
}

.main-list-compute {
	background: url(${pageContext.request.contextPath}/index/main/compute-gif_e93e88c.gif) center
		top no-repeat
}

.main-list-prediction {
	background: url(${pageContext.request.contextPath}/index/main/predict-gif_37d9311.gif) center
		top no-repeat
}

.main-btn-success {
color: #fff;
background-color: #5cb85c;
border-color: #4cae4c;
}

.main-btn {
display: inline-block;
padding: 6px 12px;
margin-bottom: 0;
font-size: 14px;
font-weight: normal;
line-height: 1.428571429;
text-align: center;
white-space: nowrap;
vertical-align: middle;
cursor: pointer;
border: 1px solid transparent;
border-radius: 4px;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
-o-user-select: none;
user-select: none;
}

.main-btn-success:hover{
	color:#fff;
	background-color: #4cae4c;
}


</style>

</head>
<body>
	
	<div style="position: fixed; right:5px; bottom: 5px;" >
		<img alt="" src="${pageContext.request.contextPath}/images/qqchat.png">
		<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2368908621&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2368908621:51" alt="在线客服，点击咨询！" title="在线客服，点击咨询！"/></a>
	</div>
	<div class="header">
		<h1 style="display: none;">深圳三眼鱼科技有限公司</h1>
		<div class="container">
			<div id="logo" class="pull-left">
				<a href="${pageContext.request.contextPath}/index/main.jsp"><img src="${pageContext.request.contextPath}/index/main/logo.png"></a>
			</div>
			<div class="pull-right">
				
				<c:if test="${user != null }">
					<a class="go-in btn" style="margin-top: 13px;" href="${pageContext.request.contextPath}/pages/main.jsp">进入应用</a>
				</c:if>
				<c:if test="${user == null }">
					<a class="login btn" href="${pageContext.request.contextPath}/index/login.jsp">登录</a>
					<a class="reg btn" href="${pageContext.request.contextPath}/index/register.jsp">注册</a>
				</c:if>
				
			</div>

			<div id="nav" class="pull-right">
				<ul>
					<li class="nav1 nav-li"><a class="active"
						href="${pageContext.request.contextPath}/index/main.jsp">首页</a>
					</li>
					<!-- 
					<li class="nav2 nav-li"><a href="http://www.ibbd.net/picture">信息图</a>
					 -->
					</li>
					<li class="nav3 nav-li"><a href="${pageContext.request.contextPath}/index/plan.jsp">套餐价格</a>
					</li>
					<li class="nav4 nav-li"><a href="${pageContext.request.contextPath}/index/about.jsp">关于我们</a>
					</li>
				</ul>

			</div>
		</div>
	</div>
	<div class="mainer">
		<div class="banner">
			<a href="javascript:void(0);" class="slide-icon" id="slide-prev">‹</a>
			<a href="javascript:void(0);" class="slide-icon" id="slide-next">›</a>
			<div id="slide-box" style="display: block; width: 200%; margin-left: 0px;">
				<a href="${pageContext.request.contextPath}/index/register.jsp" class="slide-item" style="width: 50%;">
					<img class="slide-img" src="${pageContext.request.contextPath}/index/main/banner5.jpg">
				</a>
				<a href="${pageContext.request.contextPath}/index/login.jsp" class="slide-item" style="width: 50%;">
					<img class="slide-img" src="${pageContext.request.contextPath}/index/main/banner6.jpg">
				</a>
				<a class="slide-item" style="width: 50%;">
					<img class="slide-img" src="${pageContext.request.contextPath}/index/main/banner7.jpg">
				</a>
				<a class="slide-item" style="width: 50%;">
					<img class="slide-img" src="${pageContext.request.contextPath}/index/main/banner8.jpg">
				</a>
			</div>
		</div>

		<!-- 核心功能 -->
		<div id="core" class="row" style="height:480px;">
			<div class="container">
				<p class="core-title">核心功能</p>
				<div class="core-warp">
					<ul class="core-content">
		                <li class="one">
		                    <img src="${pageContext.request.contextPath}/index/main/pic1.jpg">
		                    <h3>产品监控</h3>
		                    <p>实时监控全网主流电商平台产品的价格和销售情况。</p>
		                    <a target="_blank" href="${pageContext.request.contextPath}/index/login.jsp">试用</a>
		                </li>
		                <li class="two">
		                    <img src="${pageContext.request.contextPath}/index/main/pic2.jpg">
		                    <h3>口碑分析</h3>
		                    <p>产品在各大电商网站历年口碑舆情监测情况。</p>
		                    <a target="_blank" href="${pageContext.request.contextPath}/index/login.jsp">试用</a>
		                </li>
		                <li class="three">
		                    <img src="${pageContext.request.contextPath}/index/main/pic3.jpg">
		                    <h3>行业数据</h3>
		                    <p>各大电商网站历年各个行业、类目的销售情况。</p>
		                    <a target="_blank" href="${pageContext.request.contextPath}/index/login.jsp">试用</a>
		                </li>
		                <li class="four">
		                    <img src="${pageContext.request.contextPath}/index/main/pic4.jpg">
		                    <h3>销量预测</h3>
		                    <p>产品的销售情况、价格分析预测。</p>
		                    <a target="_blank" href="${pageContext.request.contextPath}/index/login.jsp">试用</a>
		                </li>
		            </ul>
		            <ol class="core-border">
		                <li class="one"></li>
		                <li class="two"></li>
		                <li class="three"></li>
		                <li class="four"></li>
		            </ol>
				</div>
			</div>
		</div>
		<!--掌握当中 产品监控-->
		<div id="shopmonitor" class="row even heightStyle1" data-first="1">
			<div class="container">
				<div class="msg-box pull-left">
					<h3>掌握当中</h3>
					<div class="msg-subhead">
						<h4>产品监控</h4>
						<p>Product&nbsp;Monitor</p>
					</div>
					<div class="msg-content">
						数据化分析产品销售状况，剖析竞争产品的销售情况、价格分布、品类结构、口碑信息。</div>
				</div>
				<div class="pic-box pull-right">
					<img
						src="${pageContext.request.contextPath}/index/main/shopmonitor.png">
				</div>
			</div>
		</div>
		<!--大势先知 行业数据-->
		<div id="industrydata" class="row even heightStyle1">
			<div class="container">
				<div class="msg-box pull-left">
					<h3>大势先知</h3>
					<div class="msg-subhead">
						<h4>行业数据</h4>
						<p>Industry Data</p>
					</div>
					<div class="msg-content">
						囊括历年淘宝各个行业、类目、品牌的销售数据，洞察行业的趋势，挖掘暗含在数据中的商业宝藏。</div>
				</div>
				<div class="pic-box pull-right">
					<img src="${pageContext.request.contextPath}/index/main/reward.png">
				</div>
			</div>
		</div>
		<!-- 水平线 -->
		<em class="hr-line"></em>
		<!--产品优势-->
		<div id="advantage" class="row" style="height:420px;">
			<div class="container">
				<p class="core-title">产品优势</p>
				<div class="main-feature">
					<div class="main-feature-content">
						<ul class="main-into-list">
							<li class="main-list-data">
								<h3 class="list-title">全网数据分析</h3>
								<p class="list-text">整合亿级别数据特征</p>
								<p class="list-text">根据预测目标自动分析挖掘</p>
							</li>
							<li class="main-list-compute">
								<h3 class="list-title">超大规模计算能力</h3>
								<p class="list-text">PB级别数据处理</p>
								<p class="list-text">大规模集群并行计算支持</p>
							</li>
							<li class="main-list-prediction">
								<h3 class="list-title">智能预测算法</h3>
								<p class="list-text">复杂时间序列分析和机器学习模型</p>
								<p class="list-text">自动学习并预测结果</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
		<!--产品优势
		<div id="advantage" class="row even heightStyle1">
			
			<div class="container">
				<div class="msg-box pull-left">
					<h3>产品优势</h3>
					<div class="msg-subhead">
						<h4>产品优势</h4>
						<p>Product Advantage</p>
					</div>
					<div class="msg-content">
						依托电商指数独有的海量数据，提供平台化预测服务，开放大数据预测能力。</div>
				</div>
				<div class="main-feature">
					<div class="main-feature-content">
						<ul class="main-into-list">
							<li class="main-list-data">
								<h3 class="list-title">全网数据分析</h3>
								<p class="list-text">整合亿级别数据特征</p>
								<p class="list-text">根据预测目标自动分析挖掘</p>
							</li>
							<li class="main-list-compute">
								<h3 class="list-title">超大规模计算能力</h3>
								<p class="list-text">PB级别数据处理</p>
								<p class="list-text">大规模集群并行计算支持</p>
							</li>
							<li class="main-list-prediction">
								<h3 class="list-title">智能预测算法</h3>
								<p class="list-text">复杂时间序列分析和机器学习模型</p>
								<p class="list-text">自动学习并预测结果</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
		</div>
		-->
		
		<!--套餐价钱-->
		<div id="plan" class="row">
			<div class="container">
				<div class="area-title">
					<h4>套餐价格</h4>
					<p>Package Price</p>
				</div>
				<div class="main-plan">
					<ul class="plan-option">
						<li class="plan-header plan-caption">
							<p class="top-right">套餐类别</p>
							<p class="bottom-left">功能</p>
						</li>
						<li>产品数据</li>
						<li>行业数据</li>
						<li>产品预测</li>
						<li>类目分析</li>
						<li>行业分析</li>
						<li>品牌分析</li>
						<li>产品分析</li>
					</ul>
					<ul class="plan-detail">
						<li class="plan-header">
							<p class="version">免费版</p>
							<p class="version-price">
								<span class="unit">￥</span><span class="price">0</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li>1个</li>
						<li>0个</li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
					</ul>
					<ul class="plan-detail">
						<li class="plan-header">
							<p class="version">专业版</p>
							<p class="version-price">
								<span class="unit">￥</span><span class="price">59</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li>6个</li>
						<li>0个</li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
					</ul>
					<ul class="plan-detail">
						<li class="plan-header">
							<p class="version">旗舰版</p>
							<p class="version-price">
								<span class="unit">￥</span><span class="price">199</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li>10个</li>
						<li>2个</li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
					</ul>
					<ul class="plan-detail">
						<li class="plan-header">
							<p class="version">企业版</p>
							<p class="version-price">
								<a href="${pageContext.request.contextPath}/index/about.jsp#contact" class="main-btn main-btn-success" role="button">联系我们</a>
							</p>
						</li>
						<li>20个</li>
						<li>5个</li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 水平线 -->
		<em class="hr-line"></em>
		<!-- 我们的客户 -->
		<div class="row">
			<div class="container">
				<div class="area-title">
					<h4>我们的客户</h4>
					<p>Our Customers</p>
				</div>
				<ul class="customer-list">
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c1.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c2.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c3.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c4.png"
							alt=""></a></li>
					<li class="no-margin"><a ><img
							src="${pageContext.request.contextPath}/index/main/c5.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c6.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c7.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c8.png"
							alt=""></a></li>
					<li><a ><img
							src="${pageContext.request.contextPath}/index/main/c9.png"
							alt=""></a></li>
					<li class="no-margin"><a ><img
							src="${pageContext.request.contextPath}/index/main/c10.png"
							alt=""></a></li>
				</ul>
			</div>
		</div>
		<!-- 数据驱动电商时代 -->
		<div class="row">
			<div class="big-banner">
				<img id="big-picture"
					src="${pageContext.request.contextPath}/index/main/bigBanner.jpg"
					style="margin-left: -16.1751747130891px;">
				<div class="banner-text">
					<h3>大数据驱动电商的时代来临</h3>
					<p>毋庸置疑，浪潮已经到来。还在等？现在就开始拥抱电商大数据。</p>
					<a href="${pageContext.request.contextPath}/index/register.jsp">立即注册</a>
				</div>
			</div>
		</div>
	</div>
	
	<div class="footer">
		<div class="container">
			<h2>
				<span class="font40"></span><span class="font14">三眼鱼科技旗下产品</span>
			</h2>
			<div id="ibbd-products">
				<ul>
					<li class="foo-li">
						<h3>电商指数</h3>
						<ul>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#us">关于我们</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#recruit">诚聘英才</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#terms">服务条款</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#contact">联系我们</a></li>
						</ul>
					</li>
					<li class="foo-li">
						<h3>产品服务</h3>
						<ul>
							<li><a href="${pageContext.request.contextPath}/index/main.jsp">电商指数</a></li>
						</ul>
					</li>
					<li class="foo-li">
						<h3>咨询反馈</h3>
						<ul>
							<li><a class="right12" target="_blank"
								href="${pageContext.request.contextPath}/a/AdviseServlet?method=init">提建议</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div id="ibbd-wechat">
				<img class="bottom20" src="${pageContext.request.contextPath}/index/about/qrcode.png">
				<p>微信扫描添加公众平台，</p>
				<p>并发送注册邮箱帐号。</p>
			</div>
			<div class="clear-both">
				<p id="copy-right">
					<a href="http://www.miitbeian.gov.cn">粤ICP备14080510号</a>. © 2015 SANYANYU. All Rights Reserved.
				</p>

			</div>
		</div>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/index/main/ibbd-class2.js" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/index/main/index.js" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/index/main/index(1).js" charset="UTF-8"></script>
	<!-- JiaThis Button BEGIN -->
	<script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_r.js?type=left&amp;move=0&amp;btn=l1.gif" charset="utf-8"></script>
	<!-- JiaThis Button END -->
</body>
</html>