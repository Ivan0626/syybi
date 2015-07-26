function option5(data, chartWay, startMonth, ms, titlePrefix){
	
	var legend_data = [], xAxis_data = [], series = [], title_text = '';
	
	$.each(data, function(idx, d){
		
		legend_data.push(d.cat_name);
		
		var ss = {};
		ss.name = d.cat_name;
		ss.type = 'line';
		ss.stack = '总量';
		
		var dd = [];
		for(var i = 0; i < ms; i++){
			if(chartWay == 'volume'){
				dd[i] = d['a'+addMonth(startMonth, i).replace("-", "")];
			}else if(chartWay == 'amount'){
				dd[i] = d['b'+addMonth(startMonth, i).replace("-", "")];
				
			}else if(chartWay == 'count'){
				dd[i] = d['c'+addMonth(startMonth, i).replace("-", "")];
			}
			
		}
		
		ss.data = dd;
		ss.barMaxWidth = 30;
		
		series.push(ss);
	});
	
	for(var i = 0; i < ms; i++){
		xAxis_data[i] = addMonth(startMonth, i);
	}
	
	if(chartWay == 'volume'){
		title_text = "销量";
	}else if(chartWay == 'amount'){
		title_text = "销售额";
		
	}else if(chartWay == 'count'){
		title_text = "成交次数";
	}
	
	return {
			title : {
		        text: titlePrefix+title_text + "趋势图",
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
		            data : xAxis_data
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitArea : {show : true}
		        }
		    ],
		    series : series
		};
}