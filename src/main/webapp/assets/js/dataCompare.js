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
	
	//获取类目下拉的最后层类目
	function getCatNo(row){
		var catNo = $('select[name="cat_'+row+'"]:last').val();
		if($('select[name="cat_'+row+'"]').length > 1){
			if(catNo == '0'){
				catNo = $('select[name="cat_'+row+'"]:last').prev().val();
			}
		}
		return catNo;
	}
	
	//行业趋势动态表格
	function buildTrendTable(startDate, endDate, data){
		
		$('#trend-table').empty();
		
		if(data && data.length > 0){
			
			var ms = getMonths(startDate, endDate);
			
			var thead = '';
			
			thead += '<thead>'
				+'<tr role="row">'
				+'<th rowspan="2" style="text-align:center">比较对象</th>'
				+'<th style="text-align:center">'+startDate+'</th>';
			
			var colTds = '';
			if(ms > 1){
				for(var i = 1; i < ms; i++){
					
					var reMonth = addMonth(startDate, i);
					
					thead += '<th colspan="2" style="text-align:center">'+reMonth+'</th>';
					
					colTds += '<th style="text-align:center">销量</th>'
						+'<th style="text-align:center">环比</th>';
				}
			}
			
			thead += '<th style="text-align:center">总计</th>'
				+'</tr>'
				+'<th style="text-align:center">销量</th>'
				+colTds
				+'<th style="text-align:center">销量</th>'
				+'</tr>'
				+'</thead>';
			
			var tbody = '<tbody>';
			
			var startColTotal = 0, msRowTotal = [];
			
			//初始化数组
			for(var i = 0; i < ms; i++){
				msRowTotal[i] = 0;
			}
			
			$.each(data, function(idx, d){
				
				tbody += '<tr role="row">'
					+'<td style="text-align:center">'+d.compare+'</td>'
					+'<td style="text-align:right">'+d['a'+startDate.replace('-','')]+'</td>';
				
				startColTotal += parseInt(d['a'+startDate.replace('-','')]);
				msRowTotal[0] += parseInt(d['a'+startDate.replace('-','')]);
				
				var colTds = '', msColTotal = 0;
				for(var i = 1; i < ms; i++){
					
					var preMonth = addMonth(startDate, i - 1);
					var curMonth = addMonth(startDate, i);
					
					//计算环比
					var reObj = huanbi(d['a'+preMonth.replace('-','')], d['a'+curMonth.replace('-','')]);
					
					colTds += '<td style="text-align:right">'+d['a'+curMonth.replace('-','')]+'</td>'
						+'<td style="text-align:right">'+reObj.huanbi+'%'+reObj.img+'</td>';
					
					msColTotal += parseInt(d['a'+curMonth.replace('-','')]);
					
					msRowTotal[i] += parseInt(d['a'+curMonth.replace('-','')]);
				}
				
				tbody += colTds
					+'<td style="text-align:right">'+(parseInt(d['a'+startDate.replace('-','')]) + msColTotal)+'</td>'
					+'</tr>';
				
			});
			
			tbody += '</tbody>';
			
			var tfoot = '';
			tfoot += '<tfoot>'
				+'<tr role="row">'
				+'<th style="text-align:center">总计</th>'
				+'<th style="text-align:right">'+startColTotal+'</th>';
				
			var colTds = '', tfootTotal = msRowTotal[0];
			for(var i = 1; i < ms; i++){
				
				//计算环比
				var reObj = huanbi(msRowTotal[i-1], msRowTotal[i]);
				
				colTds += '<th style="text-align:right">'+msRowTotal[i]+'</th>'
					+'<th style="text-align:right">'+reObj.huanbi+'%'+reObj.img+'</th>';
				
				tfootTotal += msRowTotal[i];
			}
				
			tfoot += colTds
			+'<th style="text-align:right">'+tfootTotal+'</th>'
			+'</tr>'
			+'</tfoot>';
				
			$('#trend-table').html(thead + tbody + tfoot);	
			
			//append datatable 样式
			$('#trend-table').dataTable({
	    		paging: false,
	    		retrieve: true,
	    		//destroy: true,
	    		autoWidth: false,
	    		processing: true,
	    		language : dataTableConfig.language,
	    		dom : dataTableConfig.dom
	    	});
		}
		
	}
	
	function buildTrendDayTable(data){
		
		$('#trend-table').empty();
		
		if(data.mapList && data.mapList.length > 0){
			
			var dayList = data.dayList;
			
			var thead = '';
			
			thead += '<thead>'
				+'<tr role="row">'
				+'<th rowspan="2" style="text-align:center">比较对象</th>'
				+'<th style="text-align:center">'+dayList[0]+'</th>';
			
			var colTds = '';
			if(dayList.length > 1){
				for(var i = 1; i < dayList.length; i++){
					
					thead += '<th style="text-align:center">'+dayList[i]+'</th>';
					
					colTds += '<th style="text-align:center">销量</th>';
				}
			}
			
			thead += '<th style="text-align:center">总计</th>'
				+'</tr>'
				+'<th style="text-align:center">销量</th>'
				+colTds
				+'<th style="text-align:center">销量</th>'
				+'</tr>'
				+'</thead>';
			
			var tbody = '<tbody>';
			
			var startColTotal = 0, msRowTotal = [];
			
			//初始化数组
			for(var i = 0; i < dayList.length; i++){
				msRowTotal[i] = 0;
			}
			
			$.each(data.mapList, function(idx, d){
				
				tbody += '<tr role="row">'
					+'<td style="text-align:center">'+d.compare+'</td>'
					+'<td style="text-align:right">'+d['a'+dayList[0].replace(/\-/g,"")]+'</td>';
				
				startColTotal += parseInt(d['a'+dayList[0].replace(/\-/g,"")]);
				msRowTotal[0] += parseInt(d['a'+dayList[0].replace(/\-/g,"")]);
				
				var colTds = '', msColTotal = 0;
				for(var i = 1; i < dayList.length; i++){
					
					
					colTds += '<td style="text-align:right">'+d['a'+dayList[i].replace(/\-/g,"")]+'</td>';
					
					msColTotal += parseInt(d['a'+dayList[i].replace(/\-/g,"")]);
					
					msRowTotal[i] += parseInt(d['a'+dayList[i].replace(/\-/g,"")]);
				}
				
				tbody += colTds
					+'<td style="text-align:right">'+(parseInt(d['a'+dayList[0].replace(/\-/g,"")]) + msColTotal)+'</td>'
					+'</tr>';
				
			});
			
			tbody += '</tbody>';
			
			var tfoot = '';
			tfoot += '<tfoot>'
				+'<tr role="row">'
				+'<th style="text-align:center">总计</th>'
				+'<th style="text-align:right">'+startColTotal+'</th>';
				
			var colTds = '', tfootTotal = msRowTotal[0];
			for(var i = 1; i < dayList.length; i++){
				
				colTds += '<th style="text-align:right">'+msRowTotal[i]+'</th>';
				
				tfootTotal += msRowTotal[i];
			}
				
			tfoot += colTds
			+'<th style="text-align:right">'+tfootTotal+'</th>'
			+'</tr>'
			+'</tfoot>';
				
			$('#trend-table').html(thead + tbody + tfoot);	
			
			//append datatable 样式
			$('#trend-table').dataTable({
	    		paging: false,
	    		retrieve: true,
	    		//destroy: true,
	    		autoWidth: false,
	    		processing: true,
	    		language : dataTableConfig.language,
	    		dom : dataTableConfig.dom
	    	});
		}
		
	}
	
	function compareData(){
		var showType = $('input[name="showType"]:checked').val();
		
		var startDate = '', endDate = '';
		if(showType == 'day'){
			
			startDate = $('#trend-d4321').val();
			endDate = $('#trend-d4322').val();
			
		}else if(showType == 'month'){
			
			startDate = $('#trend-d4321-month').val();
			endDate = $('#trend-d4322-month').val();
			
		}
		
		var compares = [];
		
		$('div[id^="item"]').each(function(idx, d){
			
			var compare = {};
			var row = $(this).attr('id').replace('item', '');
			compare.name = row;
			
			compare.compareType = $('#select_'+row+'_1').val();
			compare.shopType = $('#select_'+row+'_2').val();
			
			if(compare.compareType == '1'){//店铺，后台只需要取shopId 或者 shopId, catNo
				
				compare.shopId = $('#select_'+row+'_3').val();
				
				compare.catNo = getCatNo(row);
				
				compares.push(compare);
			}else if(compare.compareType == '2'){//行业
				
				compare.catNo = getCatNo(row);
				
				compares.push(compare);
				
			}else if(compare.compareType == '3'){//品牌
				
				compare.brandName = $('#select_'+row+'_3').val();
				
				compare.catNo = getCatNo(row);
				
				compares.push(compare);
			}
			
		});
		
		var chartType = $('input[name="chartType"]:checked').val();
		
		$.post(global.path + '/a/DataCompare',{
			
			'm': 'compare_'+showType,
			'compares': JSON.stringify(compares),
			'startDate': startDate,
			'endDate': endDate
			
		},function(data){
			
			if(chartType == '1'){//图表
				
				$('#tableDiv').hide();
		    	$('#chartDiv').show();
		    	
		    	buildTrendChart(showType, startDate, endDate, data);
				
			}else if(chartType == '2'){//数据表
				
				$('#tableDiv').show();
		    	$('#chartDiv').hide();
		    	
		    	if(showType == 'month'){
		    		buildTrendTable(startDate, endDate, data);
		    	}else{
		    		buildTrendDayTable(data);
		    	}
			}
			
		},'json');
	}
	
	//检索行业趋势
	$('#compare-btn').click(function(){
		
		compareData();
		
	});
	
	//生成折线图
	function buildTrendChart(showType, startDate, endDate, data){
		
		
		var chartWay = $('input[name="chartWay"]:checked').val();
		
		if(showType == 'month'){
			var ms = getMonths(startDate, endDate);
			
			renderChart(option5(data, chartWay, startDate, ms, '', 'compare'),'echarts-trend');
		}else if(showType == 'day'){
			renderChart(option5_5(data, chartWay),'echarts-trend');
		}
		
	}
	
	$('input[name="chartWay"]').click(function(){
		
		compareData();
		
	});
	
});

//生成店铺类型下拉
function build_shop_type(row, compareType){
	
	var event = (compareType == '2' || compareType == '3') ? "" : "onchange=\"build_shop('+row+')\"";
	
	return '<select id="select_'+row+'_2" name="select_'+row+'_2" '+event+' >'
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
				html += '<option value="'+d.shop_id+	'">'+d.shop_name+'</option>';
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
	
	//删除后面的下拉框
	$('#select_'+row+'_3').nextAll("select").remove();
	
	$.get(global.path + '/a/DataCompare', {
		'm': 'cat_shop',
		'shopId': $('#select_'+row+'_3').val()
	}, function(result){
		
		
		if(result && result.length > 0){
			
			var html = '';
			
			html += '<select id="select_'+row+'_4" name="cat_'+row+'" onchange="select_cat('+row+', 4)" style="width: 150px; z-index: -1;margin-left:3px;">';
			html += '<option value="0">请选择类目</option>';
			$.each(result, function(idx, d){
				html += '<option value="'+d.cat_no+'" data-hasChild="'+d.isparent+'">'+d.cat_name_single+' - '+d.cat_name+'</option>';
			});
			html += '</select>';
			
			$('#type_append_'+row).append(html);
		}
		
	}, 'json');
	
}

//生成关注的类目
function build_cat(row){
	
	//删除后面的下拉框
	$('#select_'+row+'_2').nextAll("select").remove();
	
	$.get(global.path + '/a/DataCompare', {
		'm' : 'cat_top'
	}, function(data) {
		
		if (data && data.length > 0) {

			var html = '';
			html += '<select id="select_'+row+'_3" name="cat_'+row+'"  onchange="select_cat(' + row + ', 3);" style="width: 150px; z-index: -1;margin-left:3px;">';

			$.each(data, function(idx, d) {
				html += '<option value="' + d.catNo + '" data-hasChild="'+ d.hasChild + '" >' + d.catName + '</option>';
			});
			html += '</select>';
			
			$('#type_append_'+row).append(html);
			
			//立即加载子类目
			select_cat(row, 3);
		}
		
	}, 'json');
	
}

//生成关注的品牌
function build_brand(row){
	
	//删除后面的下拉框
	$('#select_'+row+'_2').nextAll("select").remove();
	
	$.get(global.path + '/a/DataCompare', {
		'm' : 'brand'
	}, function(data) {
		
		if (data && data.length > 0) {

			var html = '';
			html += '<select id="select_'+row+'_3" name="select_'+row+'_3"  onchange="select_brand_cat(' + row + ');" style="width: 150px; z-index: -1;margin-left:3px;">';

			$.each(data, function(idx, d) {
				html += '<option value="' + d.brand_name + '" >' + d.brand_name + '</option>';
			});
			html += '</select>';
			
			$('#type_append_'+row).append(html);
			
			//立即加载品牌关联的类目
			select_brand_cat(row);
		}
		
	}, 'json');
	
}

//生成品牌关联的类目
function select_brand_cat(row){
	
	//删除后面的下拉框
	$('#select_'+row+'_3').nextAll("select").remove();
	
	$.post(global.path + '/a/DataCompare', {
		'm' : 'cat_brand',
		'brandName': $('#select_'+row+'_3').val()
	}, function(data) {
		
		if (data && data.length > 0) {

			var html = '';
			html += '<select id="select_'+row+'_4" name="cat_'+row+'"  onchange="select_cat(' + row + ', 4);" style="width: 150px; z-index: -1;margin-left:3px;">';
			html += '<option value="0">请选择类目</option>';
			$.each(data, function(idx, d) {
				html += '<option value="' + d.cat_no + '" data-hasChild="'+ d.isparent + '" >'+d.cat_name_single+' - '+d.cat_name+'</option>';
			});
			html += '</select>';
			
			$('#type_append_'+row).append(html);
			
		}
		
	}, 'json');
	
}

//类目下拉
function select_cat(row, col) {
	
	//删除后面的下拉框
	$('#select_'+row+'_'+col).nextAll("select").remove();
	
	var parentNo = $('#select_'+row+'_'+col).val();

	var hasChild = $('#select_'+row+'_'+col+' option:selected').attr("data-hasChild");

	if (hasChild) {
		$.get(global.path + '/a/MarketAnalysis', {
			'parentNo' : parentNo,
			'm' : 'add_cat'
		}, function(data) {
			var html = '';
			if (data && data.length > 0) {

				html += '<select id="select_'+row+'_'+(col+1)+'" name="cat_'+row+'"  onchange="select_cat(' + row + ', '+ (col +1)+');" style="width: 150px; z-index: -1;margin-left:3px;">'
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
	
	//删除后面的下拉框
	$('#type_append_'+row).empty();
	
	var compareType = $('#select_'+row+'_1').val();
	
	if(compareType == '0'){
		return;
	}else if(compareType == '1'){//店铺
		var shopHtml = build_shop_type(row, compareType);
		
		$('#type_append_'+row).append(shopHtml);
		
		build_shop(row);
		
	}else if(compareType == '2'){//行业
		
		var shopHtml = build_shop_type(row, compareType);
		
		$('#type_append_'+row).append(shopHtml);
		
		build_cat(row);
	}else if(compareType == '3'){//品牌
		
		var shopHtml = build_shop_type(row, compareType);
		
		$('#type_append_'+row).append(shopHtml);
		
		build_brand(row);
		
	}
	
	
}

var rowLen = 2;
function addnewItem(){
	
	if(rowLen < 10){
		rowLen = rowLen + 1;
		
		$('div[data="item-template"]').clone(true).removeAttr('data').attr('id', 'item'+rowLen).appendTo('#widget-item');
		
		$('#item'+rowLen+' > label').text(rowLen+":");
		$('#item'+rowLen+' > select').attr('id', 'select_'+rowLen+'_1').attr('name', 'select_'+rowLen+'_1').attr('onchange', 'select_compare_type('+rowLen+')');
		
		$('#item'+rowLen+' > span').attr('id', 'type_append_'+rowLen);
		$('#type_append_'+rowLen).empty();
		
		$('#item'+rowLen+' > a > img').click(function(){
			
			$('#item'+rowLen).remove();
			
			rowLen = rowLen - 1;
			
		});
	}
	
}

