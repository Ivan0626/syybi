<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>店铺分析</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />


</head>
<body>
	
	<input type="hidden" id="shopId">
	<input type="hidden" id="shopName">
	<input type="hidden" id="searchType" value="search">
	<input type="hidden" id="toCat">
	
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
						<li>店铺分析</li>
						<li class="active">店铺列表</li>
					</ul><!-- /.breadcrumb -->

				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					<%@ include file="/pages/aceSettings.jsp"%>

					<div class="row">
					
						<div class="col-sm-12">

							<div class="tabbable">
								
								<ul class="nav nav-tabs" id="myTab">
									<li class="active">
										<a data-toggle="tab" id="tab1" href="#shopList">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											店铺列表
										</a>
									</li>

									<li>
										<a data-toggle="tab" id="tab2" href="#shopCompare">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											店铺对比
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab2" href="#hotGoods">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											热销宝贝
										</a>
									</li>

								</ul>
								
							</div>
							
							<div class="tab-content">
							
								<div id="shopList" class="tab-pane fade in active">
								
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
																<div class="col-xs-12 col-sm-4">
																	<div class="input-group">
																		<span class="input-group-addon">
																			搜索已关注的店铺
																		</span>
																		<div class="pos-rel">
																			<input id="shop-attned" class="typeahead scrollable" style="font-size:14px;line-height:1.42857143;" size="54" type="text" placeholder="请输入店铺名称" />
																		</div>
																		<span class="input-group-btn">
																			<button type="button" id="search-btn" class="btn btn-purple btn-sm">
																				<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
																				搜索
																			</button>
																		</span>
																	</div>
																</div>
																<div class="col-xs-12 col-sm-4 " style="margin-left:25px;">
																	<div class="input-group">
																		<span class="input-group-addon">
																			添加店铺
																		</span>
																		
																		<div class="pos-rel">
																			<input id="shop-attn" class="typeahead scrollable" style="font-size:14px;line-height:1.42857143;" size="54" type="text" placeholder="请输入店铺名称" />
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
																	<button type="button" class="btn btn-sm btn-success" id="shop-search">
																		<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
																		店铺搜索
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
												<table id="shop-table" class="table table-striped table-bordered table-hover">
													<thead>
														<tr role="row">
															<th>店铺名称</th>
															<th>标签</th>
															<th>飚量指数</th>
															<th>宝贝数量</th>
															<th>地域</th>
															<th>本月销量</th>
															<th>上月销量</th>
															<th>本月销售额</th>
															<th>上月销售额</th>
															<th>关注时间</th>
															<th class="sorting_disabled" aria-label="">操作</th>
															<th>
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
								</div>
								
								<div id="shopCompare" class="tab-pane fade">
									
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
														<div class="widget-elem">
															<label for="chartType">查看方式</label>
																
															<label style="margin-left: 58px;">
																<input name="chartType" value="shopBar" type="radio" class="ace" checked />
																<span class="lbl"> 店铺走势图</span>
															</label>
															<label>
																<input name="chartType" value="catBar" type="radio" class="ace" />
																<span class="lbl"> 类目条形图</span>
															</label>
															<label>
																<input name="chartType" value="data" type="radio" class="ace" />
																<span class="lbl"> 数据报表</span>
															</label>
														</div>
														
														<div class="widget-elem">
															<label for="shop1">选择对比店铺一</label>
		
															<select name="shop1"  style="margin-left: 18px;width:200px;">
																<option value="">请选择</option>
																<c:forEach items="${attedList }" var="atted">
																	<option value="${atted.shop_id }">${atted.shop_name }</option>
																</c:forEach>
															</select>
															
															<label for="shop2">选择对比店铺二</label>
		
															<select name="shop2" style="margin-left: 10px;width:200px;">
																<option value="">请选择</option>
																<c:forEach items="${attedList }" var="atted">
																	<option value="${atted.shop_id }">${atted.shop_name }</option>
																</c:forEach>
															</select>
															
															<label for="shop3">选择对比店铺三</label>
		
															<select name="shop3" style="margin-left: 10px;width:200px;">
																<option value="">请选择</option>
																<c:forEach items="${attedList }" var="atted">
																	<option value="${atted.shop_id }">${atted.shop_name }</option>
																</c:forEach>
															</select>
															
															<label for="shop4">选择对比店铺四</label>
		
															<select name="shop4" style="margin-left: 10px;width:200px;">
																<option value="">请选择</option>
																<c:forEach items="${attedList }" var="atted">
																	<option value="${atted.shop_id }">${atted.shop_name }</option>
																</c:forEach>
															</select>
														</div>
														
														
														
														<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
															<button type="button" id="compare-shop-btn" class="btn btn-sm btn-success">
																对比
																<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="row placeholders" id="chartDiv" style="display:none;">
						          		<div class="col-md-12" id="echarts-compare" style="height:500px;"></div>
							        </div>
									<div class="row" id="tableDiv" style="display:none;">
										<div class="col-xs-12">
											<!-- div.dataTables_borderWrap -->
											<div>
												<table id="compare-table" class="table table-striped table-bordered table-hover">
													
												</table>
											</div>
										</div>
									</div>
									
								</div>
								
								<div id="hotGoods" class="tab-pane fade">
									<div class="row">
										<div class="col-sm-12">
											<div class="widget-box">
												<div class="widget-header">
													<h4 class="widget-title">检索条件</h4>
													<div class="widget-toolbar" style="padding-right: 25px;">
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
	
															<select id="s0" name="cat"  style="margin-left: 100px;" onchange="addCat(0)">
																<option value="">请选择</option>
																<c:forEach items="${catList }" var="catVar">
																	<option value="${catVar.catNo }" data-category="${catVar.category }" data-hasChild="${catVar.hasChild }">${catVar.catName }</option>
																</c:forEach>
															</select>
														</div>
														
														<div class="widget-elem">
															<label for="shopType">查看范围</label>
															<label style="margin-left: 100px;">
																<input name="shopType" value="TMALL" type="radio" class="ace" checked />
																<span class="lbl"> 天猫</span>
															</label>
															<label>
																<input name="shopType" value="TAOBAO" type="radio" class="ace" />
																<span class="lbl"> 淘宝</span>
															</label>
														</div>
														
														<div class="widget-elem" >
															<label for="shopName">宝贝名称</label>
				
															<input type="text" id="prdName" name="prdName" placeholder="请输入宝贝名称" size="50" style="margin-left: 100px;"/>
														</div>
														
														<div class="widget-elem" >
															<label for="volumeTotal">上月销量下限</label>
				
															<input type="text" id="volumeTotal" name="volumeTotal" value="2000" placeholder="请输入宝贝名称" size="50" style="margin-left: 72px;"/>
														</div>
														
														<div class="widget-elem" >
															<label for="amountTotal">上月销售额下限</label>
				
															<input type="text" id="amountTotal" name="amountTotal" value="2000" placeholder="请输入宝贝名称" size="50" style="margin-left: 58px;"/>
														</div>
														
														<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
															<button type="button" id="search-goods-btn" class="btn btn-sm btn-success">
																检索
																<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									
									<div class="row" id="tableDiv3" style="display:none;">
										<div class="col-xs-12">
											
											<div class="pull-right" style="margin-top: 15px;">
												<select id="toDir" name="toDir">
												</select>
												
												<button class="btn btn-xs btn-success" id="batch-attn-btn" style="top:-3px;">
													<i class="ace-icon fa fa-check"></i>
													批量关注
												</button>
											</div>
										
											<!-- div.dataTables_borderWrap -->
											<div>
												<table id="goods-table" class="table table-striped table-bordered table-hover">
													
													<thead>
														<tr role="row">
															<th>宝贝名称</th>
															<th>店铺名称</th>
															<th>商品类别</th>
															<th>标价</th>
															<th>上月成交均价</th>
															<th>本月销量</th>
															<th>上月销量</th>
															<th>本月销售额</th>
															<th>上月销售额</th>
															<th class="center">
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
	<script src="../assets/js/typeahead.bundle.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option7.js"></script>
	<script src="../assets/js/option8.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/shopAnalysis.js"></script>
	
</body>
</html>