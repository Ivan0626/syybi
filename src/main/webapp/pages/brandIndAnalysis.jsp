<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>品牌分析</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />

</head>
<body>
	
	<!-- 选中的行业或者类目编号 -->
	<input type="hidden" id="selected-no" />
	<input type="hidden" id="propName" />
	<input type="hidden" id="catNos" value="${catNos }" />
	<input type="hidden" id="catDataList" value='${catDataList }' />
	
	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed')}catch(e){}
		</script>

		<!-- #section:basics/syy-sidebar -->
		<div class="syy-sidebar">
		    <div class="box-shadow">
		        <div class="syy-sidebar-content">
		            <div class="syy-sidebar-inner">
		                <h4><a href="${ctx }/a/BrandAnalysis?m=brand_ind&brandName=<%=URLEncoder.encode(request.getParameter("brandName"), "utf-8") %>"><strong>所有类目</strong></a></h4>
		                <div class="fz-14" id="syy-sidebar_category">
		                    <ul>
		                    	<c:forEach items="${catList }" var="cat">
		                    		<li> <a href="javascript:void(0);" onclick="loadCat('${cat.catNo}', '${cat.catName }')" >${cat.catName }</a> </li>
		                    	</c:forEach>
		                    </ul>
		                </div>
		            </div>
		        </div>
		    </div>
		</div>

		<!-- /section:basics/syy-sidebar -->
		<div class="main-content" id="load-content" style="margin-left: 280px;">
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
						<li><a href="${ctx }/a/BrandAnalysis">品牌列表</a></li>
						<li><a href="${ctx }/a/BrandAnalysis?brandName=<%=URLEncoder.encode(request.getParameter("brandName"), "utf-8") %>"><%=java.net.URLDecoder.decode(request.getParameter("brandName"), "utf-8") %></a></li>
						<li>品牌统计</li>
						<li class="active">行业规模</li>
					</ul><!-- /.breadcrumb -->

				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					
					<%@ include file="/pages/aceSettings.jsp"%>
					
					<div class="row" id="ajax-content">
					
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
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	
	<script src="../assets/js/bootbox.js"></script>
	
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option1.js"></script>
	<script src="../assets/js/option2_2.js"></script>
	<script src="../assets/js/option5.js"></script>
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	
	<script src="../assets/js/common.js"></script>
	<script src="../assets/js/brandIndAnalysis.js"></script>
	
	<script type="text/javascript">
		//=================================================类目树===================================================
		
		$(function(){
			
			var catList = $.parseJSON($('#catDataList').val());
			
			if(catList && catList.length > 0){
				
				//加载图表或数据表
				var chartWay = $('input[name="chartWay"]:checked').val();
				
				$('#chartDiv').show();
				$('#tableDiv').hide();
				
				renderChart(option1(catList, chartWay, '各类别'),'echarts-scale');
				
			}
		});	
			
		//加载类目下的子类目信息以及父级（父类目或者行业）
		function loadCat(catNo, catName){
			$.post(global.path+'/a/Category', {
		    'catNo': catNo,
		    'method': "loadCat"
		}, function(data) {
			
			if(data && data.childCats && data.parentCat && data.catDataList){
				
				var childCats = data.childCats;
				//var parentCat = data.parentCat;
				
				/* var html = '<div class="parent">';
				if(parentCat.flag == 'ind'){//父级类目为行业
					html += '<a href="javascript:void(0);" onclick=loadInd(\"'+parentCat.catNo+'\",\"'+parentCat.catName+'\");>'+parentCat.catName+'</a>';
				}else if(parentCat.flag == 'cat'){//父级类目为类目
					html += '<a href="javascript:void(0);" onclick=loadCat(\"'+parentCat.catNo+'\",\"'+parentCat.catName+'\");>'+parentCat.catName+'</a>';
				}
				
				html += '</div>'; */
				
				var html = '<div class="selected" data-cat="'+catNo+'">'+catName+'</div>';
					html += '<ul>';
				
				$.each(childCats, function(idx, d){
					if(d.isParent == '0'){//没有子类目，即叶子节点，需要加载叶子节点下的属性
						html += '<li> <a href="javascript:void(0);" onclick=loadProp(\"'+d.catNo+'\",\"'+d.catName+'\");>'+d.catName+'</a></li>';
					}else{
						html += '<li> <a href="javascript:void(0);" onclick=loadCat(\"'+d.catNo+'\",\"'+d.catName+'\");>'+d.catName+'</a></li>';
					}
				});
				html += '</ul>';
				$("#syy-sidebar_category").empty().html(html);
				
				
				
				$('#ajax-content').load(global.path+'/pages/industrySubAnalysis.jsp',{}, function(){
					
					// 选中navbar
					$('#syy-nav').find('.active').each(function() {
						var $class = 'active';
						if ($(this).hasClass('hover'))
							$class += ' open';

						$(this).removeClass($class);
					});
					$('#syy-brandAnalysis').addClass('active open');
					
					var $curSelecedNav = $('.breadcrumb > .active > a:contains("'+catName+'")');
					
					if($curSelecedNav.length > 0){
						$curSelecedNav.parent().prev().nextAll('li.active').remove();
					}else{
						$('.breadcrumb .active:last').remove();
					}
					//$('.breadcrumb').append('<li class="active"><a href="javascript:void(0);" data-no="'+parentCat.catNo+'" onclick=\"loadInd(\''+parentCat.catNo+'\', \''+parentCat.catName+'\')\">'+parentCat.catName+'</a></li>');
					$('.breadcrumb').append('<li class="active"><a href="javascript:void(0);" data-no="'+catNo+'" onclick=\"loadCat(\''+catNo+'\', \''+catName+'\')\">'+catName+'</a></li>');
					
					$('.breadcrumb').append('<li class="active">子行业规模 (类目报表)</li>');
					
					//选中tab1
					$("#tab1").parent().addClass("active");
					$("#tab2,#tab3,#tab4").parent().removeClass("active");
					$("#scaleSub").addClass("in active");
					$("#trendSub,#goods,#shop").removeClass("in active");
					
					$('#selected-no').val(catNo);
					$('#propName').val('');
					
					//加载子行业数据图表
					var chartWay = $('input[name="chartWay"]:checked').val();
					
					$('#echarts-scale').css('height', '1000px');
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					
					renderChart(option1(data.catDataList, chartWay, '各类别'),'echarts-scale');
				});
				
			}
		}, 'json');
		}
		
		//加载叶子节点下的属性以及父类目
		function loadProp(catNo, catName){
			
			$.post(global.path+'/a/Category',{
				'catNo': catNo,
				'method': 'loadProp'
			}, function(data){
				
				if(data && data.childProps && data.parentCat){
					
					var childProps = data.childProps;
					var parentCat = data.parentCat;
					
					var html = '<div class="parent">';
					//父级类目为类目
					html += '<a href="javascript:void(0);" onclick=loadCat(\"'+parentCat.catNo+'\",\"'+parentCat.catName+'\");>'+parentCat.catName+'</a>';
					
					html += '</div>';
					
					html += '<div class="selected" data-cat="'+catNo+'">'+catName+'</div>';
					html += '<ul id="prop-list">';
					
					$.each(childProps, function(idx, d){
						html += '<li> <a href="javascript:void(0);" onclick=\"loadLeaf(this, \''+d.propName+'\')\">'+d.propName+'</a></li>';
					});
					html += '</ul>';
					$("#syy-sidebar_category").empty().html(html);
					
					$('#ajax-content').load(global.path+'/pages/indBrandAnalysis.jsp',{}, function(){
						
						// 选中navbar
						$('#syy-nav').find('.active').each(function() {
							var $class = 'active';
							if ($(this).hasClass('hover'))
								$class += ' open';

							$(this).removeClass($class);
						});
						$('#syy-brandAnalysis').addClass('active open');
						
						var $curSelecedNav = $('.breadcrumb > .active > a:contains("'+catName+'")');
						if($curSelecedNav.length > 0){
							$curSelecedNav.parent().prev().nextAll('li.active').remove();
						}else{
							$('.breadcrumb .active:last').remove();
						}
						
						//$('.breadcrumb').append('<li class="active"><a href="javascript:void(0);" data-no="'+parentCat.catNo+'" onclick=\"loadInd(\''+parentCat.catNo+'\', \''+parentCat.catName+'\')\">'+parentCat.catName+'</a></li>');
						$('.breadcrumb').append('<li class="active"><a href="javascript:void(0);" data-no="'+catNo+'" onclick=\"loadProp(\''+catNo+'\', \''+catName+'\')\">'+catName+'</a></li>');
						
						$('.breadcrumb').append('<li class="active">各品牌规模 (子类报表)</li>');
						
						//各品牌数据
						$('#selected-no').val(catNo);
						$('#propName').val('');
						
						//加载子行业数据图表
						var chartWay = $('input[name="chartWay"]:checked').val();
						
						$('#chartDiv').show();
						$('#tableDiv').hide();
						
						renderChart(option1(data.catDataList, chartWay, '各品牌'),'echarts-scale');
					});
				}
				
			},'json');
			
		}
		
		//加载属性的报表
		function loadLeaf(obj, propName){
			
			$('#prop-list > li > a').removeClass('props-showy');
			
			$(obj).addClass('props-showy');
			
			var $seleced = $('#prop-list').prev();
			$seleced.html('<a href="javascript:void(0);" onclick=\"loadProp(\''+$seleced.attr('data-cat')+'\',\''+$seleced.text()+'\')\">'+$seleced.text()+'</a>');
			
			var catNo = $('#selected-no').val();
			$('#ajax-content').load(global.path+'/pages/propAnalysis.jsp',{}, function(){
				
				// 选中navbar
				$('#syy-nav').find('.active').each(function() {
					var $class = 'active';
					if ($(this).hasClass('hover'))
						$class += ' open';

					$(this).removeClass($class);
				});
				$('#syy-brandAnalysis').addClass('active open');
				
				var $curSelecedNav = $('.breadcrumb > .active > a:contains("'+propName+'")');
				if($curSelecedNav.length > 0){
					$curSelecedNav.parent().prev().nextAll('li.active').remove();
				}else{
					
					if($('#propName').val()){//属性列表同级切换
						$('.breadcrumb .active:last').prev().remove();
					}
					$('.breadcrumb .active:last').remove();
					
				}
				
				$('.breadcrumb').append('<li class="active"><a href="javascript:void(0);" data-no="'+propName+'" onclick=\"loadLeaf(\''+obj+'\', \''+propName+'\')\">'+propName+'</a></li>');
				
				$('.breadcrumb').append('<li class="active">属性规模 (属性报表)</li>');
				
				//各属性数据
				$('#selected-no').val(catNo);
				$('#propName').val(propName);
				
				//加载子行业数据图表
				var chartWay = $('input[name="chartWay"]:checked').val();
				
				$('#chartDiv').show();
				$('#tableDiv').hide();
				
				$.post(global.path+'/a/Category', {
					'catNo': catNo,
					'propName': propName,
					'method': 'loadLeaf'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					
					//加载图表或数据表
					renderChart(option1(data, chartWay,'各'+propName),'echarts-scale');
					
				},'json');
				
			});
		}
		
	</script>
</body>
</html>