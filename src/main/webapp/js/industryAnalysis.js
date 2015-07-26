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
	
    //设置最新添加产品所属的行业
    var cookie_iid = getCookie(uid+"iid");
    if(cookie_iid){
    	
    	$("#ind option").each(function(){
    		if(cookie_iid == $(this).attr("value")){
    			$("#ind").val(cookie_iid);
    			return false;
    		}
    	});
    	 
    }
    
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
	            }
	            else {
	            	if(brandChart1 && brandChart2){
	            		brandChart1.resize();
						brandChart2.resize();
	            	}
	            }
	        },200);
	    };
	};
	
    //==============================================tab1============================================================
	function renderTable(saleBy, iid){
		$.post(path+'/a/IndustryServlet', {
	        'iid': iid,
	        'saleBy': saleBy,
	        'method': "getSalesBy"
	    }, function(data) {
	    	$("#sales-detail").empty();
	    	if(data && data.length > 0){
	    		var html = getSalesDetailHtml(data, saleBy);
	    		$("#sales-detail").html(html);
	    	}
	    }, 'json');
	}
	
	function renderChart(sales, salesText, year, iid){
		
		var saleBy = year == "week" ? "week" : "month";
		
		$.post(path+'/a/IndustryServlet', {
	        'iid': iid,
	        'saleBy': saleBy,
	        'method': "getSalesBy"
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		var ec = require('echarts');
	    		
	    		// 基于准备好的dom，初始化echarts图表
	            salesChart = ec.init(document.getElementById('echarts-sales')); 
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
	
	function loadLineChart(iid){
		//加载默认的数据
		var sales = $("input[name='sales']:checked").val();
		var salesText = $("input[name='sales']:checked").parent().text();
		var year = $("input[name='year']:checked").val();
		renderChart(sales, salesText, year, iid);
		
		var saleBy = $("input[name='salesBy']:checked").val();
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
		
		$.post(path+'/a/IndustryServlet', {
	        'method': "getCategoryBy",
	        'categoryBy': categoryBy,
	        'date': date,
	        'iid': iid
	    }, function(data) {
	    	$("#category-detail").empty();
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
	    }, 'json');
		
	}
	
	//by月或by年查看 -->类目分布
	$("input[name='categoryBy']").click(function(){
		
		var categoryByWay = $("input[name='categoryBy']:checked").val();
		
		$.post(path+'/a/IndustryServlet', {
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
	    		loadCategoryChart(categoryByWay, $("#category-date").val(), $("#ind").val());
	    		
	    	}
	    }, 'json');
		
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
		
		$.post(path+'/a/IndustryServlet', {
	        'method': "getBrandBy",
	        'brandBy': brandBy,
	        'date': date,
	        'iid': iid
	    }, function(data) {
	    	$("#brand-detail").empty();
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
	    }, 'json');
		
	}
	
	//by月或by年查看 -->类目分布
	$("input[name='brandBy']").click(function(){
		
		var brandByWay = $("input[name='brandBy']:checked").val();
		
		$.post(path+'/a/IndustryServlet', {
	        'method': "getBrandDate",
	        'brandBy': brandByWay
	    }, function(data) {
	    	
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
	    }, 'json');
		
	});
	
	//===============================================添加行业=======================================================
	
	function getWids2(){
		var wids = [];
		$.each($("input[name='industry2']:checked:enabled"), function(idx, d){
			wids.push(d.value);
			
		});
		return wids;
	}
	
	//取消监控
	$("#cancel-monitor").click(function(){
		if(username == 'test'){
			$(".modal-title").text("温馨提示");
			$(".modal-body >p").text("测试账号仅提供查询功能");
			$("#alert_modal").modal('show');
		}else{
			if(confirm("确定要取消监控吗？")){
				$.post(path+'/a/IndustryServlet', {
	    	        'method': "cancelMonitor",
	    	        'iid': $("#ind").val()
	    	    }, function(data) {
	    	        
	    	    	if(data){
	    	    		if (data.status === 1) {
	    	    			window.location.href = location.href;
	    	            }
	    	    	}
	    	    }, 'json');
			}
		}
	});
	
	$("#save-industry2").click(function(){
		
		if(getWids2() != null && getWids2().length > 0){
			$.post(path+'/a/IndustryServlet', {
		        'method': "hasPermission",
		        'addNum': getWids2().length,
		    }, function(data) {
		    	if (data.status === 1) {
		    		
		    		if(confirm("确定要保存吗？")){
		    			$.post(path+'/a/IndustryServlet', {
		        	        'wids': getWids2() + "",
		        	        'method': "saveUserIndustry"
		        	    }, function(data) {
		        	        
		        	    	if(data){
		        	    		if (data.status === 1) {
		        	    			$("#alert_modal2").modal('hide');
		        	            }
		        	    	}
		        	    }, 'json');
		    		}
		    		
		        }else{
		        	
		        	$("#add-mess2").html("当前保存的行业数目已经达到上限，升级套餐可以添加更多行业数据哦<a href='"+path+"/index/plan.jsp'>购买套餐</a>");
		        }
		    	
		    }, 'json');
		}else{
			$("#add-mess2").html("请先选择行业再保存！");
		}
		
		
		
	});
	
	$("#add-btn").click(function(){
		
		if(username == 'test'){
			$(".modal-title").text("温馨提示");
			$(".modal-body >p").text("测试账号仅提供查询功能");
			$("#alert_modal").modal('show');
		}else{
			$("#alert_modal2").modal('show');
		}
		
	});
	

	$('#alert_modal2').on('hidden.bs.modal', function () {
		window.location.href = window.location.href;
	});
});