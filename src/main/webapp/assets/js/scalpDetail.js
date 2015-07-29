var goods_list_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-scalpAnalysis').addClass('active open');

	// =======================================================宝贝列表=================================================================

	var goods_list_config = {};
	goods_list_config.tableId = 'goods-list-table';
	goods_list_config.url = global.path + '/a/ScalpAnalysis?m=ajax_shop_goods_list';
	goods_list_config.maxIndex = 10;
	goods_list_config.paging = true;

	goods_list_config.type = 'POST';

	goods_list_config.data = function(d) {

		d.shopId = scalpDetail.shopId;
		d.date = scalpDetail.date;
		d.detailType = scalpDetail.detailType;
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
				data : 'shua_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'shua_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'shua_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(data, type, full, meta) {
					
					var shopName = encodeURI(scalpDetail.shopName);// 编码
					var prdName = encodeURI(encodeURI(full.prd_name));// 编码
					
					var html = '<a href="'+global.path+'/a/ScalpAnalysis?m=scalp_info&shopId='+scalpDetail.shopId+'&shopName='+shopName+'&itemId='+data+'&prdName='+prdName+'&tab=tab3"><img alt="刷单详情" src="'
							+ global.path
							+ '/assets/imagesLocal/xiang.png" title="刷单详情"></a>';
					return html;
				}
			} ];

	// 初始加载
	var goods_list_table = loadDataTable(goods_list_config);

	// 检索
	$('#goods-list-search-btn').click(function() {

		$('#searchType').val('search');

		if (goods_list_table) {
			goods_list_table.fnDraw();
		} else {
			goods_list_table = loadDataTable(goods_list_config);
		}

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

	loadSelectCat(sId, global.path);
}