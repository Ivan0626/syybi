$(function(){
	
	var salesChart = false,brandChart1 = false,brandChart2 = false, priceChart = false;
	
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
            'echarts/chart/pie'
        ],function (ec) {
            EC_READY = true;
        }
    );
	
	//切换tab
	var curTabIdx = 1;
	
	//=====================================默认加载====================================
    //加载类目
	getCategoryByIid($("#ind").val());
	//=====================================默认加载====================================
	
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
			
			if(priceChart){
				priceChart.dispose();
				priceChart = false;
			}
			
		}else if(curTabIdx == 3){
			if(brandChart1 && brandChart2){
				brandChart1.dispose();
				brandChart2.dispose();
				brandChart1 = false;
				brandChart2 = false;
			}
		}
		
	}
	
	function showTabContent(curTabIdx){
		
		hideTabContent(curTabIdx);
		
		if(curTabIdx == 1){
			
			//加载tab1的数据
			loadLineChart($("#ind").val(), $("#cat").val());
			
		}else if(curTabIdx == 2){
			
			var cByWay = $("input[name='priceBy']:checked").val();
			loadPriceChart(cByWay, $("#price-date").val(), $("#ind").val(), $("#cat").val());
			
		}else if(curTabIdx == 3){
			var cByWay = $("input[name='brandBy']:checked").val();
			loadBrandChart(cByWay, $("#brand-date").val(), $("#ind").val(), $("#cat").val());
		}
	}
	
	var resizeTicket;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	            if (curTabIdx == 1) {
	            	salesChart.resize();
	            }
	            else if (curTabIdx == 2) {
	            	priceChart.resize();
	            }
	            else if(curTabIdx == 3) {
	            	brandChart1.resize();
					brandChart2.resize();
	            }
	        },200);
	    };
	};
	
    //==============================================tab1============================================================
	function renderTable(saleBy, iid, cid){
		
		var js = saleBy == "month" ? "e.js" : "f.js";
		$.getJSON(path+"/js/demo/"+js, function(data){
			if(data && data.length > 0){
	    		
				var html = getSalesDetailHtml(data, saleBy);
	    		$("#sales-detail").html(html);
	    		
	    	}
		});

	}
	
	function renderChart(sales, salesText, year, iid, cid){
		
		$.getJSON(path+"/js/demo/e.js", function(data){
			if(data && data.length > 0){
	    		
				var ec = require('echarts');
	    		
	    		// 基于准备好的dom，初始化echarts图表
	            salesChart = ec.init(document.getElementById('echarts-sales')); 
	            salesChart.setOption(option1(data, sales, salesText, year));
	    		
	    	}
		});
		
	}
	
	function getSalesDetailHtml(data, saleBy){

		var theader = "", tbody = "";
		if("month" == saleBy){
			headers = ["月份", "销售额", "成交量", "活跃产品数", "销售额环比", "销售额同比"];
			
		}else if("year" == saleBy){
			headers = ["年份", "销售额", "成交量", "活跃产品数", "销售额环比", "成交量环比", "活跃产品数环比"];
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
			}
			
		});
		return "<thead><tr>"+theader+"</tr></thead><tbody>"+tbody+"</tbody>";
	}
	
	function loadLineChart(iid, cid){
		//加载默认的数据
		var sales = $("input[name='sales']:checked").val();
		var salesText = $("input[name='sales']:checked").parent().text();
		var year = $("input[name='year']:checked").val();
		renderChart(sales, salesText, year, iid, cid);
		
		var saleBy = $("input[name='salesBy']").val();
		renderTable(saleBy, iid, cid);
	}
	
	//行业下拉
	$("#ind").change(function(){
		
		//加载类目，并且加载默认图表
		getCategoryByIid($("#ind").val());
		
	});
	
	//类目下拉
	$("#cat").change(function(){
		
		showTabContent(curTabIdx);
		
	});
	
	function getCategoryByIid(iid){
		showTabContent(curTabIdx);
	}
	
	//by月或by年查看销售趋势
	$("input[name='salesBy']").click(function(){
		
		var byWay = $("input[name='salesBy']:checked").val();
		
		renderTable(byWay, $("#ind").val(), $("#cat").val());
	});
	
	//切换图表  -->销售额   成交量   活跃产品数
	$("input[name='sales']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#ind").val(), $("#cat").val());
	});
	
	//切换图表 -->近一年   全部
	$("input[name='year']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#ind").val(), $("#cat").val());
	});
	
	//==============================================tab2============================================================
	function loadPriceChart(priceBy, date, iid, cid){
		
		$.getJSON(path+"/js/demo/g.js", function(data){
			if(data && data.length > 0){
	    		
				//加载table
	    		var tbodyHtml = "";
	    		$.each(data, function(idx, d){
	    			tbodyHtml += "<tr><td>"+d.priceRange+"</td><td>"+d.salesVolumeFormat+"</td><td>"+d.salesAmountFormat+"</td><td>"+d.productCntFormat+"</td></tr>";
	    			
	    		});
	    		$("#price-detail").html(tbodyHtml);
	    		
	    		var ec = require('echarts');
	    	            
	            priceChart = ec.init(document.getElementById('echarts-price')); 
	            priceChart.setOption(option2(data));
	    		
	    	}
		});
		
	}
	
	//by月或by年查看 -->品牌分布
	$("input[name='priceBy']").click(function(){
		
		var priceByWay = $("input[name='priceBy']:checked").val();
		
		var data = null;
		if(priceByWay == "month"){
			data = [{"catchDate":"2015-04"}];
		}else if(priceByWay == "year"){
			data = [{"catchDate":"2015"}];
		}
		
		if(data && data.length > 0){
    		var optionHtml = "";
    		$.each(data, function(idx, d){
    			
    			optionHtml += "<option value='"+d.catchDate+"'>"+d.catchDate+"</option>";
    			
    		});
    		$("#price-date").empty();
    		$("#price-date").html(optionHtml);
    		
    		//加载数据
    		loadPriceChart(priceByWay, $("#price-date").val(), $("#ind").val(), $("#cat").val());
    		
    	}
		
	});
	

	//时间下拉
	$("#price-date").change(function(){
		
		var cByWay = $("input[name='priceBy']:checked").val();
		loadPriceChart(cByWay, $(this).val(), $("#ind").val(), $("#cat").val());
		
	});
	//==============================================tab3============================================================
	function loadBrandChart(brandBy, date, iid, cid){
		
		$.getJSON(path+"/js/demo/h.js", function(data){
			if(data && data.length > 0){
	    		
	    		//加载table
	    		var tbodyHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			tbodyHtml += "<tr><td>"+d.brandName+"</td><td>"+d.salesAmountFormat+"</td><td>"+d.salesPercent+"</td></tr>";
	    			
	    		});
	    		$("#brand-detail").html(tbodyHtml);
	    		
	    		var ec = require('echarts');
	    	            
	            brandChart1 = ec.init(document.getElementById('echarts-brand1')); 
	            brandChart1.setOption(option2(data));
	            
	            brandChart2 = ec.init(document.getElementById('echarts-brand2')); 
	            brandChart2.setOption(option3(data));
	    	}
		});
		
	}
	
	//by月或by年查看 -->品牌分布
	$("input[name='brandBy']").click(function(){
		
		var brandByWay = $("input[name='brandBy']:checked").val();
		
		var data = null;
		if(brandByWay == "month"){
			data = [{"catchDate":"2015-04"}];
		}else if(brandByWay == "year"){
			data = [{"catchDate":"2015"}];
		}
		
		
		if(data && data.length > 0){
    		var optionHtml = "";
    		$.each(data, function(idx, d){
    			
    			optionHtml += "<option value='"+d.catchDate+"'>"+d.catchDate+"</option>";
    			
    		});
    		$("#brand-date").empty();
    		$("#brand-date").html(optionHtml);
    		
    		//加载数据
    		loadBrandChart(brandByWay, $("#brand-date").val(), $("#ind").val(), $("#cat").val());
    		
    	}
	});
	

	//时间下拉
	$("#brand-date").change(function(){
		
		var cByWay = $("input[name='brandBy']:checked").val();
		loadBrandChart(cByWay, $(this).val(), $("#ind").val(), $("#cat").val());
		
	});
	
	//================================================tab3===========================================================
  	
});