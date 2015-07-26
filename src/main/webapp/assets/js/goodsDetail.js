jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-marketAnalysis').addClass('active open');

	// =======================================================宝贝广告=================================================================

	// dataTables配置
	var goodsad_config = {};
	goodsad_config.url = goodsDetail.path + '/a/MarketAnalysis?m=goods_ad';
	goodsad_config.tableId = 'ad-table';

	goodsad_config.destroy = true;
	
	goodsad_config.maxIndex = 8;
	
	goodsad_config.columns = [];
	$.extend(true, goodsad_config.columns, goodsad.columns.c1);//深度拷贝
	//将宝贝名称字段修改为时间
	goodsad_config.columns[0] = {
		data : "tran_date",
		title : '时间',
		name : "t1"
	};
	
	goodsad_config.type = 'POST';
	
	goodsad_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，
		// 添加额外的参数传给服务器
		d.adType = $('#adType').val();
		d.shopId = goodsDetail.shopId;
		d.itemId = goodsDetail.itemId;
		d.startDate = $('#d43211').val();
		d.endDate = $('#d43222').val();
		d.maxIndex = goodsad_config.maxIndex;
	};

	// 初始加载
	var goodsadTable = null;//loadDataTable(goodsad_config);
	
	function loadGoodsAdTable(adType){
		goodsad_config.columns = [];
		if(adType == 1 || adType == 2 || adType == 11 || adType == 3 || adType == 13){//钻展
			$.extend(true, goodsad_config.columns, goodsad.columns.c1);//深度拷贝
		}else if(adType == 5){//淘宝客
			$.extend(true, goodsad_config.columns, goodsad.columns.c5);//深度拷贝
		}else if(adType == 6 || adType == 14){//直通车
			$.extend(true, goodsad_config.columns, goodsad.columns.c6);//深度拷贝
		}else if(adType == 7){//聚划算
			$.extend(true, goodsad_config.columns, goodsad.columns.c7);//深度拷贝
		}else if(adType == 8 || adType == 10){//商品促销
			$.extend(true, goodsad_config.columns, goodsad.columns.c8);//深度拷贝
		}else if (adType == 12 || adType == 4) {
			goodsad_config.columns = [];
			$.extend(true, goodsad_config.columns, goodsad.columns.c1);
			goodsad_config.columns[6] = {
				"data" : "ad_pic",
				title : '回放',
				"name" : "t4",
				render : function(data, type, full, meta) {
					if (!data) {
						return "";
					}
					return '<a target="_blank" href="' + data + '">广告回放</a><br><a target="_blank" href="' + full.ad_dest_url + '">活动回放</a>';
				}
			};
		}
		
		//将宝贝名称字段修改为时间
		goodsad_config.columns[0] = {
			data : "tran_date",
			title : '时间',
			name : "t1"
		};
		
		if(goodsadTable){
			goodsadTable._fnClearTable();
		}
		
		goodsadTable = loadDataTable(goodsad_config);
	}
	
	//检索
	$('#ad-search-btn').click(function(){
		
		var adType = $('#adType').val();
		
		loadGoodsAdTable(adType);
	});

	// =======================================================宝贝跟踪=================================================================
	// dataTables配置
	var gen_config = {};
	gen_config.url = goodsDetail.path + '/a/MarketAnalysis?m=goods_gen';
	gen_config.tableId = 'gen-table';

	gen_config.destroy = true;
	gen_config.maxIndex = 5;
	gen_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.genType = $('#genType').val();
		d.shopId = goodsDetail.shopId;
		d.itemId = goodsDetail.itemId;
		d.startDate = $('#gen-d43211').val();
		d.endDate = $('#gen-d43222').val();
		d.maxIndex = gen_config.maxIndex;

	};

	gen_config.columns = gen.columns.c1;

	// 初始加载
	loadDataTable(gen_config);

	// 检索
	$('#gen-search-btn').click(function() {

		var genType = $('#genType').val();

		if (genType == 2) {// 改名跟踪

			gen_config.columns = gen.columns.c2;

		} else if (genType == 1) {// 调价跟踪
			gen_config.columns = gen.columns.c1;
		}
		loadDataTable(gen_config);
	});

	// =======================================================宝贝营销组合=================================================================

	var ying_config = {};
	ying_config.tableId = 'ying-table';
	ying_config.url = goodsDetail.path + '/a/MarketAnalysis?m=goods_market';
	ying_config.maxIndex = 6;

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
			},
			{
				data : null,// 不映射字段
				defaultContent : '',// 为空时默认显示空字符串
				render : function(data, type, full, meta) {
					
					var prdName = encodeURI(goodsDetail.prdName);// 编码
					var shopName = encodeURI(goodsDetail.shopName);// 编码
					
					return renderGoodsAd(goodsDetail.path+'/a/MarketAnalysis?m=detail&shopId='+goodsDetail.shopId+'&shopName='+shopName+'&itemId='+goodsDetail.itemId+'&prdName='+prdName+'&tab=tab1', goodsDetail.path, full);
					
				}
			}, {
				data : 'chngName'
			}, {
				data : 'chngPrice'
			} ];

	// 初始加载
	var ying_table = loadDataTable(ying_config);

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
	var price_table = loadDataTable(price_config);

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
		if(tab == 'tab1'){
			
			if(goodsDetail.ad){
				$('#adType').val(goodsDetail.ad);
			}
			
			loadGoodsAdTable($('#adType').val());
			
			$('.breadcrumb').append('<li class="active">宝贝广告</li>');
			
			$('.breadcrumb').append('<li class="active">'+$('#adType option:selected').text()+'</li>');
			
		}else if(tab == 'tab2'){
			
			$("#myTab > li").removeClass("active");
			$("#tab2").parent().addClass("active");
			
			$(".tab-content > div").removeClass("in active");
			$("#gen").addClass("in active");
			
			$('.breadcrumb').append('<li class="active">宝贝跟踪</li>');
		}else if(tab == 'tab3'){
			
			$("#myTab > li").removeClass("active");
			$("#tab3").parent().addClass("active");
			
			$(".tab-content > div").removeClass("in active");
			$("#ying").addClass("in active");
			
			$('.breadcrumb').append('<li class="active">宝贝营销组合</li>');
		}else if(tab == 'tab4'){
			
			$("#myTab > li").removeClass("active");
			$("#tab4").parent().addClass("active");
			
			$(".tab-content > div").removeClass("in active");
			$("#price").addClass("in active");
			
			$('.breadcrumb').append('<li class="active">价格走势</li>');
		}
	}
	
	// 跳转到该页面时加载
	loadTab(goodsDetail.tab);
	// ===================================切换tab===============================================
	// 切换tab
	var curTab = 'tab1';

	$('#tab1, #tab2, #tab3, #tab4').on('shown.bs.tab', function(e) {

		curTab = e.target.id;

		loadTab(curTab);

	});
});