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

$(function(){
	
	var salesChart = false,categoryChart1 = false,categoryChart2 = false, cityChart = false, ratingChart = false;
	
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
	
  //===默认===
	//$("#myTab").hide();
	//$("#myTabContent").hide();
    
//    var brands = null;
    if(getCookie(uid+"brandShortName")){
    	$('#brand-search').val(getCookie(uid+"brandShortName"));
        loadChart();
    }
	
    var offset = 14;//显示的天数
    
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
					method : "getShortBrands",
					brandName: query
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
	    	
	    	loadChart();
	    }
	});
	
    
	function loadChart(){
		$("#catDiv").empty();
    	$.post(path+'/a/BrandServlet', {
	        'brandShortName': $('#brand-search').val(),
	        'method': "getCatByBrand"
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		var checkboxHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			if(getCookie(uid+"cid")){
	    				if(getCookie(uid+"cid") == d.cid){
		    				checkboxHtml += "<label class='checkbox-inline'>"
								+"<input type='checkbox' name='cat' value='"+d.cid+"' checked> "+d.cat_name
							  +"</label>";
		    			}else{
		    				checkboxHtml += "<label class='checkbox-inline'>"
								+"<input type='checkbox' name='cat' value='"+d.cid+"'> "+d.cat_name
							  +"</label>";
		    			}
	    			}else{
	    				checkboxHtml += "<label class='checkbox-inline'>"
							+"<input type='checkbox' name='cat' value='"+d.cid+"' checked> "+d.cat_name
						  +"</label>";
	    			}
	    			
	    			
	    		});
	    		
	    		$("#catDiv").html('<label for="cat">类目：</label><span style="margin-left:5px;">'+checkboxHtml+'</span>');
	    		
	    		//选择站点
	    		$("input[name='cat']").click(function(){
	    			
	    			showTabContent(curTabIdx);
	    		});
	    		
	    		$("#myTab").show();
		    	$("#myTabContent").show();
		    	
//		    	$("#bid").val(item);
		    	
			    showTabContent(curTabIdx);
	    		
	    	}
	    }, 'json');
	}
	
    //切换tab
	var curTabIdx = 1;
	
	$('#myTab a').on('shown.bs.tab', function (e) {
		
		if (!EC_READY) {
	        return;
	    }
		
		hideTabContent(curTabIdx);
	    curTabIdx = e.target.id.replace('tab','');
	    showTabContent(curTabIdx);
		
	});

	function hideTabContent(curTabIdx){
		
		if(curTabIdx == 1){
			
			if(salesChart){
				salesChart.dispose();
				salesChart = false;
			}
			
		}else if(curTabIdx == 2){
			
			if(categoryChart1 && categoryChart2){
				categoryChart1.dispose();
				categoryChart2.dispose();
				categoryChart1 = false;
				categoryChart2 = false;
			}
			
		}else if(curTabIdx == 3){
			
			if(cityChart){
				cityChart.dispose();
				cityChart = false;
			}
			
		}else if(curTabIdx == 4){
			if(ratingChart){
				ratingChart.dispose();
				ratingChart = false;
			}
		}
		
	}
	
	function showTabContent(curTabIdx){
		
		hideTabContent(curTabIdx);
		
		if(curTabIdx == 1){
			
			//加载tab1的数据
			loadLineChart($("#brand-search").val());
			
		}else if(curTabIdx == 2){
			
			var cByWay = $("input[name='categoryBy']:checked").val();
			loadCategoryChart(cByWay, $("#category-date").val(), $("#brand-search").val(), getCids());
			
		}else if(curTabIdx == 3){
			loadCityChart($("#brand-search").val());
			
		}else if(curTabIdx == 4){
			loadRatingChart($("#brand-search").val());
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
	            	if(categoryChart1 && categoryChart2){
	            		categoryChart1.resize();
						categoryChart2.resize();
	            	}
	            }else if (curTabIdx == 3) {
	            	if(cityChart){
	            		cityChart.resize();
	            	}
	            }
	            else if (curTabIdx == 4){
	            	if(ratingChart){
	            		ratingChart.resize();
	            	}
	            }
	        },200);
	    };
	};
	
	function getCids(){
		var cids = [];
		$.each($("input[name='cat']:checked"), function(idx, d){
			cids.push(d.value);
			
		});
		return cids;
	}
	
    //==============================================tab1============================================================
	function renderTable(saleBy, brandShortName, cids){
		$.post(path+'/a/BrandServlet', {
	        'brandShortName': brandShortName,
	        'saleBy': saleBy,
	        'method': "getSalesBy",
	        'cids': cids + ''
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		var html = getSalesDetailHtml(data, saleBy);
	    		$("#sales-detail").html(html);
	    	}
	    }, 'json');
	}
	
	function renderChart(sales, salesText, year, brandShortName, cids){
		
		var saleBy = year == 'week' ? 'week' : 'month';
		
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
        salesChart = ec.init(document.getElementById('echarts-sales')).showLoading({effect:'bubble'}); 
		
		$.post(path+'/a/BrandServlet', {
	        'brandShortName': brandShortName,
	        'saleBy': saleBy,
	        'method': "getSalesBy",
	        'cids': cids + ''
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		salesChart.hideLoading();
	            salesChart.setOption(option1(data, sales, salesText, year));
	    		
	    	}
	    }, 'json');
	}
	
	function getSalesDetailHtml(data, saleBy){

		var theader = "", tbody = "";
		if("month" == saleBy){
			headers = ["月份", "销售额", "成交量", "活跃产品数", "销售额环比", "销售额同比"];
			
		}else if("year" == saleBy){
			headers = ["年份", "销售额", "成交量", "活跃产品数", "销售额环比", "成交量环比", "活跃产品数环比"];
		}else if("week" == saleBy){
			headers = ["周份", "销售额", "成交量", "活跃产品数", "销售额环比", "销售额同比"];
		}
		$.each(headers, function(idx, header){
			theader += "<th>"+header+"</th>";
		});
		
		$.each(data, function(idx, d){
			
			if("month" == saleBy){
				tbody += "<tr>"
	    				+"<td>"+d.catchMonth+"</td>"
	    				+"<td>"+d.salesAmountFormat+"</td>"
	    				+"<td>"+d.salesVolumeFormat+"</td>"
	    				+"<td>"+d.productCntFormat+"</td>"
	    				+"<td>"+d.salesAmountHuanbiFormat+"</td>"
	    				+"<td>"+d.salesAmountTongbiFormat+"</td>"
	    				+"</tr>";
			}else if("year" == saleBy){
				tbody += "<tr>"
	    				+"<td>"+d.catchYear+"</td>"
	    				+"<td>"+d.salesAmountFormat+"</td>"
	    				+"<td>"+d.salesVolumeFormat+"</td>"
	    				+"<td>"+d.productCntFormat+"</td>"
	    				+"<td>"+d.salesAmountHuanbiFormat+"</td>"
	    				+"<td>"+d.salesVolumeHuanbiFormat+"</td>"
	    				+"<td>"+d.productCntHuanbiFormat+"</td>"
	    				+"</tr>";
			}else if("week" == saleBy){
				tbody += "<tr>"
    				+"<td>"+d.catchMonth+"</td>"
    				+"<td>"+d.salesAmountFormat+"</td>"
    				+"<td>"+d.salesVolumeFormat+"</td>"
    				+"<td>"+d.productCntFormat+"</td>"
    				+"<td>"+d.salesAmountHuanbiFormat+"</td>"
    				+"<td>"+d.salesAmountTongbiFormat+"</td>"
    				+"</tr>";
		}
			
		});
		return "<thead><tr>"+theader+"</tr></thead><tbody>"+tbody+"</tbody>";
	}
	
	function loadLineChart(brandShortName){
		//加载默认的数据
		var sales = $("input[name='sales']:checked").val();
		var salesText = $("input[name='sales']:checked").parent().text();
		var year = $("input[name='year']:checked").val();
		var cids = getCids();
		renderChart(sales, salesText, year, brandShortName, cids);
		
		var saleBy = $("input[name='salesBy']:checked").val();
		renderTable(saleBy, brandShortName, cids);
	}
	
	//by月或by年查看销售趋势
	$("input[name='salesBy']").click(function(){
		
		var byWay = $("input[name='salesBy']:checked").val();
		
		renderTable(byWay, $("#brand-search").val(), getCids());
	});
	
	//切换图表  -->销售额   成交量   活跃产品数
	$("input[name='sales']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#brand-search").val(), getCids());
	});
	
	//切换图表 -->近一年   全部
	$("input[name='year']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#brand-search").val(), getCids());
	});
	
	//==============================================tab2============================================================
	function loadCategoryChart(categoryBy, date, brandShortName, cids){
		
		var ec = require('echarts');
        
        categoryChart1 = ec.init(document.getElementById('echarts-category')).showLoading({effect:'bubble'}); 
        categoryChart2 = ec.init(document.getElementById('echarts-category2')).showLoading({effect:'bubble'}); 
		
		$.post(path+'/a/BrandServlet', {
	        'method': "getCategoryBy",
	        'categoryBy': categoryBy,
	        'date': date,
	        'brandShortName': brandShortName,
	        'cids': cids + ''
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		//加载table
	    		var tbodyHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			tbodyHtml += "<tr><td>"+d.catName+"</td><td>"+d.salesAmountFormat+"</td><td>"+d.salesPercent+"</td></tr>";
	    			
	    		});
	    		$("#category-detail").html(tbodyHtml);
	    		
	    		categoryChart1.hideLoading();
	            categoryChart1.setOption(option2(data));
	            
	            categoryChart2.hideLoading();
	            categoryChart2.setOption(option3(data));
	    	}
	    }, 'json');
		
	}
	
	//by月或by年查看 -->类目分布
	$("input[name='categoryBy']").click(function(){
		
		var categoryByWay = $("input[name='categoryBy']:checked").val();
		
		$.post(path+'/a/BrandServlet', {
	        'method': "getDate",
	        'categoryBy': categoryByWay
	    }, function(data) {
	    	
	    	if(data && data.length > 0){
	    		var optionHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			optionHtml += "<option>"+d.catchDate+"</option>";
	    			
	    		});
	    		$("#category-date").empty();
	    		$("#category-date").html(optionHtml);
	    		
	    		//加载数据
	    		loadCategoryChart(categoryByWay, $("#category-date").val(), $("#brand-search").val(), getCids());
	    		
	    	}
	    }, 'json');
		
	});
	

	//时间下拉
	$("#category-date").change(function(){
		
		var cByWay = $("input[name='categoryBy']:checked").val();
		loadCategoryChart(cByWay, $(this).val(), $("#brand-search").val(), getCids());
		
	});
	
//==============================================tab3============================================================
	
	function loadCityChart(brandShortName){
		renderCityChart(brandShortName, getCids());
	}
	
	function renderCityChart(brandShortName, cids){
		
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
        cityChart = ec.init(document.getElementById('echarts-city')).showLoading({effect:'bubble'});
		
		$.post(path+'/a/BrandServlet', {
	        'cids': cids + "",
	        'brandShortName': brandShortName,
	        'method': "getCitys"
	    }, function(data) {
	    	cityChart.hideLoading();
	    	if(data && data.length > 0){
	    		
//	            var option = option5('echarts-city', data);
//	            cityChart.setOption(option);
	            cityChart.setOption(option0(data));
	            
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
	
	//================================================tab4===========================================================
	
	function loadRatingChart(brandShortName){
		
		renderRatingChart(brandShortName, getCids());
		
	}
	
	function renderRatingChart(brandShortName, cids){
		
		var ec = require('echarts');
		// 基于准备好的dom，初始化echarts图表
        ratingChart = ec.init(document.getElementById('echarts-rating')).showLoading({effect:'bubble'});;
		
		$.post(path+'/a/BrandServlet', {
	        'brandShortName': brandShortName,
	        'cids': cids + "",
	        'method': "getRatings"
	    }, function(data) {
	    	ratingChart.hideLoading();
	    	if(data && data.length > 0){
	    		
	            var option = option6(offset, data);
	            ratingChart.setOption(option);
	    		
	    	}
	    }, 'json');
	}
});