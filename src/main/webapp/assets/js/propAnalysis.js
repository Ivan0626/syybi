jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-industryAnalysis').addClass('active open');

	var scaleChart1 = null,scaleChart2 = null,trendChart = null; 
	
	//============================================各品牌规模======================================================
	var scale_table = null;
	//行业规模检索
	$('#search-scale-btn').click(function(){
		
		//左侧类目树选中的行业或类目编号
		var selectedNo = $('#selected-no').val();
		var propName = $('#propName').val();
		if(!selectedNo){
			showMsg('请选择左侧行业');
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
				$.post(global.path+'/a/IndustryAnalysis', {
					'catNo': selectedNo,
					'reType': reType,
					'startMonth': startMonth,
					'endMonth': endMonth,
					'shopType': shopType,
					'propName': propName,
					'm': 'prop_scale'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					
					//加载图表或数据表
					scaleChart1 = renderChart(option1(data.data, chartWay,'各'+propName),'echarts-scale');
					
				},'json');
				
			}else if(chartType == 'pie'){
				$.post(global.path+'/a/IndustryAnalysis', {
					'catNo': selectedNo,
					'reType': reType,
					'startMonth': startMonth,
					'endMonth': endMonth,
					'shopType': shopType,
					'propName': propName,
					'm': 'prop_scale'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					
					//加载图表或数据表
					scaleChart2 = renderChart(option2_2(data.data, chartWay, '各'+propName),'echarts-scale');
					
				},'json');
			}else if(chartType == 'data'){
				
				$('#chartDiv').hide();
				$('#tableDiv').show();
				
				var scale_config = {};
				scale_config.tableId = 'scale-table';
				scale_config.url = global.path+'/a/IndustryAnalysis?m=prop_scale';
				scale_config.maxIndex = 6;
				scale_config.type = 'POST';//POST提交才能改变scale_config.data参数

				scale_config.data = function(d) {

					d.catNo = $('#selected-no').val();
					d.reType = $('input[name="reType"]:checked').val();
					d.startMonth = $('#d4321').val();
					d.endMonth = $('#d4322').val();
					d.shopType = $('input[name="shopType"]:checked').val();
					d.propName = $('#propName').val();
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
				scaleChart1 = renderChart(option1(data.data, chartWay, '各'+$('#propName').val()),'echarts-scale');
			};
			
		}else if(chartType == 'pie'){
			ajaxfn = function(data){
				
				$('#chartDiv').show();
				$('#tableDiv').hide();
				
				//加载图表或数据表
				scaleChart2 = renderChart(option2_2(data.data, chartWay, '各'+$('#propName').val()),'echarts-scale');
			};
		}
		
		$.post(global.path+'/a/IndustryAnalysis', {
			'catNo': $('#selected-no').val(),
			'reType': $('input[name="reType"]:checked').val(),
			'startMonth': $('#d4321').val(),
			'endMonth': $('#d4322').val(),
			'shopType': $('input[name="shopType"]:checked').val(),
			'propName': $('#propName').val(),
			'm': 'prop_scale'
		},ajaxfn,'json');
		
	});
	
	//============================================各品牌趋势======================================================
	//行业趋势动态表格
	function buildTrendTable(){
		
		var startMonth = $('#d432112').val();
    	var endMonth = $('#d432222').val();
    	
    	$.post(global.path+'/a/IndustryAnalysis?m=prop_trend',{
    		'catNo': $('#selected-no').val(),
    		'propName': $('#propName').val(),
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
    				+'<th rowspan="2" style="text-align:center">属性</th>'
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
    					+'<td style="text-align:center">'+d.cat_name+'</td>'
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
    	
    	$.post(global.path+'/a/IndustryAnalysis?m=prop_trend',{
    		'catNo': $('#selected-no').val(),
    		'propName': $('#propName').val(),
    		'startMonth': startMonth,
			'endMonth': endMonth,
			'shopType': $('input[name="shopType2"]:checked').val()
    	},function(data){
    		
    		var chartWay2 = $('input[name="chartWay2"]:checked').val();
    		
    		var ms = getMonths(startMonth, endMonth);
    		
    		trendChart = renderChart(option5(data, chartWay2, startMonth, ms, '各'+$('#propName').val()),'echarts-trend');
    		
    	},'json');
	}
	
	//检索行业趋势
	$('#search-trend-btn').click(function(){
		
		var chartType2 = $('input[name="chartType2"]:checked').val();
		
		//左侧类目树选中的行业或类目编号
		var selectedNo = $('#selected-no').val();
		if(!selectedNo){
			showMsg('请选择左侧行业');
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
	//=================================================热销宝贝=============================================
	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/IndustryAnalysis?m=brand_goods';
	goods_config.maxIndex = 9;

	goods_config.type = 'POST';

	goods_config.data = function(d) {

		d.catNo = $('#selected-no').val();
		d.startMonth = $('#d432113').val();
		d.endMonth = $('#d432113').val();
		d.shopType = $('input[name="shopType3"]:checked').val();
		
		d.maxIndex = goods_config.maxIndex;

	};

	goods_config.columns = [
			{
				data : 'rowNum',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'prd_name',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url
							+ '">' + data + '</a>';
					return html;
				}
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
				},
				render : function(data, type, full, meta) {

					if (data < full.avg_price) {
						return data + '<img src="' + global.path + '/assets/img/down_arrow_new.gif">';
					} else if (data > full.avg_price) {
						return data + '<img src="' + global.path + '/assets/img/up_arrow_new.gif">';
					} else {
						return data;
					}
				}
			},
			{
				data : 'sales_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'sales_amount',
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
				data : 'shop_name',
				render : function(val, display, val_obj, prop) {
					var html = '<a target="_blank" href="' + val_obj.shop_url + '">' + val + '</a>';

					if (val_obj.shop_type == 'TMALL') {
						html = '<img src="' + global.path + '/assets/imagesLocal/bc_shop_icon.png">'
								+ ' <a target="_blank" href="' + val_obj.shop_url + '">' + val + '</a>';
					}

					return html;
				}
			},
			{
				data : 'region'
			},
			{
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj,prop) {
					
					//TODO：宝贝关注
//					if($.trim(val_obj.asid) != '' ){
//						return '已关注';
//					}else{
//						return '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val + "@" + val_obj.shop_name
//						+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
//					}
//					return '';
					
					return '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val + "@" + val_obj.prd_name
					+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
				}
			} ];

	// 初始加载
	var goods_table = null;//loadDataTable(goods_config);

	// 检索
	$('#search-goods-btn').click(function() {

		if($('#selected-no').val()){
    		if (goods_table) {
				goods_table.fnDraw();
			} else {
				goods_table = loadDataTable(goods_config);
			}
    	}

	});
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2, #tab3').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id.replace('tab','');
	    
	    $('.breadcrumb .active:last').remove();
	    
	    if(curTabIdx == 1){
	    	
	    	$('.breadcrumb').append('<li class="active">属性规模 (属性报表)</li>');
	    	
	    	if($('#selected-no').val()){
		    	if(scaleChart1 && scaleChart2){
		    		scaleChart1.dispose();
		    		scaleChart2.dispose();
		    		scaleChart1 = null;
		    		scaleChart2 = null;
				}
		    	
		    	$.post(global.path+'/a/IndustryAnalysis', {
		    		'catNo': $('#selected-no').val(),
					'reType': $('input[name="reType"]:checked').val(),
					'startMonth': $('#d4321').val(),
					'endMonth': $('#d4322').val(),
					'shopType': $('input[name="shopType"]:checked').val(),
					'propName': $('#propName').val(),
					'm': 'prop_scale'
				},function(data){
					
					$('#chartDiv').show();
					$('#tableDiv').hide();
					//加载图表或数据表
					scaleChart1 = renderChart(option1(data.data, $('input[name="chartWay"]:checked').val(),'各'+$('#propName').val()),'echarts-scale');
					
				},'json');
	    	}
	    	
	    }else if(curTabIdx == 2){
	    	
	    	$('.breadcrumb').append('<li class="active">属性趋势 (属性报表)</li>');
	    	
	    	if($('#selected-no').val()){
	    		
	    		$('#tableDiv2').show();
		    	$('#chartDiv2').hide();
		    	
		    	if(trendChart){
		    		trendChart.dispose();
		    		trendChart = null;
				}
		    	
		    	buildTrendTable();
	    		
	    	}
	    	
	    }else if(curTabIdx == 3){
	    	
	    	$('.breadcrumb').append('<li class="active">热销宝贝 (属性报表)</li>');
	    	
	    	if($('#selected-no').val()){
	    		if (goods_table) {
					goods_table.fnDraw();
				} else {
					goods_table = loadDataTable(goods_config);
				}
	    	}
	    }
	});
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	        	
	        	if (curTabIdx == 1) {
	            	if(scaleChart1 && scaleChart2){
	            		scaleChart1.resize();
	            		scaleChart2.resize();
	            	}
	            }
	            else if (curTabIdx == 2) {
	            	if(trendChart){
	            		trendChart.resize();
	            	}
	            }
	        },200);
	    };
	};
	
	
});
