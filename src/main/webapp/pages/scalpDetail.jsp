<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>刷单分析</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />

</head>
<body>

	<input type="hidden" id="searchType">
	<input type="hidden" id="toCat">
	
	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed')}catch(e){}
		</script>

		<!-- /section:basics/syy-sidebar -->
		<div class="main-content" >
			<div class="main-content-inner">
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
						<li>刷单分析</li>
						<li><a href="${ctx }/a/ScalpAnalysis">店铺列表</a></li>
						<li><a href="${ctx }/a/ScalpAnalysis?shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("shopName"), "utf-8") %></a></li>
						<li><a href="${ctx }/a/ScalpAnalysis?m=goods_list&shopId=${param.shopId }&shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>&tab=tab2">刷单分析</a></li>
						<li class="active">${param.date} 宝贝列表</li>
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
												
												<div class="widget-elem" id="cat-append">
													<label for="cat">商品类别</label>

													<select id="s0" name="cat"  style="margin-left: 50px;" onchange="addCat(0)">
														<option value="">请选择</option>
														<c:forEach items="${catList }" var="catVar">
															<option value="${catVar.catNo }" data-category="${catVar.category }" data-hasChild="${catVar.hasChild }">${catVar.catName }</option>
														</c:forEach>
													</select>
												</div>
												
												<div class="widget-elem" >
													<label for="prdName">宝贝名称</label>
		
													<input type="text" id="prdName" name="prdName" placeholder="请输入宝贝名称" size="50" style="margin-left: 50px;"/>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="goods-list-search-btn" class="btn btn-sm btn-success">
														检索
														<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col-xs-12">

									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="goods-list-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th style="text-align:center">宝贝名称</th>
													<th style="text-align:center">商品类别</th>
													<th style="text-align:center">参考价格</th>
													<th style="text-align:center">成交均价</th>
													<th style="text-align:center">销量</th>
													<th style="text-align:center">销售额</th>
													<th style="text-align:center">成交次数</th>
													<th style="text-align:center">刷单量</th>
													<th style="text-align:center">刷单额</th>
													<th style="text-align:center">刷单次数</th>
													<th style="text-align:center">操作</th>
												</tr>
											</thead>

											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div><!-- /.col -->
					
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	<script src="../assets/js/dataTables/extensions/TableTools/js/dataTables.tableTools.js"></script>
	<script src="../assets/js/dataTables/extensions/ColVis/js/dataTables.colVis.js"></script>
	
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/columns.js"></script>
	<script src="../assets/js/scalpDetail.js"></script>
	
	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var scalpDetail = {};
		scalpDetail.shopId = "${param.shopId}";
		scalpDetail.shopName = "${param.shopName}";
		scalpDetail.itemId = "${param.itemId}";
		scalpDetail.date = "${param.date}";
		scalpDetail.ad = "${param.ad}";
		scalpDetail.gen = "${param.gen}";
		scalpDetail.detailType = "${param.detailType}";
		
	</script>	
</body>
</html>