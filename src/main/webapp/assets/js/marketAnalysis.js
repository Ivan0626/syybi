jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-marketAnalysis').addClass('active open');

	$('#shop-search').click(function() {

		window.location.href = marketAnalysis.path + "/a/MarketAnalysis?m=searchB";

	});

	var table = $('#dynamic-table').dataTable(
			{
				autoWidth : false,
				columns : [ {
					"data" : "shopName",
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'left').css('vertical-align', 'inherit');
					}
				}, {
					"data" : "riseIndex",
					fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
						$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
						if(sData > 10){
							$(nTd).css('color', 'red');
						}
					}
				}, {
					"data" : "salesAmountPre"
				}, {
					"data" : "itemCount"
				}, {
					"data" : "phoneShopAdv"
				}, {
					"data" : "phoneItemAdv"
				}, {
					"data" : "phoneItemTrain"
				}, {
					"data" : "phoneItemPromotion"
				}, {
					"data" : "webShopAdv"
				}, {
					"data" : "webItemAdv"
				}, {
					"data" : "webShopTrain"
				}, {
					"data" : "webItemTrain"
				}, {
					"data" : "taokeItem"
				}, {
					"data" : "juItem"
				}, {
					"data" : "cuItem"
				}, {
					"data" : "shopId",
					"orderable" : false
				}, {
					"data" : "asid",
					"orderable" : false
				} ],
				language : dataTableConfig.language,
				dom : dataTableConfig.dom,
				ajax : {
					url : marketAnalysis.path + "/a/MarketAnalysis?m=shop_list",
					type : 'POST',
					data : function(d) {
						// 添加额外的参数传给服务器
						var shopName = marketAnalysis.shopName;
						shopName = decodeURI(decodeURI(shopName));// 解码
						if (shopName) {
							d.shopName = shopName;
						} else {
							d.shopName = $('#shop-attned').val().trim();
						}
					}
				},
				serverSide : true,
				paging: false,
				initComplete : function (settings, json) {
					$('#shop-len').text(json.data.length);
			    },
				columnDefs : [
						{
							targets : 0,
							render : function(val, display, val_obj, prop) {
								var html = '<a target="_blank" href="' + val_obj.shopUrl + '">' + val + '</a>';

								if (val_obj.shopType == 'TMALL') {
									html = '<img src="' + marketAnalysis.path + '/assets/imagesLocal/bc_shop_icon.png">'
											+ ' <a target="_blank" href="' + val_obj.shopUrl + '">' + val + '</a>';
								}

								return html;
							}
						},
						{
							targets : 15,
							render : function(val, display, val_obj, prop) {

								var shopName = encodeURI(encodeURI(val_obj.shopName));// 编码

								var html = '<div class="hidden-sm hidden-xs action-buttons"><a href="' + marketAnalysis.path+ '/a/MarketAnalysis?m=goods_list&shopId=' + val_obj.shopId + '&shopName=' + shopName + '&tab=tab1">'
										+ '<img alt="宝贝列表" title="宝贝列表" src="' + marketAnalysis.path + '/assets/imagesLocal/bao.png"></a>'
										+ '<a href="'+ marketAnalysis.path + '/a/MarketAnalysis?m=goods_list&shopId=' + val_obj.shopId + '&shopName=' + shopName+ '&tab=tab2">' 
										+ '<img alt="广告分析" title="广告分析" src="' + marketAnalysis.path + '/assets/imagesLocal/guang.png"></a></div>';
								return html;
							}
						},
						{
							targets : 16,
							render : function(val, display, val_obj, prop) {

								var html = '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val_obj.shopId
										+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
								return html;
							}
						}, {
							className : "datatables-body-td",
							"targets" : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
						},{
							fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
								$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
							},
							"targets" : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
						} ]
			});

	var active_class = 'active';
	$('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#dynamic-table').on('click', 'td input[type=checkbox]', function() {
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
		remote : marketAnalysis.path + '/a/MarketAnalysis?m=shop_attned&q=%QUERY',
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
		remote : marketAnalysis.path + '/a/MarketAnalysis?m=shop_attn&q=%QUERY',
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

		if (table) {
			table.fnDraw();
		}

	});

	// 关注
	$('#attn-btn').click(function() {
		
		if(parseInt($('#shop-total').text()) <= parseInt($('#shop-len').text())){
			showMsg("超出关注上限！");
			return false;
		}
		
		var allLen = $('#dynamic-table > tbody > tr').length;
		
		// 添加该店铺
		$.post(marketAnalysis.path + '/a/MarketAnalysis', {
			'shopId' : $('#shopId').val(),
			'shopName' : $('#shop-attn').val(),
			'm' : "attned"
		}, function(result) {

			if (result.status === 'notexist') {
				showMsg("该店铺不存在");
			} else if (result.status === 'success') {
				
				showMsg("关注成功！", function(){
					
					if (table) {
						table.fnDraw();
						$('#shop-len').text(allLen + 1);
					}
				});
				
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

		var allLen = $('#dynamic-table > tbody > tr').length;
		
		confirmMsg("确定删除?", function(result) {
			if (result) {
				$.get(marketAnalysis.path + '/a/MarketAnalysis', {
					'shopIds' : shopIds + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("店铺添加关注一个月后才能删除");
					} else if (result.status == 'delSuccess') {
						
						showMsg("删除成功",function(){
							if (table) {
								table.fnDraw();
								
								$('#shop-len').text(allLen - shopIds.length);
							}
						});
						
					}
				}, 'json');
			}
		});
		
	});

});