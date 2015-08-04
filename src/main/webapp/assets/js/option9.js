function option9(data){
	
	var yAxis_data = [], series_data = [];
	
	$.each(data.priceList, function(idx, d){
		
		var yTag = d.start+'-'+d.end;
		yAxis_data.push(yTag);
		
		series_data.push(data.priceData['p'+yTag]);
		
	});
	
	return {
			title : {
		        text: "价格段销售额图",
		        x:'center'
		    },	
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	x : 'center',
		        y : 'bottom',
		        data:['销售额']
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
		            splitArea : {show : true},
		            name: '价格段'
		        }
		    ],
		    series : [
		        {
		            name:'销售额',
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