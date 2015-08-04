function option3_3(data, chartWay){
	var legend = "", xAxisData = [], seriesData = [], unit = "分";
	if(chartWay == 'describe'){
		legend = "描述相符";
	}else if(chartWay == 'service'){
		legend = "服务态度";
		
	}else if(chartWay == 'delivery'){
		legend = "发货速度";
		
	}
	
	$.each(data, function(idx, d){
		xAxisData.push(d.catch_date);
		if(chartWay == 'describe'){
			seriesData.push(d.describe);
		}else if(chartWay == 'service'){
			seriesData.push(d.service);
		}else if(chartWay == 'delivery'){
			seriesData.push(d.delivery);
		}
	});
	
	return {
		    title : {
		        text: legend + '评分走势',
		        x: 'center',
		        y: 'top'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend:{
		    	data:[legend],
		    	x : 'center',
		        y : 'bottom'
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : xAxisData
		        }
		    ],
		    yAxis : [
	             {
	                 type : 'value',
	                 splitArea : {show : true},
	 	            axisLabel : {
	 	                formatter: '{value} '+unit
	 	            }
	             }
	         ],
		    series : [
		        {
		        	name:legend,
		            type:'bar',
		            data:seriesData,
		            barMaxWidth: 30,
		            markLine : {
		                data : [
		                    {type : 'average', name: '行业平均分'}
		                ]
		            }
		        }
		    ]
		};
}

                    