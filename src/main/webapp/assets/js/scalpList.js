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
	$('#syy-scalpAnalysis').addClass('active open');

	// ======================================================宝贝列表=======================================================
	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/ScalpAnalysis?m=ajax_goods_list';
	goods_config.maxIndex = 13;
	goods_config.paging = true;
	
	goods_config.type = 'POST';

	goods_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		d.shopId = scalpList.shopId;

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
				name : 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : "avg_price_tran",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "avg_price_tran_pre",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_volume",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_volume_pre",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_amount",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_amount_pre",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "shua_volume",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "shua_volume_pre",
				name : "t4",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "shua_amount",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "shua_amount_pre",
				name : "t4",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(data, type, full, meta) {
					
					//var shopName = encodeURI(scalpList.shopName);// 编码
					var prdName = encodeURI(encodeURI(full.prd_name));// 编码
					
					var html = '<a href="'+global.path+'/a/ScalpAnalysis?m=scalp_info&shopId='+scalpList.shopId+'&shopName='+scalpList.shopName+'&itemId='+data+'&prdName='+prdName+'"><img alt="刷单详情" src="'
							+ global.path
							+ '/assets/imagesLocal/xiang.png" title="刷单详情"></a>';
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

        var cols = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        
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
	$('#goods-search-btn').click(function() {

		$('#searchType').val('search');
		
		if (goods_table) {
			goods_table.fnDraw();
		}

	});
	
	// ======================================================刷单分析=======================================================
	var scalp_config = {};
	scalp_config.tableId = 'scalp-table';
	scalp_config.url = global.path + '/a/ScalpAnalysis?m=ajax_scalp_anlysis';
	scalp_config.maxIndex = 6;

	scalp_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.shopId = scalpList.shopId;

		d.startDate = $('#d43211').val();
		d.endDate = $('#d43222').val();

		d.maxIndex = scalp_config.maxIndex;

	};
	scalp_config.columns = [
			{
					data : "tran_date",
					searchable: false
				}, {
					data : "sales_amount",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					}
				}, {
					data : "sales_volume",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					}
				}, {
					data : "tran_count",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					},
					render : function(val, display, val_obj,
							prop) {
						
						var toLink = global.path + '/a/ScalpAnalysis?m=scalp_detail&detailType=sales&shopId='+scalpList.shopId+'&shopName='+scalpList.shopName+'&date='+val_obj.tran_date;
						
						if(val > 1.5){
							return val + '(飙量:<a href="'+toLink+'">'+val_obj.rise_index+'<img src="'+global.path+'/assets/img/up_arrow_new.gif"></a>)';
						}else{
							return val + '(' + '<a href="'+toLink+'">详情</a>' + ')';
						}
					}
				}, {
					data : "shua_amount",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					}
				}, {
					data : "shua_volume",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					}
				}, {
					data : "shua_count",
					searchable: false,
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					},
					render : function(val, display, val_obj,
							prop) {
						
						var toLink = global.path + '/a/ScalpAnalysis?m=scalp_detail&detailType=shua&shopId='+scalpList.shopId+'&shopName='+scalpList.shopName+'&date='+val_obj.tran_date;
						
						return val + '(' + '<a href="'+toLink+'">详情</a>' + ')';
					}
				} ];

	//总计
	scalp_config.footerCallback = function ( row, data, start, end, display ) {
        var api = this.api(), data;
        
        // Remove the formatting to get integer data for summation
        var intVal = function ( i ) {
            return typeof i === 'string' ?
                    i.replace(/\([^\)]*\)/g, '')*1 :
                        typeof i === 'number' ?
                            i : 0;
        };

        var cols = [1, 2, 3, 4, 5, 6];
        
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
	
	// 初始加载
	var scalpTable = null;

	var scalpChart = null;
	
	// 刷单分析检索
	$('#ad-search-btn').click(function() {

		var startDate = $('#d43211').val();
		var endDate = $('#d43222').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}

		var chartType = $('input[name="chartType"]:checked').val();
		
		if(chartType == 'data'){//数据表
			
			$('#chartDiv').hide();
			$('#tableDiv').show();
			
			if (scalpTable) {
				scalpTable.fnDraw();
			}
		}else if(chartType == 'chart'){//图表
			
			$('#tableDiv').hide();
			$('#chartDiv').show();
			
			var chartWay = $('input[name="chartWay"]:checked').val();
			loadSalesChart(chartWay);
			
		}
	});
	
	function loadSalesChart(chartWay){
		var startDate = $('#d43211').val();
		var endDate = $('#d43222').val();
		require.config({
	        paths: {
	        	echarts: global.path+'/assets/js/echarts/source'
	        }
	    });
		// 按需加载
	    require(
	        [
				'echarts',//加载echarts.js
				'echarts/chart/pie',
				'echarts/chart/funnel',
				'echarts/chart/line',
				'echarts/chart/bar'
	        ],function (ec) {
	        	$.get(global.path+'/a/ScalpAnalysis?m=ajax_scalp_anlysis', {
	        		shopId:scalpList.shopId,
	        		startDate:startDate,
	        		endDate:endDate
	        	}, function(data){
	        		
	        		scalpChart = ec.init(document.getElementById('echarts-scalp'));
	        		
		            scalpChart.setOption(option6(data.data,chartWay));
	        	},"json");
	        }
	    );
	}
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	            
	        	if (curTabIdx == 2) {
	            	if(scalpChart){
	            		scalpChart.resize();
	            	}
	            }
	        },200);
	    };
	};
	
	$('input[name="chartWay"]').click(function(){
		
		loadSalesChart($(this).val());
	});
	
	//=====================================加载tab===========================================
	if(scalpList.tab == 'tab2'){
		$("#tab1,#tab2").parent().toggleClass("active");
		$("#goods,#scalp").toggleClass("in active");
		
		$('.breadcrumb .active').text('刷单分析');
		
		// 初始加载
		scalpTable = loadDataTable(scalp_config);
		
	}else if(scalpList.tab == 'tab1'){
		
		// 初始加载
		goods_table = loadDataTable(goods_config);
		
		$('.breadcrumb .active').text('宝贝列表');
	}
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id.replace('tab','');
	    if(curTabIdx == 1){
	    	$('.breadcrumb .active').text('宝贝列表');
	    	if (goods_table) {
	    		goods_table.fnDraw();
			}else{
				goods_table = loadDataTable(goods_config);
			}
	    }else if(curTabIdx == 2){
	    	$('.breadcrumb .active').text('刷单分析');
	    	if (scalpTable) {
				scalpTable.fnDraw();
			}else{
				scalpTable = loadDataTable(scalp_config);
			}
	    }
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