<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.Base64Util" %>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>电商指数-电商数据管理平台</title>
	<meta name="author" content="深圳三眼鱼科技有限公司">
	<meta name="keywords" content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
	<meta name="description" content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
	<meta name="copyright" content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
	
<style type="text/css">

.no-content{
	
	margin-top: 50px;

}

.no-content-text{
	padding: 15px;
}

.no-content-text p {
font-size: 22px;
color: #949494;
}

.container {
margin: 0 auto;
display: table;
clear: both;
}


.plan-btn-success {
color: #fff;
background-color: #5cb85c;
border-color: #4cae4c;
}

.plan-btn {
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
margin-top: 5px;
}

.plan-btn-success:hover{
	color:#fff;
	background-color: #4cae4c;
}


.pricing-star {
background: url(${pageContext.request.contextPath}/images/pricing-star.png) no-repeat;
position: absolute;
width: 39px;
height: 40px;
color: #fff;
text-align: center;
padding-top: 9px;
right: -2px;
top: -16px;
z-index: 2001;
font-size: 12px;
}

.combo{
	padding: 0px 0 25px 0;
	text-align: center;
	/* box-shadow: 0 0 5px #000; */
	position: relative;
	/*z-index: 2000;*/
	/* box-shadow: 0 2px 3px #888; */
	filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#888888');
}
.combo .container>div{
	float: left;
}

.combo-option{
	width: 14%;
	color: #fff;
	line-height: 48px;
	padding-top: 90px;
}
.combo-option>ul>li{
	background-color: #00a0df;	
}
.combo-option>ul>li.even{
	background-color: #0081b2;	
}
.combo-detail{
	width: 21%;
	margin-right: 2px;
	position: relative;
}
.combo-detail>ul{
	background-color: #fff;
	border-radius: 5px;
}
.combo-detail li{
	background-color: #fff;
	height: 47px;
	line-height: 47px;
	border-bottom: 1px solid #d9d9d9;
	width: 80%;
	margin: 0 auto;
}
.combo-detail li.last{
	border: 0;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	line-height: 90px;
	height: 90px;
}
.combo-detail .head{
	height: 96px;
	width: 100%;
	margin: 0;
	padding-top: 18px;
	border-top: 1px solid #5cc5e8;
	border-bottom: 0;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	background-image: -webkit-linear-gradient(top,#099fd1,#037fc3);
	background-image: -moz-linear-gradient(top,#099fd1,#037fc3);
	background-image: -o-linear-gradient(top,#099fd1,#037fc3);
	background-image: -ms-linear-gradient(top,#099fd1,#037fc3);
	background-image: linear-gradient(top,#099fd1,#037fc3);
	filter: progid:dximagetransform.microsoft.gradient(startColorstr='#099fd1',endColorstr='#037fc3',GradientType=0);
}
.combo-detail .head>p{
	font-size: 1.5em;
	font-size: 1.5em;
	color: #fff;
	line-height: normal;
	margin-bottom: 5px;
}
.combo-detail .head .version{
	display: inline-block;
	zoom: 1;
	*display: inline;
}
.combo-detail .unit{
	float: left;
}
.combo-detail .price{
	font-size: 1.5em;
}
.combo-detail .monthly{
	font-size: 0.75em;
}
.combo-detail .true, .combo-detail .false{
	display: inline-block;
	width: 30px;
	height: 100%;
}
.combo-detail .true{
	background: url(${pageContext.request.contextPath}/index/plan/true.png) no-repeat center center;
}
.combo-detail .false{
	background: url(${pageContext.request.contextPath}/index/plan/false.png) no-repeat center center;
}
.combo-option .first{
	line-height: 95px;
}
.combo-detail .first{
	height: 94px;
}
.combo-detail .cross{
	text-decoration: line-through;
}
.combo-detail .highlight{
	color: #e97025;
	font-size: 1.25em;
}

.transparent{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000;
	opacity: 0.3;
	filter: alpha(opacity=30);
	border-radius: 5px;
	display: none;
}

</style>

</head>
<body>

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
			<li class="active">用户中心</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<%@ include file="/pages/aceSettings.jsp"%>

		<div class="row placeholders">

			<div class="no-content">
				<%-- <img src="${pageContext.request.contextPath}/index/main/logo.png"> --%>
	        	<div class="no-content-text">
	        		<c:if test='${param.px == "inda-1" }'>
	        			<p>行业分析数据是旗舰版以上用户独享功能。可以先看看
		            		<a href="${pageContext.request.contextPath}/pages/industryAnalysisDemo.jsp">功能演示</a>
		            	</p>
		            </c:if>
		            <c:if test='${param.px == "inda-2" }'>
	        			<p>类目分析数据是旗舰版以上用户独享功能。可以先看看
		            		<a href="${pageContext.request.contextPath}/pages/categoryAnalysisDemo.jsp">功能演示</a>
		            	</p>
		            </c:if>
		        </div>
	    	</div>
	    	<div class="combo">
	    		<div class="container">
					<div class="combo-option">
						<ul>
							<li class="first">优惠价</li>
							
							<li class="even">适用对象</li>
							<li>产品数据</li>
							<li class="even">行业数据</li>
							<li>产品预测</li>
							<li class="even">类目分析</li>
							<li>行业分析</li>
							<li class="even">品牌分析</li>
							<li>产品分析</li>
							
						</ul>
					</div>
					<div class="combo-detail">
						<ul>
							<li class="head">
								<p>专业版</p>
								<p class="version">
									<span class="unit">￥</span><span class="price">59</span><span class="monthly"> / 月</span>
								</p>
							</li>
							<li class="first"><span class="cross">￥177</span><span class="highlight">￥159/季</span><br>
							<span class="cross">￥708</span><span class="highlight">￥599/年</span></li>
							<li>适合专业级用户</li>
							<li>6个</li>
							<li>0个</li>
							<li><span class="false"></span></li>
							<li><span class="false"></span></li>
							<li><span class="false"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li class="last"><a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("专业版") %>" id="pay2" class="plan-btn plan-btn-success" style="background-image:-webkit-linear-gradient(top,#f08542,#e86e23);background-color:#e86e23">立即购买</a></li>
						</ul>
						<div class="transparent"></div>
					</div>
					<div class="combo-detail">
						<div class="pricing-star">超值</div>
						<ul>
							<li class="head">
								<p>旗舰版</p>
								<p class="version">
									<span class="unit">￥</span><span class="price">199</span><span class="monthly"> / 月</span>
								</p>
							</li>
							<li class="first"><span class="cross">￥597</span><span class="highlight">￥499/季</span><br>
							<span class="cross">￥2388</span><span class="highlight">￥1999/年</span></li>
							<li>适合中小型企业</li>
							<li>10个</li>
							<li>2个</li>
							<li><span class="false"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li class="last"><a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("旗舰版") %>" id="pay2" class="plan-btn plan-btn-success" style="background-image:-webkit-linear-gradient(top,#f08542,#e86e23);background-color:#e86e23">立即购买</a></li>
						</ul>
						<div class="transparent"></div>
					</div>
					<div class="combo-detail">
						<ul>
							<li class="head">
								<p>企业版</p>
								<p class="version">
									<a href="${pageContext.request.contextPath}/index/about.jsp#contact" class="plan-btn plan-btn-success" role="button">联系我们</a>
								</p>
							</li>
							<li class="first">--<br>--
							</li>
							<li>适合咨询公司</li>
							<li>20个</li>
							<li>5个</li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li><span class="true"></span></li>
							<li class="last"><a href="${pageContext.request.contextPath}/index/about.jsp#contact" class="plan-btn plan-btn-success">联系我们</a></li>
						</ul>
						<div class="transparent"></div>
					</div> 
				</div>
	    	</div>
	    	
		</div>	

	</div>
	
	<div class="modal fade" id="alert_modal" style="z-index: 2003;">
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
	
	<script type="text/javascript">
	
		/* var px = "${param.px}";
		$("#"+px).css({"background":"#e8e8e8"}); */
	
	</script>
</body>
</html>