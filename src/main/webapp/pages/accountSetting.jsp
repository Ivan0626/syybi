<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.Base64Util, com.sanyanyu.syybi.entity.BaseUser"%>
<%@ include file="/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>账户设置</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/syybi.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/font-awesome.min.css" />

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
			<li class="active">账户设置</li>
		</ul><!-- /.breadcrumb -->
	</div>
	
	<!-- /section:basics/content.breadcrumbs -->
	<div class="page-content">
		<%@ include file="/pages/aceSettings.jsp"%>
	
		<div class="row">
			<div>
					<ul id="myTab" class="nav nav-tabs">
						<li><a id="tab1" href="#profile" data-toggle="tab">完善会员资料</a></li>
						<li><a id="tab2" href="#orderRecord" data-toggle="tab">修改登录密码</a></li>
						<li class="active"><a id="tab3" href="#catSetting" data-toggle="tab">设置关注类目</a></li>
					</ul>
					
					<div id="myTabContent" class="tab-content">
						<div class="tab-pane fade" id="profile">
							<div class="row" style="margin-top: 30px">
								<div class="col-md-12">
									<p class="alert alert-warning">
										<i class="icon-info-sign"></i> 完善会员资料能免费获取<span class="key-sign">500</span>积分！
									</p>
									<div class="input-group" style="margin-bottom: 10px;">
										<span style="margin-left: 95px;">
											<input
												id="cp_body_EditMemberProfileExtension_3_RadioButtonOrg"
												type="radio"
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$mtype"
												value="RadioButtonOrg">
											<label for="cp_body_EditMemberProfileExtension_3_RadioButtonOrg">企业</label>
										</span>
										<span style="margin-left: 20px;">
											<input
												id="cp_body_EditMemberProfileExtension_3_RadioButtonPerson"
												type="radio"
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$mtype"
												value="RadioButtonPerson" checked="checked">
											<label for="cp_body_EditMemberProfileExtension_3_RadioButtonPerson">个人</label>
										</span>
									</div>
			
									<div id="cp_body_EditMemberProfileExtension_3_PanelPerson">
										
										<div id="person-shop-name-div"
											class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">店铺名称</span>
											<input
												name="personShopName"
												type="text" id="person-shop-name"
												class="form-control" placeholder="店铺名称"
												style="width: 60%; "
												value="${user.shopName }">
											<span id="person-shop-name-msg"
												title="必须填写“店铺名称”。" class="alert alert-danger"
												style="display: none;">*必须填写“店铺名称”</span>
										</div>
										
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">姓名</span>
											<input
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$ContactName2"
												type="text" value='<c:if test="${user.userType == 'RadioButtonPerson' }">${user.contactPerson }</c:if>'
												id="cp_body_EditMemberProfileExtension_3_ContactName2"
												class="form-control" placeholder="姓名"
												style="width: 60%; ">
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator3"
												title="必须填写“姓名”。" class="alert alert-danger"
												style="display: none;">*必须填写“姓名”</span>
										</div>
			
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">电话</span> 
											<input
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$Telephone2"
												type="text" value="<c:if test="${user.userType == 'RadioButtonPerson' }">${user.contactTel }</c:if>"
												id="cp_body_EditMemberProfileExtension_3_Telephone2"
												class="form-control" placeholder="固定电话或手机"
												style="width: 60%; ">
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator6"
												title="必须填写“电话”。" class="alert alert-danger"
												style="display: none;">*必须填写“电话”</span> 
											<span
												id="cp_body_EditMemberProfileExtension_3_RegularExpressionValidator2"
												class="alert alert-danger" style="display: none;">电话填写不正确</span>
										</div>
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">从事行业</span>
											<select
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$DropDownListBusiness2"
												id="cp_body_EditMemberProfileExtension_3_DropDownListBusiness2"
												class="form-control" placeholder="从事行业"
												style="width: 60%;">
												<option value="">选择从事行业</option>
												<option <c:if test="${user.industry == '1' }">selected="selected"</c:if> value="1">IT服务</option>
												<option <c:if test="${user.industry == '2' }">selected="selected"</c:if> value="2">人力资源</option>
												<option <c:if test="${user.industry == '3' }">selected="selected"</c:if> value="3">体育健康</option>
												<option <c:if test="${user.industry == '4' }">selected="selected"</c:if> value="4">培训教育</option>
												<option <c:if test="${user.industry == '5' }">selected="selected"</c:if> value="5">游戏</option>
												<option <c:if test="${user.industry == '6' }">selected="selected"</c:if> value="6">物流</option>
												<option <c:if test="${user.industry == '7' }">selected="selected"</c:if> value="7">电子商务</option>
												<option <c:if test="${user.industry == '8' }">selected="selected"</c:if> value="8">社区论坛</option>
												<option <c:if test="${user.industry == '9' }">selected="selected"</c:if> value="9">艺术文学</option>
												<option <c:if test="${user.industry == '10' }">selected="selected"</c:if> value="10">金融</option>
												<option <c:if test="${user.industry == '11' }">selected="selected"</c:if> value="11">其他</option>
			
											</select> 
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator7"
												title="必须填写“从事行业”。" class="alert alert-danger"
												style="display: none;">*必须填写“从事行业”</span>
										</div>
			
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">获知渠道</span>
											<select
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$DropDownListFromChannel2"
												id="cp_body_EditMemberProfileExtension_3_DropDownListFromChannel2"
												class="form-control" placeholder="获知渠道"
												style="width: 60%;">
												<option value="">选择获取渠道</option>
												<option <c:if test="${user.channel == '1' }">selected="selected"</c:if> value="1">搜索引擎</option>
												<option <c:if test="${user.channel == '2' }">selected="selected"</c:if> value="2">广告推广</option>
												<option <c:if test="${user.channel == '3' }">selected="selected"</c:if> value="3">SAE服务推荐</option>
												<option <c:if test="${user.channel == '4' }">selected="selected"</c:if> value="4">媒体报道</option>
												<option <c:if test="${user.channel == '5' }">selected="selected"</c:if> value="5">社区论坛微博等</option>
												<option <c:if test="${user.channel == '6' }">selected="selected"</c:if> value="6">朋友推荐</option>
												<option <c:if test="${user.channel == '7' }">selected="selected"</c:if> value="7">其他</option>
			
											</select> 
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator8"
												title="必须填写“获知渠道”。" class="alert alert-danger"
												style="display: none;">*必须填写“获知渠道”</span>
										</div>
										<div class="form-group">
											<div style="padding-left: 98px; margin-top: 20px;">
												<input type="button"
													name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$SavePersonButton"
													value="保存"
													id="cp_body_EditMemberProfileExtension_3_SavePersonButton"
													class="btn btn-primary btn-lg"
													style="float: left; width: 150px;">
			
											</div>
										</div>
			
									</div>
			
									<div id="cp_body_EditMemberProfileExtension_3_PanelOrg" style="display: none;">
			
										<div id="shop-name-div"
											class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">店铺名称</span>
											<input
												name="shopName"
												type="text" id="shop-name"
												class="form-control" placeholder="店铺名称"
												style="width: 60%; "
												value="${user.shopName }">
											<span id="shop-name-msg"
												title="必须填写“店铺名称”。" class="alert alert-danger"
												style="display: none;">*必须填写“店铺名称”</span>
										</div>
			
										<div id="cp_body_EditMemberProfileExtension_3_org_box"
											class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">企业名称</span>
											<input
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$OrgName"
												type="text" id="cp_body_EditMemberProfileExtension_3_OrgName"
												class="form-control" placeholder="企业名称"
												style="width: 60%; "
												value="${user.companyName }">
											<span id="cp_body_EditMemberProfileExtension_3_OrgNameRequired"
												title="必须填写“单位名称”。" class="alert alert-danger"
												style="display: none;">*必须填写“单位名称”</span>
										</div>
			
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">行业</span>
											<select
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$DropDownListBusiness"
												id="cp_body_EditMemberProfileExtension_3_DropDownListBusiness"
												class="form-control" placeholder="行业"
												style="width: 60%; ">
												<option value="">选择行业</option>
												<option <c:if test="${user.industry == '1' }">selected="selected"</c:if> value="1">IT服务</option>
												<option <c:if test="${user.industry == '2' }">selected="selected"</c:if> value="2">人力资源</option>
												<option <c:if test="${user.industry == '3' }">selected="selected"</c:if> value="3">体育健康</option>
												<option <c:if test="${user.industry == '4' }">selected="selected"</c:if> value="4">培训教育</option>
												<option <c:if test="${user.industry == '5' }">selected="selected"</c:if> value="5">游戏</option>
												<option <c:if test="${user.industry == '6' }">selected="selected"</c:if> value="6">物流</option>
												<option <c:if test="${user.industry == '7' }">selected="selected"</c:if> value="7">电子商务</option>
												<option <c:if test="${user.industry == '8' }">selected="selected"</c:if> value="8">社区论坛</option>
												<option <c:if test="${user.industry == '9' }">selected="selected"</c:if> value="9">艺术文学</option>
												<option <c:if test="${user.industry == '10' }">selected="selected"</c:if> value="10">金融</option>
												<option <c:if test="${user.industry == '11' }">selected="selected"</c:if> value="11">其他</option>
			
											</select>
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator1"
												title="必须填写“行业”。" class="alert alert-danger"
												style="display: none;">*必须填写“行业”</span>
										</div>
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">联系人</span>
											<input
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$ContactName"
												type="text" value='<c:if test="${user.userType == 'RadioButtonOrg' }">${user.contactPerson }</c:if>'
												id="cp_body_EditMemberProfileExtension_3_ContactName"
												class="form-control" placeholder="联系人"
												style="width: 60%; ">
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator2"
												title="必须填写“联系人”。" class="alert alert-danger"
												style="display: none;">*必须填写“联系人”</span>
										</div>
			
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">电话</span>
											<input
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$Telephone"
												type="text" value='<c:if test="${user.userType == 'RadioButtonOrg' }">${user.contactTel }</c:if>'
												id="cp_body_EditMemberProfileExtension_3_Telephone"
												class="form-control" placeholder="固定电话或手机"
												style="width: 60%; ">
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator4"
												title="必须填写“电话”。" class="alert alert-danger"
												style="display: none;">*必须填写“电话”</span>
											<span
												id="cp_body_EditMemberProfileExtension_3_RegularExpressionValidator1"
												class="alert alert-danger" style="display: none;">电话填写不正确</span>
										</div>
										<div class="input-group" style="margin-bottom: 10px;">
											<span class="input-group-addon">获知渠道</span>
											<select
												name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$DropDownListFromChannel"
												id="cp_body_EditMemberProfileExtension_3_DropDownListFromChannel"
												class="form-control" placeholder="获知渠道"
												style="width: 60%; ">
												<option value="">选择获取渠道</option>
												<option <c:if test="${user.channel == '1' }">selected="selected"</c:if> value="1">搜索引擎</option>
												<option <c:if test="${user.channel == '2' }">selected="selected"</c:if> value="2">广告推广</option>
												<option <c:if test="${user.channel == '3' }">selected="selected"</c:if> value="3">SAE服务推荐</option>
												<option <c:if test="${user.channel == '4' }">selected="selected"</c:if> value="4">媒体报道</option>
												<option <c:if test="${user.channel == '5' }">selected="selected"</c:if> value="5">社区论坛微博等</option>
												<option <c:if test="${user.channel == '6' }">selected="selected"</c:if> value="6">朋友推荐</option>
												<option <c:if test="${user.channel == '7' }">selected="selected"</c:if> value="7">其他</option>
			
											</select>
											<span
												id="cp_body_EditMemberProfileExtension_3_RequiredFieldValidator5"
												title="必须填写“获知渠道”。" class="alert alert-danger"
												style="display: none;">*必须填写“获知渠道”</span>
										</div>
										<div class="form-group">
											<div style="padding-left: 98px; margin-top: 20px;">
												<input type="submit"
													name="ctl00$ctl00$cp_body$EditMemberProfileExtension_3$SaveOrgButton"
													value="保存"
													id="cp_body_EditMemberProfileExtension_3_SaveOrgButton"
													class="btn btn-primary btn-lg"
													style="float: left; width: 150px;">
			
											</div>
										</div>
			
									</div>
			
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						<div class="tab-pane fade" id="orderRecord">
							<div class="row" style="margin-top: 30px">
								<div class="col-md-7">
										<input type="hidden" id="old-password" value="${user.password }">
										<input type="hidden" id="email" value="${user.email }">
										<table id="cp_body_ChangePassword_3_ChangePassword1"
											cellspacing="0" cellpadding="0"
											style="width: 100%; border-collapse: collapse;">
											<tbody>
												<tr>
													<td>
														<div class="input-group" style="margin-bottom: 10px;">
															<span class="input-group-addon">当前密码</span> <input
																name="ctl00$ctl00$cp_body$ChangePassword_3$ChangePassword1$ChangePasswordContainerID$CurrentPassword"
																type="password"
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPassword"
																class="form-control" placeholder="当前密码"
																style="width: 60%; ">
															<span
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired"
																title="必须填写“密码”" class="alert alert-danger"
																style="display: none;">*必须填写“密码”</span>
														</div>
														<div class="input-group" style="margin-bottom: 10px;">
															<span class="input-group-addon">新密码&nbsp;&nbsp;&nbsp;</span>
															<input
																name="ctl00$ctl00$cp_body$ChangePassword_3$ChangePassword1$ChangePasswordContainerID$NewPassword"
																type="password"
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPassword"
																class="form-control" placeholder="新密码"
																style="width: 60%; ">
															<span
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPasswordRequired"
																title="必须填写“新密码”" class="alert alert-danger"
																style="display: none;">*必须填写“新密码”</span>
														</div>
														<div class="input-group" style="margin-bottom: 10px;">
															<span class="input-group-addon">确认密码</span> <input
																name="ctl00$ctl00$cp_body$ChangePassword_3$ChangePassword1$ChangePasswordContainerID$ConfirmNewPassword"
																type="password"
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPassword"
																class="form-control" placeholder="确认新密码"
																style="width: 60%; ">
															<span
																id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPasswordRequired"
																title="必须填写“确认新密码”" class="alert alert-danger"
																style="display: none;">*必须填写“确认新密码”</span>
														</div>
														<div class="form-group">
															<div style="padding-left: 82px;">
																<input type="submit"
																	name="ctl00$ctl00$cp_body$ChangePassword_3$ChangePassword1$ChangePasswordContainerID$ChangePasswordPushButton"
																	value="更改密码"
																	id="cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ChangePasswordPushButton"
																	class="btn btn-primary btn-lg"
																	style="float: left; width: 150px;">
															</div>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<div class="form-group">
											<div style="padding-left: 82px;margin-top:10px; width:60%">
										        <div id="cp_body_ChangePassword_3_errorMessagePanel" class="alert">
												</div>
											</div>
										</div>
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						
						<div class="tab-pane fade in active" id="catSetting">
							<div class="row" style="margin-top: 30px">
								<div class="col-md-7">
									<p class="alert alert-warning">
										<i class="icon-info-sign"></i> 关注类目生效后无法修改！
									</p>
									
									<div class="input-group" style="margin-bottom: 10px;">
										<span class="input-group-addon">关注行业</span>
										<select 
											id="ind"
											class="form-control" placeholder="关注行业"
											style="width: 60%;" onchange="getCatByIid();" <c:if test="${!empty attedCat }">disabled</c:if>  >
											<option value="">请选择</option>
											<c:forEach items="${indList }" var="ind">
												<option value="${ind.iid }" <c:if test="${ind.iid == attedCat.iid }"> selected</c:if> >${ind.ind_name }</option>
											</c:forEach>
										</select> 
										<span
											id="ind-msg"
											title="必须填写“关注行业”。" class="alert alert-danger"
											style="display: none;">*必须填写“关注行业”</span>
									</div>
									
									<div class="input-group" style="margin-bottom: 10px;">
										<span class="input-group-addon">关注类目</span>
										<select 
											id="cat"
											class="form-control" placeholder="关注类目"
											style="width: 60%;" <c:if test="${!empty attedCat }">disabled</c:if> >
											<option value="">请选择</option>
											<c:if test="${!empty attedCat }">
												<option value="${attedCat.cat_no }" selected >${attedCat.cat_name_single }-${attedCat.cat_name }</option>
											</c:if>
										</select> 
										<span
											id="cat-msg"
											title="必须填写“关注类目”。" class="alert alert-danger"
											style="display: none;">*必须填写“关注类目”</span>
									</div>
									
									<div class="form-group">
											<div style="padding-left: 98px; margin-top: 20px;">
												<input type="button"
													value="保存"
													id="cat-save-btn"
													class="btn btn-primary btn-lg"
													style="float: left; width: 150px;" <c:if test="${!empty attedCat }">disabled</c:if> >
			
											</div>
										</div>
									
								</div>
							</div>
							<div id="end" class="inner"></div>
						</div>
						
					</div>	
			</div>
		</div>
	</div><!-- /.page-content -->
	
	<script src="${pageContext.request.contextPath}/js/jquery.md5.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/common.js"></script>
	
	<script>
	
	$(document).ready(function() {

		var path = "${ctx}";
		var username = "${user.username}";
		
		//选中navbar
		$('#syy-nav').find('.active').each(function(){
			var $class = 'active';
			if( $(this).hasClass('hover')) $class += ' open';
			
			$(this).removeClass($class);
		});
		$('#syy-accountSetting').addClass('active open');
		
		$("input[name='ctl00$ctl00$cp_body$EditMemberProfileExtension_3$mtype']").click(function(){
			
			if($(this).val() == "RadioButtonOrg"){
				$("#cp_body_EditMemberProfileExtension_3_PanelPerson").hide();
				$("#cp_body_EditMemberProfileExtension_3_PanelOrg").show();
			}else{
				$("#cp_body_EditMemberProfileExtension_3_PanelOrg").hide();
				$("#cp_body_EditMemberProfileExtension_3_PanelPerson").show();
			}
			
		});
		
		//校验
		var b1 = false,b2 = false,b3 = false,b4 = false,b5 = false, b6 = false;
		
		$("#cp_body_EditMemberProfileExtension_3_ContactName2, #cp_body_EditMemberProfileExtension_3_ContactName").blur(function(){
			
			if($(this).val().trim() == ""){
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator3, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator2").show();
				b1 = false;
			}else{
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator3, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator2").hide();
				b1 = true;
			}
			
		});
		
		$("#person-shop-name, #shop-name").blur(function(){
			
			if($(this).val().trim() == ""){
				$("#person-shop-name-msg, #shop-name-msg").show();
				b6 = false;
			}else{
				$("#person-shop-name-msg, #shop-name-msg").hide();
				b6 = true;
			}
			
		});
		
		$("#cp_body_EditMemberProfileExtension_3_Telephone2, #cp_body_EditMemberProfileExtension_3_Telephone").blur(function(){
			var input = $(this).val().trim();
			if(input == ""){
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator6, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator4").show();
				b2 = false;
			}else{
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator6, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator4").hide();
				
				var regm = /^((\d{11})|(\d{7,8})|(\d{4}|\d{3})-{0,1}(\d{7,8}))$/; //电话正则表达式
				var bCorrectInput = (input.match(regm)) ? true : false;
				if (!bCorrectInput) { //正则判断
					$("#cp_body_EditMemberProfileExtension_3_RegularExpressionValidator2, #cp_body_EditMemberProfileExtension_3_RegularExpressionValidator1").show();
					b2 = false;
				}else{
					$("#cp_body_EditMemberProfileExtension_3_RegularExpressionValidator2, #cp_body_EditMemberProfileExtension_3_RegularExpressionValidator1").hide();
					b2 = true;
				}
			}
			
		});
		
		$("#cp_body_EditMemberProfileExtension_3_DropDownListBusiness2, #cp_body_EditMemberProfileExtension_3_DropDownListBusiness").blur(function(){
			
			if($(this).val().trim() == ""){
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator7, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator1").show();
				b3 = false;
			}else{
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator7, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator1").hide();
				b3 = true;
			}
			
		});
		
		$("#cp_body_EditMemberProfileExtension_3_DropDownListFromChannel2, #cp_body_EditMemberProfileExtension_3_DropDownListFromChannel").blur(function(){
			
			if($(this).val().trim() == ""){
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator8, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator5").show();
				b4 = false;
			}else{
				$("#cp_body_EditMemberProfileExtension_3_RequiredFieldValidator8, #cp_body_EditMemberProfileExtension_3_RequiredFieldValidator5").hide();
				b4 = true;
			}
		});
		
		$("#cp_body_EditMemberProfileExtension_3_SavePersonButton").click(function(){
			
			//触发校验
			$('#cp_body_EditMemberProfileExtension_3_ContactName2, #cp_body_EditMemberProfileExtension_3_Telephone2, #cp_body_EditMemberProfileExtension_3_DropDownListBusiness2, #cp_body_EditMemberProfileExtension_3_DropDownListFromChannel2, #person-shop-name').trigger("blur");
			
			if(b1 && b2 && b3 && b4 && b6){
				//提交
				$.post(path+'/a/UserServlet', {
	                'userType': 'RadioButtonPerson',
	                'contactPerson': $("#cp_body_EditMemberProfileExtension_3_ContactName2").val().trim(),
	                'contactTel': $("#cp_body_EditMemberProfileExtension_3_Telephone2").val().trim(),
	                'industry': $("#cp_body_EditMemberProfileExtension_3_DropDownListBusiness2").val().trim(),
	                'channel': $("#cp_body_EditMemberProfileExtension_3_DropDownListFromChannel2").val().trim(),
	                'shopName': $("#person-shop-name").val().trim(),
	                'method': "editMember"
	            }, function(result) {
	            	
	                if (result.status === 1) {
	                	showMsg("保存成功！");
	                	/* $(".modal-title").text("温馨提示");
	            		$(".modal-body >p").text("保存成功！");
	            		$("#alert_modal").modal('show'); */
	                }
	            }, 'json');
				
				
			}else{
				return false;
			}
		});
		//==============================================================================================
		$("#cp_body_EditMemberProfileExtension_3_OrgName").blur(function(){
		
			if($(this).val().trim() == ""){
				$("#cp_body_EditMemberProfileExtension_3_OrgNameRequired").show();
				b5 = false;
			}else{
				$("#cp_body_EditMemberProfileExtension_3_OrgNameRequired").hide();
				b5 = true;
			}
		});
		
		$("#cp_body_EditMemberProfileExtension_3_SaveOrgButton").click(function(){
			
			$('#cp_body_EditMemberProfileExtension_3_OrgName, #cp_body_EditMemberProfileExtension_3_ContactName, #cp_body_EditMemberProfileExtension_3_Telephone, #cp_body_EditMemberProfileExtension_3_DropDownListBusiness, #cp_body_EditMemberProfileExtension_3_DropDownListFromChannel, , #shop-name').trigger("blur");
			
			if(b1 && b2 && b3 && b4 && b5 && b6){
				//提交
				$.post(path+'/a/UserServlet', {
	                'userType': 'RadioButtonOrg',
	                'contactPerson': $("#cp_body_EditMemberProfileExtension_3_ContactName").val().trim(),
	                'contactTel': $("#cp_body_EditMemberProfileExtension_3_Telephone").val().trim(),
	                'industry': $("#cp_body_EditMemberProfileExtension_3_DropDownListBusiness").val().trim(),
	                'channel': $("#cp_body_EditMemberProfileExtension_3_DropDownListFromChannel").val().trim(),
	                'companyName': $("#cp_body_EditMemberProfileExtension_3_OrgName").val().trim(),
	                'shopName' : $("#shop-name").val().trim(),
	                'method': "editMember"
	            }, function(result) {
	            	
	                if (result.status === 1) {
	                	showMsg("保存成功！");
	                	//$(".modal-title").text("温馨提示");
	            		//$(".modal-body >p").text("保存成功！");
	            		//$("#alert_modal").modal('show');
	                }
	            }, 'json');
				
				
			}else{
				return false;
			}
		});

		//===========================================密码修改================================================
		//校验
		var b1 = false,b2 = false,b3 = false;
		$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPassword").blur(function(){
			
			var input = $(this).val().trim();
			if(input == ""){
				$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired").show();
				b1 = false;
			}else{
				
				if($.md5(input) != $("#old-password").val()){
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired").text("密码输入不正确，请重新输入");
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired").show();
					b1 = false;
				}else{
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired").hide();
					b1 = true;
				}
			}
			
		});
		
		$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPassword").blur(function(){
			var input = $(this).val().trim();
			if(input == ""){
				$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPasswordRequired").show();
				b2 = false;
			}else{
				$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPasswordRequired").hide();
				b2 = true;
			}
			
		});
		
		$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPassword").blur(function(){
			var input = $(this).val().trim();
			if(input == ""){
				$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPasswordRequired").show();
				b3 = false;
			}else{
				
				if(input != $("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPassword").val()){
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPasswordRequired").text("两次输入必须一致");
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPasswordRequired").show();
					b3 = false;
				}else{
					$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPasswordRequired").hide();
					b3 = true;
				}
			}
			
		});
		
		$("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ChangePasswordPushButton").click(function(){
			
			if(username == 'test'){
				$(".modal-title").text("温馨提示");
				$(".modal-body >p").text("测试账号仅提供查询功能");
				$("#alert_modal").modal('show');
			}else{
				//触发校验
				$('#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_CurrentPassword, #cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPassword, #cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_ConfirmNewPassword').trigger("blur");
				
				var newPassword = $("#cp_body_ChangePassword_3_ChangePassword1_ChangePasswordContainerID_NewPassword").val().trim();
				
				var email = $("#email").val();
				

				if(b1 && b2 && b3){
					$.post(path+'/a/UserServlet', {
			            'email': email,
			            'password': newPassword,
			            'method': "modifyPassword"
			        }, function(result) {
			            if (result.status === 1) {
			                
			            	showMsg("密码修改成功");
			            	//$("#cp_body_ChangePassword_3_errorMessagePanel").text("密码修改成功").toggleClass("alert-success").show();
			            	
			            }else{
			            	showMsg("密码修改失败");
			            	//$("#cp_body_ChangePassword_3_errorMessagePanel").text("密码修改失败").toggleClass("alert-success").show();
			            }
			        }, 'json');
					
				}else{
					return false;
				}
			}
			
		});
		
		//======================================保存关注类目=====================================================
		
		$('#cat-save-btn').click(function(){
			
			if($('#ind').val() == ''){
				$('#ind-msg').show();
				return false;
			}else{
				$('#ind-msg').hide();
			}
			
			if($('#cat').val() == ''){
				$('#cat-msg').show();
				return false;
			}else{
				$('#cat-msg').hide();
			}
			
			bootbox.confirm("确定关注<span style='font-weight:bold;'>"+$('#cat > option:selected').attr('data-catname')+"</span>类目?", function(result) {
				if (result) {
					$.get(global.path+'/a/AccountSetting', {
						'catNo': $('#cat').val(),
			            'm': "save_cat"
			        }, function(result) {
			        	
			        	if (result.status === 1) {
				                
			        		showMsg("类目关注成功");
			        		
			        		//只能关注一次
			        		$('#ind').attr("disabled","disabled"); 
			        		$('#cat').attr("disabled","disabled"); 
			        		$('#cat-save-btn').attr("disabled","disabled"); 
			            }else{
			            	
			            	showMsg("类目关注失败");
			            	
			            }
			        	
			        }, 'json');
				}
			});
			
		});
		
	});
	
	//根据行业id获取类目
	function getCatByIid(){
		
		var iid = $('#ind').val();
		if(iid == ''){
			$('#cat').empty();
			$('#cat').html('<option value="">请选择</option>');
			return;
		}
		
		$.get(global.path+'/a/AccountSetting', {
			'iid': iid,
            'm': "ind_cat"
        }, function(data) {
        	
        	$('#cat').empty();
        	
            if(data && data.length > 0){
            	
            	var html = '<option value="">请选择</option>';
            	$.each(data, function(idx, d){
            		
            		html += '<option value="'+d.cat_no+'" data-catname="'+d.cat_name+'" >'+d.cat_name_single+'-'+d.cat_name+'</option>';
            		
            	});
            	
            	$('#cat').html(html);
            }
        	
        }, 'json');
	}
	
</script>
</body>
</html>