//格式化时间
Date.prototype.format = function(format){
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};

function select_top(prod){
	$("#prod").val(prod).trigger('blur');
	
}

$(function(){
	
	var salesChart = false,cityChart = false,ratingChart = false;
	
	var EC_READY = false;
	// 加载echarts核心文件,这里默认加载源码，便于调试，后续改为压缩文件
	require.config({
        paths: {
            echarts: path+'/js/echarts/source'
        }
    });
	// 按需加载
    require(
        [
            'echarts',//加载echarts.js
            'echarts/chart/line',// 加载line.js
            'echarts/chart/bar',
            'echarts/chart/pie',
            'echarts/chart/map'
        ],function (ec) {
            EC_READY = true;
        }
    );
	
    var offset = 14;//显示的天数
    loadSalesChart($("#tid").val(), true);
	
	//切换tab
	var curTabIdx = 1;
	
	$('#myTab a').on('shown.bs.tab', function (e) {
		
		if (!EC_READY) {
	        return;
	    }
		
		hideTabContent(curTabIdx);
	    curTabIdx = e.target.id.replace('tab','');
	    showTabContent(curTabIdx, true);
		
	});

	function hideTabContent(curTabIdx){
		
		if(curTabIdx == 1){
			
			if(salesChart){
				salesChart.dispose();
				salesChart = false;
			}
			
		}else if(curTabIdx == 2){
			
			if(cityChart){
				cityChart.dispose();
				cityChart = false;
			}
			
		}else if(curTabIdx == 3){
			if(ratingChart){
				ratingChart.dispose();
				ratingChart = false;
			}
		}
		
	}
	
	function showTabContent(curTabIdx, needLoadingSite){
		
		hideTabContent(curTabIdx);
		
		if(curTabIdx == 1){
			//加载tab1的数据
			loadSalesChart($("#tid").val(), needLoadingSite);
			
		}else if(curTabIdx == 2){
			loadCityChart($("#tid").val(), needLoadingSite);
			
		}else if(curTabIdx == 3){
			loadRatingChart($("#tid").val(), needLoadingSite);
		}
	}
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	            if (curTabIdx == 1) {
	            	if(salesChart){
	            		salesChart.resize();
	            	}
	            }
	            else if (curTabIdx == 2) {
	            	if(cityChart){
	            		cityChart.resize();
	            	}
	            }
	            else if (curTabIdx == 3){
	            	if(ratingChart){
	            		ratingChart.resize();
	            	}
	            }
	        },200);
	    };
	};
	
	
	function getWids(){
		var wids = [];
		$.each($("input[name='site']:checked"), function(idx, d){
			wids.push(d.value);
			
		});
		return wids;
	}
	
	
	//任务下拉
	$("#tid").change(function(){
		
		showTabContent(curTabIdx, true);
		
	});
	
    //==============================================tab1============================================================
	function loadSalesChart(tid, needLoadingSite){
		if(needLoadingSite){
			$.post(path+'/a/ProductServlet', {
		        'method': "getSiteByTid",
		        'tid': tid
		    }, function(data) {
		    	
		    	if(data && data.length > 0){
		    		var checkboxHtml = "";
		    		$.each(data, function(idx, d){
		    			
		    			checkboxHtml += "<label class='checkbox-inline'>"
		    							+"<input type='checkbox' name='site' value='"+d.wid+"' checked> "+d.web_name
		    						  +"</label>";
		    		});
		    		$("#web-site").empty();
		    		$("#web-site").html(checkboxHtml);
		    		
		    		//选择站点
		    		$("input[name='site']").click(function(){
		    			
		    			showTabContent(curTabIdx,false);
		    		});
		    		
		    		renderChart(tid, getWids(), offset, "getPriceBy");
		    		
		    	}
		    }, 'json');
		}else{
			renderChart(tid, getWids(), offset, "getPriceBy");
		}
		
	}
	
	function renderChart(tid, wids, offset, salesBy){
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
        salesChart = ec.init(document.getElementById('echarts-sales')).showLoading({effect:'bubble'}); 
        
		$.post(path+'/a/ProductServlet', {
	        'tid': tid,
	        'wids': wids + "",
	        'method': salesBy,
	        'offset': offset
	    }, function(data) {
	        
	    	if(data){
	    		var start = data.start;
		    	var result = data.result;
		    	
		    	if(result && result.length > 0){
		    		salesChart.hideLoading();
		            salesChart.setOption(option4(result, offset, start));
		    		
		    	}
	    	}
	    	
	    }, 'json');
	}
	
	//切换图表  -->价格、成交量
	$("input[name='sales']").click(function(){
		
		var sales = $("input[name='sales']:checked").val();
		
		var wids = [];
		$.each($("input[name='site']:checked"), function(idx, d){
			wids.push(d.value);
			
		});
		
		renderChart($("#tid").val(), wids, offset, sales);
	});
	
	//==============================================tab2============================================================
	
	function loadCityChart(tid, needLoadingSite){
		if(needLoadingSite){
			$.post(path+'/a/ProductServlet', {
		        'method': "getSiteByTid",
		        'tid': tid
		    }, function(data) {
		    	
		    	if(data && data.length > 0){
		    		var checkboxHtml = "";
		    		$.each(data, function(idx, d){
		    			
		    			checkboxHtml += "<label class='checkbox-inline'>"
		    							+"<input type='checkbox' name='site' value='"+d.wid+"' checked> "+d.web_name
		    						  +"</label>";
		    		});
		    		$("#web-site").empty();
		    		$("#web-site").html(checkboxHtml);
		    		
		    		//选择站点
		    		$("input[name='site']").click(function(){
		    			
		    			showTabContent(curTabIdx, false);
		    		});
		    		
		    		renderCityChart(tid, getWids());
		    		
		    	}
		    }, 'json');
		}else{
			renderCityChart(tid, getWids());
		}
		
		
	}
	
	function renderCityChart(tid, wids){
		
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
        cityChart = ec.init(document.getElementById('echarts-city')).showLoading({effect:'bubble'});
		
		$.post(path+'/a/ProductServlet', {
	        'tid': tid,
	        'wids': wids + "",
	        'method': "getCitys"
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		cityChart.hideLoading();
	            
	            var option = option5('echarts-city', data);
	            cityChart.setOption(option);
	            
	            /*var ecConfig = require('echarts/config');
	            cityChart.on(ecConfig.EVENT.MAP_SELECTED, function (param){
	                var selected = param.selected;
	                var mapSeries = option.series[0];
	                var data = [];
	                var legendData = [];
	                var name;
	                for (var p = 0, len = mapSeries.data.length; p < len; p++) {
	                    name = mapSeries.data[p].name;
	                    //mapSeries.data[p].selected = selected[name];
	                    if (selected[name]) {
	                        data.push({
	                            name: name,
	                            value: mapSeries.data[p].value
	                        });
	                        legendData.push(name);
	                    }
	                }
	                option.legend.data = legendData;
	                option.series[1].data = data;
	                cityChart.setOption(option, true);
	            });*/
	    		
	    	}
	    }, 'json');
	}
	
	//================================================tab3===========================================================
	
	function loadRatingChart(tid, needLoadingSite){
		
		if(needLoadingSite){
			$.post(path+'/a/ProductServlet', {
		        'method': "getSiteByTid",
		        'tid': tid
		    }, function(data) {
		    	
		    	if(data && data.length > 0){
		    		var checkboxHtml = "";
		    		$.each(data, function(idx, d){
		    			
		    			checkboxHtml += "<label class='checkbox-inline'>"
		    							+"<input type='checkbox' name='site' value='"+d.wid+"' checked> "+d.web_name
		    						  +"</label>";
		    		});
		    		$("#web-site").empty();
		    		$("#web-site").html(checkboxHtml);
		    		
		    		//选择站点
		    		$("input[name='site']").click(function(){
		    			
		    			showTabContent(curTabIdx, false);
		    		});
		    		
		    		renderRatingChart(tid, getWids());
		    		
		    	}
		    }, 'json');
		}else{
			renderRatingChart(tid, getWids());
		}
		
	}
	
	function renderRatingChart(tid, wids){
		
		var ec = require('echarts');
		// 基于准备好的dom，初始化echarts图表
        ratingChart = ec.init(document.getElementById('echarts-rating')).showLoading({effect:'bubble'});;
		
		$.post(path+'/a/ProductServlet', {
	        'tid': tid,
	        'wids': wids + "",
	        'method': "getRatings"
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		ratingChart.hideLoading();
	            
	            var option = option6(offset, data);
	            ratingChart.setOption(option);
	    		
	    	}
	    }, 'json');
	}
	
	//===============================================添加产品=======================================================
	
	function getCategoryByIid(iid){
		$.post(path+'/a/CategoryServlet', {
	        'method': "getCategoryByIid",
	        'iid': iid
	    }, function(data) {
	    	
	    	if(data && data.length > 0){
	    		var optionHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			optionHtml += "<option value='"+d.cid+"'>"+d.catName+"</option>";
	    			
	    		});
	    		$("#cat").empty();
	    		$("#cat").html(optionHtml);
	    	}
	    }, 'json');
	}
	
	//行业下拉
	$("#ind").change(function(){
		
		//加载类目，并且加载默认图表
		getCategoryByIid($("#ind").val());
		
	});
	
	var bProd = false, bBrand = false;
	$('#prod').blur(function(){
		var input = $(this).val();
		
        if($.trim(input) != ""){
        	
        	if(input == $('#brand-search').val()){
        		$('#tip').text('产品关键字不能与品牌相同').show();
        		bProd = false;
        		return false;
        	}
        	if(input.match(/^[0-9a-zA-Z]$/)){
        		$('#tip').text('产品关键字不符合要求').show();
        		bProd = false;
        		return false;
        	}
        	
        	$('#tip').html('<img alt="" src="'+path+'/images/loading.gif">').show();
        	$.post(path+'/a/TaskServlet', {
    	        'method': "existProd",
    	        'iid': $("#ind").val(),
    	        'cid': $("#cat").val(),
//		        'bid': $("#bid").val(),
		        'brandShortName': $('#brand-search').val(),
    	        'prod': input
    	    }, function(data) {
    	    	if (data.status === 0) {
    	    		$('#tip').text('产品库中不存在['+input+']').show();
    	    		bProd = false;
    	    		$("#add-task").attr("disabled","disabled"); 
                }else{
                	$('#tip').hide();
                	bProd = true;
                	$("#add-task").removeAttr("disabled"); 
                }
    	    	
    	    }, 'json');
        	
        }else{
       	 	$('#tip').text('产品关键字不能为空').show();
       	 	bProd = false;
        }
    });
	
	$('#prod').focus(function(){
		$("#brand-search").trigger("blur");
		if(!bBrand){
			$("#brand-search").focus();
		}
    });
	
	$('#brand-search').blur(function(){
		var input = $(this).val();
		
        if($.trim(input) != ""){
       	 	
        	$('#tip-brand').hide();
        	bBrand = true;
        	
        }else{
       	 	$('#tip-brand').text('品牌名称不能为空').show();
       	 	bBrand = false;
        }
    });
	
	//产品添加
	$("#add-task").click(function(){
		
		var prod = $("#prod").val().trim();
		var desc = $("#desc").val().trim();
		
		//$("#prod, #brand-search").trigger("blur");
		
		if((prod && prod != "")){
			
			//保存cookie
			setCookie(uid+"iid", $("#ind").val(), 30);
			setCookie(uid+"cid", $("#cat").val(), 30);
			setCookie(uid+"brandShortName", $('#brand-search').val(), 30);
			
			$.post(path+'/a/TaskServlet', {
		        'method': "hasPermission"
		    }, function(data) {
		    	if (data.status === 1) {
	        		
		    		//if(confirm("确定要保存吗？")){
	    			$.post(path+'/a/TaskServlet', {
				        'method': "save",
//				        'iid': $("#ind").val(),
//				        'cid': $("#cat").val(),
//					        'bid': $("#bid").val(),
				        'brandShortName': $('#brand-search').val(),
				        'prod': prod,
				        'desc': desc
				    }, function(data) {
				    	if (data.status === 1) {
				    		$("#alert_modal2").modal('hide');
				    		window.location.href = path+"/a/TaskServlet?method=init";
			            }
				    	
				    }, 'json');
		    		//}
		    		
	            }else{
	            	
	            	$("#add-mess").html("当前保存的产品数目已经达到上限，升级套餐可以添加更多产品数据哦<a href='"+path+"/index/plan.jsp'>购买套餐</a>");
	            }
		    	
		    }, 'json');
			
		}
		
	});
	
	$("#add-btn").click(function(){
		if(username == 'test'){
			$(".modal-title").text("温馨提示");
			$(".modal-body >p").text("测试账号仅提供查询功能");
			$("#alert_modal").modal('show');
		}else{
			getCategoryByIid($("#ind").val());
			
			$("#alert_modal2").modal('show');
		}
		
	});
	

//	$('#alert_modal2').on('hidden.bs.modal', function () {
//		window.location.href = window.location.href;
//	});
	
	
	//var brands = null;
	
	$('#brand-search').typeahead({
		items: 20,
		/* 
		scrollHeight: 0,
		minLength: 0,
		showHintOnFocus: true, */
		source: function (query, process) {
			$.ajax({
				type : "POST",
				dataType : "json",// 返回json格式的数据
				url : path+'/a/BrandServlet',
				data : {
					method : "getShortBrandsByCid",
					brandName: query,
					'cid': $("#cat").val()
				},
				success : function(data) {
					
					if(data && data.length > 0){
						
//						brands = data;
						var results = _.map(data, function (brand) {
							return brand.brand_short_name;
						});
						process(results);
						
					}
				}
			});
			
		},
		highlighter: function (item) {
			
			return item;
	    },
	
	    updater: function (item) {
	        
	        return item;
	    },
	    
	    displayText: function(item){
//	    	var brand = _.find(brands, function (p) {
//	            return p.bid == item;
//	        });
//	    	return brand.brand_name;
	    	
	    	return item;
	    },
	    
	    afterSelect: function(item){
	    	
	    	//$("#bid").val(item);
	    	//加载产品top5
	    	$("#topLink").empty();
	    	$.post(path+'/a/TaskServlet', {
		        'method': "getKeywords",
		        'cid': $("#cat").val(),
		        'brandShortName': $('#brand-search').val()
		    }, function(data) {
		    	
		    	if(data && data.length > 0){
		    		var aHtml = "";
		    		$.each(data, function(idx, d){
		    			
		    			aHtml += "<a a href='javascript:void(0);' onclick='select_top(\""+d.keywords+"\");' >"+d.keywords+"</a>";
		    			
		    		});
		    		
		    		$("#topLink").html(aHtml);
		    	}
		    }, 'json');
	    	
	    }
	});
	
});