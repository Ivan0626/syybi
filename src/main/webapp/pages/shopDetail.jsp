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
						<li><a href="${ctx }/a/MarketAnalysis?m=goods_list&shopId=${param.shopId }&shopName=<%=URLEncoder.encode(request.getParameter("shopName"), "utf-8") %>&tab=tab2">广告分析</a></li>
						<li class="active">${param.date} 宝贝列表</li>
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
										<a data-toggle="tab" id="tab2" href="#shopAd">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											店铺广告
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab3" href="#goodsAd">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											宝贝广告
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab4" href="#gen">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											改名跟踪
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab5" href="#gen">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											调价跟踪
										</a>
									</li>
									
									<li>
										<a data-toggle="tab" id="tab6" href="#gen">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											上架跟踪
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
																<label for="prdName">宝贝名称</label>
					
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
																<th style="text-align:center">成交次数</th>
																<th style="text-align:center">销售额</th>
																<th style="text-align:center">改名次数</th>
																<th style="text-align:center">调价情况</th>
																<th style="text-align:center">上架时间</th>
																<th style="text-align:center">宝贝广告</th>
																<th style="text-align:center">操作</th>
															</tr>
														</thead>
			
														<tbody>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										
									</div>

									<div id="shopAd" class="tab-pane fade">
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
																<label for="shop-adtype">广告类别</label>

																<select name="type" id="shop-adtype" style="margin-left: 50px;">
																	<option value="hot" >热门钻展</option>
																	<option value="normal" >普通钻展</option>
																	<!-- 
																	<option value="tb_cu" >淘宝促销（天天特价、淘金币、付邮试用）</option>
																	 -->
																	<option value="activity" >淘宝活动（双11、双12、超级卖霸）</option>
																	<option value="taobaoke" >淘宝客</option>
																	<option value="ztc" >直通车</option>
																	<option value="hot_mobile" >手机热门钻展</option>
																	<option value="activity_mobile" >手机淘宝活动</option>
																	<option value="sale" >搭配减价</option>
																</select>
															</div>
															
															<div class="widget-elem">
																<label for="shop-d43211">时间</label>
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="shop-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="shop-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
															</div>
															
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="shopad-search-btn" class="btn btn-sm btn-success">
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
													<table id="shop-ad-table" class="table table-striped table-bordered table-hover">
														<thead>
														</thead>
			
														<tbody>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="goodsAd" class="tab-pane fade ">
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
																<label for="goods-adtype">广告类别</label>
		
																<select id="goods-adtype" style="margin-left: 50px;">
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
															
															<div class="widget-elem" >
																<label for="goods-prdname">宝贝名称</label>
					
																<input type="text" id="goods-prdname" placeholder="请输入宝贝名称" size="50" style="margin-left: 50px;"/>
															</div>
															
															<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
																<button type="button" id="goodsad-search-btn" class="btn btn-sm btn-success">
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
													<table id="goods-ad-table" class="table table-striped table-bordered table-hover">
														<thead>
														</thead>
			
														<tbody>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									
									<div id="gen" class="tab-pane fade">
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
																<input style="margin-left: 80px;padding: 0 0;height:auto;" size="15" type="text" value="${param.date}" class="Wdate" id="gen-d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-60}',maxDate:'#F{$dp.$D(\'d43222\')||\'%y-%M-%d\'}'})"/>
																到
																<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="${param.date}" id="gen-d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d43211\')||\'%y-%M-{%d-60}\';}',maxDate:'%y-%M-%d'})"/>
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
	
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/columns.js"></script>
	<script src="../assets/js/shopDetail.js"></script>
	
	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var shopDetail = {};
		shopDetail.path = "${ctx}";
		shopDetail.shopId = "${param.shopId}";
		shopDetail.shopName = "${param.shopName}";
		shopDetail.itemId = "${param.itemId}";
		shopDetail.date = "${param.date}";
		shopDetail.tab = "${param.tab}";
		shopDetail.ad = "${param.ad}";
		shopDetail.gen = "${param.gen}";
		
	</script>	
</body>
</html>