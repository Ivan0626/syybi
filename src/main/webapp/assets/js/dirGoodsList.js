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
	$('#syy-goodsAnalysis').addClass('active open');

	// ======================================================宝贝列表=======================================================
	
	// 搜索已关注的宝贝
	// 远程数据源
	var attned_goods = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('prd_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/GoodsAnalysis?m=goods_attned&adid='+$('#adid').val()+'&q=%QUERY',
		limit : 50
	});

	attned_goods.initialize();

	$('#goods-attned').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'goods',
		display : 'prd_name',
		source : attned_goods.ttAdapter()
	});
	
	//关注宝贝链接
	$('#goods-attn-btn').click(function(){
		
		var url = $.trim($('#goods-attn-url').val());
		
		if(url == ''){
			showMsg("请输入宝贝链接！");
			return false;
		}
		
		var valid = true;
		if(!isURL(url)){
			valid = false;
		}else{
			
			if(url.indexOf('?id=') > -1){
				valid = true;
			}else{
				if(url.indexOf('&id=') > -1){
					valid = true;
				}else{
					valid = false;
				}
			}
		}
		
		if(!valid){
			showMsg("链接无效！");
			return false;
		}
		
		if(parseInt($('#goods-total').text()) == parseInt($('#goods-len').text())){
			showMsg("超出关注上限！");
			return false;
		}
		
		$.get(global.path + '/a/GoodsAnalysis?m=attn_url', {
			
			adid: $('#adid').val(),
			'url': url
			
		}, function(result){
			
			if(result.status == 'invalid'){
				showMsg("链接无效！");
			}else if(result.status == 'not_exist'){
				showMsg("系统中未找到该宝贝，可能是宝贝没有销量！");
			}else if(result.status == 'attned'){
				showMsg("商品已经被关注！");
			}else if(result.status == 'success'){
				
				showMsg("添加成功！", function(){
					
					if (goods_table) {
						goods_table.fnDraw();
						$('#goods-len').text($('#goods-table > tbody > tr').length + 1);
					}
					
				});
				
			}else{
				showMsg("添加失败！");
			}
			
		}, 'json');
		
	});
	
	
	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/GoodsAnalysis?m=ajax_goods_list';
	goods_config.maxIndex = 11;
	
	goods_config.type = 'POST';
	
	goods_config.initComplete = function (settings, json) {
		$('#goods-len').text(json.data.length);
    };

	goods_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		d.adid = $('#adid').val();

		d.prdName = $.trim($('#goods-attned').val());// 宝贝名称
		
		d.category = $('#toCat').val();

		d.maxIndex = goods_config.maxIndex;// 最大列的索引

	};
	
	goods_config.columns = [
			{
				data : 'prd_name',
				name : 't4',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
							+ data + '</a>';
					return html;
				}
			},
			{
				data : 'cat_path',
				name : 't4',
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
				data : 'shop_name',
				name: 't5',
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
							+ '<a class="blue" href="'+global.path+'/a/GoodsAnalysis?m=detail&adid='+dirGoodsList.adid+'&shopId='+val_obj.shop_id+'&dirName='+dirGoodsList.dirName+'&itemId='+val+'&prdName='+prdName+'&tab=tab3">'
							+ '<img alt="宝贝销售趋势" title="宝贝销售趋势" src="'
							+ global.path
							+ '/assets/imagesLocal/shi.png">'
							+ '</a>'

							+ '<a class="green" href="'+global.path+'/a/GoodsAnalysis?m=detail&adid='+dirGoodsList.adid+'&shopId='+val_obj.shop_id+'&dirName='+dirGoodsList.dirName+'&itemId='+val+'&prdName='+prdName+'&tab=tab4">'
							+ '<img alt="价格走势" title="价格走势" src="'
							+ global.path
							+ '/assets/imagesLocal/jia.png">'
							+ '</a>' + '</div>';
					return html;
				}
			}, {
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="itemIds" value="'+val_obj.shop_id+'_' + val
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	var active_class = 'active';
	$('#'+goods_config.tableId+' > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
		var th_checked = this.checked;// checkbox inside "TH" table
		// header

		$(this).closest('table').find('tbody > tr').each(function() {
			var row = this;
			if (th_checked)
				$(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
			else
				$(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
		});
	});

	// select/deselect a row when the checkbox is checked/unchecked
	$('#'+goods_config.tableId).on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});

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

        var cols = [5, 6, 7, 8];
        
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
	
	// 宝贝列表检索
	$('#goods-attned-btn').click(function() {

		if (goods_table) {
			goods_table.fnDraw();
		}

	});
	
	// 删除所选
	$('#del-btn').click(function() {

		var itemIds = [];
		$.each($("input[name='itemIds']:checked"), function(idx, d) {
			itemIds.push(d.value);
		});

		if (itemIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}

		confirmMsg("确定删除?", function(result) {
			if (result) {
				$.get(global.path + '/a/GoodsAnalysis', {
					'adid': $('#adid').val(),
					'itemIds' : itemIds + "",
					'm' : "del_attn_goods"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("所选宝贝距关注时间不到30天！");
					} else if (result.status == 'delSuccess') {
						if (goods_table) {
							goods_table.fnDraw();
							
							$('#goods-len').text($('#'+goods_config.tableId+' > tbody > tr').length - itemIds.length);
						}
					}
				}, 'json');
			}
		});
		
	});
	
	//移动宝贝
	$('#to-btn').click(function(){
		
		var itemIds = [];
		$.each($("input[name='itemIds']:checked"), function(idx, d) {
			itemIds.push(d.value);
		});

		if (itemIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}
		
		$.get(global.path + '/a/GoodsAnalysis', {
			'adid': $('#adid').val(),
			'itemIds' : itemIds + "",
			'toAdid': $('#toDir').val(),
			'm' : "to_dir"
		}, function(result) {

			if(result.status == '1'){
				showMsg('移动成功！',function(){
					
					$('#adid').val($('#toDir').val());
					
					var dirName = encodeURI(encodeURI($('#toDir > option:selected').text()));// 编码
					
					//刷新页面
					window.location.href = global.path+'/a/GoodsAnalysis?m=goods_list&adid=' + $('#toDir').val() + '&dirName=' + dirName + '&tab=tab1';
					
				});
			}else{
				showMsg('移动失败！');
			}
			
		}, 'json');
		
	});
	
	// =======================================================宝贝跟踪=================================================================
	// dataTables配置
	var gen_config = {};
	gen_config.url = global.path + '/a/GoodsAnalysis?m=goods_gen';
	gen_config.tableId = 'gen-table';

	gen_config.destroy = true;
	gen_config.maxIndex = 5;
	gen_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.adid = $('#adid').val();
		d.genType = $('#genType').val();
		d.startDate = $('#gen-d43211').val();
		d.endDate = $('#gen-d43222').val();
		d.maxIndex = gen_config.maxIndex;

	};

	gen_config.columns = gen.columns.c1;

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
	
	//===========================================类别分析==========================================
	function loadPriceChart(){
		
		var startDate = $('#price-d43211').val();
		var endDate = $('#price-d43222').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}
		
		var startAvgPrice = $.trim($('#startAvgPrice').val());
		var endAvgPrice = $.trim($('#endAvgPrice').val());
		
		if(parseFloat(endAvgPrice) < parseFloat(startAvgPrice)){
			showMsg("最大单价必须大于最低单价！");
			return false;
		}
		
		if(parseFloat(startAvgPrice) < 0){
			$('#startAvgPrice').val(dirGoodsList.startAvgPrice);
		}
		
		if(parseInt($('#priceSize').val()) < 1 || parseInt($('#priceSize').val()) > 10){
			$('#priceSize').val(5);
		}
		
		$.get(global.path + '/a/GoodsAnalysis?m=price_analysis', {
			adid : $('#adid').val(),
			startDate : $('#price-d43211').val(),
			endDate : $('#price-d43222').val(),
			shopType : $('input[name="shopType"]:checked').val(),
			startAvgPrice : $('#startAvgPrice').val(),
			endAvgPrice : $('#endAvgPrice').val(),
			priceSize : $('#priceSize').val()
		}, function(data) {
			
			//加载图表或数据表
			renderChart(option9(data),'echarts-price');
			
		}, "json");
	}
	
 // 检索
	$('#search-price-btn').click(function() {

		loadPriceChart();
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
			
			$('.breadcrumb').append('<li class="active">宝贝跟踪</li>');
			$('.breadcrumb').append('<li class="active">'+$('#genType > option:selected').text()+'</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab2").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#goodsGen").addClass("in active");
			
			// 初始加载
			loadDataTable(gen_config);
			
		}else if(tab == 'tab3'){//价格段分析
			
			$('.breadcrumb').append('<li class="active">价格段分析</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab3").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#priceAnalysis").addClass("in active");
			
			//初始化图表
			loadPriceChart();
		}else if(tab == 'tab4'){//销售趋势
			
			$('.breadcrumb').append('<li class="active">销售趋势</li>');
			
			$("#myTab > li").removeClass("active");
			$("#tab4").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#salesTrend").addClass("in active");
			

			//初始化图表
			loadSalesChart($('input[name="chartWay"]:checked').val());
		}
		
	}
	
	loadTab(dirGoodsList.tab);
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2, #tab3, #tab4').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id;
	    
	    loadTab(curTabIdx);
	});
	
});

//按类目检索
function toCat(catObj){
	
	var cat = $(catObj).attr('data-category');
	
	$('#toCat').val(cat);
	
	if (goods_table) {
		goods_table.fnDraw();
	}
}
