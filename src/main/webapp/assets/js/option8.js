function option8(data){
	
	var legend_data = [], yAxis_data = [], series = [];
	
	$.each(data.catData, function(idx, d){
		legend_data.push(d.shop_name);
		
		var series_obj = {};
		series_obj.name = d.shop_name;
		series_obj.type = 'bar';
		series_obj.barMaxWidth = 30;
		
		var sData = [];
		
		for(var j = data.catList.length - 1; j >= 0; j--){
			var cd = data.catList[j];
			sData.push(d['c'+cd.cat_no]);
		}
		
		series_obj.data = sData;
		
		series.push(series_obj);
		
	});
	
	for(var j = data.catList.length - 1; j >= 0; j--){
		var cd = data.catList[j];
		yAxis_data.push(cd.cat_name);
	}
	
	return {
		    title : {
		        text: '店铺产品上月类目销售额条形图',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:legend_data,
		        x : 'center',
		        y : 'bottom'
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
		            data : yAxis_data
		        }
		    ],
		    series : series
		};
	
}