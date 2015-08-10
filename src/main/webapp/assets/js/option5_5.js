function option5_5(data, chartWay){
	
	var legend_data = [], xAxis_data = [], series = [], title_text = '';
	
	var mapList = data.mapList;
	var dayList = data.dayList;
	
	$.each(mapList, function(idx, d){
		
		var ss = {};
		legend_data.push('对象'+d.compare);
		ss.name = '对象'+d.compare;
		
		ss.type = 'line';
		ss.stack = '总量';
		
		var dd = [];
		
		for(var i = 0; i < dayList.length; i++){
			if(chartWay == 'volume'){
				dd[i] = d['a'+dayList[i].replace(/\-/g,"")];
			}else if(chartWay == 'amount'){
				dd[i] = d['b'+dayList[i].replace(/\-/g,"")];
				
			}else if(chartWay == 'count'){
				dd[i] = d['c'+dayList[i].replace(/\-/g,"")];
			}
			
		}
		
		ss.data = dd;
		ss.barMaxWidth = 30;
		
		series.push(ss);
	});
	
	for(var i = 0; i < dayList.length; i++){
		xAxis_data[i] = dayList[i];
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
		        text: title_text + "趋势图",
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