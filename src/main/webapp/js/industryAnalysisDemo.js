$(function(){
	
	var salesChart = false,categoryChart1 = false,categoryChart2 = false,brandChart1 = false, brandChart2 = false;
	
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
	
    //默认加载tab1的数据
	loadLineChart($("#ind").val());
	
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
			loadLineChart($("#ind").val());
			
		}else if(curTabIdx == 2){
			
			var cByWay = $("input[name='categoryBy']:checked").val();
			
			loadCategoryChart(cByWay, $("#category-date").val(), $("#ind").val());
			
		}else if(curTabIdx == 3){
			var cByWay = $("input[name='brandBy']:checked").val();
			
			loadBrandChart(cByWay, $("#brand-date").val(), $("#ind").val());
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
					categoryChart1.resize();
					categoryChart2.resize();
	            }
	            else {
	            	brandChart1.resize();
					brandChart2.resize();
	            }
	        },200);
	    };
	};
	
    //==============================================tab1============================================================
	function renderTable(saleBy, iid){
		var js = saleBy == "month" ? "a.js" : "b.js";
		$.getJSON(path+"/js/demo/"+js, function(data){
			if(data && data.length > 0){
	    		
				var html = getSalesDetailHtml(data, saleBy);
	    		$("#sales-detail").html(html);
	    		
	    	}
		});
		
	}
	
	function renderChart(sales, salesText, year, iid){
		
		$.getJSON(path+"/js/demo/a.js", function(data){
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
	
	function loadLineChart(iid){
		//加载默认的数据
		var sales = $("input[name='sales']:checked").val();
		var salesText = $("input[name='sales']:checked").parent().text();
		var year = $("input[name='year']:checked").val();
		renderChart(sales, salesText, year, iid);
		
		var saleBy = $("input[name='salesBy']").val();
		renderTable(saleBy, iid);
	}
	
	//行业下拉
	$("#ind").change(function(){
		
		showTabContent(curTabIdx);
	});
	
	//by月或by年查看销售趋势
	$("input[name='salesBy']").click(function(){
		
		var byWay = $("input[name='salesBy']:checked").val();
		
		renderTable(byWay, $("#ind").val());
	});
	
	//切换图表  -->销售额   成交量   活跃产品数
	$("input[name='sales']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#ind").val());
	});
	
	//切换图表 -->近一年   全部
	$("input[name='year']").click(function(){
		
		var sales2 = $("input[name='sales']:checked").val();
		var salesText2 = $("input[name='sales']:checked").parent().text();
		var year2 = $("input[name='year']:checked").val();
		renderChart(sales2, salesText2, year2, $("#ind").val());
	});
	
	//==============================================tab2============================================================
	function loadCategoryChart(categoryBy, date, iid){
		
		$.getJSON(path+"/js/demo/c.js", function(data){
			if(data && data.length > 0){
	    		
				//加载table
	    		var tbodyHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			tbodyHtml += "<tr><td>"+d.catName+"</td><td>"+d.salesAmountFormat+"</td><td>"+d.salesPercent+"</td></tr>";
	    			
	    		});
	    		$("#category-detail").html(tbodyHtml);
	    		
	    		var ec = require('echarts');
	    	            
	            categoryChart1 = ec.init(document.getElementById('echarts-category')); 
	            categoryChart1.setOption(option2(data));
	            
	            categoryChart2 = ec.init(document.getElementById('echarts-category2')); 
	            categoryChart2.setOption(option3(data));
	    		
	    	}
		});
		
	}
	
	//by月或by年查看 -->类目分布
	$("input[name='categoryBy']").click(function(){
		
		var categoryByWay = $("input[name='categoryBy']:checked").val();
		var data = null;
		if(categoryByWay == "month"){
			data = [{"catchDate":"2015-01"},{"catchDate":"2015-02"},{"catchDate":"2015-03"},{"catchDate":"2015-04"},{"catchDate":"2015-05"}];
		}else if(categoryByWay == "year"){
			data = [{"catchDate":"2015"}];
		}
		
		if(data && data.length > 0){
    		var optionHtml = "";
    		$.each(data, function(idx, d){
    			
    			optionHtml += "<option>"+d.catchDate+"</option>";
    			
    		});
    		$("#category-date").empty();
    		$("#category-date").html(optionHtml);
    		
    		//加载数据
    		loadCategoryChart(categoryByWay, $("#category-date").val(), $("#ind").val());
    		
    	}
		
	});
	

	//时间下拉
	$("#category-date").change(function(){
		
		var cByWay = $("input[name='categoryBy']:checked").val();
		loadCategoryChart(cByWay, $(this).val(), $("#ind").val());
		
	});
	
	//================================================tab3===========================================================
	$("#brand-date").change(function(){
		
		var cByWay = $("input[name='brandBy']:checked").val();
		loadBrandChart(cByWay, $(this).val(), $("#ind").val());
		
	});
	
	function loadBrandChart(brandBy, date, iid){
		
		$.getJSON(path+"/js/demo/d.js", function(data){
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
	
	//by月或by年查看 -->类目分布
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
    		loadBrandChart(brandByWay, $("#brand-date").val(), $("#ind").val());
    		
    	}
		
	});
});