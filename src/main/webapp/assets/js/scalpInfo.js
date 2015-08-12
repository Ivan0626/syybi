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
	info_config.maxIndex = 15;

	info_config.data = function(d) {

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
				data : 'a_shua_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'a_shua_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'a_shua_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'a_precision',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'b_shua_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'b_shua_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'b_shua_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'b_precision',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'c_shua_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'c_shua_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'c_shua_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'c_precision',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ];

	// 初始加载
	var info_table = null;//loadDataTable(info_config);
	loadSalesChart($('input[name="chartWay"]:checked').val());

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
			}else{
				info_table = loadDataTable(info_config);
			}
		} else if (chartType == 1) {// 图表

			$('#tableDiv').hide();
			$('#chartDiv').show();

			var chartWay = $('input[name="chartWay"]:checked').val();
			loadSalesChart(chartWay);
		}
	});
	
	function loadSalesChart(chartWay){
		
		var startDate = $('#ying-d43211').val();
		var endDate = $('#ying-d43222').val();
		
		$.get(global.path + '/a/ScalpAnalysis?m=ajax_scalp_info', {
			shopId : scalpInfo.shopId,
			itemId : scalpInfo.itemId,
			startDate : startDate,
			endDate : endDate
		}, function(data) {

			//加载图表或数据表
			renderChart(option10(data.data, chartWay),'echarts-ad');
			
		}, "json");
		
	}
	
	$('input[name="chartWay"]').click(function(){
		
		loadSalesChart($(this).val());
	});
	
});