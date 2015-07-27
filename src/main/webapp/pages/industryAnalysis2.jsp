<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<div class="row">
		
			<div class="col-sm-12">
				<!-- #section:elements.tab -->
				<div class="tabbable">
					<ul class="nav nav-tabs" id="myTab">
						<li class="active">
							<a data-toggle="tab" id="tab1" href="#scale">
								<i class="green ace-icon fa fa-home bigger-120"></i>
								行业规模
							</a>
						</li>

						<li>
							<a data-toggle="tab" id="tab2" href="#trend">
								<i class="green ace-icon fa fa-home bigger-120"></i>
								行业趋势
							</a>
						</li>

					</ul>

					<div class="tab-content">
						<div id="scale" class="tab-pane fade in active">
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
													<label for="reType">报表类型</label>
														
													<label style="margin-left: 50px;">
														<input name="reType" value="month" type="radio" class="ace" checked />
														<span class="lbl"> 月报表</span>
													</label>
													<label>
														<input name="reType" value="week" type="radio" class="ace" disabled="disabled" />
														<span class="lbl"> 周报表</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label for="d4321">请选择月份</label>
		
													<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'d4322\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'d4321\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>

												</div>
												
												<div class="widget-elem">
													<label for="shopType">查看范围</label>
														
													<label style="margin-left: 50px;">
														<input name="shopType" value="ALL" type="radio" class="ace" />
														<span class="lbl"> 全部</span>
													</label>
													<label>
														<input name="shopType" value="TMALL" type="radio" class="ace" checked />
														<span class="lbl"> 天猫</span>
													</label>
													<label>
														<input name="shopType" value="TAOBAO" type="radio" class="ace" />
														<span class="lbl"> 淘宝</span>
													</label>
												</div>
												<div class="widget-elem">
													<label for="chartType">图表类型</label>
														
													<label style="margin-left: 50px;">
														<input name="chartType" value="bar" type="radio" class="ace" checked />
														<span class="lbl"> 条形图</span>
													</label>
													<label>
														<input name="chartType" value="pie" type="radio" class="ace" />
														<span class="lbl"> 饼图</span>
													</label>
													<label>
														<input name="chartType" value="data" type="radio" class="ace" />
														<span class="lbl"> 数据表</span>
													</label>
												</div>
												
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="search-scale-btn" class="btn btn-sm btn-success">
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
				          		<div class="col-md-12" id="echarts-scale" style="height:250px;"></div>
					        </div>
							<div class="row" id="tableDiv" style="display:none;">
								<div class="col-xs-12">
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="scale-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th>类别名称</th>
													<th>销量</th>
													<th>销量占比</th>
													<th>销售额</th>
													<th>销售额占比</th>
													<th>成交次数</th>
													<th>成交次数占比</th>
												</tr>
											</thead>

											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<div id="trend" class="tab-pane fade">
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
													<label for="reType2">报表类型</label>
														
													<label style="margin-left: 50px;">
														<input name="reType2" value="month" type="radio" class="ace" checked />
														<span class="lbl"> 月报表</span>
													</label>
													<label>
														<input name="reType2" value="week" type="radio" class="ace" disabled="disabled" />
														<span class="lbl"> 周报表</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label for="d432112">请选择月份</label>
													<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="d432112" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'d432222\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getCurMonth() %>" id="d432222" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'d432112\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
												</div>
												
												<div class="widget-elem">
													<label for="shopType2">查看范围</label>
													<label style="margin-left: 50px;">
														<input name="shopType2" value="ALL" type="radio" class="ace" />
														<span class="lbl"> 全部</span>
													</label>
													<label>
														<input name="shopType2" value="TMALL" type="radio" class="ace" checked />
														<span class="lbl"> 天猫</span>
													</label>
													<label>
														<input name="shopType2" value="TAOBAO" type="radio" class="ace" />
														<span class="lbl"> 淘宝</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label for="chartType2">图表类型</label>
													<label style="margin-left: 50px;">
														<input name="chartType2" value="data" type="radio" class="ace" checked />
														<span class="lbl"> 数据表</span>
													</label>
													<label>
														<input name="chartType2" value="line" type="radio" class="ace" />
														<span class="lbl"> 折线图</span>
													</label>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="search-trend-btn" class="btn btn-sm btn-success">
														检索
														<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row placeholders" id="chartDiv2" style="display:none;">
								<div class="col-md-12">
									<input name="chartWay2" value="volume" type="radio" class="ace" checked /><span class="lbl"> 销量</span>
									<input name="chartWay2" value="amount" type="radio" class="ace" /><span class="lbl"> 销售额</span>
									<input name="chartWay2" value="count" type="radio" class="ace" /><span class="lbl"> 成交次数</span>
								</div>
				          		<div class="col-md-12" id="echarts-trend" style="height:500px;"></div>
					        </div>
							<div class="row" id="tableDiv2" style="display:none;">
								<div class="col-xs-12">
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="trend-table" class="table table-striped table-bordered table-hover">
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

<script src="../assets/js/industryAnalysis.js"></script>
		