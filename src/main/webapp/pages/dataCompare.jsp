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

</head>
<body>
	
	<input type="hidden" id="searchType">
	<input type="hidden" id="toCat">
	<input type="hidden" id="adid" value="${param.adid }">
	
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
						<li>数据对比 </li>
						<li>行业VS店铺VS品牌数据对比</li>
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
													<label>请选择对比方式</label>
														
													<label style="margin-left: 50px;">
														<input name="showType" type="radio" value="day" class="ace" checked />
														<span class="lbl"> 按日对比</span>
													</label>
													<label>
														<input name="showType" type="radio" value="month" class="ace" />
														<span class="lbl"> 按月对比</span>
													</label>
												</div>
											
												<div class="widget-elem" id="dayDiv">
													<label for="trend-d4321">请选择时间范围</label>
													<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getLastMonthDate() %>" class="Wdate" id="trend-d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-7}',maxDate:'#F{$dp.$D(\'trend-d4322\')||\'%y-%M-%d\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" id="trend-d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'trend-d4321\')||\'%y-%M-{%d-7}\';}',maxDate:'%y-%M-%d'})"/>
												</div>
												
												<div class="widget-elem" id="monthDiv" style="display:none;">
													<label for="trend-d4321-month">请选择时间范围</label>
													<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="trend-d4321-month" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'trend-d4322-month\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="trend-d4322-month" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'trend-d4321-month\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
												</div>
												
												<div class="widget-elem">
													<label for="compareType">对比指标</label>
														
													<label style="margin-left: 92px;">
														<input name="compareType" value="volume" type="radio" class="ace" checked />
														<span class="lbl"> 销量</span>
													</label>
													<label>
														<input name="compareType" value="amount" type="radio" class="ace" />
														<span class="lbl"> 销售额</span>
													</label>
													<label>
														<input name="compareType" value="count" type="radio" class="ace" />
														<span class="lbl"> 成交次数</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label>查看类型</label>
														
													<label style="margin-left: 92px;">
														<input name="chartType" type="radio" value="1" class="ace" checked />
														<span class="lbl"> 图表</span>
													</label>
													<label>
														<input name="chartType" type="radio" value="2" class="ace"/>
														<span class="lbl"> 数据表</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label>对比条件选择(最多选择10个比较)</label>
														
													<a href="javascript:" id="add_new" hidefocus="true" style="outline: none"><img alt="添加新选项" title="添加新选项" src="${ctx }/assets/imagesLocal/op_add.png" onclick="addnewItem()"></a>
												</div>
												<div class="widget-elem">
													
													<label style="width:100px;">1:</label>
												
													<select id="select_1_1" name="select_1_1"
														onchange="select_compare_type(1)">
														<option value="0">请选择比较项</option>
														<option value="1">店铺</option>
														<option value="2">行业</option>
												
														<option value="3">品牌</option>
													</select>
													<select id="select_1_2" name="select_1_2" ><option
															value="1">天猫</option></select>
													<select id="select_1_3" name="select_1_3"
														style="width: 150px; z-index: -1;"><option value="27">J
															- 家装主材</option></select>
													<select id="select_1_4" name="select_1_4"
														style="width: 150px; z-index: -1;"><option value="0"
															selected="">选择类目</option>
														<option value="122960001">B - 背景墙软包/床头套/工艺软包</option>
														<option value="50002409">C - 厨房</option>
														<option value="50022270">C - 瓷砖</option>
														<option value="50022271">D - 地板</option>
														<option value="50019935">D - 灯具灯饰</option>
														<option value="50008725">E - 二手/闲置专区</option>
														<option value="50013217">G - 光源</option>
														<option value="2159">H - 环保/除味/保养</option>
														<option value="50019835">J - 集成吊顶</option>
														<option value="50020966">L - 晾衣架/晾衣杆</option>
														<option value="120850004">O - O2O专用（天猫专用）</option>
														<option value="50008321">Q - 其它</option>
														<option value="50013322">Q - 墙纸</option>
														<option value="50020007">W - 卫浴用品</option>
														<option value="50013222">Y - 油漆</option>
														<option value="50020573">Y - 浴霸</option></select>
													<select id="select_1_5" name="select_1_5"
														style="width: 150px; z-index: -1;"><option value="0"
															selected="">选择类目</option>
														<option value="50024948">B - 背景墙软包</option>
														<option value="50024950">C - 床头套</option>
														<option value="50020748">G - 工艺软包</option>
														<option value="50024949">T - 天花板软包</option></select>
													<select id="select_1_6" name="select_1_6"
														style="width: 150px; z-index: -1;"><option value="0"
															selected="">选择属性</option>
														<option value="2">图案</option>
														<option value="9">型号</option>
														<option value="4">软包表面材质</option>
														<option value="1">颜色分类</option>
														<option value="3">风格</option></select>
													<select id="select_1_7" name="select_1_7"
														style="width: 150px; z-index: -1;"><option value="其他/other">其他/other</option>
														<option value="几何图案">几何图案</option>
														<option value="卡通动漫">卡通动漫</option>
														<option value="叶子">叶子</option>
														<option value="喜庆">喜庆</option>
														<option value="圆圈">圆圈</option>
														<option value="心形">心形</option>
														<option value="条纹">条纹</option>
														<option value="格子">格子</option>
														<option value="植物花卉">植物花卉</option>
														<option value="纯色">纯色</option>
														<option value="风景">风景</option></select>
												</div>
												
												<div class="widget-elem">
													
													<label style="width:100px;">2:</label>
												
													<select id="select_1_1" name="select_1_1"
														onchange="select_compare_type(1)">
														<option value="0">请选择比较项</option>
														<option value="1">店铺</option>
														<option value="2">行业</option>
												
														<option value="3">品牌</option>
													</select>
													<a href="javascript:" id="del_old" hidefocus="true" style="outline: none"><img alt="删除选项" title="删除选项" src="${ctx }/assets/imagesLocal/op_delete.png" onclick="deloldItem()"></a>
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
									                <th style="text-align:right">11</th>
									                <th style="text-align:right">11</th>
									                <th style="text-align:right">11</th>
									            </tr>
									        </tfoot>
										</table>
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
	<script src="../assets/js/dataCompare.js"></script>

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