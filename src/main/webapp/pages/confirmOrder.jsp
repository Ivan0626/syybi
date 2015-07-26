<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>确认订单 - 电商指数</title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8 ">
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords" content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description" content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright" content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
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

.all-d{
	text-align: right;
}
.hd{
	display: inline-block;
	vertical-align: top;
}
.bd{
	vertical-align: bottom;
	margin-right: 20px;
	display: none;
}
.cost{ width: 54px;text-align: right;}
.bd .discharge{
	margin-left: 10px;
	color: #c00;
}
.bd .totalPoint{
	text-align: left;
	padding-left: 12px;
	color: #999;
	line-height: 10px;
}

.text-d{
	display: inline-block;
	text-align: right;
	vertical-align: top;
	padding-bottom: 20px;
}
.txtBox{ 
	position: relative;
}
.mui-msg {
position: absolute;
width: 160px;
top: 25px;
left: 0;
z-index: 10000;
}
.mui-msg-stronger {
background-color: #ffefed;
color: #e13e4d;
border: 1px solid #f88578;
}
.mui-msg {
line-height: 1.2;
padding: .1em .5em;
word-wrap: break-word;
word-break: break-all;
white-space: normal;
cursor: pointer;
-webkit-border-radius: 2px;
-moz-border-radius: 2px;
-ms-border-radius: 2px;
border-radius: 2px;
display: none;
text-align: left;
}

.mui-msg .mui-msg-content {
display: inline-block;

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
			<li class="active">确认订单</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<!-- #section:settings.box -->
		<div class="ace-settings-container" id="ace-settings-container">
			<div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
				<i class="ace-icon fa fa-cog bigger-130"></i>
			</div>
	
			<div class="ace-settings-box clearfix" id="ace-settings-box">
				<div class="pull-left width-50">
					<!-- #section:settings.skins -->
					<div class="ace-settings-item">
						<div class="pull-left">
							<select id="skin-colorpicker" class="hide">
								<option data-skin="no-skin" value="#438EB9">#438EB9</option>
								<option data-skin="skin-1" value="#222A2D">#222A2D</option>
								<option data-skin="skin-2" value="#C6487E">#C6487E</option>
								<option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
							</select>
						</div>
						<span>&nbsp; Choose Skin</span>
					</div>
	
					<!-- /section:settings.skins -->
	
					<!-- #section:settings.navbar -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar" />
						<label class="lbl" for="ace-settings-navbar"> Fixed Navbar</label>
					</div>
	
					<!-- /section:settings.navbar -->
	
					<!-- #section:settings.sidebar -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar" />
						<label class="lbl" for="ace-settings-sidebar"> Fixed Sidebar</label>
					</div>
	
					<!-- /section:settings.sidebar -->
	
					<!-- #section:settings.breadcrumbs -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs" />
						<label class="lbl" for="ace-settings-breadcrumbs"> Fixed Breadcrumbs</label>
					</div>
	
					<!-- /section:settings.breadcrumbs -->
	
					<!-- #section:settings.rtl -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-rtl" />
						<label class="lbl" for="ace-settings-rtl"> Right To Left (rtl)</label>
					</div>
	
					<!-- /section:settings.rtl -->
	
					<!-- #section:settings.container -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-add-container" />
						<label class="lbl" for="ace-settings-add-container">
							Inside
							<b>.container</b>
						</label>
					</div>
	
					<!-- /section:settings.container -->
				</div><!-- /.pull-left -->
	
				<div class="pull-left width-50">
					<!-- #section:basics/sidebar.options -->
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover" />
						<label class="lbl" for="ace-settings-hover"> Submenu on Hover</label>
					</div>
	
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact" />
						<label class="lbl" for="ace-settings-compact"> Compact Sidebar</label>
					</div>
	
					<div class="ace-settings-item">
						<input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight" />
						<label class="lbl" for="ace-settings-highlight"> Alt. Active Item</label>
					</div>
	
					<!-- /section:basics/sidebar.options -->
				</div><!-- /.pull-left -->
			</div><!-- /.ace-settings-box -->
		</div><!-- /.ace-settings-container -->

		<div class="row">
			<div>
			<h1 id="getstart" class="header-with-boder">确认订单</h1>
			<div id="crumbs" class="row">
				<div class="col-md-4 crumb-current">
					<span>确认订单</span>
				</div>
				<div class="col-md-4 crumb-pending">
					<span>支付</span>
				</div>
				<div class="col-md-4 crumb-pending">
					<span>支付成功</span>
				</div>
			</div>
			<div class="row" style="margin-top: 20px">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">购买${baseGroup.groupName}</div>
						<div class="panel-body">
							<div>价格说明：${baseGroup.priceMonth}元/月，${baseGroup.priceQuarter}元/季<span style="color: #999;">（原价${baseGroup.priceQuarterOld}元/季）</span>，${baseGroup.priceYear}/年<span style="color: #999;">（原价${baseGroup.priceYearOld}元/年）</span></div>
							<div>订单详情：购买电商指数${baseGroup.groupName}</div>
						</div>
					</div>
					<form method="post"
						action="${pageContext.request.contextPath}/a/OrderServlet?method=order"
						id="form_Pay">
						<input type="hidden" name="groupName" value="${baseGroup.groupName}">
						<input type="hidden" name="payMoney" >
						<input type="hidden" name="payType" value="月" >
						<input type="hidden" name="payNum" value="1" >
						<input type="hidden" name="points" >
						<input type="hidden" name="validEndDate" >
	
						<div id="cp_body_ConfirmOrderVIP_3_Panel_Buy">
	
							<div class="row">
								<div class="col-md-4 input-group" style="padding-left: 15px;float:left;">
									<span class="input-group-addon">请选择购买时长</span> <select
										name="ctl00$ctl00$cp_body$ConfirmOrderVIP_3$DropDownList_Span"
										id="cp_body_ConfirmOrderVIP_3_DropDownList_Span"
										class="form-control">
										<option selected="selected" value="1个月">1个月</option>
										<option value="2个月">2个月</option>
										<option value="3个月">3个月</option>
										<option value="6个月">6个月</option>
										<option value="1年">1年</option>
										<option value="2年">2年</option>
	
									</select>
								</div>
								<div class="col-md-4" style="padding-top: 7px">
									<span>购买后${baseGroup.groupName}到期时间：</span>
									<span class="span-orange" id="validEndDate">${baseGroup.validEndDate }</span>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 all-d">
									<div class="hd">
										<label class='checkbox-inline'><input type='checkbox' id="points" >使用积分</label>
									</div>
									<div class="bd">
										<span class="colon">：</span>
										<span class="txtBox">
											<input class="cost" id="J_PointInput" type="text" autocomplete="off">分
											<div class="mui-msg mui-msg-stronger" id="J_PointInput_Msg" style="opacity: 1;">
												<div class="mui-msg-content"></div>
											</div>
										</span>
										<span class="discharge">- <span class="tc-rmb">¥</span><strong id="J_Discharge">0</strong></span>
										<p class="totalPoint"><span>（可用<span class="usablePoints">${user.points }</span>分）</span></p>
									</div>
									<div class="text-d">
										<span class="">应付款：</span><span class="span-orange span-large">￥<strong id="payMoney">${baseGroup.priceMonth}</strong></span>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<p class="text-right">
										<input type="submit"
											name="ctl00$ctl00$cp_body$ConfirmOrderVIP_3$Button_Confirm"
											value="去支付" id="cp_body_ConfirmOrderVIP_3_Button_Confirm"
											class="btn btn-warning" style="width: 100px;">
									</p>
								</div>
							</div>
	
						</div>
	
					</form>
				</div>
			</div>
			<div id="end" class="inner"></div>
			<!-- end -->
		</div>
		<!-- content -->
		
		</div>
	</div>
	
	<script type="text/javascript">
   
	$(function(){
		
		function addmulMonth(dtstr,n){   // n个月后 
		   var s=dtstr.split("-");
		   var yy=parseInt(s[0]); var mm=parseInt(s[1]-1);var dd=parseInt(s[2]);
		   var dt=new Date(yy,mm,dd);
		   dt.setMonth(dt.getMonth()+n);
		   if( (dt.getFullYear()*12+dt.getMonth()) > (yy*12+mm + n) )
		    {
		    dt=new Date(dt.getFullYear(),dt.getMonth(),0);
		    }
		   var year = dt.getFullYear();
		   var month = dt.getMonth()+1;
		   var days = dt.getDate();
		   var dd = year+"-" + (month < 10 ? "0"+month : month) +"-" + (days < 10 ? "0"+days : days);
		   return dd;
		} 
		
		$("#cp_body_ConfirmOrderVIP_3_DropDownList_Span").change(function(){
			
			var today=new Date(); // 获取今天时间
			var todayStr = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
			
			var val = $(this).val();
			
			var payMoney = 0;
			var validEndDate = "", payType = "", payNum = 0;
			
			if(val == "1个月"){
				validEndDate = addmulMonth(todayStr, 1);
				payMoney = parseInt("${baseGroup.priceMonth}") * 1;
				
				payType = "月";
				payNum = 1;
				
			}else if(val == "2个月"){
				validEndDate = addmulMonth(todayStr, 2);
				payMoney = parseInt("${baseGroup.priceMonth}") * 2;
				
				payType = "月";
				payNum = 2;
			}else if(val == "3个月"){
				validEndDate = addmulMonth(todayStr, 3);
				payMoney = parseInt("${baseGroup.priceQuarter}") * 1;
				
				payType = "季";
				payNum = 1;
			}else if(val == "6个月"){
				validEndDate = addmulMonth(todayStr, 6);
				payMoney = parseInt("${baseGroup.priceQuarter}") * 2;
				
				payType = "季";
				payNum = 2;
			}else if(val == "1年"){
				validEndDate = addmulMonth(todayStr, 12);
				payMoney = parseInt("${baseGroup.priceYear}") * 1;
				
				payType = "年";
				payNum = 1;
			}else if(val == "2年"){
				validEndDate = addmulMonth(todayStr, 24);
				payMoney = parseInt("${baseGroup.priceYear}") * 2;
				
				payType = "年";
				payNum = 2;
			}
			
			$("#validEndDate").text(validEndDate);
			
			$("input[name='payType']").val(payType);
			$("input[name='payNum']").val(payNum);
			
			if($("#points").is(':checked')){
				payMoney = payMoney - parseInt($("#J_Discharge").text());
			}
			
			$("#payMoney").text(payMoney);
			
		});
		
		$("#points").change(function(){
			
			if($(this).is(':checked')){
				$(".bd").css("display", "inline-block");
				$(".bd").show();
			}else{
				
				$("#J_PointInput").val("");
				$("#payMoney").text(parseInt($("#payMoney").text()) + parseInt($("#J_Discharge").text()));
				$("#J_Discharge").text("0");
				
				$("#J_PointInput_Msg").hide();
				
				$(".bd").hide();
			}
			
		});
		
		$("#J_PointInput").focus(function(){
			
			$(this).val("");
			
			$("#payMoney").text(parseInt($("#payMoney").text()) + parseInt($("#J_Discharge").text()));
			$("#J_Discharge").text("0");
			
			$("#J_PointInput_Msg").hide();
		});
		
		$("#J_PointInput").blur(function(){
			var input = $(this).val().trim();
			if($.isNumeric(input)){
				
				var allPoints = parseInt("${user.points}");
				if(parseInt(input) > allPoints){//不能超过可用积分
					//input = allPoints;
					$("#J_PointInput_Msg").css("display", "inline-block");
					$("#J_PointInput_Msg").text("本次最多可用"+allPoints+"积分");
					$("#J_PointInput_Msg").show();
					return false;
				}else{
					$("#J_PointInput_Msg").hide();
				}
				if(input > 5000){//一次最多可兑换：5元=5000积分
					//input = 5000;
					$("#J_PointInput_Msg").css("display", "inline-block");
					$("#J_PointInput_Msg").text("本次最多可用5000积分");
					$("#J_PointInput_Msg").show();
					return false;
				}else{
					$("#J_PointInput_Msg").hide();
				}
				
				var val = parseInt(input) % 100;
				if(val == 0){//符合兑换规则：1元=100积分
					
					
					var cMoney = parseInt(input) / 100;//可优惠
					
					var pMoney = parseInt($("#payMoney").text());//应付
					if(cMoney > pMoney){
						$(this).val(pMoney * 100);
						cMoney = pMoney;
					}
					
					$("#J_Discharge").text(cMoney);
					$("#payMoney").text(pMoney - cMoney);
					
					$("#J_PointInput_Msg").hide();
				}else{//不符合兑换规则，只能兑换100的整数
					$("#J_PointInput_Msg").css("display", "inline-block");
					$("#J_PointInput_Msg").text("必须是100的整数");
					$("#J_PointInput_Msg").show();
				}
				
			}else{
				$("#J_PointInput_Msg").css("display", "inline-block");
				$("#J_PointInput_Msg").text("必须是100的整数");
				$("#J_PointInput_Msg").show();
			}
			
		});
		
		
		$("#form_Pay").submit(function(){
			if($("#J_PointInput_Msg").css("display") != "none"){
				return false;
			}else{
				
				//为表单的隐藏域赋值
				$("input[name='payMoney']").val($("#payMoney").text());
				$("input[name='points']").val($("#J_PointInput").val());
				$("input[name='validEndDate']").val($("#validEndDate").text());
				
				return true;
			}
		});
		
	});
   
  </script>

</body>
</html>