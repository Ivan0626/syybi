<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>运营分析</title>

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
						<li>运营分析</li>
						<li><a href="${ctx }/a/MarketAnalysis">店铺列表</a></li>
						<li><a href="${ctx }/a/MarketAnalysis?shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("shopName"), "utf-8") %></a></li>
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
										<a data-toggle="tab" id="tab1" href="#goods">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											宝贝列表
										</a>
									</li>

									<li>
										<a data-toggle="tab" id="tab2" href="#ad">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											广告分析
										</a>
									</li>

								</ul>

								<div class="tab-content">
									<div id="goods" class="tab-pane fade in active">
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
															
															<div class="widget-elem">
																<label for="adType">广告类别</label>

																<select id="adType" name="adTpe" style="margin-left: 50px;">
																	<option value="0">全部</option>
							                                        <option value="1">热门钻展</option>
										                            <option value="2">普通钻展</option>
										                            <option value="3">淘宝促销</option>
										                            <option value="4">淘宝活动</option>
										                            <option value="5">淘宝客</option>
										                            <option value="6">直通车</option>
										                            <option value="7">聚划算</option>
										                            <option value="8">商品促销</option>
										                            <option value="11">手机热门钻展</option>
										                            <option value="13">手机淘宝促销</option>
										                            <option value="12">手机淘宝活动</option>
										                            <option value="14">手机直通车</option>
										                            <option value="10">手机促销</option>
																</select>
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
																<th rowspan="2" colspan="1" style="text-align:center">宝贝广告</th>
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
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th colspan="2"></th>
												            </tr>
												        </tfoot>
													</table>
												</div>
											</div>
										</div>
									</div>

									<div id="ad" class="tab-pane fade">
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
																<label for="d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="d43211" name="d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="d43222" name="d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem">
																<label>图表类型</label>
																	
																<label style="margin-left: 50px;">
																	<input name="chartType" value="chart" type="radio" class="ace" />
																	<span class="lbl"> 图表</span>
																</label>
																<label>
																	<input name="chartType" value="data" type="radio" class="ace" checked />
																	<span class="lbl"> 数据表</span>
																</label>
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="ad-search-btn" class="btn btn-sm btn-success">
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
													<table id="ad-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th>时间</th>
																<th>销售额</th>
																<th>销量</th>
																<th>成交次数</th>
																<th>店铺广告</th>
																<th>宝贝广告</th>
																<th>促销活动</th>
																<th>改名次数</th>
																<th>调价次数</th>
																<th>新品上架</th>
															</tr>
														</thead>
			
														<tbody>
														</tbody>
														<tfoot>
												            <tr>
												                <th style="text-align:center">合计</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th style="text-align:right">11</th>
												                <th colspan="6"></th>
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
	<script src="../assets/js/option3.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/goodsList.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var goodsList = {};
		goodsList.path = "${ctx}";
		goodsList.shopId = "${param.shopId}";
		goodsList.shopName = encodeURI("${param.shopName}");// 编码
		goodsList.tab = "${param.tab}";
		
	</script>	
</body>
</html>