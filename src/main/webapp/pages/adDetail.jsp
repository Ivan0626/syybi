<%@page import="java.net.URLEncoder"%>
<%@page import="com.sanyanyu.syybi.entity.DiamondDetail"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>钻展透视</title>

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
							<a href="${ctx }/a/Dashboard">首页</a>
						</li>
						<li>钻展透视</li>
						<li><a href="${ctx }/a/DiamondAnalysis">钻展一览 </a></li>
						
						<%
							DiamondDetail diamondDetail = (DiamondDetail)request.getAttribute("diamondDetail");
							String position = URLEncoder.encode(URLEncoder.encode(diamondDetail.getPosition(), "utf-8"), "utf-8");
						%>
						
						<li><a href="${ctx }/a/DiamondAnalysis?m=detail&bpid=${diamondDetail.bpid }&position=<%=position%>">钻展详情: ${diamondDetail.position } </a></li>
						<li class="active"> ${diamondDetail.shopName }:广告类别</li>
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
										<a data-toggle="tab" id="tab1" href="#adType">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											广告类别
										</a>
									</li>
									<li>
										<a data-toggle="tab" id="tab2" href="#adDistribute">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											广告投放分布
										</a>
									</li>
									<li>
										<a href="${imagePath }/${diamondDetail.screenshots}">
											<i class="green ace-icon fa fa-home bigger-120"></i>
											广告详情
										</a>
									</li>
								</ul>

								<div class="tab-content">
									<div id="adType" class="tab-pane fade in active">
										<div class="row">
											<div class="col-sm-12">
												<div class="widget-box">
													
													<div class="widget-body">
													
														<div class="widget-main">
															<div class="widget-elem">
																<label for="hot">广告类别</label>

																<span id="hot" style="margin-left: 50px;"> 热门钻展</span>
															</div>
															
															
															<div class="widget-elem">
																<label for="shopName">广告主</label>

																<img src="${ctx}/assets/imagesLocal/bc_shop_icon.png" style="margin-left: 64px;">
																<a target="_blank" href="${diamondDetail.shopUrl }">${diamondDetail.shopName }</a>
															</div>
															
															<div class="widget-elem">
																<label for="position">广告位置</label>
																
																<span id="position" style="margin-left: 50px;">
																	 ${diamondDetail.position } (<a target="_blank" href="${imagePath }/${diamondDetail.picUrl}">具体位置</a>)
																</span>
															</div>
															
															<div class="widget-elem">
																<label for="putDate">广告日期</label>
															
																<span id="putDate" style="margin-left: 50px;">
																	 ${diamondDetail.putDate }
																</span>
															</div>
															
														</div>
													</div>
												</div>
											</div>
										</div>
										
										<div class="row">
											<div class="col-xs-12">
												<img src="${imagePath}/${diamondDetail.adPic}"><br>
												<span>(<a target="_blank" href="${imagePath }/${diamondDetail.picUrl}">具体位置</a>)</span>
											</div>
										</div>
										
									</div>

									<div id="adDistribute" class="tab-pane fade">
										<div class="row">
											<div class="col-sm-12">
												<label style="width:200px;font-weight: bold;">近60天广告投放次数</label>
												<span style="color:red;" id="cnt"></span>
											</div>
										</div>
										<div class="row placeholders">
							          		<div class="col-md-12" id="echarts-ad" style="height:500px;"></div>
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
	
	<script src="../assets/js/echarts/source/echarts.js"></script>
	<script src="../assets/js/option2.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var path = "${ctx}";
		
		//==================================切换tab==================================================
		$(function(){
			
			var EC_READY = false;
			// 加载echarts核心文件,这里默认加载源码，便于调试，后续改为压缩文件
			require.config({
		        paths: {
		        	echarts: path+'/assets/js/echarts/source'
		        }
		    });
			// 按需加载
		    require(
		        [
					'echarts',//加载echarts.js
					'echarts/chart/pie',
					'echarts/chart/funnel'
		        ],function (ec) {
		            EC_READY = true;
		        }
		    );
			
		   //切换tab
			var curTabIdx = 1, adChart = null;
			
			$('#tab1, #tab2').on('shown.bs.tab', function (e) {
				
				if (!EC_READY) {
			        return;
			    }
				
				hideTabContent(curTabIdx);
			    curTabIdx = e.target.id.replace('tab','');
			    showTabContent(curTabIdx);
				
			});
			
			function hideTabContent(curTabIdx){
				
				if(curTabIdx == 2){
					if(adChart){
						adChart.dispose();
						adChart = false;
					}
				}
			}
			
			function showTabContent(curTabIdx){
				
				hideTabContent(curTabIdx);
				if(curTabIdx == 2){
					//广告分布图表
					loadAdDistributeChart();
				}
			}
			
			var resizeTicket = null;
			window.onload = function () {
			    window.onresize = function () {
			        clearTimeout(resizeTicket);
			        resizeTicket = setTimeout(function (){
			            
			        	if (curTabIdx == 2) {
			            	if(adChart){
			            		adChart.resize();
			            	}
			            }
			        },200);
			    };
			};
			
			function loadAdDistributeChart(){
				
				$.post(path+'/a/DiamondAnalysis', {
			        'shopId': "${diamondDetail.shopId }",
			        'm': "ad_distribute"
			    }, function(data) {
			        
			    	if(data && data.length > 0){
			    		
			    		//计算投放次数
			    		var sum = 0;
			    		$.each(data, function(idx, d){
			    			sum += parseInt(d.cnt);
			    		});
			    		$("#cnt").text(sum);
			    		
			    		var ec = require('echarts');
			    		
			    		// 基于准备好的dom，初始化echarts图表
			            adChart = ec.init(document.getElementById('echarts-ad')); 
			            adChart.setOption(option2(data));
			    		
			    	}
			    }, 'json');
				
			}
			
			//选中navbar
			$('#syy-nav').find('.active').each(function(){
				var $class = 'active';
				if( $(this).hasClass('hover')) $class += ' open';
				
				$(this).removeClass($class);
			});
			$('#syy-diamondAnalysis').addClass('active open');
			
			//选中tab
			if("${param.tab}" == 'tab2'){
				$("#tab1,#tab2").parent().toggleClass("active");
	    		$("#adType,#adDistribute").toggleClass("in active");
	    		//需要先加载echarts
				// 加载echarts核心文件,这里默认加载源码，便于调试，后续改为压缩文件
				require.config({
			        paths: {
			        	echarts: path+'/assets/js/echarts/source'
			        }
			    });
				// 按需加载
			    require(
			        [
						'echarts',//加载echarts.js
						'echarts/chart/pie',
						'echarts/chart/funnel'
			        ],function (ec) {
			        	loadAdDistributeChart();
			        }
			    );
			}
			
			
		});
			
			
			
	</script>	
</body>
</html>