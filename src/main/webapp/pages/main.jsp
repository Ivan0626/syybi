<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.Base64Util, com.sanyanyu.syybi.entity.BaseUser"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户中心</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/font-awesome.min.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/syybi.css" />

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

		<div class="row">
			<div>
					<ul id="myTab" class="nav nav-tabs">
						<li class="active"><a id="tab1" href="#profile" data-toggle="tab">基本信息</a></li>
						<li><a id="tab2" href="#orderRecord" data-toggle="tab">订单管理</a></li>
						<li><a id="tab3" href="#reChargeRecord" data-toggle="tab">积分充值记录</a></li>
						<li><a id="tab4" href="#consumeRecord" data-toggle="tab">积分消费记录</a></li>
					</ul>
					
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade in active" id="profile">
							<div class="row" style="margin-top: 20px; padding: 15px;">
								<div class="col-md-12">
									<form method="post" action="" id="profiler_form">
										<div class="row">
											<div class="col-md-12">
												<div class="media">
													<div class="profile-picture pull-left">
														<img class="picture " alt="电商指数" src="${pageContext.request.contextPath}/images/newlogo128.png">
													</div>
													<div class="media-body">
							
														<div style="float: left;" class="col-md-12">
							
															<div style="float: left;">
																<span>用户名：${user.username }</span> <span style="margin-left: 15px;">邮箱：${user.email }</span>
															</div>
															<div style="float: left; margin-left: 15px;">
																<div id="cp_body_Profile_3_Panel_Main">
																	<a href="${pageContext.request.contextPath}/a/AccountSetting" class=""
																		role="button"><i class="icon-key"></i>修改登录密码</a>
																</div>
															</div>
														</div>
							
														<div style="padding-top: 10px; float: left; overflow-y: hidden"
															class="col-md-12">
															<div>
																<div style="float: left">资料完善程度：</div>
																<div
																	style="width: 230px; height: 15px; float: left; overflow-y: hidden; margin: 0;"
																	class="progress">
																	<c:if test="${user.userType == '' || user.userType == null }">
																		<div id="cp_body_Profile_3_profileProgress"
																		class="progress-bar" role="progressbar" aria-valuemin="0"
																		aria-valuemax="100" aria-valuenow="50" style="width: 50%;">50%</div>
																	</c:if>
																	<c:if test="${user.userType != '' && user.userType != null  }">
																		<div id="cp_body_Profile_3_profileProgress"
																		class="progress-bar" role="progressbar" aria-valuemin="0"
																		aria-valuemax="100" aria-valuenow="100" style="width: 100%;">100%</div>
																	</c:if>
																</div>
																<a href="${pageContext.request.contextPath}/a/AccountSetting" title="完善资料" style="float: left; margin-left: 5px;">
																	<i class="icon-pencil"></i>
																</a>
															</div>
														</div>
							
							
														<div class="col-md-12" style="float: left;">
							
															<p class="bg-warning"
																style="padding-left: 5px; color: #777; padding-top: 15px;">
																<i class="icon-bookmark"></i>完善资料能免费获取积分哦！
															</p>
														</div>
							
							
													</div>
							
												</div>
							
							
											</div>
										</div>
		
										<div class="hr hr16 hr-dotted"></div>
		
										<div class="row">
											<div class="col-md-9">
												<div class="panel panel-primary">
													<div class="panel-heading">
														<h3 class="panel-title" style="color: #fff;">账户信息</h3>
													</div>
													<div class="panel-body" style="height: 115px;">
														<div class="col-md-12">
															<span style="width: 180px; float: left; margin-right: 15px;">积分余额：<span
																class="key-sign" id="left-points" style="font-size: 22px;">${user.points }</span></span> <span>
																<!-- <a href="javascript:void(0);" id="buyPoints" class="btn btn-warning btn-xs" role="button">购买积分</a> -->
																<a href="${pageContext.request.contextPath}/a/UserServlet?method=init#activity"class="btn btn-link btn-sm" role="button">免费赢取</a>
																<a href="${pageContext.request.contextPath}/pages/pointsRule.jsp" class="btn btn-link btn-sm" role="button">积分规则</a>
															</span>
														</div>
					
														<div class="col-md-12" style="margin-top: 6px;">
															<div>
					
																<div id="cp_body_Profile_3_Panel_Free">
																	
																	<c:if test="${user.groupName == '免费版' }">
																		<span style="width: 180px; float: left; margin-right: 15px; margin-top: 3px;">账户类型：<span
																		class="ace-label ace-label-grey arrowed arrowed-right">${user.groupName }</span></span>
																		<span>
																			<a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("专业版") %>" id="upVersion1" class="btn btn-warning btn-xs" role="button">升级为专业版</a>&nbsp;&nbsp;
																			<a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("旗舰版") %>" id="upVersion2" class="btn btn-warning btn-xs" role="button">升级为旗舰版</a>
																			<a href="${pageContext.request.contextPath}/index/plan.jsp" class="btn btn-link btn-sm" role="button">了解各版本详情</a>
																		</span>
																	</c:if>
																	
																	<c:if test="${user.groupName == '专业版' }">
																		<span style="width: 180px; float: left; margin-right: 15px; margin-top: 3px;">账户类型：<span
																			class="ace-label ace-label-grey arrowed arrowed-right">${user.groupName }</span></span>
																		<span>
																			<a href="${pageContext.request.contextPath}/a/OrderServlet?method=confirm&v=<%=Base64Util.getBASE64("旗舰版") %>" id="upVersion2" class="btn btn-warning btn-xs" role="button">升级为旗舰版</a>
																			<a href="${pageContext.request.contextPath}/index/plan.jsp" class="btn btn-link btn-sm" role="button">了解各版本详情</a>
																		</span>
																	</c:if>
																	
																	<c:if test="${user.groupName == '旗舰版' }">
																		<span style="width: 180px; float: left; margin-right: 15px; margin-top: 3px;">账户类型：<span
																			class="ace-label ace-label-grey arrowed arrowed-right">${user.groupName }</span>
																		</span>
																		<span>
																			<a href="${pageContext.request.contextPath}/index/plan.jsp" class="btn btn-link btn-sm" role="button">了解各版本详情</a>
																		</span>
																	</c:if>
																	
																	<c:if test="${user.groupName == '企业版' }">
																		<span style="width: 180px; float: left; margin-right: 15px; margin-top: 3px;">账户类型：<span
																			class="ace-label ace-label-grey arrowed arrowed-right">${user.groupName }</span>
																		</span>
																	</c:if>
																	
																</div>
					
															</div>
														</div>
														
														<div class="col-md-12">
															<span style="width: 280px; float: left; margin-right: 15px;margin-top: 6px;">有效日期：
																<span class="key-sign" style="font-size: 15px;">${user.validStartDate }  ~   ${user.validEndDate }</span>
															</span>
														</div>
														
													</div>
												</div>
											</div>
											<div class="col-md-3">
												<div class="panel panel-success">
													<div class="panel-heading">
														<h3 class="panel-title" style="color: #468847;">签到领积分</h3>
													</div>
													<div id="qiandao-p" class="panel-body" style="height: 115px;">
														
														<c:if test="${isQianDao }">
															<p id="cp_body_Profile_3_box_QianDaoMsg"
																class="alert alert-danger">
																<i class="icon-info-sign"></i> 您今天已经签过了！明天再来吧。
															</p>
														</c:if>
														
														<c:if test="${!isQianDao }">
															<p id="cp_body_Profile_3_box_Button_QianDao">
											                </p>
											                <p class="alert alert-warning" style="padding:8px;"><i class="icon-volume-up"></i> 每天签到能领取<span class="key-sign">20</span>积分！</p>
											                  <input type="button" name="ctl00$ctl00$cp_body$Profile_3$Button_QianDao" value="马上签到" id="cp_body_Profile_3_Button_QianDao" class="btn btn-warning btn-xs">
											              	<p></p>
														</c:if>
													</div>
												</div>
											</div>
										</div>
		
		
										<div id="cp_body_Profile_3_Panel_Activity">
											<div class="hr hr16 hr-dotted"></div>
											<div class="row">
												<div class="col-md-12">
													<div class="panel panel-primary">
														<div class="panel-heading">
															<h3 class="panel-title" style="color: #fff;">绑定合作网站账户</h3>
														</div>
														<div class="panel-body">
															<div class="col-sm-12">
																<div class="alert alert-warning" role="alert">
																	<i class="icon-info-sign"></i>
																	每绑定一个合作网站账户都会免费获得积分，并且可以使用合作网站账户登录电商指数！
																</div>
															</div>
															<div class="space-6"></div>
					
					
															<div class="col-sm-12 infobox-container">
																<div class="infobox infobox-green  col-sm-6 col-md-4" style="width: 33.333%;">
																	<div class="infobox-icon">
																		<a href="javascript:;" id="cp_body_Profile_3_qq_img_link"
																			title="暂时不支持QQ绑定"><img
																			src="${pageContext.request.contextPath}/images/qq_logo_120x120.png"
																			id="cp_body_Profile_3_qq_img"></a>
																	</div>
					
																	<div class="infobox-data">
																		<span id="cp_body_Profile_3_wx_msg">QQ账户绑定登录功能暂未开放</span>
																		<div id="cp_body_Profile_3_wx_link" class="infobox-content">敬请期待</div>
																	</div>
																	<!-- 
																	<div class="infobox-data">
																		<span id="cp_body_Profile_3_qq_msg">可使用QQ账户登录电商指数</span>
																		<div id="cp_body_Profile_3_qq_link" class="infobox-content">
																			<span
																				class="ace-label ace-label-success arrowed-in arrowed-in-right">已绑定</span>
																		</div>
																	</div>
																	 -->
																</div>
					
																<div class="infobox infobox-green   col-sm-6 col-md-4" style="width: 33.333%;">
																	<div class="infobox-icon">
																		<a href="http://www.bazhuayu.com/BindRedirect?from=weibo"
																			id="cp_body_Profile_3_weibo_img_link" title="暂时不支持微博绑定"><img
																			src="${pageContext.request.contextPath}/images/weibo_logo_64x64.png"
																			id="cp_body_Profile_3_weibo_img"></a>
																	</div>
					
																	<div class="infobox-data">
																		<span id="cp_body_Profile_3_wx_msg">微博账户绑定登录功能暂未开放</span>
																		<div id="cp_body_Profile_3_wx_link" class="infobox-content">敬请期待</div>
																	</div>
																	<!-- 
																	<div class="infobox-data">
																		<span id="cp_body_Profile_3_weibo_msg">绑定即可获得<span
																			class="key-sign">1000</span>积分
																		</span>
																		<div id="cp_body_Profile_3_weibo_link"
																			class="infobox-content">
																			<a href="http://www.bazhuayu.com/BindRedirect?from=weibo"
																				class="btn btn-warning btn-xs" role="button">立即绑定</a>
																		</div>
																	</div>
																	 -->
					
																</div>
					
																<div class="infobox infobox-green   col-sm-6 col-md-4" style="width: 33.333%;">
																	<div class="infobox-icon">
																		<a href="javascript:;" id="cp_body_Profile_3_wx_img_link"
																			title="暂时不支持微信绑定"><img
																			src="${pageContext.request.contextPath}/images/wx_logo_64x64.png"
																			id="cp_body_Profile_3_wx_img"></a>
																	</div>
					
																	<div class="infobox-data">
																		<span id="cp_body_Profile_3_wx_msg">微信账户绑定登录功能暂未开放</span>
																		<div id="cp_body_Profile_3_wx_link" class="infobox-content">敬请期待</div>
																	</div>
																</div>
															</div>
															<!-- /span -->
														</div>
													</div>
												</div>
											</div>
				
											<h4 id="activity">免费赚积分</h4>
											<hr style="margin-top: 10px; margin-bottom: 15px;">
											<div class="row">
												<div class="col-md-12">
													<div class="accordion-style1 panel-group" id="accordion">
														<div class="panel panel-default">
															<div class="panel-heading">
																<h4 class="panel-title">
																	<a href="#collapseOne"
																		data-parent="#accordion" data-toggle="collapse"
																		class="accordion-toggle"> <i
																		data-icon-show="icon-angle-right"
																		data-icon-hide="icon-angle-down"
																		class="bigger-110 icon-angle-down"></i> &nbsp;邀请好友注册赚积分
																	</a>
																</h4>
															</div>
					
															<div id="collapseOne" class="panel-collapse in"
																style="height: auto;">
																<div class="panel-body">
																	<div class="alert alert-info">
																		<h4>邀请朋友使用，双方都可获赠积分！</h4>
																		<p>分享下面链接给朋友，或者粘贴到QQ群，微博，论坛等，朋友注册后，我们会为您和这位朋友分别奖励
																			500积分！</p>
																		
																		<div class="input-group">
																			<span class="input-group-addon">链接</span> <input
																				name="ctl00$ctl00$cp_body$Profile_3$Input_InviteLink"
																				type="text" id="cp_body_Profile_3_Input_InviteLink"
																				class="form-control"
																				style="float: left; width: 540px; margin-right: 10px;"
																				value="http://www.huoradar.com/index/register.jsp?p=<%=Base64Util.getBASE64(((BaseUser)session.getAttribute("user")).getUsername()) %>">
																			<!-- JiaThis Button BEGIN -->
																			<div class="jiathis_style_32x32">
																				<a class="jiathis_button_qzone"></a>
																				<a class="jiathis_button_tsina"></a>
																				<a class="jiathis_button_tqq"></a>
																				<a class="jiathis_button_weixin"></a>
																				<a class="jiathis_button_renren"></a>
																				<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>
																				<a class="jiathis_counter_style"></a>
																			</div>
																			<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
																			<script type="text/javascript">
																			
																			var jiathis_config = {
														                        data_track_clickback: 'true',
														                        url: document.getElementById("cp_body_Profile_3_Input_InviteLink").value,
														                        title: "我发现一个非常好用的电商数据分析平台：电商指数",
														                        summary: "我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！"
														                    };
																			</script>
																			<!-- JiaThis Button END -->
																		</div>
																		
					
																	</div>
																</div>
															</div>
														</div>
					
														<div class="panel panel-default">
															<div class="panel-heading">
																<h4 class="panel-title">
																	<a href="#collapseTwo"
																		data-parent="#accordion" data-toggle="collapse"
																		class="accordion-toggle collapsed"> <i
																		data-icon-show="icon-angle-right"
																		data-icon-hide="icon-angle-down"
																		class="bigger-110 icon-angle-right"></i> &nbsp;关注微信送礼包
																	</a>
																</h4>
															</div>
					
															<div id="collapseTwo" class="panel-collapse collapse"
																style="height: 0px;">
																<div class="panel-body">
																	<div class="alert alert-info">
					
																		<img class="img"
																			style="width: 230px; height: 230px; border: 0;"
																			src="${pageContext.request.contextPath}/images/qrcode.png"
																			alt="微信公众号：电商指数" title="微信公众号：电商指数">
																		<div style="font-size: 18px; padding: 5px;">微信扫一扫，关注电商指数官方微信，领取1000积分礼包！更可免费享受账户重要信息通知，第一时间获取各种优惠！</div>
					
																	</div>
																</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h4 class="panel-title">
																	<a href="#collapseFour"
																		data-parent="#accordion" data-toggle="collapse"
																		class="accordion-toggle collapsed"> <i
																		data-icon-show="icon-angle-right"
																		data-icon-hide="icon-angle-down"
																		class="bigger-110 icon-angle-right"></i> &nbsp;加QQ群领积分
																	</a>
																</h4>
															</div>
					
															<div id="collapseFour" class="panel-collapse collapse"
																style="height: 0px;">
																<div class="panel-body">
																	<div class="alert alert-info">
																		<h4>加入官方QQ交流群免费领积分！</h4>
																		<p>加入“电商指数交流群”，联系群主即可免费领取100积分奖励！</p>
																		<p>
																			QQ群：250103585, 开放加入 <a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=e8a5398dca009b28fcf3c495bc210445a028d2e96e6a3268e333b75bc3b533f7"><img border="0" src="http://pub.idqqimg.com/wpa/images/group.png" alt="电商指数交流群" title="电商指数交流群"></a>
																		</p>
					
																	</div>
																</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h4 class="panel-title">
																	<a href="#collapseFive"
																		data-parent="#accordion" data-toggle="collapse"
																		class="accordion-toggle collapsed"> <i
																		data-icon-show="icon-angle-right"
																		data-icon-hide="icon-angle-down"
																		class="bigger-110 icon-angle-right"></i> &nbsp;提建议送积分
																	</a>
																</h4>
															</div>
					
															<div id="collapseFive" class="panel-collapse collapse"
																style="height: 0px;">
																<div class="panel-body">
																	<div class="alert alert-info">
																		<h4>提供合理化建议可免费获取100积分，定期每月选中一名建议之星，赠送一个月旗舰版！</h4>
																		<p>
																			<a target="_blank" href="${pageContext.request.contextPath}/a/AdviseServlet?method=init"><span class="label label-success" style="font-size: 13px;">提建议</span></a>
																		</p>
					
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
							  	</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						<div class="tab-pane fade" id="orderRecord">
							<div class="row" style="margin-top:20px;padding:15px;">
								<div class="col-md-12">
									<form method="post" action="" id="form_orderRecord">
										<div>
											<table class="table table-bordered table-hover" cellspacing="0" rules="all" border="1" id="cp_body_OrderRecord_3_GridView_OrderRecord" style="border-style:Solid;border-collapse:collapse;">
												<thead>
													<tr>
														<th class="active" scope="col" style="width:150px;">订单编号</th><th class="active" scope="col" style="width:150px;">订单名称</th><th class="active" scope="col" style="width:50px;">金额</th><th class="active" scope="col" style="width:50px;">状态</th><th class="active" scope="col" style="width:125px;">创建时间</th><th class="active" scope="col" style="width:125px;">支付时间</th><th class="active" scope="col" style="width:200px;">详情</th>
													</tr>
												</thead>	
												<tbody id="order-tbody">
												</tbody>
											</table>
										</div>
									</form>	
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						<div class="tab-pane fade" id="reChargeRecord">
							<div class="row" style="margin-top:20px;padding:15px;">
								<div class="col-md-12">
									<form method="post" action="" id="form_rechargeRecord">
										<div>
											<table class="table table-bordered table-hover" cellspacing="0" rules="all" border="1" id="cp_body_ReChargeRecord_3_GridView_ReChargeRecord" style="border-style:Solid;border-collapse:collapse;">
												<thead>
													<tr>
														<th class="active" scope="col" style="width:200px;">时间</th><th class="active" scope="col" style="width:100px;">充值积分</th><th class="active" scope="col" style="width:600px;">备注</th>
													</tr>
												</thead>
												<tbody id="in-tbody">
												</tbody>
											</table>
										</div>
									</form>	
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						
						<div class="tab-pane fade" id="consumeRecord">
							<div class="row" style="margin-top:20px;padding:15px;">
								<div class="col-md-12">
									<form method="post" action="" id="form_consumeRecord">
										<div>
											<table class="table table-bordered table-hover" cellspacing="0" rules="all" border="1" id="cp_body_ConsumeRecord_3_GridView_ConsumeRecord" style="border-style:Solid;border-collapse:collapse;">
												<tr>
													<th class="active" scope="col" style="width:200px;">时间</th><th class="active" scope="col" style="width:100px;">消费积分</th><th class="active" scope="col" style="width:600px;">备注</th>
												</tr>
												<tbody id="out-tbody">
												</tbody>
											</table>
										</div>
									</form>	
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
		  			</div>
			</div>
		</div>
	</div><!-- /.page-content -->

	<script src="../assets/js/bootbox.js"></script>
	
	<script>
		$("#accordion a[data-toggle=collapse]").on(
				"click",
				function() {
					var parent = $($(this).data("parent"));
					var oldi;
					var newi;
					if ($(this).hasClass("collapsed")) {
						oldi = parent.find(
								"a[data-toggle=collapse]:not(.collapsed)")
								.find("i:first");

						newi = $(this).find("i:first");
					} else {
						oldi = $(this).find("i:first");
						newi = null;
					}
					if (oldi && oldi.length) {
						oldi.removeClass(oldi.data("icon-hide"));
						oldi.addClass(oldi.data("icon-show"));
					}
					if (newi) {
						newi.removeClass(newi.data("icon-show"));
						newi.addClass(newi.data("icon-hide"));
					}

		});

		$(document).ready(function() {
			
			var path = "${ctx}";
			
			$.get(path+'/a/AccountSetting', {
		        'm': "attn_cnt"
		    }, function(data) {
		    	if(data.cnt == 0){
		    		bootbox.dialog({
						message : "<span class='bigger-110'>请先设置关注类目</span>",
						"closeButton": false,
						buttons : {
							"button" : {
								"label" : "确定",
								"className" : "btn-sm",
								"callback": function () {  
		                            window.location.href = path + "/a/AccountSetting";
		                        }  
							}
						}
					});
		    	}
		    }, 'json');
			
			//切换tab
			var curTabIdx = 1;
			
			$('#myTab a').on('shown.bs.tab', function (e) {
				
			    curTabIdx = e.target.id.replace('tab','');
			    showTabContent(curTabIdx);
				
			});

			function showTabContent(curTabIdx){
				
				if(curTabIdx == 2){
					
					//获取订单数据
					$.post(path+'/a/UserServlet', {
				        'method': "getOrders"
				    }, function(data) {
				    	$("#order-tbody").empty();
				    	if(data && data.length > 0){
		
				    		//加载table
				    		var tbodyHtml = "";
				    		$.each(data, function(idx, d){
				    			
				    			tbodyHtml += "<tr><td>"+d.orderCode+"</td><td>"+d.orderName+"</td><td>"+d.amount+"</td><td>"+d.status+"</td><td>"+d.createTimeFormat+"</td><td>"+d.payTimeFormat+"</td><td>"+d.detail+"</td></tr>";
				    			
				    		});
				    		$("#order-tbody").html(tbodyHtml);
				    	}else{
				    		
				    		$("#order-tbody").html("<tr><td colspan='7'>没有订单数据</td></tr>");
				    	}
				    }, 'json');
					
				}else if(curTabIdx == 3){
					//获取积分记录
					$.post(path+'/a/UserServlet', {
				        'method': "getPoints",
				        'pointsType': 1,
				    }, function(data) {
				    	$("#in-tbody").empty();
				    	if(data && data.length > 0){
		
				    		//加载table
				    		var tbodyHtml = "";
				    		$.each(data, function(idx, d){
				    			
				    			tbodyHtml += "<tr><td>"+d.createTimeFormat+"</td><td>"+d.points+"</td><td>"+d.remark+"</td></tr>";
				    			
				    		});
				    		$("#in-tbody").html(tbodyHtml);
				    	}else{
				    		
				    		$("#in-tbody").html("<tr><td colspan='3'>没有积分充值数据</td></tr>");
				    	}
				    }, 'json');
					
				}else if(curTabIdx == 4){
					//获取积分记录
					$.post(path+'/a/UserServlet', {
				        'method': "getPoints",
				        'pointsType': 0,
				    }, function(data) {
				    	$("#out-tbody").empty();
				    	if(data && data.length > 0){
		
				    		//加载table
				    		var tbodyHtml = "";
				    		$.each(data, function(idx, d){
				    			
				    			tbodyHtml += "<tr><td>"+d.createTimeFormat+"</td><td>"+d.points+"</td><td>"+d.remark+"</td></tr>";
				    			
				    		});
				    		$("#out-tbody").html(tbodyHtml);
				    	}else{
				    		
				    		$("#out-tbody").html("<tr><td colspan='3'>没有积分消费数据</td></tr>");
				    	}
				    }, 'json');
				}
			}
			
			$("#cp_body_Profile_3_Button_QianDao").click(function(){
				
				$.post(path+'/a/UserServlet', {
	                'method': "qianDao"
	            }, function(result) {
	            	
	                if (result.status === 1) {
	                	
	                	$("#qiandao-p").html('<p id="cp_body_Profile_3_box_QianDaoMsg" class="alert alert-danger"><i class="icon-info-sign"></i> 您今天已经签过了！明天再来吧。</p>');
	                	
	                	//window.location.href = location.href;
	                	$("#left-points").text(parseInt($("#left-points").text()) + 20);
	                	
	                }
	            }, 'json');
				
				
				
			});
			
		});
	</script>
</body>
</html>