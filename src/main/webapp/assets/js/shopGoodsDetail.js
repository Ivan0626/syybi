jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-shopAnalysis').addClass('active open');

	// =======================================================宝贝营销组合=================================================================

	var ying_config = {};
	ying_config.tableId = 'ying-table';
	ying_config.url = goodsDetail.path + '/a/MarketAnalysis?m=goods_market';
	ying_config.maxIndex = 3;

	ying_config.data = function(d) {

		d.chartType = $('input[name="chartType"]:checked').val();// 数据表
		d.shopId = goodsDetail.shopId;
		d.itemId = goodsDetail.itemId;
		d.startDate = $('#ying-d43211').val();
		d.endDate = $('#ying-d43222').val();
		d.maxIndex = ying_config.maxIndex;

	};
	ying_config.columns = [
			{
				data : 'tran_date'
			},
			{
				data : 'sales_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'sales_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'tran_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ];

	// 初始加载
	var ying_table = null;//loadDataTable(ying_config);

	var adChart = null;
	// 检索
	$('#ying-search-btn').click(function() {

		var startDate = $('#ying-d43211').val();
		var endDate = $('#ying-d43222').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}

		var chartType = $('input[name="chartType"]:checked').val();
		if (chartType == 2) {// 数据表

			$('#chartDiv').hide();
			$('#tableDiv').show();

			if (ying_table) {
				ying_table.fnDraw();
			}else {
				ying_table = loadDataTable(ying_config);
			}
		} else if (chartType == 1) {// 图表

			$('#tableDiv').hide();
			$('#chartDiv').show();

			var chartWay = $('input[name="chartWay"]:checked').val();
			loadSalesChart(chartWay);
		}
	});
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	            
	        	if(adChart){
	        		adChart.resize();
            	}
	        },200);
	    };
	};
	
	function loadSalesChart(chartWay){
		var startDate = $('#ying-d43211').val();
		var endDate = $('#ying-d43222').val();
		require.config({
			paths : {
				echarts : goodsDetail.path + '/assets/js/echarts/source'
			}
		});
		// 按需加载
		require([ 'echarts',// 加载echarts.js
		'echarts/chart/pie', 'echarts/chart/funnel', 'echarts/chart/line', 'echarts/chart/bar' ], function(ec) {
			$.get(goodsDetail.path + '/a/MarketAnalysis?m=ad_anlysis_chart', {
				shopId : goodsDetail.shopId,
				startDate : startDate,
				endDate : endDate
			}, function(data) {

				adChart = ec.init(document.getElementById('echarts-ad'));

				adChart.setOption(option3(data, chartWay));
			}, "json");
		});
	}
	
	$('input[name="chartWay"]').click(function(){
		
		loadSalesChart($(this).val());
	});
	
	// =======================================================价格走势=================================================================

	var price_config = {};
	price_config.tableId = 'price-table';
	price_config.url = goodsDetail.path + '/a/MarketAnalysis?m=price_trend';
	price_config.maxIndex = 3;

	price_config.data = function(d) {

		d.priceChartType = $('input[name="priceChartType"]:checked').val();// 数据表
		d.shopId = goodsDetail.shopId;
		d.itemId = goodsDetail.itemId;
		d.startDate = $('#price-d43211').val();
		d.endDate = $('#price-d43222').val();
		d.maxIndex = price_config.maxIndex;

	};
	price_config.columns = [
			{
				data : 'tran_date'
			},
			{
				data : 'avg_price',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'avg_price_tran',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'sales_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ];

	// 初始加载
	var price_table = null;//loadDataTable(price_config);

	var priceChart = null;
	// 检索
	$('#price-search-btn').click(function() {

		var startDate = $('#price-d43211').val();
		var endDate = $('#price-d43222').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}

		var priceChartType = $('input[name="priceChartType"]:checked').val();
		if (priceChartType == 2) {// 数据表

			$('#priceChartDiv').hide();
			$('#priceTableDiv').show();

			if (price_table) {
				price_table.fnDraw();
			}else{
				price_table = loadDataTable(price_config);
			}
		} else if (priceChartType == 1) {// 图表

			$('#priceTableDiv').hide();
			$('#priceChartDiv').show();

			loadPriceChart();
		}
	});
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	            
	        	if(priceChart){
	        		priceChart.resize();
            	}
	        },200);
	    };
	};
	
	function loadPriceChart(){
		require.config({
			paths : {
				echarts : goodsDetail.path + '/assets/js/echarts/source'
			}
		});
		// 按需加载
		require([ 'echarts',// 加载echarts.js
		'echarts/chart/pie', 'echarts/chart/funnel', 'echarts/chart/line', 'echarts/chart/bar' ], function(ec) {
			$.get(goodsDetail.path + '/a/MarketAnalysis?m=price_trend', {
				shopId : goodsDetail.shopId,
				itemId : goodsDetail.itemId,
				startDate : $('#price-d43211').val(),
				endDate : $('#price-d43222').val()
			}, function(data) {
					
				if(data.data && data.data.length > 0){
					priceChart = ec.init(document.getElementById('echarts-price'));
					priceChart.setOption(option4(data));
				}
				
			}, "json");
		});
	}
	
	//==========================================加载tab==========================================================
	
	function loadTab(tab){
		$('.breadcrumb .active').remove();
		if(tab == 'tab3'){
			
			$("#myTab > li").removeClass("active");
			$("#tab3").parent().addClass("active");
			
			$(".tab-content > div").removeClass("in active");
			$("#ying").addClass("in active");
			
			$('.breadcrumb').append('<li class="active">宝贝销售趋势</li>');
			
			$('#tableDiv').hide();
			$('#chartDiv').show();

			var chartWay = $('input[name="chartWay"]:checked').val();
			loadSalesChart(chartWay);
			
		}else if(tab == 'tab4'){
			
			$("#myTab > li").removeClass("active");
			$("#tab4").parent().addClass("active");
			
			$(".tab-content > div").removeClass("in active");
			$("#price").addClass("in active");
			
			$('.breadcrumb').append('<li class="active">价格走势</li>');
			
			$('#priceTableDiv').hide();
			$('#priceChartDiv').show();

			loadPriceChart();
		}
	}
	
	// 跳转到该页面时加载
	loadTab(goodsDetail.tab);
	// ===================================切换tab===============================================
	// 切换tab
	var curTab = 'tab1';

	$('#tab3, #tab4').on('shown.bs.tab', function(e) {

		curTab = e.target.id;

		loadTab(curTab);

	});
});