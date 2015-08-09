<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据对比</title>

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
												
													<select id="select_1_1" name="select_1_1" onchange="select_compare_type(1)">
														<option value="0">请选择比较项</option>
														<option value="1">店铺</option>
														<option value="2">行业</option>
														<option value="3">品牌</option>
													</select>
													<span id="type_append_1"></span>
												</div>
												
												<div class="widget-elem">
													
													<label style="width:100px;">2:</label>
												
													<select id="select_2_1" name="select_2_1" onchange="select_compare_type(2)">
														<option value="0">请选择比较项</option>
														<option value="1">店铺</option>
														<option value="2">行业</option>
														<option value="3">品牌</option>
													</select>
													<span id="type_append_2"></span>
													<a href="javascript:" id="del_old" hidefocus="true" style="outline: none">
														<img alt="删除选项" title="删除选项" src="${ctx }/assets/imagesLocal/op_delete.png" onclick="deloldItem()">
													</a>
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
	
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	<script src="../assets/js/bootbox.js"></script>
	
	<!-- echarts库必须在bootbox之后加载 -->
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option3.js"></script>
	<script src="../assets/js/option9.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/dataCompare.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
		
	</script>	
</body>
</html>