function option2_2(data, chartWay, titlePrefix) {

	var series_data = [], legend_data = [], total = 0, series_name = "", unit = '';

	$.each(data, function(idx, d){
		
		legend_data.push(d.cat_name);
		if(chartWay == 'volume'){
			series_data.push({
				value : d.sales_volume,
				name : d.cat_name
			});
			total += parseInt(d.sales_volume);
		}else if(chartWay == 'amount'){
			series_data.push({
				value : d.sales_amount,
				name : d.cat_name
			});
			total += parseInt(d.sales_amount);
		}else if(chartWay == 'count'){
			series_data.push({
				value : d.tran_count,
				name : d.cat_name
			});
			total += parseInt(d.tran_count);
		}
		
	});

	if(chartWay == 'volume'){
		series_name = "销量";
		unit = "件";
	}else if(chartWay == 'amount'){
		series_name = "销售额";
		
		unit = "元";
	}else if(chartWay == 'count'){
		series_name = "成交次数";
		
		unit = "次";
	}
	
	var option = {
		title : {
	        text: titlePrefix+series_name + "(共"+total+"万"+unit+")",
	        x:'center'
	    },	
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			orient : 'vertical',
	        x : 'left',
			data : legend_data
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
							max : 1548
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
		series : [ {
			name : series_name,
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : series_data
		} ]
	};
	return option;
}