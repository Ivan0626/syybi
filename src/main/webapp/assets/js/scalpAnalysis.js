jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-scalpAnalysis').addClass('active open');

	var shopTable = null;
	//===================================================店铺列表==========================================================
	
	var shop_config = {};
	shop_config.tableId = 'shop-table';
	shop_config.url = global.path + '/a/ScalpAnalysis?m=shop_list';
	shop_config.maxIndex = 8;
	
	shop_config.type = 'POST';

	shop_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.shopName = $('#shop-attned').val().trim();
		d.maxIndex = shop_config.maxIndex;
	};
	shop_config.columns = [
			{
				data : 'shop_name',
				name: 't2',
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
				data : 'rise_index',
				name : 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : "sales_amount",
				name : "t4",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "item_count",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "shua_amount",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "shua_volume",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "shua_count",
				name : "t5",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : 'shop_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var shopName = encodeURI(encodeURI(val_obj.shopName));// 编码

					var html = '<div class="hidden-sm hidden-xs action-buttons"><a href="' + global.path+ '/a/ScalpAnalysis?m=goods_list&shopId=' + val_obj.shopId + '&shopName=' + shopName + '&tab=tab1">'
							+ '<img alt="" src="' + global.path + '/assets/imagesLocal/bao.png"></a>'
							+ '<a href="'+ global.path + '/a/ScalpAnalysis?m=goods_list&shopId=' + val_obj.shopId + '&shopName=' + shopName+ '&tab=tab2">' 
							+ '<img alt="" src="' + global.path + '/assets/imagesLocal/shua.png"></a></div>';
					return html;
				}
			}, {
				data : 'shop_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val_obj.shopId
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				}
			} ];
	
	if(shopTable == null){
		shopTable = loadDataTable(shop_config);
	}
	
	var active_class = 'active';
	$('#'+shop_config.tableId+' > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#'+shop_config.tableId).on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});

	// 搜索已关注的店铺
	// 远程数据源
	var attned_shops = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('shop_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/ScalpAnalysis?m=shop_attned&q=%QUERY',
		limit : 50
	});

	attned_shops.initialize();

	$('#shop-attned').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'shops',
		display : 'shop_name',
		source : attned_shops.ttAdapter()
	});

	// 添加关注店铺
	// 远程数据源
	var attn_shops = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('shop_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/ScalpAnalysis?m=shop_attn&q=%QUERY',
		limit : 50
	});

	attn_shops.initialize();

	$('#shop-attn').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'shops',
		display : 'shop_name',
		source : attn_shops.ttAdapter()
	});

	$('#shop-attn').on('typeahead:selected', function(e, item) {
		$('#shopId').val(item.shop_id);
		$('#shopName').val(item.shop_name);
	});

	// 检索
	$('#search-btn').click(function() {

		if (shopTable) {
			shopTable.fnDraw();
		}

	});

	// 关注
	$('#attn-btn').click(function() {
		// alert($('#shopId').val());
		// 添加该店铺
		$.post(global.path + '/a/ScalpAnalysis', {
			'shopId' : $('#shopId').val(),
			'shopName' : $('#shop-attn').val(),
			'm' : "attned"
		}, function(result) {

			if (result.status === 'notexist') {
				showMsg("该店铺不存在");
			} else if (result.status === 'success') {
				if (shopTable) {
					shopTable.fnDraw();
				}
			} else {
				showMsg("店铺关注失败");
			}
		}, 'json');

	});

	// 删除所选
	$('#del-btn').click(function() {

		var shopIds = [];
		$.each($("input[name='shopIds']:checked"), function(idx, d) {
			shopIds.push(d.value);
		});

		if (shopIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}

		bootbox.confirm("确定删除?", function(result) {
			if (result) {
				$.get(global.path + '/a/ScalpAnalysis', {
					'shopIds' : shopIds + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("店铺添加关注一个月后才能删除");
					} else if (result.status == 'delSuccess') {
						if (shopTable) {
							shopTable.fnDraw();
						}
					}
				}, 'json');
			}
		});
	});

});