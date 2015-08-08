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
						<li><a href="${ctx }/a/BrandAnalysis">品牌列表</a></li>
						<li class="active">品牌搜索</li>
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
													<label for="cat">品牌所在类别</label>

													<select id="s0" name="cat"  style="margin-left: 100px;" onchange="addCat(0)">
														<option value="">请选择</option>
														<c:forEach items="${catList }" var="catVar">
															<option value="${catVar.catNo }" data-category="${catVar.category }" data-hasChild="${catVar.hasChild }">${catVar.catName }</option>
														</c:forEach>
													</select>
												</div>
												
												<div class="widget-elem" >
													<label for="brandName">品牌名称包含关键字</label>
		
													<input type="text" id="brandName" name="brandName" size="50" style="margin-left: 58px;"/>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="brand-search-btn" class="btn btn-sm btn-success">
														<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
														品牌搜索
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row" id="brandDiv" style="display:none;">
								<div class="col-xs-12">

									<div class="pull-right" style="margin-top: 15px;">
										<button class="btn btn-xs btn-success" id="batch-attn-btn" style="top:-3px;">
											<i class="ace-icon fa fa-check"></i>
											批量关注
										</button>
									</div>

									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="brand-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th>品牌名称</th>
													<th style="text-align:center;">
														<label class="pos-rel">
															<input type="checkbox" class="ace" />
															<span class="lbl"></span>
														</label>
														全选
													</th>
												</tr>
											</thead>

											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div><!-- /.col -->
					
					</div>
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/brandSearch.js"></script>

</body>
</html>