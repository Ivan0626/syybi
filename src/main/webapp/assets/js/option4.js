function option4(data){
	
	var xAxis_data = [], series_data_volume = [], series_data_price = [], series_data_tranPrice = [];
	$.each(data.data, function(idx, d){
		xAxis_data.push(d.tran_date);
		series_data_volume.push(d.sales_volume);
		series_data_price.push(d.avg_price);
		series_data_tranPrice.push(d.avg_price_tran);
	});
	
	return {
	    tooltip : {
	        trigger: 'axis'
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
	    legend: {
	        data:['销量','标价','成交均价']
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : xAxis_data
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name : '销量',
	            axisLabel : {
	                formatter: '{value} 件'
	            },
	            splitArea : {show : true}
	        },
	        {
	            type : 'value',
	            name : '标价',
	            axisLabel : {
	                formatter: '{value} 元'
	            },
	            splitArea : {show : true}
	        },
	        {
	            type : 'value',
	            name : '成交均价',
	            axisLabel : {
	                formatter: '{value} 元'
	            },
	            splitArea : {show : true}
	        }
	    ],
	    series : [

	        {
	            name:'销量',
	            type:'bar',
	            data:series_data_volume
	        },
	        {
	            name:'标价',
	            type:'line',
	            yAxisIndex: 1,
	            data:series_data_price
	        },
	        {
	            name:'成交均价',
	            type:'line',
	            yAxisIndex: 1,
	            data:series_data_tranPrice
	        }
	    ]
	};
	
}
