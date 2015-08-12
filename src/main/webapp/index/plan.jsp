<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.Base64Util" %>
<%@ include file="/include/taglib.jsp"%>		
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html class="login-alone">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">

<style type="text/css">


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

</style>

<script type="text/javascript">
	var _speedMark = new Date();
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>套餐价格-电商指数</title>
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords" content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description" content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright" content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/index/plan/index.css">

</head>
<body>
	<div class="header">
		<h1 style="display: none;">深圳三眼鱼科技有限公司</h1>
		<div class="container">
			<div id="logo" class="pull-left">
				<a href="${pageContext.request.contextPath}/f/Index"><img src="${pageContext.request.contextPath}/index/main/logo.png"></a>
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
					<li class="nav1 nav-li"><a href="${pageContext.request.contextPath}/f/Index">首页</a>
					</li>
					<!-- 
					<li class="nav2 nav-li"><a href="http://www.ibbd.net/picture">信息图</a>
					 -->
					</li>
					<li class="nav3 nav-li"><a class="active"
						href="${pageContext.request.contextPath}/f/Plan">套餐价格</a></li>
					<li class="nav4 nav-li"><a href="${pageContext.request.contextPath}/index/about.jsp">关于我们</a>
					</li>
				</ul>

			</div>
		</div>
	</div>
	<div class="mainer">
		<div class="combo">
			<!-- 
			<h2 style="margin-top: -45px; border-radius: 4px; background-image: linear-gradient(#54B4EB, #2FA4E7 60%, #1D9CE5);box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1); width: 960px; margin: -45px auto auto auto">测试</h2>
			 -->
			<div class="container">
				<div class="combo-option">
					<ul>
						<li class="first">体验价</li>
						
						<li class="even">适用对象</li>
						<li>数据类目</li>
						<li class="even">宝贝数据</li>
						<li>店铺数据</li>
						<li class="even">运营数据</li>
						<li>刷单数据</li>
						<li class="even">热词数据</li>
						<li>品牌数据</li>
						<li class="even">数据对比</li>
						<li>品牌分析</li>
						<li class="even">刷单分析</li>
						<li>运营分析</li>
						<li class="even">热词分析</li>
						<li>行业分析</li>
						<li class="even">钻展透视</li>
						<li>店铺分析</li>
						<li class="even">宝贝分析</li>
						<li style="line-height:96px;">售后服务</li>
						<li style="line-height:96px;" class="even" >金牌保障</li>
					</ul>
				</div>
				<div class="combo-detail">
					<ul>
						<li class="head">
							<p>${groupList[0].groupName }</p>
							<p class="version">
								<span class="unit">￥</span><span class="price">0</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li class="first">--<br>--
						</li>
						<li style="font-size: 0.8125em;">${groupList[0].applyUser }（试用${groupList[0].usableTime }）</li>
						<li>${groupList[0].industryNum }个行业</li>
						<li>${groupList[0].goodsNum }个</li>
						<li>${groupList[0].shopNum }家</li>
						<li>${groupList[0].marketNum }家</li>
						<li>${groupList[0].scalpNum }家</li>
						<li>${groupList[0].hotNum }个</li>
						<li>${groupList[0].brandNum }个</li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li style="font-size: 0.8125em;line-height:95px;height: 95px">${groupList[0].serviceSupport }</li>
						<li style="font-size: 0.8125em;line-height:95px;height: 95px">--</li>
						<li class="last"><a href="${pageContext.request.contextPath}/index/login.jsp"
							class="plan-btn plan-btn-success">免费体验</a></li>
					</ul>
					<div class="transparent"></div>
				</div>
				<div class="combo-detail">
					<ul>
						<li class="head">
							<p>${groupList[1].groupName }</p>
							<p class="version">
								<span class="unit">￥</span><span class="price">${groupList[1].priceMonth }</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li class="first"><span class="cross">￥${groupList[1].priceQuarterOld }</span><span
							class="highlight">￥${groupList[1].priceQuarter }/季</span><br>
						<span class="cross">￥${groupList[1].priceYearOld }</span><span class="highlight">￥${groupList[1].priceYear }/年</span></li>
						<li style="font-size: 0.8125em;">${groupList[1].applyUser }</li>
						<li>${groupList[1].industryNum }个行业</li>
						<li>${groupList[1].goodsNum }个</li>
						<li>${groupList[1].shopNum }家</li>
						<li>${groupList[1].marketNum }家</li>
						<li>${groupList[1].scalpNum }家</li>
						<li>${groupList[1].hotNum }个</li>
						<li>${groupList[1].brandNum }个</li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li style="font-size: 0.8125em;line-height:95px;height: 95px">${groupList[1].serviceSupport }</li>
						<li style="line-height:95px;height: 95px;">
							<table style="height:95px;" cellspacing="0" cellpadding="0">
	                            <tr>
	                            	<td><span style="font-size: 0.8125em;text-align:center;display:block; padding-left:35px; padding-right:35px;">
	                            			${groupList[1].promise }
	                            		</span>
	                            	</td>
	                            </tr>
                            </table>
						</li>
						<li class="last"><a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("专业版") %>" id="pay2"
							class="plan-btn plan-btn-success" style="background-image:-webkit-linear-gradient(top,#f08542,#e86e23);background-color:#e86e23">立即购买</a></li>
					</ul>
					<div class="transparent"></div>
				</div>
				<div class="combo-detail">
					<div class="pricing-star">超值</div>
					<ul>
						<li class="head">
							<p>${groupList[2].groupName }</p>
							<p class="version">
								<span class="unit">￥</span><span class="price">${groupList[2].priceMonth }</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li class="first"><span class="cross">￥${groupList[2].priceQuarterOld }</span><span
							class="highlight">￥${groupList[2].priceQuarter }/季</span><br>
						<span class="cross">￥${groupList[2].priceYearOld }</span><span class="highlight">￥${groupList[2].priceYear }/年</span></li>
						<li style="font-size: 0.8125em;">${groupList[2].applyUser }</li>
						<li>${groupList[2].industryNum }个行业（新增可定制）</li>
						<li>${groupList[2].goodsNum }个</li>
						<li>${groupList[2].shopNum }家</li>
						<li>${groupList[2].marketNum }家</li>
						<li>${groupList[2].scalpNum }家</li>
						<li>${groupList[2].hotNum }个</li>
						<li>${groupList[2].brandNum }个</li>
						<li><span class="false"></span></li>
						<li><span class="false"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li style="line-height:95px;height: 95px;">
							<table style="height:95px;" cellspacing="0" cellpadding="0">
	                            <tr>
	                            	<td><span style="font-size: 0.8125em;text-align:center;display:block; padding-left:35px; padding-right:35px;">
	                            			${groupList[2].serviceSupport }
	                            		</span>
	                            	</td>
	                            </tr>
                            </table>
						</li>
						<li style="line-height:95px;height: 95px;">
							<table style="height:95px;" cellspacing="0" cellpadding="0">
	                            <tr>
	                            	<td><span style="font-size: 0.8125em;text-align:center;display:block; padding-left:35px; padding-right:35px;">
	                            			${groupList[2].promise }
	                            		</span>
	                            	</td>
	                            </tr>
                            </table>
						</li>
						<li class="last"><a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("旗舰版") %>" id="pay2"
							class="plan-btn plan-btn-success" style="background-image:-webkit-linear-gradient(top,#f08542,#e86e23);background-color:#e86e23">立即购买</a></li>
					</ul>
					<div class="transparent"></div>
				</div>
				<div class="combo-detail">
					<ul>
					
						<li class="head">
							<p>${groupList[3].groupName }</p>
							<%-- <p class="version">
								<a href="${pageContext.request.contextPath}/index/about.jsp#contact" class="plan-btn plan-btn-success" role="button">联系我们</a>
							</p> --%>
							<p class="version">
								<span class="unit">￥</span><span class="price">${groupList[3].priceMonth }</span><span
									class="monthly"> / 月</span>
							</p>
						</li>
						<li class="first"><span class="cross">￥${groupList[3].priceQuarterOld }</span><span
							class="highlight">￥${groupList[3].priceQuarter }/季</span><br>
						<span class="cross">￥${groupList[3].priceYearOld }</span><span class="highlight">￥${groupList[3].priceYear }/年</span></li>
						<li style="font-size: 0.8125em;">${groupList[3].applyUser }</li>
						<li>${groupList[3].industryNum }个行业（新增可定制）</li>
						<li>${groupList[3].goodsNum }个</li>
						<li>${groupList[3].shopNum }家</li>
						<li>${groupList[3].marketNum }家</li>
						<li>${groupList[3].scalpNum }家</li>
						<li>${groupList[3].hotNum }个</li>
						<li>${groupList[3].brandNum }个</li>
					
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li><span class="true"></span></li>
						<li style="line-height:95px;height: 95px;">
							<table style="height:95px;" cellspacing="0" cellpadding="0">
	                            <tr>
	                            	<td><span style="font-size: 0.8125em;text-align:center;display:block; padding-left:35px; padding-right:35px;">
	                            			${groupList[3].serviceSupport }
	                            		</span>
	                            	</td>
	                            </tr>
                            </table>
						</li>
						<li style="line-height:95px;height: 95px;">
							<table style="height:95px;" cellspacing="0" cellpadding="0">
	                            <tr>
	                            	<td><span style="font-size: 0.8125em;text-align:center;display:block; padding-left:35px; padding-right:35px;">
	                            			${groupList[3].promise }
	                            		</span>
	                            	</td>
	                            </tr>
                            </table>
						</li>
						<%-- <li class="last"><a href="${pageContext.request.contextPath}/index/about.jsp#contact"
							class="plan-btn plan-btn-success">联系我们</a></li> --%>
						<li class="last"><a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("企业版") %>" id="pay3"
							class="plan-btn plan-btn-success" style="background-image:-webkit-linear-gradient(top,#f08542,#e86e23);background-color:#e86e23">立即购买</a></li>
					</ul>
					<div class="transparent"></div>
				</div> 
			</div>
		</div>
		
			<div class="container">
				<div class="faq">
					<p class="q">数据来源哪里？</p>
					<p class="a">
						数据来源于京东、天猫、淘宝、亚马逊、1号店、苏宁易购、国美在线、易迅网、当当网等60多家主流电商平台。
					</p>
				</div>
				<div class="faq">
					<p class="q">数据真实可靠吗？</p>
					<p class="a">我们的数据定期（每周、每天）采集，拥有完善的数据监控机制，选用的所有服务器都是来自于阿里云（aliyun.com）或者是万网云（net.cn）的，加上服务器端的实时备份（每个数据都会备份3份副本）、异地容灾和安全防火墙，在无地震等重大自然灾害下，数据可靠性可达99.999%。</p>
				</div>
				<div class="faq">
					<p class="q">套餐到期后数据还会保留吗？</p>
					<p class="a">当套餐到期后，您可以自主选择付费或不付费，即便您没有付费，我们依然会将您的账户和数据保留一个月。</p>
				</div>
				<div class="faq">
					<p class="q">有其他数据分析工具的对比吗？</p>
					<p class="a">
						请看这里：<a href="#">数据分析工具对比</a>
					</p>
				</div>
				<div class="faq">
					<p class="q">如何索取发票？</p>
					<p class="a">
						如需开具发票，请在付款后3个月内联系客服，专业版累计消费1000元以下暂不提供发票，旗舰版任意金额消费均可提供发票。发票寄出时间：每月20号统一寄出， 15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出。
					</p>
				</div>
			</div>
		</div>
		<div id="alipay-frame" class="alipay-frame">
			<div class="alipay-bg"></div>
			<div class="confirm-box">
				<div class="content-box">
					<p>是否已支付成功？</p>
				</div>
				<div class="button-box">
					<button id="alipay-success">已支付成功</button>
					<button id="alipay-fail">支付遇到问题</button>
				</div>
			</div>
			<input id="out-trade-no" type="hidden">
		</div>
		<!-- 
<div id="floating-ad-left">
    <img src="http://www.ibbd.net/public/img/event/20141111.png" alt="双十一购买季套餐多送30天">
</div>
<div id="floating-ad-right">
    <img src="http://www.ibbd.net/public/img/event/20141111.png" alt="双十一购买季套餐多送30天">
</div>
-->
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
							<li><a href="${pageContext.request.contextPath}/f/Index">电商指数</a></li>
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
	
	<div class="modal fade" id="alert_modal" style="z-index: 9999;">
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
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js" charset="UTF-8"></script>
 	<script type="text/javascript" src="${pageContext.request.contextPath}/index/plan/ibbd-class2.js" charset="UTF-8"></script>
 	<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
	<!--<script type="text/javascript" src="./plan/index.js" charset="UTF-8"></script> -->
	<!-- JiaThis Button BEGIN -->
	<script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_r.js?type=left&amp;move=0&amp;btn=l1.gif" charset="utf-8"></script>
	<!-- JiaThis Button END -->
</body>
</html>