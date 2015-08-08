var goods_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-brandAnalysis').addClass('active open');

	$('#brand-search').click(function() {

		window.location.href = global.path + "/a/BrandAnalysis?m=searchB";

	});
	
	
	var brandTable = null;
	//===================================================品牌列表==========================================================
	
	var brand_config = {};
	brand_config.tableId = 'brand-table';
	brand_config.url = global.path + '/a/BrandAnalysis?m=brand_analysis';
	brand_config.maxIndex = 7;
	
	brand_config.type = 'POST';

	brand_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.maxIndex = brand_config.maxIndex;
	};
	brand_config.columns = [
			{
				data : 'brand_name',
				render : function(val, display, val_obj, prop) {
					
					var brandName = encodeURI(encodeURI(val));// 编码
					
					var html = '<a href="'+global.path + '/a/BrandAnalysis?m=brand_ind&brandName='+brandName+'">' + val + '</a>';

					return html;
				}
			},
			{
				data: 'cat_name'
			},{
				data : "tmall",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "tmall_pre",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "taobao",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "taobao_pre",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "att_date"
			}, {
				data : 'brand_name',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="brandNames" value="' + val
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	if(brandTable == null){
		brandTable = loadDataTable(brand_config);
	}
	
	var active_class = 'active';
	$('#'+brand_config.tableId+' > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#'+brand_config.tableId).on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});

	// 添加关注品牌
	// 远程数据源
	var attn_brands = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('brand_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/BrandAnalysis?m=brand_attn&q=%QUERY',
		limit : 50
	});

	attn_brands.initialize();

	$('#brand-attn').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'brands',
		display : 'brand_name',
		source : attn_brands.ttAdapter()
	});

	$('#brand-attn').on('typeahead:selected', function(e, item) {
		$('#addid').val(item.addid);
		$('#brandName').val(item.brand_name);
	});
	
	// 检索
	$('#search-btn').click(function() {

		if (brandTable) {
			brandTable.fnDraw();
		}

	});

	// 关注
	$('#attn-btn').click(function() {
	
		if($('#addid').val() && $('#brandName').val() == $.trim($('#brand-attn').val())){
			
			showMsg("这个品牌已经在列表中了！");
			return false;
			
		}
		
		// 添加该品牌
		$.post(global.path + '/a/BrandAnalysis', {
			'brandName' : $('#brand-attn').val(),
			'm' : "attned"
		}, function(result) {

			if (result.status === 'notexist') {
				showMsg("该品牌不存在");
			} else if (result.status === 'success') {
				
				showMsg("关注成功！", function(){
					
					if (brandTable) {
						brandTable.fnDraw();
					}
				});
				
			} else {
				showMsg("关注失败");
			}
		}, 'json');
	});

	// 删除所选
	$('#del-btn').click(function() {

		var brandNames = [];
		$.each($("input[name='brandNames']:checked"), function(idx, d) {
			brandNames.push(d.value);
		});

		if (brandNames.length == 0) {
			showMsg("至少选择一项");
			return;
		}

		confirmMsg("确定删除?", function(result){
			
			if (result) {
				$.post(global.path + '/a/BrandAnalysis', {
					'brandNames' : brandNames + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("品牌添加关注一个月后才能删除");
					} else if (result.status == 'delSuccess') {
						showMsg("删除成功",function(){
							
							if (brandTable) {
								brandTable.fnDraw();
							}
							
						});
						
					}
				}, 'json');
			}
			
		});
		
	});

});

//获取子类目，主营类目的sId默认为0
function addCat(sId) {
	loadSelectCat(sId, global.path);
}