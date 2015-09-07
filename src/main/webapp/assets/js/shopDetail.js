var goods_list_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-marketAnalysis').addClass('active open');

	// =======================================================宝贝列表=================================================================

	var goods_list_config = {};
	goods_list_config.tableId = 'goods-list-table';
	goods_list_config.url = shopDetail.path + '/a/MarketAnalysis?m=ajax_shop_goods_list';
	goods_list_config.maxIndex = 11;
	goods_list_config.paging = true;

	goods_list_config.type = 'POST';

	goods_list_config.data = function(d) {

		d.shopId = shopDetail.shopId;
		d.date = shopDetail.date;
		d.maxIndex = goods_list_config.maxIndex;

		if ($('#searchType').val() == 'search') {

			var category = [];

			$("select[name='cat'] option:selected").each(function() {

				var c = $(this).attr('data-category');
				if ($.trim(c) != '') {
					category.push(c);
				}

			});

			d.category = category.join(' » ');// 商品类别

		} else if ($('#searchType').val() == 'href') {

			d.category = $('#toCat').val();

		}

	};

	goods_list_config.columns = [
			{
				data : 'prd_name',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url
							+ '">' + data + '</a>';
					return html;
				}
			},
			{
				data : 'cat_path',
				render : function(data, type, full, meta) {
					if (!data) {
						return "";
					}

					var html = [], toCat = [];
					$.each(data.split(' » '), function(idx, d) {

						toCat.push(d);

						html.push('<a href="javascript:void(0);" onclick="toCat(this);" data-category="' + toCat.join(' » ') + '">' + d + '</a> ');

					});

					return html.join('<span style="color:#FF8000">»</span> ');
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
						return data + '<img src="' + shopDetail.path + '/assets/img/down_arrow_new.gif">';
					} else if (data > full.avg_price) {
						return data + '<img src="' + shopDetail.path + '/assets/img/up_arrow_new.gif">';
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
				data : 'tran_count',
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
				data : 'name_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				},
				render : function(data, type, full, meta) {
					
					var shopName = encodeURI(shopDetail.shopName);// 编码
					
					return '<a href="'+ shopDetail.path + '/a/MarketAnalysis?m=shop_detail&shopId='+shopDetail.shopId+'&shopName='+shopName+'&date='+shopDetail.date+'&tab=tab4&gen=2">'
							+ data + '</a>';
				}
			},
			{
				data : 'price_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				},
				render : function(data, type, full, meta) {
					
					var shopName = encodeURI(shopDetail.shopName);// 编码
					return '<a href="'+ shopDetail.path + '/a/MarketAnalysis?m=shop_detail&shopId='+shopDetail.shopId+'&shopName='+shopName+'&date='+shopDetail.date+'&tab=tab5&gen=1">'
					+ data + '</a>';
				}
			},
			{
				data : 'change_date'
			},
			{
				data : 'item_id',
				render : function(data, type, full, meta) {
					
					var shopName = encodeURI(shopDetail.shopName);// 编码
					var prdName = encodeURI(encodeURI(full.prd_name));// 编码
					var toLink = shopDetail.path+'/a/MarketAnalysis?m=detail&shopId='+shopDetail.shopId+'&shopName='+shopName+'&itemId='+data+'&prdName='+prdName+'&tab=tab1';
					
					return renderGoodsAd(toLink, shopDetail.path, full);
				}
			},
			{
				data : 'item_id',
				render : function(data, type, full, meta) {
					
					var shopName = encodeURI(shopDetail.shopName);// 编码
					var prdName = encodeURI(encodeURI(full.prd_name));// 编码
					
					var html = '<a href="'+shopDetail.path+'/a/MarketAnalysis?m=detail&shopId='+shopDetail.shopId+'&shopName='+shopName+'&itemId='+data+'&prdName='+prdName+'&tab=tab3"><img alt="宝贝营销组合" src="'
							+ shopDetail.path
							+ '/assets/imagesLocal/ying.png" title="宝贝营销组合"></a>'
							+ '<a href="'+shopDetail.path+'/a/MarketAnalysis?m=detail&shopId='+shopDetail.shopId+'&shopName='+shopName+'&itemId='+data+'&prdName='+prdName+'&tab=tab4"><img alt="价格走势" src="'
							+ shopDetail.path + '/assets/imagesLocal/jia.png" title="价格走势"></a>';
					return html;
				}
			} ];

	// 初始加载
	// var goods_list_table = loadDataTable(goods_list_config);

	// 检索
	$('#goods-list-search-btn').click(function() {

		$('#searchType').val('search');

		if (goods_list_table) {
			goods_list_table.fnDraw();
		} else {
			goods_list_table = loadDataTable(goods_list_config);
		}

	});

	// =======================================================店铺广告=================================================================
	// dataTables配置
	var shopad_config = {};
	shopad_config.url = shopDetail.path + '/a/MarketAnalysis?m=shop_ad';
	shopad_config.tableId = 'shop-ad-table';

	shopad_config.destroy = true;

	shopad_config.maxIndex = 7;

	shopad_config.columns = shopad.columns.c2;

	shopad_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.adType = $('#shop-adtype').val();
		d.shopId = shopDetail.shopId;
		d.startDate = $('#shop-d43211').val();
		d.endDate = $('#shop-d43222').val();
		d.date = shopDetail.date;
		d.maxIndex = shopad_config.maxIndex;
	};

	// 初始加载
	var shopadTable = null;// loadDataTable(shopad_config);

	function loadShopAdTable(adType) {
		if (adType == 'ztc') {
			shopad_config.columns = shopad.columns.c1;
		} else if (adType == 'hot' || adType == 'normal' || adType == 'hot_mobile') {
			shopad_config.columns = shopad.columns.c2;
		} else if (adType == 'taobaoke') {
			shopad_config.columns = shopad.columns.c3;
		} else if (adType == 'sale') {
			shopad_config.columns = shopad.columns.c4;
		} else if (adType == 'activity' || adType == 'activity_mobile') {
			shopad_config.columns = [];
			$.extend(true, shopad_config.columns, shopad.columns.c2);
			shopad_config.columns[6] = {
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

		if (shopadTable) {
			shopadTable._fnClearTable();
		}

		shopadTable = loadDataTable(shopad_config);
	}

	// 检索
	$('#shopad-search-btn').click(function() {

		var startDate = $('#shop-d43211').val();
		var endDate = $('#shop-d43222').val();

		if (startDate == '' || endDate == '') {
			showMsg('时间不能为空');
			return;
		}

		var adType = $('#shop-adtype').val();

		loadShopAdTable(adType);

	});

	// =======================================================宝贝广告=================================================================
	// dataTables配置
	var goodsad_config = {};
	goodsad_config.url = shopDetail.path + '/a/MarketAnalysis?m=shop_goods_ad';
	goodsad_config.tableId = 'goods-ad-table';

	goodsad_config.destroy = true;

	goodsad_config.maxIndex = 8;

	goodsad_config.columns = goodsad.columns.c1;
	goodsad_config.type = 'POST';
	
	goodsad_config.order = [[ 2, 'desc' ]];

	goodsad_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.adType = $('#goods-adtype').val();
		d.shopId = shopDetail.shopId;
		d.prdName = $('#goods-prdname').val();
		d.date = shopDetail.date;
		d.maxIndex = goodsad_config.maxIndex;
	};

	// 初始加载
	var goodsadTable = null;// loadDataTable(goodsad_config);

	function loadGoodsAdTable(adType) {
		if (adType == 1 || adType == 2 || adType == 11 || adType == 3 || adType == 13) {// 钻展
			goodsad_config.columns = goodsad.columns.c1;
		} else if (adType == 5) {// 淘宝客
			goodsad_config.columns = goodsad.columns.c5;
		} else if (adType == 6 || adType == 14) {// 直通车
			goodsad_config.columns = goodsad.columns.c6;
		} else if (adType == 7) {// 聚划算
			goodsad_config.columns = goodsad.columns.c7;
		} else if (adType == 8 || adType == 10) {// 商品促销
			goodsad_config.columns = goodsad.columns.c8;
		} else if (adType == 12 || adType == 4) {
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

		if (goodsadTable) {
			goodsadTable._fnClearTable();
		}

		goodsadTable = loadDataTable(goodsad_config);
	}

	// 检索
	$('#goodsad-search-btn').click(function() {

		var adType = $('#goods-adtype').val();

		loadGoodsAdTable(adType);

	});

	// =======================================================改名跟踪=================================================================

	// dataTables配置
	var gen_config = {};
	gen_config.url = shopDetail.path + '/a/MarketAnalysis?m=goods_gen';
	gen_config.tableId = 'gen-table';

	gen_config.destroy = true;
	gen_config.maxIndex = 5;
	gen_config.data = function(d) {// 这里要加载动态参数，所以只能用回调函数，

		d.genType = $('#genType').val();
		d.shopId = shopDetail.shopId;
		d.startDate = $('#gen-d43211').val();
		d.endDate = $('#gen-d43222').val();
		d.maxIndex = gen_config.maxIndex;

		d.itemId = shopDetail.itemId;

	};

	gen_config.columns = [];
	$.extend(true, gen_config.columns, gen.columns.c1);// 深度拷贝

	gen_config.columns[1] = {
		data : 'cpid',
		title : '单品查看',
		render : function(data, type, full, meta) {

			return '<a href="' + shopDetail.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopDetail.shopId + '&shopName=' + goodsList.shopName
					+ '&date=' + shopDetail.date + '&tab=tab5&gen=1&itemId=' + full.item_id + '">只看该商品</a>';
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

					var shopName = encodeURI(shopDetail.shopName);// 编码

					return '<a href="' + shopDetail.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopDetail.shopId + '&shopName=' + shopName
							+ '&date=' + shopDetail.date + '&tab=tab5&gen=2&itemId=' + full.item_id + '">只看该商品</a>';
				}
			};

		} else if (genType == 1) {// 调价跟踪

			gen_config.columns = [];

			$.extend(true, gen_config.columns, gen.columns.c1);// 深度拷贝

			gen_config.columns[1] = {
				data : 'cpid',
				title : '单品查看',
				render : function(data, type, full, meta) {

					var shopName = encodeURI(shopDetail.shopName);// 编码

					return '<a href="' + shopDetail.path + '/a/MarketAnalysis?m=shop_detail&shopId=' + shopDetail.shopId + '&shopName=' + shopName
							+ '&date=' + shopDetail.date + '&tab=tab5&gen=1&itemId=' + full.item_id + '">只看该商品</a>';
				}
			};

		} else if (genType == 3) {// 上架跟踪
			gen_config.columns = gen.columns.c3;
		}

		if (genTable) {
			genTable._fnClearTable();
		}

		genTable = loadDataTable(gen_config);

	}

	// 检索
	$('#gen-search-btn').click(function() {

		var genType = $('#genType').val();

		loadGenTable(genType);
	});

	// ==========================================加载tab==========================================================
	function loadTab(tab, source) {
		
		$('.breadcrumb > .active').remove();
		
		if (tab == 'tab1') {// 宝贝列表

			if (goods_list_table) {
				goods_list_table.fnDraw();
			} else {
				goods_list_table = loadDataTable(goods_list_config);
			}
			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 宝贝列表</li>');

		} else if (tab == 'tab2') {// 店铺广告

			$("#myTab > li").removeClass("active");
			$("#tab2").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#shopAd").addClass("in active");

			if (source == 'toLink') {
				$('#shop-adtype').val(shopDetail.ad);
			}

			loadShopAdTable($('#shop-adtype').val());
			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 店铺广告</li>');

			$('.breadcrumb').append('<li class="active">' + $('#shop-adtype option:selected').text() + '</li>');
		} else if (tab == 'tab3') {// 宝贝广告

			$("#myTab > li").removeClass("active");
			$("#tab3").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#goodsAd").addClass("in active");

			if (source == 'toLink') {
				$('#goods-adtype').val(shopDetail.ad);
			}

			loadGoodsAdTable($('#goods-adtype').val());

			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 宝贝广告</li>');

			$('.breadcrumb').append('<li class="active">' + $('#goods-adtype option:selected').text() + '</li>');
			
		} else if (tab == 'tab4') {// 改名跟踪

			$("#myTab > li").removeClass("active");
			$("#tab4").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#gen").addClass("in active");

			if (source == 'toLink') {
				$('#genType').val(shopDetail.gen);
			} else if (source == 'toTab') {
				$('#genType').val(2);
			}

			loadGenTable($('#genType').val());
			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 改名跟踪</li>');
		} else if (tab == 'tab5') {// 调价跟踪

			$("#myTab > li").removeClass("active");
			$("#tab5").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#gen").addClass("in active");

			if (source == 'toLink') {
				$('#genType').val(shopDetail.gen);
			} else if (source == 'toTab') {
				$('#genType').val(1);
			}

			loadGenTable($('#genType').val());
			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 调价跟踪</li>');
		} else if (tab == 'tab6') {// 上架跟踪

			$("#myTab > li").removeClass("active");
			$("#tab6").parent().addClass("active");

			$(".tab-content > div").removeClass("in active");
			$("#gen").addClass("in active");

			if (source == 'toLink') {
				$('#genType').val(shopDetail.gen);
			} else if (source == 'toTab') {
				$('#genType').val(3);
			}

			loadGenTable($('#genType').val());
			
			$('.breadcrumb').append('<li class="active">'+shopDetail.date + ' 上架跟踪</li>');
		}
	}

	// 跳转到该页面时加载
	loadTab(shopDetail.tab, 'toLink');

	// ===================================切换tab===============================================
	// 切换tab
	var curTab = 'tab1';

	$('#tab1, #tab2, #tab3, #tab4, #tab5, #tab6').on('shown.bs.tab', function(e) {

		curTab = e.target.id;

		loadTab(curTab, 'toTab');

	});

});

// 按类目检索
function toCat(catObj) {

	$('#searchType').val('href');

	var cat = $(catObj).attr('data-category');

	$('#toCat').val(cat);

	if (goods_list_table) {
		goods_list_table.fnDraw();
	} else {
		goods_list_table = loadDataTable(goods_list_config);
	}
}

// 获取子类目，主营类目的sId默认为0
function addCat(sId) {

	loadSelectCat(sId, shopDetail.path);
}