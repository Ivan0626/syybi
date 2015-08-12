function option10(data, chartWay) {

	var date = [], series = [], total_name = '';
	
	if(chartWay == 'volume'){
		total_name = "sales_volume";
	}else if(chartWay == 'amount'){
		total_name = "sales_amount";
	}else if(chartWay == 'count'){
		total_name = "tran_count";
	}
	
	$.each(data, function(idx, d){
		date.push(d.tran_date);
		
		var normal = parseFloat(d[total_name]) - parseFloat(d['a_shua_'+chartWay]) - parseFloat(d['b_shua_'+chartWay])
		- parseFloat(d['c_shua_'+chartWay]);
		
		var series_obj = {};
		series_obj.name = "刷单明细";
		series_obj.type = "pie";
		var series_obj_data = [];
		
		series_obj_data.push({
			value: d['a_shua_'+chartWay],
			name : '购买行为'
		});
		
		series_obj_data.push({
			value : d['b_shua_'+chartWay],
			name : '评论行为'
		});
		
		series_obj_data.push({
			value : d['c_shua_'+chartWay],
			name : '购买行为,评论行为'
		});
		
		series_obj_data.push({
			value : normal,
			name : '正常'
		});
		
		series_obj.data = series_obj_data;
		
		if (idx == 0) {// 第一个

			series_obj.center = [ '50%', '45%' ];
			series_obj.radius = '50%';

		}

		series.push(series_obj);
		
	});
	
	var option = {
		timeline : {
			data : date,
			currentIndex : data.length - 1
		},
		options : [ {
			
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			legend : {
				data : [ '购买行为', '评论行为', '购买行为,评论行为', '正常' ],
				show: false
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'pie', 'funnel' ],
						option : {
							funnel : {
								x : '25%',
								width : '50%',
								funnelAlign : 'left',
								max : 1700
							}
						}
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			series : [ series[0] ]
		} ]
	};
	
	for(var i = 1; i < series.length; i++){
		option.options[i] = {calculable : true,series : [series[i]]};;
	}
	
	return option;

}