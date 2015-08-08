jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-brandAnalysis').addClass('active open');

	var brand_config = {};
	brand_config.tableId = 'brand-table';
	brand_config.url = global.path + '/a/BrandAnalysis?m=brand_search';
	brand_config.maxIndex = 1;
	
	brand_config.type = 'POST';

	brand_config.data = function(d) {
		
		// 添加额外的参数传给服务器
		
		var category = [];
		
		$("select[name='cat'] option:selected").each(function(){
			
			var c = $(this).val();
			if($.trim(c) != ''){
				category.push(c);
			}
			
		});

		d.category = category.join(' » ');// 商品类别
		
		d.brandName = $('#brandName').val();
		
		d.maxIndex = brand_config.maxIndex;// 最大列的索引

	};
	brand_config.columns = [
			{
				data : 'brand_name',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			}, {
				data : 'brand_name',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj,prop) {
					
					if($.trim(val_obj.addid) != '' ){
						return '已关注';
					}else{
						return '<label class="pos-rel">' + '<input type="checkbox" name="brandNames" value="' + val +'" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					}
					return '';
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	var brand_table = null;//loadDataTable(brand_config);
	
	var active_class = 'active';
	$('#brand-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#brand-table').on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});
	
	
	// 宝贝列表检索
	$('#brand-search-btn').click(function() {

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
		
		$('#brandDiv').show();
		
		if (brand_table) {
			brand_table.fnDraw();
		}else{
			brand_table = loadDataTable(brand_config);
		}

	});
	
	// 批量关注
	$('#batch-attn-btn').click(function() {
		
		var brandNames = [];
		
		$('input[name="brandNames"]:checked').each(function(){
			
			brandNames.push($(this).val());
			
		});

		if (brandNames.length == 0) {
			showMsg("至少选择一项");
			return;
		}
		
		$.post(global.path + '/a/BrandAnalysis', {
			'brandNames' : brandNames.join(','),
			'm' : "batch_attned"
		}, function(result) {

			if (result.status === '1') {
				showMsg("品牌关注成功", function(){
					
					if (brand_table) {
						brand_table.fnDraw();
					}else{
						brand_table = loadDataTable(brand_config);
					}
					
				});
			} else {
				showMsg("品牌关注失败");
			}
		}, 'json');

	});
	
});

// 获取子类目，主营类目的sId默认为0
function addCat(sId) {

	loadSelectCat(sId, global.path);
}