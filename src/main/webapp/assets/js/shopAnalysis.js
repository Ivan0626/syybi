var goods_table = null;

jQuery(function($) {

	// 选中navbar
	$('#syy-nav').find('.active').each(function() {
		var $class = 'active';
		if ($(this).hasClass('hover'))
			$class += ' open';

		$(this).removeClass($class);
	});
	$('#syy-shopAnalysis').addClass('active open');

	$('#shop-search').click(function() {

		window.location.href = global.path + "/a/ShopAnalysis?m=searchB";

	});
	
	
	var shopTable = null;
	//===================================================店铺列表==========================================================
	
	var shop_config = {};
	shop_config.tableId = 'shop-table';
	shop_config.url = global.path + '/a/ShopAnalysis?m=shop_list';
	shop_config.maxIndex = 10;
	
	shop_config.type = 'POST';
	
	shop_config.order = [[ 8, 'desc' ]];

	shop_config.data = function(d) {
		// 添加额外的参数传给服务器
		d.shopName = $('#shop-attned').val().trim();
		d.maxIndex = shop_config.maxIndex;
	};
	
	shop_config.initComplete = function (settings, json) {
		$('#shop-len').text(json.data.length);
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
			}/*,
			{
				data: 'tag',
				name: 't1'
			}*/,
			{
				data : 'rise_index',
				name : 't3',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
					if(sData > 10){
						$(nTd).css('color', 'red');
					}else{
						$(nTd).css('color', '#208ee3');
					}
				}
			},
			{
				data : "item_count",
				name : "t2",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data: 'region',
				name: 't2',
			},{
				data : "sales_volume",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_volume_pre",
				name : "t4",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_amount",
				name : "t3",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "sales_amount_pre",
				name : "t4",
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : "att_date",
				name : "t1"
			}, {
				data : 'shop_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var shopName = encodeURI(encodeURI(val_obj.shop_name));// 编码

					var html = '<div class="hidden-sm hidden-xs action-buttons">'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab1"><img title="宝贝列表" src="' + global.path + '/assets/imagesLocal/bao.png" alt="宝贝列表"></a>'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab2"><img title="店铺跟踪" src="' + global.path + '/assets/imagesLocal/gen.png" alt="店铺跟踪"></a>'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab3"><img title="销售趋势" src="' + global.path + '/assets/imagesLocal/shi.png" alt="销售趋势"></a>'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab4"><img title="类别分析" src="' + global.path + '/assets/imagesLocal/lei.png" alt="类别分析"></a>'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab5"><img title="店铺详情" src="' + global.path + '/assets/imagesLocal/xiang.png" alt="店铺详情"></a>'
						+'<a href="'+global.path+'/a/ShopAnalysis?m=goods_list&shopId=' + val + '&shopName=' + shopName + '&tab=tab6"><img title="动态评分" src="' + global.path + '/assets/imagesLocal/ping.png" alt="动态评分"></a>'
						+'</div>';
					return html;
				}
			}, {
				data : 'shop_id',
				searchable: false,
				orderable: false,
				render : function(val, display, val_obj, prop) {

					var html = '<label class="pos-rel">' + '<input type="checkbox" name="shopIds" value="' + val
							+ '" class="ace" />' + '<span class="lbl"></span>' + '</label>';
					return html;
				},
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'center').css('vertical-align', 'inherit');
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
		remote : global.path + '/a/ShopAnalysis?m=shop_attned&q=%QUERY',
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
		remote : global.path + '/a/ShopAnalysis?m=shop_attn&q=%QUERY',
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
		var shopName = $.trim($('#shop-attn').val());
		if(shopName == ''){
			showMsg("请输入店铺名称！");
			return false;
		}
		
		if(parseInt($('#shop-len').text()) == parseInt($('#shop-total').text())){
			showMsg("超出关注上限！");
			return false;
		}
		
		var allLen = $('#'+shop_config.tableId+' > tbody > tr').length;
		
		// 添加该店铺
		$.post(global.path + '/a/ShopAnalysis', {
			'shopId' : $('#shopId').val(),
			'shopName' : $('#shop-attn').val(),
			'm' : "attned"
		}, function(result) {

			if (result.status === 'notExist') {
				showMsg("该店铺不存在");
			} else if (result.status === 'notCatch') {
				showMsg("很抱歉，当前您关注的店铺不在我们的收录范围内，我们会在24小时内完成收录，店铺数据从收录后开始展现");
			} else if (result.status === 'catched') {
				
				showMsg("添加成功！", function(){
					
					if (shopTable) {
						shopTable.fnDraw();
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

		var allLen = $('#'+shop_config.tableId+' > tbody > tr').length;
		
		confirmMsg("确定删除?", function(result) {
			if (result) {
				$.get(global.path + '/a/ShopAnalysis', {
					'shopIds' : shopIds + "",
					'm' : "del_attn"
				}, function(result) {

					if (result.status == 'disabledDel') {
						showMsg("店铺添加关注一个月后才能删除");
					} else if (result.status == 'delSuccess') {
						
						showMsg("删除成功！", function(){
							
							if (shopTable) {
								shopTable.fnDraw();
								
								$('#shop-len').text(allLen - shopIds.length);
							}
							
						});
						
						if (shopTable) {
							shopTable.fnDraw();
						}
					}
				}, 'json');
			}
		});
	});
		
	//=====================================================店铺对比==============================================================
	
	//店铺对比
	$('#compare-shop-btn').click(function(){
		
		var shopIds = [];
		
		var count = 0;
		for(var i = 1; i <=4; i++){
			
			var shopId = $('select[name="shop'+i+'"]').val();
			
			shopIds.push(shopId);
			if(shopId != ''){
				++count;
			}
			
		}
		if(count < 2){
			showMsg('请至少选择两个店铺进行对比!');
			return false;
		}
		
		if((shopIds[0]==shopIds[1]&&shopIds[0]!='')||(shopIds[0]==shopIds[2]&&shopIds[0]!='')
			||(shopIds[0]==shopIds[3]&&shopIds[0]!='')||(shopIds[1]==shopIds[2]&&shopIds[1]!='')
			||(shopIds[1]==shopIds[3]&&shopIds[1]!='')||(shopIds[2]==shopIds[3]&&shopIds[2]!='')){
			showMsg('请选择不同店铺进行对比!');
			return false;
		}
		
		var chartType = $('input[name="chartType"]:checked').val();
		
		if(chartType == 'data'){
			
			$('#chartDiv').hide();
			$('#tableDiv').show();
			
			$.get(global.path + '/a/ShopAnalysis', {
				'm': 'shop_compare',
				'shopIds': shopIds.join(',')
			}, function(data){
				
				$('#compare-table').empty();
				
				var header = '', shopName = '', region = '', item_count = '', sales_amount = '', sales_volume = '', tran_count = ''
					, sales_amount_pre = '', sales_volume_pre = '', tran_count_pre = '', rise_index = '', shop_ad = '', goods_ad = '';
				
				$.each(data.data, function(idx, d){
					
					header += '<th style="text-align:center;">'+d.shop_name+'</th>';
					shopName += '<td style="text-align:center;"><img src="'+global.path+'/assets/imagesLocal/bc_shop_icon.png">'+d.shop_name+'</td>';
					region += '<td style="text-align:center;">'+d.region+'</td>';
					item_count += '<td style="text-align:center;">'+d.item_count+'</td>';
					sales_amount += '<td style="text-align:center;">'+d.sales_amount+'</td>';
					sales_volume += '<td style="text-align:center;">'+d.sales_volume+'</td>';
					tran_count += '<td style="text-align:center;">'+d.tran_count+'</td>';
					sales_amount_pre += '<td style="text-align:center;">'+d.sales_amount_pre+'</td>';
					sales_volume_pre += '<td style="text-align:center;">'+d.sales_volume_pre+'</td>';
					tran_count_pre += '<td style="text-align:center;">'+d.tran_count_pre+'</td>';
					rise_index += '<td style="text-align:center;">'+d.rise_index+'</td>';
					shop_ad += '<td style="text-align:center;">'+renderShopAd('',global.path,d,true)+'</td>';
					goods_ad += '<td style="text-align:center;">'+renderGoodsAd('',global.path,d,true)+'</td>';
					
				});
				
				var colsVal = [shopName, region, item_count, sales_amount, sales_volume, tran_count,
				               sales_amount_pre, sales_volume_pre, tran_count_pre, rise_index, shop_ad, goods_ad];
				
				var cols = ['店名', '地域', '宝贝数量', '本月销售额（元）', '本月销量', '本月成交次数', '上月销售额（元）', '上月销量', '上月成交次数',
				            '飙量指数', '最近店铺广告', '最近宝贝广告'];
				
				var html = '<thead>'
						+'<tr role="row">'
						+'<th style="text-align:center;">店铺名称</th>'
						+header		
						+'</tr>'
						+'</thead>'
						+'<tbody>';
				
				for(var i = 0; i < cols.length; i++){
					
					if(i % 2 == 0){
						html += '<tr class="even">';
					}else{
						html += '<tr class="odd">';
					}
					html += '<td style="text-align:center;">'+cols[i]+'</td>'
						+colsVal[i];
					
				}
				html += '</tbody>';
				
				$('#compare-table').html(html);
				
				//append datatable 样式
				$('#compare-table').dataTable({
		    		paging: false,
		    		ordering: false,
		    		searching: false,
		    		retrieve: true,
		    		autoWidth: false,
		    		processing: true,
		    		language : dataTableConfig.language,
		    		dom : dataTableConfig.dom
		    	});
				
			}, 'json');
			
		}else if(chartType == 'shopBar'){
			
			$('#chartDiv').show();
			$('#tableDiv').hide();
			
			$.get(global.path+'/a/ShopAnalysis',{
				'm': 'shop_trend',
				'shopIds': shopIds.join(',')
	    	},function(data){
	    		
	    		var ms = 6;//统计6个月
	    		
	    		var startMonth = addMonth($('#curMonth').val(), -(ms - 1));
	    		
	    		$('#echarts-compare').css('height', '500px');
	    		
	    		renderChart(option7(data, startMonth, ms),'echarts-compare');
	    		
	    	},'json');
			
		}else if(chartType == 'catBar'){//类目
			
			$('#chartDiv').show();
			$('#tableDiv').hide();
			
			$.get(global.path+'/a/ShopAnalysis',{
				'm': 'cat_analysis',
				'shopIds': shopIds.join(',')
	    	},function(data){
	    		
	    		if(data.catList && data.catList.length > 0
	    			&& data.catData && data.catData.length > 0){
	    			
	    			var width = data.catList.length * 60 + 200;
	    			$('#echarts-compare').css('height', width + 'px');
	    			
	    			renderChart(option8(data),'echarts-compare');
	    			
	    		}
	    		
	    	},'json');
			
		}
		
	});
	
	//==================================================热销宝贝=====================================================
	
	var goods_config = {};
	goods_config.tableId = 'goods-table';
	goods_config.url = global.path + '/a/ShopAnalysis?m=hot_goods';
	goods_config.maxIndex = 9;
	goods_config.paging = true;

	goods_config.type = 'POST';

	goods_config.order = [[ 6, 'desc' ]];
	
	goods_config.data = function(d) {

		if($('#searchType').val() == 'search'){
			
			var category = [];
			
			$("select[name='cat'] option:selected").each(function(){
				
				var c = $(this).attr('data-category');
				if($.trim(c) != ''){
					category.push(c);
				}
				
			});

			d.category = category.join(' » ');// 商品类别
			
		}else if($('#searchType').val() == 'href'){
			
			d.category = $('#toCat').val();
			
		}

		d.prdName = $('#prdName').val().trim();// 宝贝名称
		d.amountTotal = $('#amountTotal').val().trim();// 宝贝名称
		d.volumeTotal = $('#volumeTotal').val().trim();// 宝贝名称
		
		d.shopType = $('input[name="shopType"]:checked').val();
		
		d.maxIndex = goods_config.maxIndex;

	};

	goods_config.initComplete = function (settings, json) {
		
		if(json.extList && json.extList.length > 0){
			
			var html = '';
			$.each(json.extList, function(idx, d){
				
				html += '<option value="'+d.adid+'">'+d.dir_name+'</option>';
				
			});
			
			$('#toDir').html(html);
		}
		
    };
	
	goods_config.columns = [
			{
				data : 'prd_name',
				name: '',
				render : function(data, type, full, meta) {
					var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url
							+ '">' + data + '</a>';
					return html;
				}
			},
			{
				data : 'shop_name',
				render : function(val, display, val_obj, prop) {
					var html = '<a target="_blank" href="' + val_obj.shop_url + '">' + val + '</a>';

					if (val_obj.shop_type == 'TMALL') {
						html = '<img src="' + global.path + '/assets/imagesLocal/bc_shop_icon.png">'
								+ ' <a target="_blank" href="' + val_obj.shop_url + '">' + val + '</a>';
					}

					return html;
				}
			},{
				data : 'cat_path',
				render : function(data, type, full, meta) {
					
					if(!data){
						return "";
					}
					
					var html = [], toCat = [];
					$.each(data.split(' » '), function(idx, d){
						
						toCat.push(d);
						
						html.push('<a href="javascript:void(0);" onclick="toCat(this);" data-category="'+toCat.join(' » ')+'">'+d+'</a> ');
						
					});
					
					return html.join('<span style="color:#FF8000">»</span> ');
				}
			},
			{
				data : 'avg_price',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'avg_price_tran_pre',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				},
				render : function(data, type, full, meta) {
					
					if(!data){
						return '';
					}
					
					if (parseFloat(data) < parseFloat(full.avg_price)) {
						return data + '<img src="' + global.path + '/assets/img/down_arrow_new.gif">';
					} else if (data > full.avg_price) {
						return data + '<img src="' + global.path + '/assets/img/up_arrow_new.gif">';
					} else {
						return data;
					}
				}
			},
			{
				data : 'sales_volume',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},{
				data : 'sales_volume_pre',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'sales_amount',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
				data : 'sales_amount_pre',
				fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
					$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
				}
			},
			{
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
				}
			} ];

	// 初始加载
	goods_table = null;//loadDataTable(goods_config);

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
	
	// 检索
	$('#search-goods-btn').click(function() {
		
		$('#searchType').val('search');
		
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
		
		$('#tableDiv3').show();
		
		if (goods_table) {
			goods_table.fnDraw();
		} else {
			goods_table = loadDataTable(goods_config);
		}
	});
	
	// 批量关注
	$('#batch-attn-btn').click(function() {
		
		var itemIds = [];
		
		$('input[name="itemIds"]:checked').each(function(){
			
			itemIds.push($(this).val());
			
		});

		if (itemIds.length == 0) {
			showMsg("至少选择一项");
			return;
		}
		
		$.post(global.path + '/a/GoodsAnalysis', {
			'itemIds' : itemIds.join(','),
			'adid' : $('#toDir').val(),
			'm' : "batch_attned"
		}, function(result) {

			if (result.status === '1') {
				showMsg("宝贝关注成功", function(){
					
					if (goods_table) {
						goods_table.fnDraw();
					}else{
						goods_table = loadDataTable(goods_config);
					}
					
				});
			} else {
				showMsg("宝贝关注失败");
			}
		}, 'json');

	});
	

});

//按类目检索
function toCat(catObj){
	
	$('#searchType').val('href');
	
	var cat = $(catObj).attr('data-category');
	
	$('#toCat').val(cat);
	
	if (goods_table) {
		goods_table.fnDraw();
	}else {
		goods_table = loadDataTable(goods_config);
	}
}

//获取子类目，主营类目的sId默认为0
function addCat(sId) {
	loadSelectCat(sId, global.path);
}