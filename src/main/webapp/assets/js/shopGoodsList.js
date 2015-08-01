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

							+ '<a class="green" href="'+global.path+'/a/ShopAnalysis?m=detail&shopId='+shopGoodsList.shopId+'&shopName='+shopGoodsList.shopName+'&itemId='+val+'&prdName='+prdName+'&tab=tab2">'
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
			
		}
		
	}
	
	loadTab(shopGoodsList.tab);
	
	//===================================切换tab===============================================
	//切换tab
	var curTabIdx = 1;
	
	$('#tab1, #tab2').on('shown.bs.tab', function (e) {
		
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