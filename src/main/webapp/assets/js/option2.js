function option2(data) {

	var series_data = [], legend_data = [];
	$.each(data, function(idx, d) {
		legend_data.push(d.position);
		series_data.push({
			value : d.cnt,
			name : d.position
		});
	});

	var option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		legend : {
			x : 'center',
	        y : 'top',
			data : legend_data
		},
		toolbox : {
			orient : 'vertical',
			x : 'left',
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
			name : '广告分布',
			type : 'pie',
			radius : '55%',
			center : [ '50%', '60%' ],
			data : series_data
		} ]
	};
	return option;
}