jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-shopAnalysis').addClass('active open');

	$("label > img").click(function() {
		
		//alert($(this).parent().attr('for'));
		
		$(this).addClass('hide').siblings('img').removeClass('hide');
	});

	var shop_config = {};
	shop_config.tableId = 'shop-table';
	shop_config.url = global.path + '/a/ShopAnalysis?m=shop_search';
	shop_config.maxIndex = 8;
	shop_config.paging = true;
	shop_config.order = [[ 7, 'desc' ]];
	
	shop_config.type = 'POST';

	shop_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		
		var category = [];
		
		$("select[name='cat'] option:selected").each(function(){
			
			var c = $(this).attr('data-category');
			if($.trim(c) != ''){
				category.push(c);
			}
			
		});

		d.category = category.join(' » ');// 商品类别
		
		d.prdName = $('#prdName').val();
		d.notPrdName = $('#notPrdName').val();
		
		d.startAvgPrice = $('#startAvgPrice').val();
		d.endAvgPrice = $('#endAvgPrice').val();
		d.monthType = $('#monthType').val();
		d.startAvgPriceTran = $('#startAvgPriceTran').val();
		d.endAvgPriceTran = $('#endAvgPriceTran').val();
		d.region = $('#region').val();
		
		d.shopType = $('input[name="shopType"]:checked').val();
		
		d.maxIndex = shop_config.maxIndex;// 最大列的索引

	};
	shop_config.columns = [
			{
				data : 'shop_name',
				render : function(val, display, val_obj, prop) {
					var html = '<a target="_blank" href="' + val_obj.shop_url + '">' + val + '</a>';

					if (val_obj.shop_type == 'TMALL') {
						html = '<img src="' + global.path + '/assets/imagesLocal/bc_shop_icon.png">'
								+ ' <a target="_blank" href="' + val_obj.rate_link + '">' + val + '</a>';
					}

					return html;
				}
			},
			{
				data : 'region',
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
			}, {
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
			}, {
				data : 'avg_price_tran_pre',
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
			}, {
				data : "sales_volume",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_volume_pre",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : 'shop_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj,prop) {
					
					if($.trim(val_obj.asid) != '' ){
						return '已关注';
					}else{
						return '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val + "@" + val_obj.shop_name
						+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					}
					return '';
				}
			} ];
	
	var shop_table = null;//loadDataTable(shop_config);
	
	var active_class = 'active';
	$('#shop-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#shop-table').on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});
	
	
	// 宝贝列表检索
	$('#rise-search-btn').click(function() {

		var category = [];
		
		$("select[name='cat'] option:selected").each(function(){
			
			var c = $(this).val();
			if($.trim(c) != ''){
				category.push(c);
			}
			
		});
		
		if(category.length == 0){
			showMsg("请选择商品类别");
			return;
		}
		
		$('#shopDiv').show();
		
		if (shop_table) {
			shop_table.fnDraw();
		}else{
			shop_table = loadDataTable(shop_config);
		}

	});
	
	// 批量关注
	$('#batch-attn-btn').click(function() {
		
		var shopIds = [];
		
		$('input[name="shopIds"]:checked').each(function(){
			
			shopIds.push($(this).val());
			
		});

		if (shopIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}
		
		$.post(global.path + '/a/ShopAnalysis', {
			'shopIds' : shopIds.join(','),
			'm' : "batch_attned"
		}, function(result) {

			if (result.status === '1') {
				showMsg("店铺关注成功");
			} else {
				showMsg("店铺关注失败");
			}
		}, 'json');

	});
	
});

// 获取子类目，主营类目的sId默认为0
function addCat(sId) {

	loadSelectCat(sId, global.path);
}