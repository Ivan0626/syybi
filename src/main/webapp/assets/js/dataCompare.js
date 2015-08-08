// 初始加载
var goods_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	
	$('#goods-search').click(function() {

		window.location.href = global.path + "/a/GoodsAnalysis?m=searchB";

	});
	
	$('#syy-dataCompare').addClass('active open');

	
	$('input[name="showType"]').click(function(){
		
		if($(this).val() == 'day'){
			$('#dayDiv').show();
			$('#monthDiv').hide();
		}else if($(this).val() == 'month'){
			$('#monthDiv').show();
			$('#dayDiv').hide();
		}
		
	});
	
	function loadSalesChart(chartWay){
		
		var showType = $('input[name="showType"]:checked').val();
		
		var startDate = $('#trend-d4321').val();
		var endDate = $('#trend-d4322').val();
		if(showType == 'month'){
			startDate = $('#trend-d4321-month').val();
			endDate = $('#trend-d4322-month').val();
		}
		$.get(global.path + '/a/GoodsAnalysis?m=sales_trend', {
			adid : $('#adid').val(),
			startDate : startDate,
			endDate : endDate,
			showType: showType
		}, function(data) {

			//加载图表或数据表
			renderChart(option3(data.data, chartWay),'echarts-sales');
			
		}, "json");
	}
	
	$('input[name="chartWay"]').click(function(){
		
		loadSalesChart($(this).val());
	});

	
	var trend_config = {}, trendTable = null;
	trend_config.tableId = 'trend-table';
	trend_config.url = global.path + '/a/GoodsAnalysis?m=sales_trend';
	trend_config.maxIndex = 3;

	trend_config.data = function(d) {

		d.showType = $('input[name="showType"]:checked').val();
		d.adid = $('#adid').val();
		if(d.showType == 'day'){
			d.startDate = $('#trend-d4321').val();
			d.endDate = $('#trend-d4322').val();
		}else{
			d.startDate = $('#trend-d4321-month').val();
			d.endDate = $('#trend-d4322-month').val();
		}
		
		d.maxIndex = trend_config.maxIndex;

	};
	trend_config.columns = [
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
	
	//总计
	trend_config.footerCallback = function ( row, data, start, end, display ) {
        var api = this.api(), data;
        
        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
                    i.replace(/\([^\)]*\)/g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
        };

        var cols = [1, 2, 3];
        
        $.each(cols, function(idx, value){
        	// Total over this page
            var pageTotal = api
                .column( value, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            // Update footer
            $( api.column( value ).footer() ).html(pageTotal);
        });
        
    };

	// 检索
	$('#trend-search-btn').click(function() {

		if($('input[name="showType"]:checked').val() == 'day'){

			if ($('#trend-d4321').val() == '' || $('#trend-d4322').val() == '') {
				showMsg('时间不能为空');
				return;
			}
		}else{
			if ($('#trend-d4321-month').val() == '' || $('#trend-d4322-month').val() == '') {
				showMsg('月份不能为空');
				return;
			}
		}

		var chartType = $('input[name="chartType"]:checked').val();
		if (chartType == 2) {// 数据表

			$('#chartDiv').hide();
			$('#tableDiv').show();

			if (trendTable) {
				trendTable.fnDraw();
			}else{
				trendTable = loadDataTable(trend_config);
			}
		} else if (chartType == 1) {// 图表

			$('#tableDiv').hide();
			$('#chartDiv').show();

			var chartWay = $('input[name="chartWay"]:checked').val();
			loadSalesChart(chartWay);
		}
	});
	
});

