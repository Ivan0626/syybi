jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-hotAnalysis').addClass('active open');

	$('#hot-search').click(function() {

		window.location.href = global.path + "/a/HotAnalysis?m=searchB";

	});

	var hotTable = null;
	//===================================================店铺列表==========================================================
	
	var hot_config = {};
	hot_config.tableId = 'hot-table';
	hot_config.url = global.path + '/a/HotAnalysis?m=hot_list';
	hot_config.maxIndex = 6;
	
	hot_config.type = 'POST';

	hot_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.hotName = $('#hot-attned').val().trim();
		d.maxIndex = hot_config.maxIndex;
	};
	
	hot_config.initComplete = function (settings, json) {
		$('#hot-len').text(json.data.length);
    };
	
	hot_config.columns = [
			{
				data : "seq",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			}, {
				data : "key"
			},{
				data : "rise",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				},
				render : function(val, display, val_obj, prop) {
					
					data = parseFloat(val.replace('%', ''));
					
					if (data < 0) {
						return val + '<img src="' + global.path + '/assets/img/down_arrow_new.gif">';
					} else if (data > 0) {
						return val + '<img src="' + global.path + '/assets/img/up_arrow_new.gif">';
					} else {
						return data;
					}
				}
			},{
				data : "cat_path"
			},{
				data : "att_date"
			}, {
				data : 'id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var shopName = encodeURI(encodeURI(val_obj.shop_name));// 编码

					var html = '<div class="hidden-sm hidden-xs action-buttons"><a href="' + global.path+ '/a/HotAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab1">'
							+ '<img alt="热词趋势" title="热词趋势" src="' + global.path + '/assets/imagesLocal/ci.png"></a>'
							+ '<a href="'+ global.path + '/a/HotAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName+ '&tab=tab2">' 
							+ '<img alt="关联店铺" title="关联店铺" src="' + global.path + '/assets/imagesLocal/guan.png"></a></div>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			}, {
				data : 'id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="hotIds" value="' + val
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	if(hotTable == null){
		hotTable = loadDataTable(hot_config);
	}
	
	var active_class = 'active';
	$('#'+hot_config.tableId+' > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#'+hot_config.tableId).on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});

	// 搜索已关注的店铺
	// 远程数据源
	var attned_hots = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('hot_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/HotAnalysis?m=hot_attned&q=%QUERY',
		limit : 50
	});

	attned_hots.initialize();

	$('#hot-attned').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'hots',
		display : 'hot_name',
		source : attned_hots.ttAdapter()
	});

	// 添加关注店铺
	// 远程数据源
	var attn_hots = new Bloodhound({
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('hot_name'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		// 在文本框输入字符时才发起请求
		remote : global.path + '/a/HotAnalysis?m=hot_attn&q=%QUERY',
		limit : 50
	});

	attn_hots.initialize();

	$('#hot-attn').typeahead({
		hint : true,
		highlight : true,
		minLength : 1
	}, {
		name : 'hots',
		display : 'hot_name',
		source : attn_hots.ttAdapter()
	});

	$('#hot-attn').on('typeahead:selected', function(e, item) {
		$('#hotId').val(item.hot_id);
		$('#hotName').val(item.hot_name);
	});

	// 检索
	$('#search-btn').click(function() {

		if (hotTable) {
			hotTable.fnDraw();
		}

	});

	// 关注
	$('#attn-btn').click(function() {
		
		if(parseInt($('#hot-total').text()) <= parseInt($('#hot-len').text())){
			showMsg("超出关注上限！");
			return false;
		}
		
		var allLen = $('#'+hot_config.tableId+' > tbody > tr').length;
		
		// 添加该店铺
		$.post(global.path + '/a/HotAnalysis', {
			'hotId' : $('#hotId').val(),
			'hotName' : $('#hot-attn').val(),
			'm' : "attned"
		}, function(result) {

			if (result.status === 'notexist') {
				showMsg("该店铺不存在");
			} else if (result.status === 'success') {
				
				showMsg("关注成功！", function(){
					
					if (hotTable) {
						hotTable.fnDraw();
						$('#hot-len').text(allLen + 1);
					}
				});
				
			} else {
				showMsg("店铺关注失败");
			}
		}, 'json');

	});

	// 删除所选
	$('#del-btn').click(function() {

		var hotIds = [];
		$.each($("input[name='hotIds']:checked"), function(idx, d) {
			hotIds.push(d.value);
		});

		if (hotIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}

		var allLen = $('#'+hot_config.tableId+' > tbody > tr').length;
		
		confirmMsg("确定删除?", function(result) {
			if (result) {
				$.get(global.path + '/a/HotAnalysis', {
					'hotIds' : hotIds + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("店铺添加关注一个月后才能删除");
					} else if (result.status == 'delSuccess') {
						
						showMsg("删除成功",function(){
							if (hotTable) {
								hotTable.fnDraw();
								
								$('#hot-len').text(allLen - hotIds.length);
							}
						});
					}
				}, 'json');
			}
		});
	});


});