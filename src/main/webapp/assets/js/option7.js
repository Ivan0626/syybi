function option7(data, startMonth, ms){
	
	var legend_data = [], xAxis_data = [], series = [];
	
	$.each(data, function(idx, d){
		
		legend_data.push(d.shop_name);
		
		var ss = {};
		ss.name = d.shop_name;
		ss.type = 'bar';
		
		var dd = [];
		for(var i = 0; i < ms; i++){
			dd[i] = d['a'+addMonth(startMonth, i).replace("-", "")];
		}
		
		ss.data = dd;
		ss.barMaxWidth = 30;
		
		series.push(ss);
	});
	
	for(var i = 0; i < ms; i++){
		xAxis_data[i] = addMonth(startMonth, i);
	}
	
	
	return {
			title : {
		        text: "店铺销售额走势",
		        x:'center'
		    },	
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x : 'center',
		        y : 'bottom',
		        data:legend_data,
		        padding: [-5, 5, 5, 5]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xAxis_data,
		            name: '日期'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitArea : {show : true},
		            name: '销售额（元）'
		        }
		    ],
		    series : series
		};
}