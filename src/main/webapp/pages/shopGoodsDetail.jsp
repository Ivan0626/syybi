<%@page import="java.net.URLEncoder"%>
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
						<li>店铺分析</li>
						<li><a href="${ctx }/a/ShopAnalysis">店铺列表</a></li>
						<li><a href="${ctx }/a/ShopAnalysis?shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("shopName"), "utf-8") %></a></li>
						<li><a href="${ctx }/a/ShopAnalysis?m=goods_list&shopId=${param.shopId }&shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>&tab=tab1">宝贝列表</a></li>
						<li><%=java.net.URLDecoder.decode(request.getParameter("prdName"), "utf-8") %></li>
						<li class="active">宝贝销售趋势</li>
					</ul><!-- /.breadcrumb -->
				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					<%@ include file="/pages/aceSettings.jsp"%>

					<div class="row">
					
						<div class="col-sm-12">
							<!-- #section:elements.tab -->
							<div class="tabbable">
								<ul class="nav nav-tabs" id="myTab">
									<li class="active">
										<a data-toggle="tab" id="tab3" href="#ying">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											宝贝销售趋势
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab4" href="#price">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											价格走势
										</a>
									</li>

								</ul>

								<div class="tab-content">
									<div id="ying" class="tab-pane fade">
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
															<div class="widget-elem">
																<label for="ying-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="ying-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'ying-d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="ying-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'ying-d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem">
																<label>图表类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="chartType" type="radio" value="1" class="ace" checked />
																	<span class="lbl"> 图表</span>
																</label>
																<label>
																	<input name="chartType" type="radio" value="2" class="ace" />
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="ying-search-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders" id="chartDiv" style="display:none;">
											<div class="col-md-12">
												<input name="chartWay" value="volume" type="radio" class="ace" checked /><span class="lbl"> 销量</span>
												<input name="chartWay" value="amount" type="radio" class="ace" /><span class="lbl"> 销售额</span>
												<input name="chartWay" value="count" type="radio" class="ace" /><span class="lbl"> 成交次数</span>
											</div>
							          		<div class="col-md-12" id="echarts-ad" style="height:500px;"></div>
								        </div>
										
										<div class="row" id="tableDiv">
											<div class="col-xs-12">
			
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="ying-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th>时间</th>
																<th>销售额</th>
																<th>销量</th>
																<th>成交次数</th>
															</tr>
														</thead>
			
														<tbody>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="price" class="tab-pane fade">
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
															<div class="widget-elem">
																<label for="price-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="price-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'ying-d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="price-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'ying-d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem">
																<label>图表类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="priceChartType" type="radio" value="1" class="ace" checked />
																	<span class="lbl"> 图表</span>
																</label>
																<label>
																	<input name="priceChartType" type="radio" value="2" class="ace" />
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="price-search-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders" id="priceChartDiv" style="display:none;">
							          		<div class="col-md-12" id="echarts-price" style="height:500px;"></div>
								        </div>
										
										<div class="row" id="priceTableDiv">
											<div class="col-xs-12">
			
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="price-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th>时间</th>
																<th>标价</th>
																<th>成交价</th>
																<th>销量</th>
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
							<!-- /section:elements.tab -->
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
	
	<!-- echarts库必须在bootbox之后加载 -->
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option3.js"></script>
	<script src="../assets/js/option4.js"></script>
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>

	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/columns.js"></script>
	<script src="../assets/js/shopGoodsDetail.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var goodsDetail = {};
		goodsDetail.path = "${ctx}";
		goodsDetail.shopId = "${param.shopId}";
		goodsDetail.itemId = "${param.itemId}";
		goodsDetail.tab = "${param.tab}";
		goodsDetail.ad = "${param.ad}";
		goodsDetail.prdName = "${param.prdName}";
		goodsDetail.shopName = "${param.shopName}";
		
	</script>	
</body>
</html>