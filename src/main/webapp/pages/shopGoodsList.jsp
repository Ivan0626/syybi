<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宝贝列表</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />
<link rel="stylesheet" href="../assets/css/common-min.css" />
<link rel="stylesheet" href="../assets/css/index-min.css" />

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
						<li>店铺分析</li>
						<li><a href="${ctx }/a/ShopAnalysis">店铺列表</a></li>
						<li><a href="${ctx }/a/ShopAnalysis?shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("shopName"), "utf-8") %></a></li>
						<li class="active">宝贝列表</li>
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
										<a data-toggle="tab" id="tab1" href="#goodsList">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											宝贝列表
										</a>
									</li>

									<li>
										<a data-toggle="tab" id="tab2" href="#shopGen">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											店铺跟踪
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab3" href="#salesTrend">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											销售趋势
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab4" href="#catAnalysis">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											类别分析
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab5" href="#shopDetail">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											店铺详情
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab6" href="#dynamicScore">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											动态评分
										</a>
									</li>
									

								</ul>

								<div class="tab-content">
									<div id="goodsList" class="tab-pane fade in active">
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
																<label for="shopName">宝贝名称</label>
					
																<input type="text" id="prdName" name="prdName" placeholder="请输入宝贝名称" size="50" style="margin-left: 50px;"/>
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="goods-search-btn" class="btn btn-sm btn-success">
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
													<table id="goods-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th rowspan="2" colspan="1" style="text-align:center">宝贝名称</th>
																<th rowspan="2" colspan="1" style="text-align:center">商品类别</th>
																<th rowspan="2" colspan="1" style="text-align:center">标价</th>
																<th rowspan="1" colspan="2" style="text-align:center">成交均价</th>
																<th rowspan="1" colspan="2" style="text-align:center">折扣率</th>
																<th rowspan="1" colspan="2" style="text-align:center">销量</th>
																<th rowspan="1" colspan="2" style="text-align:center">销售额</th>
																<th rowspan="2" style="text-align:center">更新时间</th>
																<th class="sorting_disabled" rowspan="2" aria-label="" style="text-align:center">操作</th>
															</tr>
															<tr role="row">
																<th style="text-align:center">本月</th>
																<th style="text-align:center">上月</th>
																<th style="text-align:center">本月</th>
																<th style="text-align:center">上月</th>
																<th style="text-align:center">本月</th>
																<th style="text-align:center">上月</th>
																<th style="text-align:center">本月</th>
																<th style="text-align:center">上月</th>
															</tr>
														</thead>
			
														<tbody>
														</tbody>
														<tfoot>
												            <tr>
												                <th colspan="3" style="text-align:center">合计</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th colspan="2"></th>
												            </tr>
												        </tfoot>
													</table>
												</div>
											</div>
										</div>
									</div>

									<div id="shopGen" class="tab-pane fade">
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
																<label for="genType">跟踪种类</label>

																<select id="genType" name="genType" style="margin-left: 50px;">
																	<option value="1">调价跟踪</option>
							                                        <option value="3">上架跟踪</option>
										                            <option value="2">改名跟踪</option>
																</select>
															</div>
															
															<div class="widget-elem">
																<label for="gen-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getOffsetDate(-5) %>" class="Wdate" id="gen-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'gen-d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="gen-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'gen-d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="gen-search-btn" class="btn btn-sm btn-success">
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
													<table id="gen-table" class="table table-striped table-bordered table-hover">
														<thead>
															
														</thead>
			
														<tbody>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="salesTrend" class="tab-pane fade">
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
																<label>查看类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="showType" type="radio" value="day" class="ace" checked />
																	<span class="lbl"> 日趋势</span>
																</label>
																<label>
																	<input name="showType" type="radio" value="month" class="ace" />
																	<span class="lbl"> 月趋势</span>
																</label>
															</div>
														
															<div class="widget-elem" id="dayDiv">
																<label for="trend-d4321">日期选择</label>
																<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="trend-d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'trend-d4322\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="trend-d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'trend-d4321\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem" id="monthDiv" style="display:none;">
																<label for="trend-d4321">月份选择</label>
																<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="trend-d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'trend-d4322\')||\'%y-%M\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="trend-d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'trend-d4321\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
															</div>
															
															<div class="widget-elem">
																<label>图表类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="chartType" type="radio" value="1" class="ace" checked />
																	<span class="lbl"> 图表</span>
																</label>
																<label>
																	<input name="chartType" type="radio" value="2" class="ace"/>
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="trend-search-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders" id="chartDiv">
											<div class="col-md-12">
												<input name="chartWay" value="volume" type="radio" class="ace" checked /><span class="lbl"> 销量</span>
												<input name="chartWay" value="amount" type="radio" class="ace" /><span class="lbl"> 销售额</span>
												<input name="chartWay" value="count" type="radio" class="ace" /><span class="lbl"> 成交次数</span>
											</div>
							          		<div class="col-md-12" id="echarts-sales" style="height:500px;"></div>
								        </div>
										
										<div class="row" id="tableDiv" style="display:none;">
											<div class="col-xs-12">
			
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="trend-table" class="table table-striped table-bordered table-hover">
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
														<tfoot>
												            <tr>
												                <th style="text-align:center">合计</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												            </tr>
												        </tfoot>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="catAnalysis" class="tab-pane fade">
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
																<label for="cat-d4321">请选择月份</label>
					
																<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="cat-d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'cat-d4322\')||\'%y-%M\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="cat-d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'cat-d4321\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
					
															</div>
															
															<div class="widget-elem">
																<label for="chartType2">图表类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="chartType2" value="bar" type="radio" class="ace" checked />
																	<span class="lbl"> 条形图</span>
																</label>
																<label>
																	<input name="chartType2" value="pie" type="radio" class="ace" />
																	<span class="lbl"> 饼图</span>
																</label>
																<label>
																	<input name="chartType2" value="data" type="radio" class="ace" />
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															<div class="widget-elem">
																<label for="orderWay">排序方式</label>
																	
																<label style="margin-left: 50px;">
																	<input name="orderWay" value="volume" type="radio" class="ace" checked />
																	<span class="lbl"> 销量</span>
																</label>
																<label>
																	<input name="orderWay" value="amount" type="radio" class="ace" />
																	<span class="lbl"> 销售额</span>
																</label>
																<label>
																	<input name="orderWay" value="count" type="radio" class="ace" />
																	<span class="lbl"> 成交次数</span>
																</label>
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="search-cat-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders" id="chartDiv2">
											<div class="col-md-12">
												<input name="chartWay2" value="volume" type="radio" class="ace" checked /><span class="lbl"> 销量</span>
												<input name="chartWay2" value="amount" type="radio" class="ace" /><span class="lbl"> 销售额</span>
												<input name="chartWay2" value="count" type="radio" class="ace" /><span class="lbl"> 成交次数</span>
											</div>
							          		<div class="col-md-12" id="echarts-cat" style="height:500px;"></div>
								        </div>
										<div class="row" id="tableDiv2" style="display:none;">
											<div class="col-xs-12">
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="cat-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th>类别名称</th>
																<th>销量</th>
																<th>销售额</th>
																<th>成交次数</th>
															</tr>
														</thead>
					
														<tbody>
														</tbody>
														<tfoot>
												            <tr>
												                <th style="text-align:center">合计</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												            </tr>
												        </tfoot>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="shopDetail" class="tab-pane fade">
										<div class="shop-detail">
										    <div class="shop-summary clearfix">
										        <div class="shop-head">
										            <ul>
										                <li><label>店铺名称：</label><span><a target="_blank" href="#" id="shop_url">韩都衣舍旗舰店</a></span><span> <img src="${ctx }/assets/imagesLocal/bc_shop_icon.png" alt=""></span></li>
										            </ul>
										        </div>
										        <div class="shop-inner">
													<table cellpadding="0" cellspacing="0" width="100%" class="my_competitor_brief_table">
														<tbody>
															<tr>
																<td valign="top">
											                    	<img width="80" height="80" id="shop_img" alt="商品图片">                                            					</td>
																<td valign="top">
																	<table cellpadding="0" cellspacing="0" width="100%">
																		<tbody>
																			<tr>
																				<td><label>架上宝贝数量：</label></td>
											                                     <td id="item_count"></td>
																			</tr>
																			<tr>
																				<td><label>创店时间：</label></td>
																				<td>未公开</td>
																			</tr>
																			<tr>
																				<td><label>地址：</label></td>
																				<td id="region"></td>
																			</tr>
																			<tr>
																				<td><label>上月销量：</label></td>
																				<td id="pre_sales_volume"></td>
																			</tr>
																			<tr>
																				<td><label>本月销量：</label></td>
																				<td id="sales_volume"></td>
																			</tr>
																		</tbody>
																	</table>
																</td>
																<td valign="top">
																	<table cellpadding="0" cellspacing="0" width="100%">
																		<tbody>
																			<tr>
																				<td><label>店铺名称：</label></td>
																				<td id="shop_name"></td>
																			</tr>
																			<tr>
																				<td><label>掌柜名称：</label></td>
																				<td id="seller"></td>
																			</tr>
																			<tr>
																				<td><label>旺旺：</label></td>
																				<td id="wangwang">
																				</td>
																			</tr>
																			<tr>
																				<td><label>上月销售额：</label></td>
																				<td id="pre_sales_amount"></td>
																			</tr>
																			<tr>
																				<td><label>本月销售额：</label></td>
																				<td id="sales_amount"></td>
																			</tr>
																		</tbody>
																	</table>
																</td>
															</tr>
														</tbody>
													</table>
										        </div>
										    </div>
										
										
											<div id="dynamic-rate">
												
											</div>
											<!-- 
											<div id="dynamic-rate" class="rate-box box-shadow">
												<div class="hd">
													<h4 class="tb-rate-ico-bg ico-shop">店铺半年内动态评分</h4>
												</div>
												<div class="bd bd-v3">
													<ul class="dsr-info" id="dsr">
														
													</ul>
												</div>
											</div>
											 -->
										</div>
									</div>
									
									<div id="dynamicRate" class="tab-pane fade">
										
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
																<label for="rate-d4321">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="rate-d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'rate-d4322\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="rate-d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'rate-d4321\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem">
																<label>查看方式</label>
																	
																<label style="margin-left: 50px;">
																	<input name="rateChartType" type="radio" value="1" class="ace" checked />
																	<span class="lbl"> 图表</span>
																</label>
																<label>
																	<input name="rateChartType" type="radio" value="2" class="ace"/>
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="rate-search-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders" id="rateChartDiv">
											<div class="col-md-12">
												<input name="rateChartWay" value="describe" type="radio" class="ace" checked /><span class="lbl"> 描述相符</span>
												<input name="rateChartWay" value="service" type="radio" class="ace" /><span class="lbl"> 服务态度</span>
												<input name="rateChartWay" value="delivery" type="radio" class="ace" /><span class="lbl"> 发货速度</span>
											</div>
							          		<div class="col-md-12" id="echarts-rate" style="height:500px;"></div>
								        </div>
										
										<div class="row" id="rateTableDiv" style="display:none;">
											<div class="col-xs-12">
			
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="rate-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th rowspan="2">时间</th>
																<th colspan="6" style="text-align:center">描述相符</th>
																<th colspan="6" style="text-align:center">服务态度</th>
																<th colspan="6" style="text-align:center">发货速度</th>
															</tr>
															<tr role="row">
																<th>日描述分</th>
																<th>5分</th>
																<th>4分</th>
																<th>3分</th>
																<th>2分</th>
																<th>1分</th>
																<th>日服务分</th>
																<th>5分</th>
																<th>4分</th>
																<th>3分</th>
																<th>2分</th>
																<th>1分</th>
																<th>日发货分</th>
																<th>5分</th>
																<th>4分</th>
																<th>3分</th>
																<th>2分</th>
																<th>1分</th>
															</tr>
														</thead>
			
														<tbody>
														</tbody>
														<tfoot>
												            <tr>
												                <th style="text-align:center">行业平均分</th>
												                <th style="text-align:right">4.85707</th>
												                <th colspan="5"></th>
												                <th style="text-align:right">4.85707</th>
												                <th colspan="5"></th>
												                <th style="text-align:right">4.85707</th>
												                <th colspan="5"></th>
												            </tr>
												        </tfoot>
													</table>
												</div>
											</div>
										</div>
									
									</div>
									
								</div>
							</div>

							<!-- /section:elements.tab -->
						</div><!-- /.col -->
					
					</div>
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
	
	<!-- echarts库必须在bootbox之后加载 -->
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option1.js"></script>
	<script src="../assets/js/option2_2.js"></script>
	<script src="../assets/js/option3.js"></script>
	<script src="../assets/js/option3_3.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/columns.js"></script>
	<script src="../assets/js/shopGoodsList.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var shopGoodsList = {};
		shopGoodsList.shopId = "${param.shopId}";
		shopGoodsList.shopName = encodeURI("${param.shopName}");// 编码
		shopGoodsList.tab = "${param.tab}";
		
	</script>	
</body>
</html>