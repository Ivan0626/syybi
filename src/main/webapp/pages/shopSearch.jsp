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
						<li>运营分析</li>
						<li><a href="${ctx }/a/MarketAnalysis">店铺列表</a></li>
						<li class="active">飙量店铺搜索</li>
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
												<div class="widget-elem">
													<label for="form-field-select-1">广告类别</label>
													
													<label class="ml-5" for="types-1" style="margin-left: 100px;">
                                                        <img class="hide" alt="热门钻展" title="热门钻展" src="${ctx}/assets/imagesLocal/hot.png">
                                                        <img class="" alt="热门钻展" title="热门钻展" src="${ctx}/assets/imagesLocal/hot_off.png">
                                                	</label>
                                                	<input class="hide" id="types-1" name="types" value="1" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-2">
                                                        <img class="hide" alt="普通钻展" title="普通钻展" src="${ctx}/assets/imagesLocal/normal.png">
                                                        <img class="" alt="普通钻展" title="普通钻展" src="${ctx}/assets/imagesLocal/normal_off.png">
                                                	</label>
                                                        <input class="hide" id="types-2" name="types" value="2" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-3">
                                                        <img class="hide" alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="${ctx}/assets/imagesLocal/tbpromo.png">
                                                        <img class="" alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="${ctx}/assets/imagesLocal/tbpromo_off.png">
                                                	</label>
                                                        <input class="hide" id="types-3" name="types" value="3" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-4">
                                                        <img class="hide" alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="${ctx}/assets/imagesLocal/activity.png">
                                                        <img class="" alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="${ctx}/assets/imagesLocal/activity_off.png">
                                                	</label>
                                                        <input class="hide" id="types-4" name="types" value="4" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-5">
                                                        <img class="hide" alt="淘宝客" title="淘宝客" src="${ctx}/assets/imagesLocal/taobaoke.png">
                                                        <img class="" alt="淘宝客" title="淘宝客" src="${ctx}/assets/imagesLocal/taobaoke_off.png">
                                                	</label>
                                                        <input class="hide" id="types-5" name="types" value="5" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-6">
                                                        <img class="hide" alt="直通车" title="直通车" src="${ctx}/assets/imagesLocal/zhitongche.png">
                                                        <img class="" alt="直通车" title="直通车" src="${ctx}/assets/imagesLocal/zhitongche_off.png">
                                                	</label>
                                                        <input class="hide" id="types-6" name="types" value="6" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-7">
                                                        <img class="hide" alt="聚划算" title="聚划算" src="${ctx}/assets/imagesLocal/juhuasuan.png">
                                                        <img class="" alt="聚划算" title="聚划算" src="${ctx}/assets/imagesLocal/juhuasuan_off.png">
                                                	</label>
                                                        <input class="hide" id="types-7" name="types" value="7" type="checkbox">
                                                    <!-- 
                                                	<label class="ml-5" for="types-9">
                                                        <img class="hide" alt="品牌团" title="品牌团" src="${ctx}/assets/imagesLocal/pinpaituan.png">
                                                        <img class="" alt="品牌团" title="品牌团" src="${ctx}/assets/imagesLocal/pinpaituan_off.png">
                                                	</label>
                                                        <input class="hide" id="types-9" name="types" value="9" type="checkbox">
                                                     -->      
                                                	<label class="ml-5" for="types-8">
                                                        <img class="hide" alt="商品促销" title="商品促销" src="${ctx}/assets/imagesLocal/promo.png">
                                                        <img class="" alt="商品促销" title="商品促销" src="${ctx}/assets/imagesLocal/promo_off.png">
                                                	</label>
                                                        <input class="hide" id="types-8" name="types" value="8" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-11">
                                                        <img class="hide" alt="手机热门钻展" title="手机热门钻展" src="${ctx}/assets/imagesLocal/hot_mobile.png">
                                                        <img class="" alt="手机热门钻展" title="手机热门钻展" src="${ctx}/assets/imagesLocal/hot_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="types-11" name="types" value="11" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-13">
                                                        <img class="hide" alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="${ctx}/assets/imagesLocal/tbpromo_mobile.png">
                                                        <img class="" alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="${ctx}/assets/imagesLocal/tbpromo_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="types-13" name="types" value="13" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-12">
                                                        <img class="hide" alt="手机淘宝活动" title="手机淘宝活动" src="${ctx}/assets/imagesLocal/activity_mobile.png">
                                                        <img class="" alt="手机淘宝活动" title="手机淘宝活动" src="${ctx}/assets/imagesLocal/activity_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="types-12" name="types" value="12" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-14">
                                                        <img class="hide" alt="手机直通车" title="手机直通车" src="${ctx}/assets/imagesLocal/zhitongche_mobile.png">
                                                        <img class="" alt="手机直通车" title="手机直通车" src="${ctx}/assets/imagesLocal/zhitongche_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="types-14" name="types" value="14" type="checkbox">
                                                          
                                                	<label class="ml-5" for="types-10">
                                                        <img class="hide" alt="手机促销" title="手机促销" src="${ctx}/assets/imagesLocal/promo_mobile.png">
                                                        <img class="" alt="手机促销" title="手机促销" src="${ctx}/assets/imagesLocal/promo_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="types-10" name="types" value="10" type="checkbox">
												</div>
												<div class="widget-elem">
													<label for="form-field-select-1">排除的广告类别</label>
													
													<label class="ml-5" for="ntypes-1" style="margin-left: 58px;">
                                                        <img class="hide" alt="热门钻展" title="热门钻展" src="${ctx}/assets/imagesLocal/hot.png">
                                                        <img class="" alt="热门钻展" title="热门钻展" src="${ctx}/assets/imagesLocal/hot_off.png">
                                                	</label>
                                                	<input class="hide" id="ntypes-1" name="ntypes" value="1" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-2">
                                                        <img class="hide" alt="普通钻展" title="普通钻展" src="${ctx}/assets/imagesLocal/normal.png">
                                                        <img class="" alt="普通钻展" title="普通钻展" src="${ctx}/assets/imagesLocal/normal_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-2" name="ntypes" value="2" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-3">
                                                        <img class="hide" alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="${ctx}/assets/imagesLocal/tbpromo.png">
                                                        <img class="" alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="${ctx}/assets/imagesLocal/tbpromo_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-3" name="ntypes" value="3" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-4">
                                                        <img class="hide" alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="${ctx}/assets/imagesLocal/activity.png">
                                                        <img class="" alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="${ctx}/assets/imagesLocal/activity_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-4" name="ntypes" value="4" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-5">
                                                        <img class="hide" alt="淘宝客" title="淘宝客" src="${ctx}/assets/imagesLocal/taobaoke.png">
                                                        <img class="" alt="淘宝客" title="淘宝客" src="${ctx}/assets/imagesLocal/taobaoke_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-5" name="ntypes" value="5" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-6">
                                                        <img class="hide" alt="直通车" title="直通车" src="${ctx}/assets/imagesLocal/zhitongche.png">
                                                        <img class="" alt="直通车" title="直通车" src="${ctx}/assets/imagesLocal/zhitongche_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-6" name="ntypes" value="6" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-7">
                                                        <img class="hide" alt="聚划算" title="聚划算" src="${ctx}/assets/imagesLocal/juhuasuan.png">
                                                        <img class="" alt="聚划算" title="聚划算" src="${ctx}/assets/imagesLocal/juhuasuan_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-7" name="ntypes" value="7" type="checkbox">
                                                    <!-- 
                                                	<label class="ml-5" for="ntypes-9">
                                                        <img class="hide" alt="品牌团" title="品牌团" src="${ctx}/assets/imagesLocal/pinpaituan.png">
                                                        <img class="" alt="品牌团" title="品牌团" src="${ctx}/assets/imagesLocal/pinpaituan_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-9" name="ntypes" value="9" type="checkbox">
                                                     -->      
                                                	<label class="ml-5" for="ntypes-8">
                                                        <img class="hide" alt="商品促销" title="商品促销" src="${ctx}/assets/imagesLocal/promo.png">
                                                        <img class="" alt="商品促销" title="商品促销" src="${ctx}/assets/imagesLocal/promo_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-8" name="ntypes" value="8" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-11">
                                                        <img class="hide" alt="手机热门钻展" title="手机热门钻展" src="${ctx}/assets/imagesLocal/hot_mobile.png">
                                                        <img class="" alt="手机热门钻展" title="手机热门钻展" src="${ctx}/assets/imagesLocal/hot_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-11" name="ntypes" value="11" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-13">
                                                        <img class="hide" alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="${ctx}/assets/imagesLocal/tbpromo_mobile.png">
                                                        <img class="" alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="${ctx}/assets/imagesLocal/tbpromo_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-13" name="ntypes" value="13" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-12">
                                                        <img class="hide" alt="手机淘宝活动" title="手机淘宝活动" src="${ctx}/assets/imagesLocal/activity_mobile.png">
                                                        <img class="" alt="手机淘宝活动" title="手机淘宝活动" src="${ctx}/assets/imagesLocal/activity_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-12" name="ntypes" value="12" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-14">
                                                        <img class="hide" alt="手机直通车" title="手机直通车" src="${ctx}/assets/imagesLocal/zhitongche_mobile.png">
                                                        <img class="" alt="手机直通车" title="手机直通车" src="${ctx}/assets/imagesLocal/zhitongche_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-14" name="ntypes" value="14" type="checkbox">
                                                          
                                                	<label class="ml-5" for="ntypes-10">
                                                        <img class="hide" alt="手机促销" title="手机促销" src="${ctx}/assets/imagesLocal/promo_mobile.png">
                                                        <img class="" alt="手机促销" title="手机促销" src="${ctx}/assets/imagesLocal/promo_mobile_off.png">
                                                	</label>
                                                        <input class="hide" id="ntypes-10" name="ntypes" value="10" type="checkbox">
												</div>
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
													<label for="startReAmount">相关类目销售额</label>

													<input type="text" id="startReAmount" size="15" style="margin-left: 58px;"/>
													到
													<input type="text" id="endReAmount" size="15"/>
												</div>
												<div class="widget-elem">
													<label>搜索范围</label>
																	
													<label style="margin-left: 100px;">
														<input name="shopType" type="radio" value="TMALL" class="ace" checked />
														<span class="lbl"> 天猫</span>
													</label>
													<label>
														<input name="shopType" type="radio" value="TAOBAO" class="ace" />
														<span class="lbl"> 淘宝</span>
													</label>
												</div>
												<div class="widget-elem">
													<label for="startMonthAmount">店铺月销售额</label>

													<input type="text" id="startMonthAmount" size="15" style="margin-left: 72px;"/>
													到
													<input type="text" id="endMonthAmount" size="15"/>
												</div>
												<div class="widget-elem">
													<label for="startRiseIndex">飙量指数</label>

													<input type="text" id="startRiseIndex" size="15" style="margin-left: 100px;"/>
													到
													<input type="text" id="endRiseIndex" size="15"/>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="rise-search-btn" class="btn btn-sm btn-success">
														<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
														飚量店铺搜索
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row" id="shopDiv" style="display:none;">
								<div class="col-xs-12"  style="position:relative;">

									<div class="clearfix" style="position:absolute;right:12px;top:10px;">
										
										<button class="pull-right btn btn-xs btn-success" id="batch-attn-btn" style="margin-top:5px;">
											<i class="ace-icon fa fa-check"></i>
											批量关注
										</button>
										
									</div>
									<!-- div.table-responsive -->

									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="shop-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th rowspan="2" colspan="1">店铺名称</th>
													<th rowspan="2" colspan="1">地域</th>
													<th rowspan="1" colspan="3" style="text-align:center">本月</th>
													<th rowspan="1" colspan="3" style="text-align:center">上月</th>
													<th rowspan="2" colspan="1">上月相关类目销售额</th>
													<th rowspan="2" colspan="1">飙量指数</th>
													<th rowspan="2" colspan="1">店铺广告</th>
													<th class="center" rowspan="2" colspan="1">
														<label class="pos-rel">
															<input type="checkbox" class="ace" />
															<span class="lbl"></span>
														</label>
														全选
													</th>
												</tr>
												<tr role="row">
													<th>销量</th>
													<th>销售额</th>
													<th>成交次数</th>
													<th>销量</th>
													<th>销售额</th>
													<th>成交次数</th>
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
	<script src="../assets/js/shopSearch.js"></script>

</body>
</html>