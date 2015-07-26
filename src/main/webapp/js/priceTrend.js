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
	
	var priceChart = false;
	
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
	
    loadPriceChart($("#tid").val(), true);
	
	var resizeTicket = null;
	window.onload = function () {
	    window.onresize = function () {
	        clearTimeout(resizeTicket);
	        resizeTicket = setTimeout(function (){
	        	if(priceChart){
	        		priceChart.resize();
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
		
		loadPriceChart($("#tid").val(), true);
		
	});
	
    //==============================================tab1============================================================
	function loadPriceChart(tid, needLoadingSite){
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
		    			
		    			loadPriceChart($("#tid").val(),false);
		    		});
		    		
		    		renderChart(tid, getWids());
		    		
		    	}
		    }, 'json');
		}else{
			renderChart(tid, getWids());
		}
		
	}
	
	function renderChart(tid, wids){
		$.post(path+'/a/PriceTrendServlet', {
	        'tid': tid,
	        'wids': wids + "",
	        'method': "getPriceTrend"
	    }, function(data) {
	        
	    	if(data && data.length > 0){
	    		
	    		var ec = require('echarts');
	    		
	    		// 基于准备好的dom，初始化echarts图表
	    		priceChart = ec.init(document.getElementById('echarts-price')); 
	    		priceChart.setOption(option7(data));
	    		
	    	}
	    }, 'json');
	}
	
});