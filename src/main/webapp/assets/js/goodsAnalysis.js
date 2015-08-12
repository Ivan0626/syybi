var goods_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-goodsAnalysis').addClass('active open');

	$('#goods-search').click(function() {

		window.location.href = global.path + "/a/GoodsAnalysis?m=searchB";

	});
	
	
	var dirTable = null;
	//===================================================目录列表==========================================================
	
	var dir_config = {};
	dir_config.tableId = 'dir-table';
	dir_config.url = global.path + '/a/GoodsAnalysis?m=dir_list';
	dir_config.maxIndex = 9;
	dir_config.initComplete = function (settings, json) {
		$('#dir-len').text(json.data.length);
    };
	
	dir_config.type = 'POST';

	dir_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.dirName = decodeURI(decodeURI($('#dirName').val()));
		d.maxIndex = dir_config.maxIndex;
	};
	dir_config.columns = [
			{
				data : 'dir_name'
			},
			{
				data: 'item_count',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : "avg_price",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data: 'avg_price_tran',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data: 'avg_price_tran_pre',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_volume",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_volume_pre",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_amount_pre",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			}, {
				data : 'adid',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {
					
					var dirName = encodeURI(encodeURI(val_obj.dir_name));// 编码
					
					var html = '<div class="hidden-sm hidden-xs action-buttons">'
						+'<a href="'+global.path+'/a/GoodsAnalysis?m=goods_list&adid=' + val + '&dirName=' + dirName + '&tab=tab1"><img title="宝贝列表" src="' + global.path + '/assets/imagesLocal/bao.png" alt="宝贝列表"></a>'
						+'<a href="'+global.path+'/a/GoodsAnalysis?m=goods_list&adid=' + val + '&dirName=' + dirName + '&tab=tab2"><img title="宝贝跟踪" src="' + global.path + '/assets/imagesLocal/gen.png" alt="宝贝跟踪"></a>'
						+'<a href="'+global.path+'/a/GoodsAnalysis?m=goods_list&adid=' + val + '&dirName=' + dirName + '&tab=tab3"><img title="价格段分析" src="' + global.path + '/assets/imagesLocal/jia.png" alt="价格段分析"></a>'
						+'<a href="'+global.path+'/a/GoodsAnalysis?m=goods_list&adid=' + val + '&dirName=' + dirName + '&tab=tab4"><img title="销售趋势" src="' + global.path + '/assets/imagesLocal/shi.png" alt="销售趋势"></a>'
						+'</div>';	
					return html;
				}
			}, {
				data : 'adid',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="dirIds" data-count="'+val_obj.item_count+'" value="' + val
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
				}
			} ];
	
	if(dirTable == null){
		dirTable = loadDataTable(dir_config);
	}
	
	var active_class = 'active';
	$('#'+dir_config.tableId+' > thead > tr > th input[type=checkbox]').eq(0).on('click', function() {
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
	$('#'+dir_config.tableId).on('click', 'td input[type=checkbox]', function() {
		var $row = $(this).closest('tr');
		if (this.checked)
			$row.addClass(active_class);
		else
			$row.removeClass(active_class);
	});


	// 关注
	$('#attn-btn').click(function() {
		
		var dirName = $.trim($('#dir-attn').val());
		if(dirName == ''){
			showMsg("请输入目录名称！");
			return false;
		}
		
		if(parseInt($('#dir-total').text()) == parseInt($('#dir-len').text())){
			showMsg("超出关注上限！");
			return false;
		}
		
		var allLen = $('#dir-table > tbody > tr').length;
		
		// 添加目录
		$.post(global.path + '/a/GoodsAnalysis', {
			'dirName' : dirName,
			'm' : "attned"
		}, function(result) {

			if (result.status === 'exist') {
				showMsg("该宝贝目录已经被关注！");
			} else if (result.status === 'success') {
				
				showMsg("添加成功！", function(){
					if (dirTable) {
						dirTable.fnDraw();
						//由于dirTable.fnDraw()不会自动调用initComplete
						$('#dir-len').text(allLen + 1);
					}
				});
				
			} else {
				showMsg("宝贝目录关注失败");
			}
		}, 'json');

	});

	// 删除所选
	$('#del-btn').click(function() {

		var dirIds = [];
		
		var enableDel = true;
		$.each($("input[name='dirIds']:checked"), function(idx, d) {
			if(parseInt($(this).attr('data-count')) > 0){
				enableDel = false;
				return false;
			}
			dirIds.push(d.value);
		});
		
		if(!enableDel){
			showMsg("所选目录为空目录时才可删除！");
			return;
		}

		if (dirIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}

		var allLen = $('#dir-table > tbody > tr').length;
		
		confirmMsg('确定删除?', function(result) {  
            if(result) {  
            	$.get(global.path + '/a/GoodsAnalysis', {
					'dirIds' : dirIds + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == '0') {//删除失败
						showMsg("删除失败！");
					} else if (result.status == '1') {
						
						showMsg("删除成功！", function(){
							
							if (dirTable) {
								dirTable.fnDraw();
								
								$('#dir-len').text(allLen - dirIds.length);
							}
						});
					}
				}, 'json');
            }  
        });
		
	});
	
});
