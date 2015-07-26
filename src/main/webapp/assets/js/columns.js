//==============宝贝跟踪======================
var gen = {};
gen.columns = {};
gen.columns.c1 = [
		{
			data : 'prd_name',
			title : '宝贝名称',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'cpid',
			title : '单品查看',
			render : function(data, type, full, meta) {
				return '<a href="#">只看该商品</a>';
			}

		},
		{
			data : 'category',
			title : '商品类别',
			render : function(data, type, full, meta) {
				
				if(!data){
					return "";
				}
				
				var html = [], toCat = [];
				$.each(data.split(' » '), function(idx, d){
					
					toCat.push(d);
					
					html.push('<a href="javascript:void(0);" data-category="'+toCat.join(' » ')+'">'+d+'</a> ');
					
				});
				
				return html.join('<span style="color:#FF8000">»</span> ');
			}
		},
		{
			data : 'price_old',
			title : '原标价',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'price_new',
			title : '新标价',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			},
			render : function(data, type, full, meta) {
				
				if(data > full.price_old){
					return data +' <img src="'+global.path+'/assets/img/up_arrow_new.gif">';
				}else if(data < full.price_old){
					return data +' <img src="'+global.path+'/assets/img/down_arrow_new.gif">';
				}else{
					return data;
				}
				
			}
		}, {
			data : 'change_date',
			title : '调价日期'
		} ];

gen.columns.c2 = [
		{
			data : 'prd_name_new',
			title : '宝贝新名称',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'cnid',
			title : '单品查看',
			render : function(data, type, full, meta) {
				return '<a href="#">只看该商品</a>';
			}

		},
		{
			data : 'category',
			title : '商品类别',
			render : function(data, type, full, meta) {
				
				if(!data){
					return "";
				}
				
				var html = [], toCat = [];
				$.each(data.split(' » '), function(idx, d){
					
					toCat.push(d);
					
					html.push('<a href="javascript:void(0);" data-category="'+toCat.join(' » ')+'">'+d+'</a> ');
					
				});
				
				return html.join('<span style="color:#FF8000">»</span> ');
			}
		}, {
			data : 'prd_name_old',
			title : '宝贝旧名称'
		}, {
			data : 'price',
			title : '当前标价',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'change_date',
			title : '改名日期'
		} ];
gen.columns.c3 = [
  		{
  			data : 'prd_name',
  			title : '宝贝名称',
  			render : function(data, type, full, meta) {
  				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
  						+ data + '</a>';
  				return html;
  			}
  		},
  		{
			data : 'category',
			title : '商品类别',
			render : function(data, type, full, meta) {
				
				if(!data){
					return "";
				}
				
				var html = [], toCat = [];
				$.each(data.split(' » '), function(idx, d){
					
					toCat.push(d);
					
					html.push('<a href="javascript:void(0);" data-category="'+toCat.join(' » ')+'">'+d+'</a> ');
					
				});
				
				return html.join('<span style="color:#FF8000">»</span> ');
			}
		},
  		{
  			data : 'price',
  			title : '标价',
  			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
  				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
  			}
  		}, {
  			data : 'change_date',
  			title : '上架日期'
  		},{
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		}, {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		}  ];
// ==========================店铺广告==========================
var shopad = {};
shopad.columns = {};
//直通车
shopad.columns.c1 = [
		{
			data : 'tran_date',
			title : '时间'
		},
		{
			data : 'sales_amount',
			title : '销售额',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'cat_name',
			title : '店铺直通车类目广告'
		}, {
			data : 'keyword',
			title : '店铺直通车关键词广告'
		},{
			data : null,
			defaultContent : '',
			visible: false,
 			searchable: false,
 			orderable: false
		},{
			data : null,
			defaultContent : '',
			visible: false,
 			searchable: false,
 			orderable: false
		}  ];

//热门钻展
shopad.columns.c2 = [
 		{
 			data : 'tran_date',
 			title : '时间'
 		},
 		{
 			data : 'sales_amount',
 			title : '销售额',
 			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
 				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
 			}
 		},
 		{
 			data : 'sales_volume',
 			title : '销量',
 			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
 				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
 			}
 		}, {
 			data : 'tran_count',
 			title : '成交次数',
 			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
 				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
 			}
 		}, {
			"data" : "position",
			title : '广告位置',
			"name" : "t4",
		}, {
			"data" : "ad_pos_url",
			title : '具体位置',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">具体位置</a>';
			}
		}, {
			"data" : "ad_pic",
			title : '回放',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">广告回放</a>';
			}
		}, {
			"data" : "screenshots",
			title : '该广告指向',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">该广告指向店铺</a>';
			}
		} ];


shopad.columns.c3 = [
 		{
			data : 'tran_date',
			title : '时间'
		},
		{
			data : 'sales_amount',
			title : '销售额',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'settle_num',
			title : '推广量',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'commisiona_amt',
			title : '支出佣金',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},{
			data : null,
			defaultContent : '',
			visible: false,
 			searchable: false,
 			orderable: false
		},{
			data : null,
			defaultContent : '',
			visible: false,
 			searchable: false,
 			orderable: false
		}  ];

shopad.columns.c4 = [
      		{
     			data : 'sale_name',
     			title : '搭配秀',
     			render : function(data, type, full, meta) {
    				return '<a href="http://item.taobao.com/meal_detail.htm?meal_id='+full.meal_id+'" target="_blank">'+data+'</a>';
    			}
     		},
     		{
     			data : 'sale_num',
     			title : '宝贝数量',
     			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
     				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
     			}
     		},
     		{
     			data : 'prd_name',
     			title : '宝贝详情',
     			render : function(data, type, full, meta) {
     				
     				var prd_names = full.prd_name.split('@');
     				var prices = full.price.split('@');
     				var item_ids = full.item_id.split('@');
     				
     				var html = '';
     				if(prd_names.length == prices.length && prd_names.length == item_ids.length){
     					for(var i = 0; i < prd_names.length; i++){
     						html += '<a href="http://item.taobao.com/item.htm?id='+item_ids[i]+'" target="_blank">'+prd_names[i]+'</a>,'+prices[i]+'<br>';
     					}
     				}
    				return html;
    			}
     		}, {
     			data : 'sale_price',
     			title : '宝贝总价',
     			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
     				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
     			}
     		}, {
     			data : 'sale_price_zk',
     			title : '搭配售价',
     			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
     				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
     			}
     		},{
     			data : null,
     			defaultContent : '',
     			visible: false,
     			searchable: false,
     			orderable: false
     		},{
     			data : null,
     			defaultContent : '',
     			visible: false,
     			searchable: false,
     			orderable: false
     		},{
     			data : null,
     			defaultContent : '',
     			visible: false,
     			searchable: false,
     			orderable: false
     		}  ];

//==========================宝贝广告==========================
var goodsad = {};
goodsad.columns = {};
//热门钻展
goodsad.columns.c1 = [
  		{
			data : 'prd_name',
			title : '宝贝名称',
			name : 't5',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'sales_amount',
			title : '销售额',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "position",
			title : '广告位置',
			"name" : "t4",
		}, {
			"data" : "ad_pos_url",
			title : '具体位置',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">具体位置</a>';
			}
		}, {
			"data" : "ad_pic",
			title : '回放',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">广告回放</a>';
			}
		}, {
			"data" : "screenshots",
			title : '该广告指向',
			"name" : "t4",
			render : function(data, type, full, meta) {
				if(!data){
					return "";
				}
				return '<a target="_blank" href="'+data+'">该广告指向宝贝</a>';
			}
		},{
 			data : null,
 			defaultContent : '',
 			visible: false,
 			searchable: false,
 			orderable: false
 		}   ];

//淘宝客
goodsad.columns.c5 = [
		{
			data : 'prd_name',
			title : '宝贝名称',
			name : 't3',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'sales_amount',
			title : '销售额',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "reserve_price",
			title : '单价',
			"name" : "t1",
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "commission_rate_percent",
			title : '佣金比率',
			"name" : "t1",
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "cal_commission",
			title : '佣金',
			"name" : "t1",
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "total_fee",
			title : '近30天推广佣金',
			"name" : "t1",
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			"data" : "total_num",
			title : '近30天推广量',
			"name" : "t1",
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}  ];
//直通车
goodsad.columns.c6 = [
		{
			data : 'prd_name',
			title : '宝贝名称',
			name : 't3',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'sales_amount',
			title : '销售额',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},{
			data : 'keyword',
			title : '关键字（名次）',
			name : 't2',
			render : function(data, type, full, meta) {
 				
 				var keywords = data.split('@');
 				var seqs = full.seq.split('@');
 				
 				var html = '';
 				if(keywords.length == seqs.length){
 					for(var i = 0; i < keywords.length; i++){
 						html += keywords[i] + '(' + seqs[i] + ')';
 						if(i != keywords.length - 1){
 							html += ',';
 						}
 					}
 				}
				return html;
			}
		}, {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} ];
//直通车
goodsad.columns.c7 = [
		{
			data : 'prd_name',
			title : '宝贝名称',
			name : 't3',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'sales_amount',
			title : '销售额',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},{
			data : 'activity_content',
			title : '聚划算',
			name : 't2'
		}, {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} ];
//商品促销
goodsad.columns.c8 = [
		{
			data : 'prd_name',
			title : '宝贝名称',
			name : 't3',
			render : function(data, type, full, meta) {
				var html = '<img width="60" height="60" src="' + full.prd_img + '" alt="商品图片">' + ' <a target="_blank" href="' + full.prd_url + '">'
						+ data + '</a>';
				return html;
			}
		},
		{
			data : 'sales_amount',
			title : '销售额',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},
		{
			data : 'sales_volume',
			title : '销量',
			name : 't1',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		}, {
			data : 'tran_count',
			title : '成交次数',
			name : 't2',
			fnCreatedCell : function(nTd, sData, oData, iRow, iCol) {
				$(nTd).css('text-align', 'right').css('vertical-align', 'inherit');
			}
		},{
			data : 'activity_content',
			title : '促销信息',
			name : 't2'
		}, {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} , {
			data : null,
			defaultContent : '',
			visible: false,
			searchable: false,
			orderable: false
		} ];