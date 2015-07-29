jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-scalpAnalysis').addClass('active open');

	// =======================================================宝贝营销组合=================================================================

	var info_config = {};
	info_config.tableId = 'info-table';
	info_config.url = global.path + '/a/ScalpAnalysis?m=ajax_scalp_info';
	info_config.maxIndex = 8;

	info_config.data = function(d) {

		d.chartType = $('input[name="chartType"]:checked').val();// 数据表
		d.shopId = scalpInfo.shopId;
		d.itemId = scalpInfo.itemId;
		d.startDate = $('#ying-d43211').val();
		d.endDate = $('#ying-d43222').val();
		d.maxIndex = info_config.maxIndex;

	};
	info_config.columns = [
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
			},
			{
				data : 'shua_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'shua_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'shua_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : 'rule'
			},
			{
				data : 'precision',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ];

	// 初始加载
	var info_table = loadDataTable(info_config);

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

			if (info_table) {
				info_table.fnDraw();
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
				echarts : global.path + '/assets/js/echarts/source'
			}
		});
		// 按需加载
		require([ 'echarts',// 加载echarts.js
		'echarts/chart/pie', 'echarts/chart/funnel', 'echarts/chart/line', 'echarts/chart/bar' ], function(ec) {
			$.get(global.path + '/a/ScalpAnalysis?m=scalp_anlysis_chart', {
				shopId : scalpInfo.shopId,
				itemId : scalpInfo.itemId,
				startDate : startDate,
				endDate : endDate
			}, function(data) {

				adChart = ec.init(document.getElementById('echarts-ad'));

				adChart.setOption(option6(data, chartWay));
			}, "json");
		});
	}
	
	$('input[name="chartWay"]').click(function(){
		
		loadSalesChart($(this).val());
	});
	
});