jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-goodsAnalysis').addClass('active open');

	$("label > img").click(function() {
		
		//alert($(this).parent().attr('for'));
		
		$(this).addClass('hide').siblings('img').removeClass('hide');
	});

	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/GoodsAnalysis?m=goods_search';
	goods_config.maxIndex = 12;
	goods_config.paging = true;
	goods_config.order = [[ 4, 'desc' ]];
	
	goods_config.type = 'POST';

	goods_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		
		var category = [];
		
		$("select[name='cat'] option:selected").each(function(){
			
			var c = $(this).attr('data-category');
			if($.trim(c) != ''){
				category.push(c);
			}
			
		});

		d.category = category.join(' » ');// 商品类别
		
		d.shopName = $('#shopName').val();
		d.shopType = $('input[name="shopType"]:checked').val();
		
		d.prdName = $('#prdName').val();
		d.notPrdName = $('#notPrdName').val();
		
		d.startAvgPrice = $('#startAvgPrice').val();
		d.endAvgPrice = $('#endAvgPrice').val();
		
		d.startVolumePre = $('#startVolumePre').val();
		d.endVolumePre = $('#endVolumePre').val();
		
		d.startVolume = $('#startVolume').val();
		d.endVolume = $('#endVolume').val();
		
		d.startAmount = $('#startAmount').val();
		d.startAmount = $('#startAmount').val();
		
		d.startAmountPre = $('#startAmountPre').val();
		d.endAmountPre = $('#endAmountPre').val();
		
		d.startAvgPriceTranPre = $('#startAvgPriceTranPre').val();
		d.endAvgPriceTranPre = $('#endAvgPriceTranPre').val();
		
		d.region = $('#region').val();
		
		d.maxIndex = goods_config.maxIndex;// 最大列的索引

	};
	goods_config.columns = [
			{
				data : 'prd_name',
				name: 't1',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url
							+ '">' + data + '</a>';
					return html;
				}
			},{
				data : 'shop_name',
				name: 't2',
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
				data : 'avg_price',
				name: 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			 {
				data : 'avg_price_tran_pre',
				name: 't4',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				},
				render : function(data, type, full, meta) {
					if(!data){
						return "";
					}
					
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
				name: 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_volume_pre",
				name: 't4',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "tran_count",
				name: 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "tran_count_pre",
				name: 't4',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : "sales_amount",
				name: 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_amount_pre",
				name: 't4',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : 'region',
				name: 't1',
			},{
				data : 'createtime',
				name: 't3',
			}, {
				data : 'item_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj,prop) {
					
					if($.trim(val_obj.asid) != '' ){
						return '已关注';
					}else{
						return '<label class="pos-rel">' + '<input type="checkbox" name="itemIds" value="' + val + "@" + val_obj.shop_id
						+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					}
					return '';
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	var goods_table = null;//loadDataTable(goods_config);
	
	var active_class = 'active';
	$('#goods-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#goods-table').on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});
	
	
	// 宝贝列表检索
	$('#goods-search-btn').click(function() {

		$('#goodsDiv').show();
		
		if (goods_table) {
			goods_table.fnDraw();
		}else{
			goods_table = loadDataTable(goods_config);
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