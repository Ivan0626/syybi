<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>用户中心 - 电商指数</title>
<meta charset="utf-8">
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords"
	content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description"
	content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright"
	content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/images/favicon.ico">

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/font-awesome.min.css">

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
			<li>
				<a href="#">用户中心</a>
			</li>
			<li class="active">积分规则</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<%@ include file="/pages/aceSettings.jsp"%>
		<div class="row">
			<div>
				<h1 class="header-with-boder" style="margin-top: 0">积分规则</h1>
				<ul class="nav nav-tabs">
					<li class="active"><a href="#get"
						data-toggle="tab">积分如何获取</a></li>
					<li><a href="#use"
						data-toggle="tab">积分使用规则</a></li>
				</ul>
				<div class="tab-content">
					<div class="tab-pane active" id="get" style="padding: 15px;">
						<div class="row">
							<div class="col-md-12">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th>项目名称</th>
											<th>获得细则</th>
											<th>积分数量</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>绑定合作网站账户</td>
											<td>绑定合作网站账户成功后获得</td>
											<td>绑定QQ：500积分<br> 绑定新浪微博：500积分
											</td>
										</tr>
										<tr>
											<td>签到</td>
											<td>每天只能签到一次</td>
											<td>签到次数*20积分</td>
										</tr>
										<tr>
											<td>注册礼包</td>
											<td>新用户注册</td>
											<td>1000积分</td>
										</tr>
										<tr>
											<td>推荐注册</td>
											<td>通过推荐注册链接网站注册</td>
											<td>推荐用户：被推荐用户数*500积分<br> 被推荐用户：500积分
											</td>
										</tr>
										<tr>
											<td>加QQ群</td>
											<td>联系群主即可免费领取积分奖励</td>
											<td>100积分</td>
										</tr>
										<tr>
											<td>关注微信</td>
											<td>关注电商指数官方微信</td>
											<td>500积分</td>
										</tr>
										<tr>
											<td>完善资料</td>
											<td>完善会员资料</td>
											<td>500积分</td>
										</tr>
										<tr>
											<td>提建议</td>
											<td>合理建议</td>
											<td>100积分</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="tab-pane" id="use" style="padding: 15px;">
						<div class="row">
							<div class="col-md-12">
								<table class="table table-bordered">
									<thead>
										<tr>
											<th>项目名称</th>
											<th>扣除细则</th>
											<th>积分数量</th>
										</tr>
									</thead>
									<tbody>

										<tr>
											<td>积分兑换</td>
											<td>购买套餐时扣除</td>
											<td>专业版：1元=100积分<br> 旗舰版：1元=100积分<br> 企业版：1元=100积分
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div id="end" class="inner"></div>
				<!-- end -->
			</div>
		</div>
	</div>
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

			$("#upVersion1, #upVersion2, #buyPoints").click(function() {

				$(".modal-title").text("温馨提示");
				$(".modal-body >p").text("支付功能暂未开放，免费注册即可体验");
				$("#alert_modal").modal('show');
			});

		});
	</script>

	<!--<script src="/scripts/bootstrap-hover-dropdown.min.js"></script>-->

</body>
</html>