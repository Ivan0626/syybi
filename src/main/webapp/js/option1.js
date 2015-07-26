function option1(data, sales, salesText, year) {
	// alert((1- 12.0 / 25) * 100);
	// 计算start
	var start = 0;
	if ("recent" == year) {
		var monthNum = data.length;
		if (monthNum > 12) {
			start = (1 - 12.0 / monthNum) * 100;
		}
	}

	return {
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : [ salesText ]
		},
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				dataZoom : {
					show : true
				},
				dataView : {
					show : true
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar', 'stack', 'tiled' ]
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
		dataZoom : {
			show : true,
			realtime : true,
			start : start,
			end : 100
		},
		xAxis : [ {
			type : 'category',
			boundaryGap : false,
			data : function() {
				var list = [];
				$.each(data, function(idx, d) {
					list.push(d.catchMonth);
				});

				return list;
			}()
		} ],
		yAxis : [ {
			type : 'value',
			splitArea : {show : true},
			axisLabel : {
                formatter: function() {
                	if (sales == "amount") {
						return '{value} 亿元';
					} else if (sales == "volume") {
						return '{value} 万';
					}
    			}()
            }
		} ],
		/* grid:{
			 	x: 100,
	        	y: 120
	        },*/
		series : [ {
			name : salesText,
			type : 'line',
			data : function() {
				var list = [];
				$.each(data, function(idx, d) {
					
					if (sales == "amount") {
						list.push(d.salesAmount);
					} else if (sales == "volume") {
						list.push(d.salesVolume);
					} else if (sales == "product") {
						list.push(d.productCnt);
					}

				});

				return list;
			}(),
			markPoint : {
				data : [ {
					type : 'max',
					name : '最大值'
				}, {
					type : 'min',
					name : '最小值'
				} ]
			},
			markLine : {
				data : [ {
					type : 'average',
					name : '平均值'
				} ]
			}
		} ]
	};
}