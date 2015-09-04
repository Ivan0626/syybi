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
	<input type="hidden" id="adid" value="${param.adid }">
	
	<iframe id="id_iframe" name="id_iframe" style="display:none;"></iframe> 
	
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
						<li>宝贝分析</li>
						<li><a href="${ctx }/a/GoodsAnalysis">目录一览</a></li>
						<li><a href="${ctx }/a/GoodsAnalysis?dirName=<%=URLEncoder.encode(request.getParameter("dirName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("dirName"), "utf-8") %></a></li>
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
										<a data-toggle="tab" id="tab2" href="#goodsGen">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											宝贝跟踪
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab3" href="#priceAnalysis">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											价格段分析
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab4" href="#salesTrend">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											销售趋势
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
															<form class="form-search">
																<div class="row">
																	<div class="col-xs-12 col-sm-4">
																		<div class="input-group">
																			<span class="input-group-addon">
																				搜索已关注的宝贝
																			</span>
																			<div class="pos-rel">
																				<input id="goods-attned" class="typeahead scrollable" style="font-size:14px;line-height:1.42857143;" size="54" type="text" placeholder="请输入宝贝名称" />
																			</div>
																			<span class="input-group-btn">
																				<button type="button" id="goods-attned-btn" class="btn btn-purple btn-sm">
																					<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
																					搜索
																				</button>
																			</span>
																		</div>
																	</div>
																	<div class="col-xs-12 col-sm-4 " style="margin-left:25px;">
																		<div class="input-group">
																			<span class="input-group-addon">
																				添加宝贝
																			</span>
																			
																			<div class="pos-rel">
																				<input id="goods-attn-url" style="font-size:14px;line-height:1.42857143;" size="54" type="text" placeholder="请输入宝贝链接" />
																			</div>
																			<span class="input-group-btn" style="left:-50px;">
																				<button type="button" id="goods-attn-btn" class="btn btn-purple btn-sm">
																					<span class="ace-icon fa fa-check icon-on-right bigger-110"></span>
																					关注
																				</button>
																			</span>
																		</div>
																	</div>
																	<div class="col-xs-12 col-sm-3">
																		<button type="button" class="btn btn-sm btn-grey" id="goods-upload">
																			<span class="ace-icon fa fa-upload icon-on-right bigger-110"></span>
																			上传链接文件
																		</button>
																	
																		<button type="button" class="btn btn-sm btn-success" id="goods-search">
																			<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
																			宝贝搜索
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
			
												<span class="pull-left" style="margin-top:15px;"> 宝贝数(<span id="goods-len"></span>/<span id="goods-total">${user.goodsNum }</span>) </span>
									
												<button class="pull-right btn btn-xs btn-success" id="del-btn" style="margin-top:15px;margin-left:10px;">
													<i class="ace-icon fa fa-check"></i>
													删除所选
												</button>
			
												<!-- div.dataTables_borderWrap -->
												<div>
													<table id="goods-table" class="table table-striped table-bordered table-hover">
														<thead>
															<tr role="row">
																<th rowspan="2" colspan="1" style="text-align:center">宝贝名称</th>
																<th rowspan="2" colspan="1" style="text-align:center">商品类别</th>
																<th rowspan="2" colspan="1" style="text-align:center">掌柜名称</th>
																<th rowspan="2" colspan="1" style="text-align:center">标价</th>
																<th rowspan="2" colspan="1" style="text-align:center">成交均价</th>
																<th rowspan="1" colspan="2" style="text-align:center">销量</th>
																<th rowspan="1" colspan="2" style="text-align:center">销售额</th>
																<th rowspan="2" style="text-align:center">更新时间</th>
																<th class="sorting_disabled" rowspan="2" aria-label="" style="text-align:center">操作</th>
																<th rowspan="2">
																	<label class="pos-rel">
																		<input type="checkbox" class="ace" />
																		<span class="lbl"></span>
																	</label>
																	全选
																</th>
															</tr>
															<tr role="row">
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
												                <th colspan="5" style="text-align:center">合计</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th style="text-align:right">-</th>
												                <th colspan="3"></th>
												            </tr>
												        </tfoot>
													</table>
												</div>
												
												<div class="pull-right" style="margin-top:-38px;margin-left:10px;">
													<label for="toDir">移动宝贝至目录</label>
													<select id="toDir" name="toDir">
														<c:forEach items="${dirList }" var="dir">
															<option value="${dir.adid }">${dir.dir_name }</option>
														</c:forEach>
														
													</select>
													
													<button class=" btn btn-xs btn-success" id="to-btn" style="top:-2px;">
														<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
														确认
													</button>
												</div>
											</div>
										</div>
									</div>

									<div id="goodsGen" class="tab-pane fade">
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

																<select id="genType"  style="margin-left: 50px;">
							                                        <option value="1">调价跟踪</option>
										                            <option value="2">改名跟踪</option>
																</select>
															</div>
															
															
															<div class="widget-elem">
																<label for="gen-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="gen-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'gen-d43222\')||\'%y-%M-%d\'}'})"/>
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
									
									<div id="priceAnalysis" class="tab-pane fade">
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
																<label for="price-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="price-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'price-d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="price-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'price-d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															<div class="widget-elem">
																<label for="shopType">查看范围</label>
																	
																<label style="margin-left: 50px;">
																	<input name="shopType" value="ALL" type="radio" class="ace" checked />
																	<span class="lbl"> 全部</span>
																</label>
																<label>
																	<input name="shopType" value="TMALL" type="radio" class="ace" />
																	<span class="lbl"> 天猫</span>
																</label>
																<label>
																	<input name="shopType" value="TAOBAO" type="radio" class="ace" />
																	<span class="lbl"> 淘宝</span>
																</label>
															</div>
															
															<div class="widget-elem">
																<label for="startAvgPrice">价格段范围</label>
			
																<input type="text" id="startAvgPrice" value="${priceMap.avg_price_min - 0.01 }" size="15" style="margin-left: 38px;"/>
																到
																<input type="text" id="endAvgPrice" value="${priceMap.avg_price_max + 0.01 }" size="15"/>
															</div>
															
															<div class="widget-elem">
																<label for="priceSize">价格分段数</label>
																<input type="text" id="priceSize" value="5" size="15" style="margin-left: 38px;"/>
																(范围1~10，默认5)
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="search-price-btn" class="btn btn-sm btn-success">
																	检索
																	<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row placeholders">
							          		<div class="col-md-12" id="echarts-price" style="height:500px;"></div>
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
																<label for="trend-d4321-month">月份选择</label>
																<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="trend-d4321-month" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'trend-d4322-month\')||\'%y-%M\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="trend-d4322-month" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'trend-d4321-month\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
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
	<script src="../assets/js/typeahead.bundle.js"></script>
	
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	<script src="../assets/js/bootbox.js"></script>
	
	<!-- echarts库必须在bootbox之后加载 -->
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option3.js"></script>
	<script src="../assets/js/option9.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/columns.js"></script>
	<script src="../assets/js/dirGoodsList.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var dirGoodsList = {};
		dirGoodsList.adid = "${param.adid}";
		dirGoodsList.dirName = encodeURI("${param.dirName}");// 编码
		dirGoodsList.tab = "${param.tab}";
		
		dirGoodsList.startAvgPrice = "${priceMap.avg_price_min - 0.01 }";
		dirGoodsList.endAvgPrice = "${priceMap.avg_price_max + 0.01 }";
		
	</script>	
</body>
</html>