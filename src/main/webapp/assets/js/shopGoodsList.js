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
	$('#syy-shopAnalysis').addClass('active open');

	// ======================================================宝贝列表=======================================================
	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/ShopAnalysis?m=ajax_goods_list';
	goods_config.maxIndex = 12;
	goods_config.paging = true;
	
	goods_config.type = 'POST';
	
	goods_config.order = [[ 8, 'desc' ]];

	goods_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		d.shopId = shopGoodsList.shopId;

		if($('#searchType').val() == 'search'){
			
			var category = [];
			
			$("select[name='cat'] option:selected").each(function(){
				
				var c = $(this).attr('data-category');
				if($.trim(c) != ''){
					category.push(c);
				}
				
			});

			d.category = category.join(' » ');// 商品类别
			
		}else if($('#searchType').val() == 'href'){
			
			d.category = $('#toCat').val();
			
		}

		d.prdName = $('#prdName').val().trim();// 宝贝名称

		d.maxIndex = goods_config.maxIndex;// 最大列的索引

	};
	
	goods_config.columns = [
			{
				data : 'prd_name',
				name : 't1',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
							+ data + '</a>';
					return html;
				}
			},
			{
				data : 'cat_path',
				name : 't1',
				render : function(data, type, full, meta) {
					
					if(!data){
						return "";
					}
					
					var html = [], toCat = [];
					$.each(data.split(' » '), function(idx, d){
						
						toCat.push(d);
						
						html.push('<a href="javascript:void(0);" onclick="toCat(this);" data-category="'+toCat.join(' » ')+'">'+d+'</a> ');
						
					});
					
					return html.join('<span style="color:#FF8000">»</span> ');
				}
			},
			{
				data : 'avg_price',
				name : 't2',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : "avg_price_tran",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "avg_price_tran_pre",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "zk_rate",
				name : "t21",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "zk_rate_pre",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_volume",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_volume_pre",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_amount",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_amount_pre",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : 'createtime',
				name : "t2"
			}, {
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj,prop) {
					
					var prdName = encodeURI(encodeURI(val_obj.prd_name));// 编码
					
					var html = '<div class="hidden-sm hidden-xs action-buttons">'
							+ '<a class="blue" href="'+global.path+'/a/ShopAnalysis?m=detail&shopId='+shopGoodsList.shopId+'&shopName='+shopGoodsList.shopName+'&itemId='+val+'&prdName='+prdName+'&tab=tab3">'
							+ '<img alt="宝贝销售趋势" title="宝贝销售趋势" src="'
							+ global.path
							+ '/assets/imagesLocal/shi.png">'
							+ '</a>'

							+ '<a class="green" href="'+global.path+'/a/ShopAnalysis?m=detail&shopId='+shopGoodsList.shopId+'&shopName='+shopGoodsList.shopName+'&itemId='+val+'&prdName='+prdName+'&tab=tab4">'
							+ '<img alt="价格走势" title="价格走势" src="'
							+ global.path
							+ '/assets/imagesLocal/jia.png">'
							+ '</a>' + '</div>';
					return html;
				}
			} ];

	//总计
	goods_config.footerCallback = function ( row, data, start, end, display ) {
        var api = this.api(), data;
        
        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
            			i*1 :
                    		typeof i === 'number' ?
                    				i : 0;
        };

        var cols = [3, 4, 7, 8, 9, 10];
        
        $.each(cols, function(idx, value){
        	// Total over this page
            var pageTotal = api
                .column( value, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            // Update footer
            $( api.column( value ).footer() ).html(pageTotal.toFixed(2));
        });
        
    };
	
	// 宝贝列表检索
	$('#goods-search-btn').click(function() {

		$('#searchType').val('search');
		
		if (goods_table) {
			goods_table.fnDraw();
		}

	});
	
	//===============================================店铺跟踪=================================================
	// dataTables配置
	var gen_config = {};
	gen_config.url = global.path + '/a/MarketAnalysis?m=goods_gen';
	gen_config.tableId = 'gen-table';

	gen_config.destroy = true;
	gen_config.maxIndex = 5;
	gen_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.genType = $('#genType').val();
		d.shopId = shopGoodsList.shopId;
		d.startDate = $('#gen-d43211').val();
		d.endDate = $('#gen-d43222').val();
		d.maxIndex = gen_config.maxIndex;

		d.itemId = shopGoodsList.itemId;

	};

	gen_config.columns = [];
	$.extend(true, gen_config.columns, gen.columns.c1);// 深度拷贝

	gen_config.columns[1] = {
		data : 'cpid',
		title : '单品查看',
		render : function(data, type, full, meta) {

			return '<a href="' + global.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopGoodsList.shopId + '&shopName=' + goodsList.shopName
					+ '&date=' + shopGoodsList.date + '&tab=tab5&gen=1&itemId=' + full.item_id + '">只看该商品</a>';
		}
	};

	// 初始加载
	var genTable = null;// loadDataTable(gen_config);

	function loadGenTable(genType) {
		if (genType == 2) {// 改名跟踪

			gen_config.columns = [];

			$.extend(true, gen_config.columns, gen.columns.c2);// 深度拷贝

			gen_config.columns[1] = {
				data : 'cnid',
				title : '单品查看',
				render : function(data, type, full, meta) {

					var shopName = encodeURI(shopGoodsList.shopName);// 编码

					return '<a href="' + global.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopGoodsList.shopId + '&shopName=' + shopName
							+ '&date=' + shopGoodsList.date + '&tab=tab5&gen=2&itemId=' + full.item_id + '">只看该商品</a>';
				}
			};

		} else if (genType == 1) {// 调价跟踪

			gen_config.columns = [];

			$.extend(true, gen_config.columns, gen.columns.c1);// 深度拷贝

			gen_config.columns[1] = {
				data : 'cpid',
				title : '单品查看',
				render : function(data, type, full, meta) {

					var shopName = encodeURI(shopGoodsList.shopName);// 编码

					return '<a href="' + global.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopGoodsList.shopId + '&shopName=' + shopName
							+ '&date=' + shopGoodsList.date + '&tab=tab5&gen=1&itemId=' + full.item_id + '">只看该商品</a>';
				}
			};

		} else if (genType == 3) {// 上架跟踪
			gen_config.columns = gen.columns.c3;
		}

		if (genTable) {
			genTable._fnClearTable();
		}

		$('.breadcrumb > li.active:last').text($('#genType > option:selected').text());
		
		genTable = loadDataTable(gen_config);

	}

	// 检索
	$('#gen-search-btn').click(function() {

		var genType = $('#genType').val();

		loadGenTable(genType);
	});
	
	//==============================================销售趋势=======================================================
	
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
		var startDate = $('#trend-d4321').val();
		var endDate = $('#trend-d4322').val();
		$.get(global.path + '/a/ShopAnalysis?m=sales_trend', {
			shopId : shopGoodsList.shopId,
			startDate : startDate,
			endDate : endDate,
			showType: $('input[name="showType"]:checked').val()
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
	trend_config.url = global.path + '/a/ShopAnalysis?m=sales_trend';
	trend_config.maxIndex = 3;

	trend_config.data = function(d) {

		d.showType = $('input[name="showType"]:checked').val();
		d.shopId = shopGoodsList.shopId;
		d.startDate = $('#trend-d4321').val();
		d.endDate = $('#trend-d4322').val();
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
            $( api.column( value ).footer() ).html(pageTotal.toFixed(2));
        });
        
    };

	// 检索
	$('#trend-search-btn').click(function() {

		var startDate = $('#trend-d4321').val();
		var endDate = $('#trend-d4322').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
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
	
	//===========================================类别分析==========================================
	function loadCatChart(chartWay, chartType){
		var startDate = $('#cat-d4321').val();
		var endDate = $('#cat-d4322').val();
		$.get(global.path + '/a/ShopAnalysis?m=shop_cat_analysis', {
			shopId : shopGoodsList.shopId,
			startDate : startDate,
			endDate : endDate,
			orderWay: $('input[name="orderWay"]:checked').val()
		}, function(data) {
			if(chartType == 'bar'){
				
				if(data.data.length > 20){
					$('#echarts-cat').css('height', '1000px');
				}
				
				//加载图表或数据表
				renderChart(option1(data.data, chartWay, '各类别'),'echarts-cat');
			}else if(chartType == 'pie'){
				if(data.data.length > 20){
					$('#echarts-cat').css('height', '600px');
				}
				//加载图表或数据表
				renderChart(option2_2(data.data, chartWay, '各类别'),'echarts-cat');
			}
			
			
		}, "json");
	}
	
	$('input[name="chartWay2"]').click(function(){
		
		loadCatChart($(this).val(), $('input[name="chartType2"]:checked').val());
	});
	
	
	var cat_config = {}, catTable = null;
	cat_config.tableId = 'cat-table';
	cat_config.url = global.path + '/a/ShopAnalysis?m=shop_cat_analysis';
	cat_config.maxIndex = 3;

	cat_config.data = function(d) {

		d.showType = $('input[name="showType2"]:checked').val();
		d.shopId = shopGoodsList.shopId;
		d.startDate = $('#cat-d4321').val();
		d.endDate = $('#cat-d4322').val();
		d.maxIndex = cat_config.maxIndex;

	};
	cat_config.columns = [
			{
				data : 'cat_name'
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
	cat_config.footerCallback = function ( row, data, start, end, display ) {
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
            $( api.column( value ).footer() ).html(pageTotal.toFixed(2));
        });
        
    };
	
 // 检索
	$('#search-cat-btn').click(function() {

		var startDate = $('#cat-d4321').val();
		var endDate = $('#cat-d4322').val();

		if (startDate == '' || endDate == '') {
			showMsg('月份不能为空');
			return;
		}

		var chartType = $('input[name="chartType2"]:checked').val();
		if (chartType == 'data') {// 数据表

			$('#chartDiv2').hide();
			$('#tableDiv2').show();

			if (catTable) {
				catTable.fnDraw();
			}else{
				catTable = loadDataTable(cat_config);
			}
		} else {// 图表

			$('#tableDiv2').hide();
			$('#chartDiv2').show();

			loadCatChart($('input[name="chartWay2"]:checked').val(), chartType);
		}
	});
	
	//===============================================动态评分=======================================
	
	function loadRateChart(chartWay){
		var startDate = $('#rate-d4321').val();
		var endDate = $('#rate-d4322').val();
		$.get(global.path + '/a/ShopAnalysis?m=dynamic_rate', {
			shopId : shopGoodsList.shopId,
			startDate : startDate,
			endDate : endDate
		}, function(data) {

			//加载图表或数据表
			renderChart(option3_3(data.data, chartWay),'echarts-rate');
			
		}, "json");
	}
	
	$('input[name="rateChartWay"]').click(function(){
		
		loadRateChart($(this).val());
	});

	
	var rate_config = {}, rateTable = null;
	rate_config.tableId = 'rate-table';
	rate_config.url = global.path + '/a/ShopAnalysis?m=dynamic_rate';
	rate_config.maxIndex = 18;

	rate_config.data = function(d) {

		d.shopId = shopGoodsList.shopId;
		d.startDate = $('#rate-d4321').val();
		d.endDate = $('#rate-d4322').val();
		d.maxIndex = rate_config.maxIndex;

	};
	rate_config.columns = [
			{
				data : 'catch_date'
			},
			{
				data : 'describe',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'describe_five',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'describe_four',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'describe_three',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'describe_two',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'describe_one',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service_five',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service_four',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service_three',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service_two',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'service_one',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'delivery',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'delivery_five',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ,
			{
				data : 'delivery_four',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ,
			{
				data : 'delivery_three',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ,
			{
				data : 'delivery_two',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			} ,
			{
				data : 'delivery_one',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}  ];
	
	//总计
	rate_config.footerCallback = function ( row, data, start, end, display ) {
		
        var api = this.api();
        
        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
                    i.replace(/\([^\)]*\)/g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
        };

        var cols = [1, 7, 13];
        
        $.each(cols, function(idx, value){
        	// Total over this page
            var pageTotal = api
                .column( value, { page: 'current'} )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            // Update footer
            $( api.column( value ).footer() ).html(pageTotal / data.length);
        });
        
    };

	// 检索
	$('#rate-search-btn').click(function() {

		var startDate = $('#rate-d4321').val();
		var endDate = $('#rate-d4322').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}

		var chartType = $('input[name="rateChartType"]:checked').val();
		if (chartType == 2) {// 数据表

			$('#rateChartDiv').hide();
			$('#rateTableDiv').show();

			if (rateTable) {
				rateTable.fnDraw();
			}else{
				rateTable = loadDataTable(rate_config);
			}
		} else if (chartType == 1) {// 图表

			$('#rateTableDiv').hide();
			$('#rateChartDiv').show();

			var chartWay = $('input[name="reteChartWay"]:checked').val();
			loadRateChart(chartWay);
		}
	});
	
	//=====================================加载tab===========================================
	
	function loadTab(tab){
		
		$('.breadcrumb > .active').remove();
		
		if(tab == 'tab1'){//宝贝列表
			
			$('.breadcrumb').append('<li class="active">宝贝列表</li>');
			
			if (goods_table) {
				goods_table.fnDraw();
			} else {
				goods_table = loadDataTable(goods_config);
			}
			
		}else if(tab == 'tab2'){//店铺跟踪
			
			$('.breadcrumb').append('<li class="active">店铺跟踪</li>');
			$('.breadcrumb').append('<li class="active">'+$('#genType > option:selected').text()+'</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab2").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#shopGen").addClass("in active");
			
			loadGenTable($('#genType').val());
			
		}else if(tab == 'tab3'){//销售趋势
			
			$('.breadcrumb').append('<li class="active">销售趋势</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab3").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#salesTrend").addClass("in active");
			
			//初始化图表
			loadSalesChart($('input[name="chartWay"]:checked').val());
		}else if(tab == 'tab4'){//类别分析
			
			$('.breadcrumb').append('<li class="active">类别分析</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab4").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#catAnalysis").addClass("in active");
			
			//初始化图表
			loadCatChart($('input[name="chartWay2"]:checked').val(), $('input[name="chartType2"]:checked').val());
		}else if(tab == 'tab5'){//店铺详情
			
			$('.breadcrumb').append('<li class="active">店铺详情</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab5").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#shopDetail").addClass("in active");
		
			$.get(global.path + '/a/ShopAnalysis?m=shop_detail', {
				shopId : shopGoodsList.shopId
			}, function(data) {
				
				if(data){
					
					$('#dynamic-rate').html(data.html_source);
					
					$('#dynamic-rate .J_RateInfoTrigger').mouseover(function(){
						$('#dynamic-rate .J_RateInfoTrigger').removeClass('selected');
						$('#dynamic-rate .rate-info-box').hide();
						$(this).addClass('selected').find('.rate-info-box').show();
					});
					
					$('#shop_url').text(data.shop_name);
					$('#shop_url').attr('href', data.shop_url);
					
					$('#shop_img').attr('src', data.shop_img);
					$('#region').text(data.region);
					$('#item_count').text(data.item_count);
					$('#pre_sales_volume').text(data.pre_sales_volume);
					$('#sales_volume').text(data.sales_volume);
					$('#pre_sales_amount').text(data.pre_sales_amount);
					$('#sales_amount').text(data.sales_amount);
					$('#shop_name').text(data.shop_name);
					$('#seller').text(data.seller);
					$('#wangwang').html('<a target="_blank" href="http://amos.im.alisoft.com/msg.aw?v=2&amp;uid='+data.seller+'&amp;site=cntaobao&amp;s=1&amp;charset=utf-8"><img border="0" src="http://amos.im.alisoft.com/online.aw?v=2&amp;uid='+data.seller+'&amp;site=cntaobao&amp;s=1&amp;charset=utf-8" alt="点击这里给我发消息">');
				}
				
				
			}, "json");
			
		}else if(tab == 'tab6'){//动态评分
			
			$('.breadcrumb').append('<li class="active">动态评分</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab6").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#dynamicRate").addClass("in active");
			
			//初始化图表
			loadRateChart($('input[name="rateChartWay"]:checked').val());
		}
		
	}
	
	loadTab(shopGoodsList.tab);
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2, #tab3, #tab4, #tab5, #tab6').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id;
	    
	    loadTab(curTabIdx);
	});
	
});

//按类目检索
function toCat(catObj){
	
	$('#searchType').val('href');
	
	var cat = $(catObj).attr('data-category');
	
	$('#toCat').val(cat);
	
	if (goods_table) {
		goods_table.fnDraw();
	}
}

//获取子类目，主营类目的sId默认为0
function addCat(sId) {

	loadSelectCat(sId, global.path);
}