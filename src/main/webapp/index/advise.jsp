<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="login-alone">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
	var path = "${pageContext.request.contextPath}";
</script>

<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>用户建议-电商指数</title>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/other.css">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/css/modal.css">

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/res/passport/css/login.css">

<style type="text/css">

#main_outer {
border: 1px solid #bababa;
width: 863px;
margin-left: 30px;
margin-top: 60px;
}

#outer {
border: 2px solid #fff;
width: 859px;
background: #f9f9f9;
overflow: hidden;
}

#outer_blk {
background: url(${pageContext.request.contextPath}/images/bottom.png) 0px -40px;
height: 42px;
line-height: 42px;
text-indent: 15px;
font-size: 18px;
}

table{
width: 100%;
border-top-width: 0px;
border-right-width: 0px;
border-bottom-width: 0px;
border-left-width: 0px;
border-spacing: 0px;
display: table;
border-collapse: separate;
border-color: gray;
}
tbody {
display: table-row-group;
vertical-align: middle;
border-color: inherit;
}
tr {
display: table-row;
vertical-align: inherit;
border-color: inherit;
}
td, th {
display: table-cell;
vertical-align: inherit;
}

.botton_submit {
display: block;
width: 81px;
height: 46px;
color: #fff;
background: url(${pageContext.request.contextPath}/images/bottom.png) 0px -185px;
text-align: center;
line-height: 46px;
font-weight: bold;
font-size: 16px;
border: 0;
cursor: pointer;
}

.botton_submit:hover { display:block; width:81px; height:46px; color:#fff; background:url(${pageContext.request.contextPath}/images/bottom.png) -85px -185px; text-align:center; line-height:46px; font-weight:bold; font-size:16px; border:0;}


</style>

</head>

<body>
	<div class="page">
		<div class="top-bar">
			<div class="container">
				<a href="${pageContext.request.contextPath}/f/Index" id="logo"> <img
					src="${pageContext.request.contextPath}/images/logo-white.png">
				</a>
			</div>
		</div>
		<div id="main_outer">
            <div id="outer">
                <div id="outer_blk">请仔细填写以下信息</div>
                <div id="outer_input">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" id="askques" style="margin-left:15px;">
                  <tbody><tr>
                    <td colspan="2"><h5>常规信息</h5></td>
                  </tr>
                  <tr>
                    <td style="width:210px!important;">会员名：</td>
                    <td><input name="unme" readonly="readonly" id="unme" type="text" class="textinput" value="${user.username }"><span id="unmespan"></span></td>
                  </tr>
                  <tr>
                    <td>电子邮箱：</td>
                    <td><input name="ueml" readonly="readonly"  id="ueml" value="${user.email }" type="text" class="textinput"><span id="uemlspan"></span></td>
                  </tr>
                  <tr>
                    <td>联系电话：</td>
                    <td><input name="tele" id="tele" value="" type="text" class="textinput"><span id="telespan"></span></td>
                  </tr>                  
                  <tr>
                    <td colspan="2"><h5>建议</h5></td>
                  </tr>
                  <tr>
                    <td id="introwrds">标题：</td>
                    <td><input name="pnme" id="pnme"  maxlength="100" type="text" size="49.8" placeholder="可选填标题，便于我们快速定位" class="textinput" value=""><span id="pnmespan" style="color:#F00;"></span></td>
                  </tr>
                  <tr>
                    <td colspan="2"><h5>详细描述</h5></td>
                  </tr>
                  <tr>
                    <td colspan="2"><textarea onkeyup="this.value = this.value.slice(0, 1000)" cols="80" rows="10" id="cnt" name="cnt"></textarea>
                     <span style="color:red;font-weight:bold;">*</span>
                     <span id="cntspan" style="color:red;font-weight:bold;"></span></td>
                  </tr>
                  <tr>
                    <td height="90" colspan="2"><input type="button" class="botton_submit" value="提  交" id="clickit"><div id="loading"></div></td>
                  </tr>
                </tbody></table>

                </div>
            </div>
        </div>
		<div class="footer">
			<p>Copyright © 2015 SANYANYU. All Rights Reserved.</p>
		</div>
				
		<div class="modal fade" id="alert_modal">
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
		<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
		
		<script type="text/javascript">
		
			$(function(){
				
				var bCnt = false;
				$("#cnt").blur(function(){
					
					if($(this).val().trim() == ""){
						$("#cntspan").text("详细描述不能为空");
						bCnt = false;
					}else{
						$("#cntspan").text("");
						bCnt = true;
					}
					
				});
				
				function showModal(message){
					$(".modal-title").text("温馨提示");
					$(".modal-body >p").text(message);
					$("#alert_modal").modal('show');
				}
				
				$("#clickit").click(function(){
					
					$("#cnt").trigger("blur");
					
					if(bCnt){
						$.post(path+'/a/AdviseServlet', {
					        'method': "save",
					        'content': $("#cnt").val().trim(),
					        'contact': $("#tele").val().trim(),
					        'title': $("#pnme").val().trim()
					    }, function(data) {
					    	
					    	if (data.status === 1) {
					    		showModal("提交成功！");
					    		
					    		$("#cnt").val("");
						        $("#tele").val("");
						        $("#pnme").val("");
					    		
				            }else{
				            	showModal("提交失败！");
				            }
					    }, 'json');
						
						
					}
					
				});
				
			});
		
		</script>
		
		
</body>
</html>