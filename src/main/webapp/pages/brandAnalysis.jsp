<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>品牌分析</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />


</head>
<body>
	
	<input type="hidden" id="addid">
	<input type="hidden" id="brandName">
	
	<input type="hidden" id="curMonth" value="<%=DateUtils.getCurMonth() %>">
	
	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed')}catch(e){}
		</script>

		<!-- /section:basics/syy-sidebar -->
		<div class="main-content">
			<div class="main-content-inner">
				<!-- #section:basics/content.breadcrumbs -->
				<div class="breadcrumbs" id="breadcrumbs">
					<script type="text/javascript">
						try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
					</script>

					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="${ctx }/a/Dashboard">首页</a>
						</li>
						<li>品牌分析</li>
						<li class="active">品牌列表</li>
					</ul><!-- /.breadcrumb -->

				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					<%@ include file="/pages/aceSettings.jsp"%>

					<div class="row">
					
						<div class="col-sm-12">
						
							<div class="row">
								<div class="col-sm-12">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title">检索条件</h4>
											<div class="widget-toolbar">
												<a href="#" data-action="collapse">
													<i class="ace-icon fa fa-chevron-up"></i>
												</a>
		
												<a href="#" data-action="close">
													<i class="ace-icon fa fa-times"></i>
												</a>
											</div>
										</div>
		
										<div class="widget-body">
											<div class="widget-main">
												<form class="form-search">
													<div class="row">
														<div class="col-xs-12 col-sm-4 " style="margin-left:25px;">
															<div class="input-group">
																<span class="input-group-addon">
																	添加品牌
																</span>
																
																<div class="pos-rel">
																	<input id="brand-attn" class="typeahead scrollable" style="font-size:14px;line-height:1.42857143;" size="54" type="text" placeholder="请输入品牌名称" />
																</div>
																<span class="input-group-btn" style="left:-50px;">
																	<button type="button" id="attn-btn" class="btn btn-purple btn-sm">
																		<span class="ace-icon fa fa-check icon-on-right bigger-110"></span>
																		关注
																	</button>
																</span>
															</div>
														</div>
														<div class="col-xs-12 col-sm-3">
															<button type="button" class="btn btn-sm btn-success" id="brand-search">
																<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
																品牌搜索
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-xs-12">
									<button class="pull-right btn btn-xs btn-success" id="del-btn" style="margin-top:5px;margin-left:10px;">
										<i class="ace-icon fa fa-check"></i>
										删除所选
									</button>
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="brand-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th rowspan="2">品牌名称</th>
													<th rowspan="2">主营类目</th>
													<th colspan="2" style="text-align:center;">天猫</th>
													<th colspan="2" style="text-align:center;">淘宝</th>
													<th rowspan="2">关注时间</th>
													<th rowspan="2">
														<label class="pos-rel">
															<input type="checkbox" class="ace" />
															<span class="lbl"></span>
														</label>
														全选
													</th>
												</tr>
												<tr role="row">
													<th>本月销售额</th>
													<th>上月销售额</th>
													<th>本月销售额</th>
													<th>上月销售额</th>
												</tr>
											</thead>
		
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						
						</div>
					</div>	
				</div>
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/typeahead.bundle.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option7.js"></script>
	<script src="../assets/js/option8.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/brandAnalysis.js"></script>
	
</body>
</html>