function option1(data, chartWay, titlePrifix){
	
	var yAxis_data = [], series_data = [], total = 0;
	
	$.each(data, function(idx, d){
		
		yAxis_data.push(d.cat_name);
		if(chartWay == 'volume'){
			series_data.push(d.sales_volume);
			total += parseInt(d.sales_volume);
		}else if(chartWay == 'amount'){
			series_data.push(d.sales_amount);
			total += parseInt(d.sales_amount);
		}else if(chartWay == 'count'){
			series_data.push(d.tran_count);
			total += parseInt(d.tran_count);
		}
		
	});
	
	if(chartWay == 'volume'){
		legend_data = "销量";
	}else if(chartWay == 'amount'){
		legend_data = "销售额";
	}else if(chartWay == 'count'){
		legend_data = "成交次数";
	}
	
	return {
			title : {
		        text: titlePrifix+legend_data+"(共"+total+"万件)",
		        x:'center'
		    },	
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x : 'center',
		        y : 'bottom',
		        data:[legend_data]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'value',
		            boundaryGap : [0, 0.01]
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            data : yAxis_data,
		            splitArea : {show : true}
		        }
		    ],
		    series : [
		        {
		            name:legend_data,
		            type:'bar',
		            data:series_data,
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                    	
		                    	 var colorList = [
		        		                          '#60C0DD','#B5C334','#FCCE10','#E87C25','#27727B',
		        		                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#C1232B',
		        		                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
		        		                        ];
		                    	
		                    	if(params.dataIndex >= colorList.length){
			                        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
			                    }
		                        
		                        return colorList[params.dataIndex];
		                    },
		                    label: {
		                        show: true,
		                        position: 'right',
		                        formatter: '{b}\n{c}'
		                    }
		                }
		            },
		            barMaxWidth: 30
		        }
		    ]
		};
}