<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>宝贝分析</title>

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
						<li>宝贝分析</li>
						<li><a href="${ctx }/a/ShopAnalysis">宝贝列表</a></li>
						<li class="active">宝贝搜索</li>
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
														<div class="col-xs-12 col-sm-6">
															<div class="widget-elem" id="cat-append">
																<label for="cat">商品类别</label>
			
																<select id="s0" name="cat"  style="margin-left: 100px;" onchange="addCat(0)">
																	<option value="">请选择</option>
																	<c:forEach items="${catList }" var="catVar">
																		<option value="${catVar.catNo }" data-category="${catVar.category }" data-hasChild="${catVar.hasChild }">${catVar.catName }</option>
																	</c:forEach>
																</select>
															</div>
															
															<div class="widget-elem" >
																<label for="shopName">店铺名称</label>
					
																<input type="text" id="shopName" name="shopName" size="50" style="margin-left: 100px;"/>
															</div>
															
															<div class="widget-elem">
																<label for="shopType">搜索范围</label>
																<label style="margin-left: 100px;">
																	<input name="shopType" value="TAOBAO" type="radio" class="ace" />
																	<span class="lbl"> 淘宝</span>
																</label>
																<label>
																	<input name="shopType" value="TMALL" type="radio" class="ace" checked />
																	<span class="lbl"> 天猫</span>
																</label>
																
																<label>
																	<input name="shopType" value="ALL" type="radio" class="ace" />
																	<span class="lbl"> 全部</span>
																</label>
															</div>
															
															<div class="widget-elem" >
																<label for="prdName">宝贝名称包含关键词</label>
					
																<input type="text" id="prdName" name="prdName" size="50" style="margin-left: 30px;"/>
															</div>
															<div class="widget-elem">
																<label for="startAvgPrice">标价范围</label>
			
																<input type="text" id="startAvgPrice" size="15" style="margin-left: 100px;"/>
																到
																<input type="text" id="endAvgPrice" size="15"/>
															</div>
															<div class="widget-elem">
																<label for="startVolumePre">上月销量范围</label>
			
																<input type="text" id="startVolumePre" size="15" style="margin-left: 72px;"/>
																到
																<input type="text" id="endVolumePre" size="15"/>
															</div>
															
															<div class="widget-elem">
																<label for="startAmountPre">上月销售额范围</label>
			
																<input type="text" id="startAmountPre" size="15" style="margin-left: 58px;"/>
																到
																<input type="text" id="endAmountPre" size="15"/>
															</div>
															
														</div>
														<div class="col-xs-12 col-sm-6">
															<div class="widget-elem">
																<label style="height: 30px;"></label>
															</div>
															
															<div class="widget-elem">
																<label for="region">商品所在地</label>
																<select id="region" name="region" style="margin-left: 92px;">
																	<option value="">请选择</option>
																	<option value="北京">北京</option>
																	<option value="天津">天津</option>
																	<option value="河北">河北</option>
																	<option value="山西">山西</option>
																	<option value="内蒙古">内蒙古</option>
																	<option value="辽宁">辽宁</option>
																	<option value="吉林">吉林</option>
																	<option value="黑龙江">黑龙江</option>
																	<option value="上海">上海</option>
																	<option value="江苏">江苏</option>
																	<option value="浙江">浙江</option>
																	<option value="安徽">安徽</option>
																	<option value="福建">福建</option>
																	<option value="江西">江西</option>
																	<option value="山东">山东</option>
																	<option value="河南">河南</option>
																	<option value="湖北">湖北</option>
																	<option value="湖南">湖南</option>
																	<option value="广东">广东</option>
																	<option value="广西">广西</option>
																	<option value="海南">海南</option>
																	<option value="重庆">重庆</option>
																	<option value="四川">四川</option>
																	<option value="贵州">贵州</option>
																	<option value="云南">云南</option>
																	<option value="西藏">西藏</option>
																	<option value="陕西">陕西</option>
																	<option value="甘肃">甘肃</option>
																	<option value="青海">青海</option>
																	<option value="宁夏">宁夏</option>
																	<option value="新疆">新疆</option>
																	<option value="香港">香港</option>
																	<option value="台湾">台湾</option>
																	<option value="澳门">澳门</option>
																</select>
															</div>
															
															<div class="widget-elem">
																<label></label>
															</div>
															
															<div class="widget-elem">
																<label for="notPrdName">宝贝名称不含关键词</label>
			
																<input type="text" id="notPrdName" name="notPrdName" size="50" style="margin-left: 36px;"/>
															</div>
															<div class="widget-elem">
																<label for="startAvgPriceTranPre">上月成交均价范围</label>
																<input type="text" id="startAvgPriceTranPre" size="15" style="margin-left: 50px;"/>
																到
																<input type="text" id="endAvgPriceTranPre" size="15"/>
															</div>
															<div class="widget-elem">
																<label for="startVolume">本月销量范围</label>
			
																<input type="text" id="startVolume" size="15" style="margin-left: 78px;"/>
																到
																<input type="text" id="endVolume" size="15"/>
															</div>
															
															<div class="widget-elem">
																<label for="startAmount">本月销售额范围</label>
			
																<input type="text" id="startAmount" size="15" style="margin-left: 64px;"/>
																到
																<input type="text" id="endAmount" size="15"/>
															</div>
														</div>
													</div>
												</form>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="goods-search-btn" class="btn btn-sm btn-success">
														<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
														宝贝搜索
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row" id="goodsDiv" style="display:none;">
								<div class="col-xs-12">

									<div class="pull-right" style="margin-top: 15px;">
										<select id="toDir" name="toDir">
											<c:forEach items="${dirList }" var="dir">
												<option value="${dir.adid }">${dir.dir_name }</option>
											</c:forEach>
											
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
													<th rowspan="2">宝贝名称</th>
													<th rowspan="2">店铺名称</th>
													<th rowspan="2">标价</th>
													<th rowspan="2">上月均价</th>
													<th colspan="2" style="text-align:center;">销量</th>
													<th colspan="2" style="text-align:center;">成交次数</th>
													<th colspan="2" style="text-align:center;">销售额</th>
													<th rowspan="2">地域</th>
													<th rowspan="2">更新时间</th>
													<th style="text-align:center;" rowspan="2">
														<label class="pos-rel">
															<input type="checkbox" class="ace" />
															<span class="lbl"></span>
														</label>
														全选
													</th>
												</tr>
												<tr role="row">
													<th>当月</th>
													<th>上月</th>
													<th>当月</th>
													<th>上月</th>
													<th>当月</th>
													<th>上月</th>
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
	<script src="../assets/js/goodsSearch.js"></script>

</body>
</html>