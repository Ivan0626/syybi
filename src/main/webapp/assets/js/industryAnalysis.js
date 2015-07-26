var EC_READY = false;
var scaleChart = null;

//加载Echarts组件
function loadEcharts(ecfn){
	require.config({
        paths: {
            echarts: global.path+'/assets/js/echarts/source'
        }
    });
	// 按需加载
    require(
        [
            'echarts',//加载echarts.js
            'echarts/chart/line',// 加载line.js
            'echarts/chart/bar',
            'echarts/chart/pie',
            'echarts/chart/map'
        ],ecfn
    );
}

//渲染图表
function renderChart(option, chartId){
	
	if(EC_READY){
		
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
    	scaleChart = ec.init(document.getElementById(chartId));
    	scaleChart.setOption(option);
		
	}else{
		
		var ecfn = function (ec) {
		    
			EC_READY = true;
			
			// 基于准备好的dom，初始化echarts图表
			scaleChart = ec.init(document.getElementById(chartId));
			scaleChart.setOption(option);
		};
		loadEcharts(ecfn);
	}
	
}

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-industryAnalysis').addClass('active open');

	var scale_table = null;
	
	//行业规模检索
	$('#search-scale-btn').click(function(){
		
		//左侧类目树选中的行业或类目编号
		var selectedNo = $('#selected-no').val();
		if(!selectedNo){
			showMsg('请先选择行业');
		}else{
			//报表类型
			var reType = $('input[name="reType"]:checked').val();
			//选择月份
			var startMonth = $('#d4321').val();
			var endMonth = $('#d4322').val();
			//查看范围
			var shopType = $('input[name="shopType"]:checked').val();
			//图表类型
			var chartType = $('input[name="chartType"]:checked').val();
			
			var chartWay = $('input[name="chartWay"]:checked').val();
			if(chartType == 'bar'){
				$.get(global.path+'/a/IndustryAnalysis', {
					'iid': selectedNo,
					'reType': reType,
					'startMonth': startMonth,
					'endMonth': endMonth,
					'shopType': shopType,
					'm': 'ind_scale'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					
					//加载图表或数据表
					renderChart(option1(data.data, chartWay),'echarts-scale');
					
				},'json');
				
			}else if(chartType == 'pie'){
				$.get(global.path+'/a/IndustryAnalysis', {
					'iid': selectedNo,
					'reType': reType,
					'startMonth': startMonth,
					'endMonth': endMonth,
					'shopType': shopType,
					'm': 'ind_scale'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					//加载图表或数据表
					renderChart(option2_2(data.data, chartWay),'echarts-scale');
					
				},'json');
			}else if(chartType == 'data'){
				
				$('#chartDiv').hide();
				$('#tableDiv').show();
				
				var scale_config = {};
				scale_config.tableId = 'scale-table';
				scale_config.url = global.path+'/a/IndustryAnalysis?m=ind_scale';
				scale_config.maxIndex = 6;
				scale_config.type = 'POST';//POST提交才能改变scale_config.data参数

				scale_config.data = function(d) {

					d.iid = $('#selected-no').val();
					d.reType = $('input[name="reType"]:checked').val();
					d.startMonth = $('#d4321').val();
					d.endMonth = $('#d4322').val();
					d.shopType = $('input[name="shopType"]:checked').val();
					d.maxIndex = scale_config.maxIndex;

				};
				
				scale_config.columns = [
						{
							data : 'cat_name',
						},
						{
							data : 'sales_volume',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							}
						},
						{
							data : 'volumeWeight',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							},
							render : function(data, type, full, meta) {
								return data + '%';
							}
						},
						{
							data : 'sales_amount',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							}
						},
						{
							data : 'amountWeight',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							},
							render : function(data, type, full, meta) {
								return data + '%';
							}
						},
						{
							data : 'tran_count',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							}
						},
						{
							data : 'countWeight',
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							},
							render : function(data, type, full, meta) {
								return data + '%';
							}
						}];

				if(scale_table){
					scale_table.fnDraw();
				}else{
					scale_table = loadDataTable(scale_config);
				}
				
			}
		}
		
	});
	
	//切换销量、销售额、成交次数选项
	$('input[name="chartWay"]').click(function(){
		
		//图表类型
		var chartType = $('input[name="chartType"]:checked').val();
		var chartWay = $(this).val();
		if(chartType == 'bar'){
			ajaxfn = function(data){
				
				$('#chartDiv').show();
				$('#tableDiv').hide();
				
				//加载图表或数据表
				renderChart(option1(data.data, chartWay),'echarts-scale');
			};
			
		}else if(chartType == 'pie'){
			ajaxfn = function(data){
				
				$('#chartDiv').show();
				$('#tableDiv').hide();
				
				//加载图表或数据表
				renderChart(option2_2(data.data, chartWay),'echarts-scale');
			};
		}
		
		$.get(global.path+'/a/IndustryAnalysis', {
			'iid': $('#selected-no').val(),
			'reType': $('input[name="reType"]:checked').val(),
			'startMonth': $('#d4321').val(),
			'endMonth': $('#d4322').val(),
			'shopType': $('input[name="shopType"]:checked').val(),
			'm': 'ind_scale'
		},ajaxfn,'json');
		
	});
	
	//行业趋势动态表格
	function buildTrendTable(){
		
		var startMonth = $('#d432112').val();
    	var endMonth = $('#d432222').val();
    	
    	$.get(global.path+'/a/IndustryAnalysis?m=ind_trend',{
    		'iid': $('#selected-no').val(),
    		'startMonth': startMonth,
			'endMonth': endMonth,
			'shopType': $('input[name="shopType2"]:checked').val()
    	},function(data){
    		
    		$('#trend-table').empty();
    		
    		if(data && data.length > 0){
    			
    			var ms = getMonths(startMonth, endMonth);
    			
    			var thead = '';
    			
    			thead += '<thead>'
    				+'<tr role="row">'
    				+'<th rowspan="2" style="text-align:center">类别名称</th>'
    				+'<th style="text-align:center">'+startMonth+'</th>';
    			
    			var colTds = '';
    			if(ms > 1){
    				for(var i = 1; i < ms; i++){
    					
    					var reMonth = addMonth(startMonth, i);
    					
    					thead += '<th colspan="2" style="text-align:center">'+reMonth+'</th>';
    					
    					colTds += '<th style="text-align:center">销量</th>'
    						+'<th style="text-align:center">环比</th>';
    				}
    			}
    			
    			thead += '<th style="text-align:center">总计</th>'
    				+'</tr>'
    				+'<th style="text-align:center">销量</th>'
    				+colTds
    				+'<th style="text-align:center">销量</th>'
    				+'</tr>'
    				+'</thead>';
    			
    			var tbody = '<tbody>';
    			
    			var startColTotal = 0, msRowTotal = [];
    			
    			//初始化数组
    			for(var i = 0; i < ms; i++){
    				msRowTotal[i] = 0;
    			}
    			
    			$.each(data, function(idx, d){
    				
    				tbody += '<tr role="row">'
    					+'<td>'+d.cat_name+'</td>'
    					+'<td style="text-align:right">'+d['a'+startMonth.replace('-','')]+'</td>';
    				
    				startColTotal += parseInt(d['a'+startMonth.replace('-','')]);
    				msRowTotal[0] += parseInt(d['a'+startMonth.replace('-','')]);
    				
    				var colTds = '', msColTotal = 0;
    				for(var i = 1; i < ms; i++){
    					
    					var preMonth = addMonth(startMonth, i - 1);
    					var curMonth = addMonth(startMonth, i);
    					
    					//计算环比
    					var reObj = huanbi(d['a'+preMonth.replace('-','')], d['a'+curMonth.replace('-','')]);
    					
    					colTds += '<td style="text-align:right">'+d['a'+curMonth.replace('-','')]+'</td>'
    						+'<td style="text-align:right">'+reObj.huanbi+'%'+reObj.img+'</td>';
    					
    					msColTotal += parseInt(d['a'+curMonth.replace('-','')]);
    					
    					msRowTotal[i] += parseInt(d['a'+curMonth.replace('-','')]);
    				}
    				
    				tbody += colTds
    					+'<td style="text-align:right">'+(parseInt(d['a'+startMonth.replace('-','')]) + msColTotal)+'</td>'
    					+'</tr>';
    				
    			});
    			
    			tbody += '</tbody>';
    			
    			var tfoot = '';
    			tfoot += '<tfoot>'
    				+'<tr role="row">'
    				+'<th style="text-align:center">总计</th>'
    				+'<th style="text-align:right">'+startColTotal+'</th>';
    				
				var colTds = '', tfootTotal = msRowTotal[0];
				for(var i = 1; i < ms; i++){
					
					//计算环比
					var reObj = huanbi(msRowTotal[i-1], msRowTotal[i]);
					
					colTds += '<th style="text-align:right">'+msRowTotal[i]+'</th>'
						+'<th style="text-align:right">'+reObj.huanbi+'%'+reObj.img+'</th>';
					
					tfootTotal += msRowTotal[i];
				}
    				
				tfoot += colTds
				+'<th style="text-align:right">'+tfootTotal+'</th>'
				+'</tr>'
				+'</tfoot>';
    				
    			$('#trend-table').html(thead + tbody + tfoot);	
    			
    			//append datatable 样式
    			$('#trend-table').dataTable({
		    		paging: false,
		    		retrieve: true,
		    		//destroy: true,
		    		autoWidth: false,
		    		processing: true,
		    		language : dataTableConfig.language,
		    		dom : dataTableConfig.dom
		    	});
    		}
    		
    	},'json');
		
	}
	
	//生成折线图
	function buildTrendChart(){
		var startMonth = $('#d432112').val();
    	var endMonth = $('#d432222').val();
    	
    	$.get(global.path+'/a/IndustryAnalysis?m=ind_trend',{
    		'iid': $('#selected-no').val(),
    		'startMonth': startMonth,
			'endMonth': endMonth,
			'shopType': $('input[name="shopType2"]:checked').val()
    	},function(data){
    		
    		var chartWay2 = $('input[name="chartWay2"]:checked').val();
    		
    		var ms = getMonths(startMonth, endMonth);
    		
    		renderChart(option5(data, chartWay2, startMonth, ms),'echarts-trend');
    		
    	},'json');
	}
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id.replace('tab','');
	    
	    $('.breadcrumb .active').remove();
	    
	    if(curTabIdx == 1){
	    	
	    	$('.breadcrumb').append('<li class="active">'+$('div.selected').text()+'</li>');
			
			$('.breadcrumb').append('<li class="active">行业规模</li>');
	    	
	    	if($('#selected-no').val()){
	    		$('#tableDiv2').hide();
		    	$('#chartDiv2').show();
		    	
		    	buildTrendChart();
	    	}
	    	
	    }else if(curTabIdx == 2){
	    	
	    	$('.breadcrumb').append('<li class="active">'+$('div.selected').text()+'</li>');
			
			$('.breadcrumb').append('<li class="active">行业趋势</li>');
	    	
	    	if($('#selected-no').val()){
	    		
	    		$('#tableDiv2').show();
		    	$('#chartDiv2').hide();
		    	
		    	buildTrendTable();
	    		
	    	}
	    	
	    }
	});
	
	//检索行业趋势
	$('#search-trend-btn').click(function(){
		
		var chartType2 = $('input[name="chartType2"]:checked').val();
		
		//左侧类目树选中的行业或类目编号
		var selectedNo = $('#selected-no').val();
		if(!selectedNo){
			showMsg('请先选择行业');
		}else{

			if(chartType2 == 'data'){
				
				$('#tableDiv2').show();
		    	$('#chartDiv2').hide();
		    	
		    	buildTrendTable();
				
			}else if(chartType2 == 'line'){
				
				$('#tableDiv2').hide();
		    	$('#chartDiv2').show();
		    	
		    	buildTrendChart();
				
			}
		}
		
	});
	
	$('input[name="chartWay2"]').click(function(){
		
		buildTrendChart();
		
	});
	
	
});
