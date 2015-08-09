<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>

<div class="row">
		
			<div class="col-sm-12">
				<!-- #section:elements.tab -->
				<div class="tabbable">
					<ul class="nav nav-tabs" id="myTab">
						<li class="active">
							<a data-toggle="tab" id="tab1" href="#scaleProp">
								<i class="green ace-icon fa fa-home bigger-120"></i>
								属性规模
							</a>
						</li>

						<li>
							<a data-toggle="tab" id="tab2" href="#trendProp">
								<i class="green ace-icon fa fa-home bigger-120"></i>
								属性趋势
							</a>
						</li>
						
						<li>
							<a data-toggle="tab" id="tab3" href="#goods">
								<i class="green ace-icon fa fa-home bigger-120"></i>
								热销宝贝
							</a>
						</li>
						
					</ul>

					<div class="tab-content">
						<div id="scaleProp" class="tab-pane fade in active">
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
												
												<!-- <div class="widget-elem">
													<label for="brand">品牌查询</label>

													<select id="s0" name="brand"  style="margin-left: 50px;" >
														<option value="">...自定义</option>
													</select>
													
													<input class="typeahead scrollable" type="text" placeholder="请输入品牌名称" />
												</div> -->
												
												<div class="widget-elem">
													<label for="d4321">请选择月份</label>
		
													<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" value="<%=DateUtils.getCurMonth() %>" type="text" class="Wdate" id="d4321" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'d4322\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text"  value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="d4322" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'d4321\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
												</div>
												
												<div class="widget-elem">
													<label for="shopType">查看范围</label>
														
													<label style="margin-left: 50px;">
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
				          		<div class="col-md-12" id="echarts-scale" style="height:500px;"></div>
					        </div>
							<div class="row" id="tableDiv" style="display:none;">
								<div class="col-xs-12">
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="scale-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th>属性</th>
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

						<div id="trendProp" class="tab-pane fade">
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
												
												<!-- <div class="widget-elem">
													<label for="brand2">品牌查询</label>

													<select name="brand2"  style="margin-left: 50px;" >
														<option value="">...自定义</option>
													</select>
													
													<input class="typeahead scrollable" type="text" placeholder="请输入品牌名称" />
												</div> -->
												
												<div class="widget-elem">
													<label for="d432112">请选择月份</label>
													<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="d432112" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'d432222\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getCurMonth() %>" id="d432222" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'d432112\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
												</div>
												
												<div class="widget-elem">
													<label for="shopType2">查看范围</label>
													<label style="margin-left: 50px;">
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
						
						<div id="goods" class="tab-pane fade">
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
												
												<!-- <div class="widget-elem">
													<label for="prop">TOP20属性值</label>

													<select name="prop" style="margin-left: 26px;" >
														<option value="">3132456546</option>
														<option value="">3132456546</option>
														<option value="">3132456546</option>
														<option value="">3132456546</option>
													</select>
													
												</div> -->
												
												<div class="widget-elem">
													<label for="d432113">请选择月份</label>
													<input style="margin-left: 38px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getCurMonth() %>" class="Wdate" id="d432113" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'%y-{%M-2}',maxDate:'#F{$dp.$D(\'d432223\')||\'%y-%M\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getCurMonth() %>" id="d432223" onFocus="WdatePicker({dateFmt:'yyyy-MM',minDate:'#F{$dp.$D(\'d432113\')||\'%y-{%M-2}\';}',maxDate:'%y-%M'})"/>
												</div>
												
												<div class="widget-elem">
													<label for="shopType3">查看范围</label>
													<label style="margin-left: 50px;">
														<input name="shopType3" value="ALL" type="radio" class="ace" />
														<span class="lbl"> 全部</span>
													</label>
													<label>
														<input name="shopType3" value="TMALL" type="radio" class="ace" checked />
														<span class="lbl"> 天猫</span>
													</label>
													<label>
														<input name="shopType3" value="TAOBAO" type="radio" class="ace" />
														<span class="lbl"> 淘宝</span>
													</label>
												</div>
												
												<div class="widget-elem">
													<label for="orderWay3">排序方式</label>
													<label style="margin-left: 50px;">
														<input name="orderWay3" value="sales_volume" type="radio" class="ace" />
														<span class="lbl"> 销量</span>
													</label>
													<label>
														<input name="orderWay3" value="sales_amount" type="radio" class="ace" checked />
														<span class="lbl"> 销售额</span>
													</label>
													<label>
														<input name="orderWay3" value="tran_count" type="radio" class="ace" />
														<span class="lbl"> 成交次数</span>
													</label>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" id="search-goods-btn" class="btn btn-sm btn-success">
														检索
														<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="row" id="tableDiv3">
								<div class="col-xs-12">
									
									<div class="pull-right" style="margin-top: 15px;">
										<select id="toDir" name="toDir">
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
													<th>排名</th>
													<th>宝贝名称</th>
													<th>标价</th>
													<th>成交均价</th>
													<th>销量</th>
													<th>销售额</th>
													<th>成交次数</th>
													<th>掌柜</th>
													<th>地域</th>
													<th class="center">
														<label class="pos-rel">
															<input type="checkbox" class="ace" />
															<span class="lbl"></span>
														</label>
														全选
													</th>
												</tr>
											</thead>
		
											<tbody>
												<!-- <tr>
													<td>1</td>
													<td>
														<img width="60" height="60" src="http://img.alicdn.com/imgextra/i2/1936285526/TB2gHi.dpXXXXXEXpXXXXXXXXXX_!!1936285526.jpg_60x60q70.jpg" alt="商品图片">
														<a href="http://item.taobao.com/item.htm?id=45728176312" class="taobao_items_link" target="_blank">金煌腊味  广式风味腊肠、香菇口味香肠750g农家手工自制土特产</a>
													</td>
													<td>11</td>
													<td>22</td>
													<td>33</td>
													<td>44</td>
													<td>55</td>
													<td>
														<img src="/img/bc_shop_icon.png">
                                             					<a href="http://shop108086480.taobao.com" target="_blank"> 金煌旗舰店</a>
                                             				</td>
													<td>广东中山</td>
													<td><label class="pos-rel"><input type="checkbox" name="shopIds" value="" class="ace" /><span class="lbl"></span></label></td>
												</tr> -->
											</tbody>
											
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

<script src="../assets/js/propAnalysis.js"></script>
