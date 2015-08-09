// 初始加载
var goods_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	
	$('#syy-dataCompare').addClass('active open');
	
	$('input[name="showType"]').click(function(){
		
		if($(this).val() == 'day'){
			$('#dayDiv').show();
			$('#monthDiv').hide();
		}else if($(this).val() == 'month'){
			$('#monthDiv').show();
			$('#dayDiv').hide();
		}
		
	});
	
	
	
	
});

//生成店铺类型下拉
function build_shop_type(row){
	
	return '<select id="select_'+row+'_2" name="select_'+row+'_2" onchange="build_shop('+row+')" >'
			+'<option value="ALL">全部</option><option value="TMALL">天猫</option><option value="TAOBAO">淘宝</option>'
			+'<select>';
	
}

//生成店铺下拉
function build_shop(row){
	
	//删除后面的下拉框
	$('#select_'+row+'_2').nextAll("select").remove();
	
	//获取所有关注的店铺
	$.get(global.path + '/a/DataCompare', {
		'm': 'shop',
		'shopType': $('#select_'+row+'_2').val()
	}, function(result){
		
		if(result && result.length > 0){
			
			var html = '';
			
			html += '<select id="select_'+row+'_3" name="select_'+row+'_3" onchange="select_shop('+row+')" style="width: 150px; z-index: -1;margin-left:3px;">';
			$.each(result, function(idx, d){
				html += '<option value="'+d.shop_id+'">'+d.shop_name+'</option>';
			});
			html += '</select>';
			
			$('#type_append_'+row).append(html);
			
			//立即加载类目
			select_shop(row);
		}
		
	}, 'json');
}

//选择店铺加载主营类目
function select_shop(row){
	
	$.get(global.path + '/a/DataCompare', {
		'm': 'cat_shop',
		'shopId': $('#select_'+row+'_3').val()
	}, function(result){
		
		var html = '';
		if(result && result.length > 0){
			
			html += '<select id="select_'+row+'_4" name="select_'+row+'_4" onchange="select_cat('+row+', 4)" style="width: 150px; z-index: -1;margin-left:3px;">';
			html += '<option value="0">请选择类目</option>';
			$.each(result, function(idx, d){
				html += '<option value="'+d.cat_no+'" data-hasChild="'+d.isparent+'">'+d.cat_name_single+' - '+d.cat_name+'</option>';
			});
			html += '</select>';
		}
		
		$('#type_append_'+row).append(html);
		
	}, 'json');
	
}

//类目下拉
function select_cat(row, col) {

	var parentNo = $('#select_'+row+'_'+col).val();

	var hasChild = $('#select_'+row+'_'+col+' option:selected').attr("data-hasChild");

	if (hasChild) {
		$.get(global.path + '/a/MarketAnalysis', {
			'parentNo' : parentNo,
			'm' : 'add_cat'
		}, function(data) {
			var html = '';
			if (data && data.length > 0) {

				html += '<select id="select_'+row+'_'+(col+1)+'" name="select_'+row+'_'+(col+1)+'"  onchange="select_cat(' + row + ', '+ (col +1)+');" style="width: 150px; z-index: -1;margin-left:3px;">'
						+ '<option value="0">请选择类目</option>';

				$.each(data, function(idx, d) {
					html += '<option value="' + d.catNo + '" data-hasChild="'+ d.hasChild + '" >' + d.catName + '</option>';
				});
				html += '</select>';
			}
			$('#type_append_'+row).append(html);
		}, 'json');
	}
}

//选择比较项
function select_compare_type(row){
	
	var compareType = $('#select_'+row+'_1').val();
	
	if(compareType == '0'){
		return;
	}else if(compareType == '1'){//店铺
		var shopHtml = build_shop_type(row);
		
		$('#type_append_'+row).append(shopHtml);
		
		build_shop(row);
		
	}else if(compareType == '2'){//行业
		
	}
	
	
}
