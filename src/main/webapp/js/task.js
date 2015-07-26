//格式化时间
Date.prototype.format = function(format){
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};


function showModal(message){
	$(".modal-title").text("温馨提示");
	$(".modal-body >p").text(message);
	$("#alert_modal").modal('show');
}


function delTask(tid, createTime){
	
	//检测是否可以删除
//	var today = new Date();
//	
//	createTime = createTime.substring(0,10);
//	var s = createTime.split("-");
//	var yy = parseInt(s[0]); var mm=parseInt(s[1]-1);var dd=parseInt(s[2]);
//	var ct = new Date(yy, mm, dd);
//	ct.setTime(ct.getTime() + 3*24*3600*1000);
//	
//	if(today.getTime() >= ct.getTime()){
	if(username == 'test'){
		showModal("测试账号仅提供查询功能");
	}else{
		if(confirm("确定要删除该产品？")){
			
			$.post(path+'/a/TaskServlet', {
		        'method': "del",
		        'tid': tid
		    }, function(data) {
		        
		    	if(data && data.status){
		    		
		    		if (data.status === 1) {
		    			window.location.href = window.location.href;
		            }else{
		            	showModal("删除产品失败！");
		            }
		    	}
		    }, 'json');
			
		}
	}
//	}else{
//		showModal("产品必须在3天后才能删除！");
//	}
	
}

function select_top(prod){
	$("#prod").val(prod).trigger('blur');
	
}

function callback(){  
	$.post(path+'/a/TaskServlet', {
        'method': "list"
    }, function(data) {
        
    	if(data && data.length > 0){
    		
    		var tbody = "";
    		$.each(data, function(idx, d){
    			
    			var label = "", detail = "";
    			if(d.crawlerStatus == "采集完成"){
    				label = "<span class='label label-success'>采集完成</span>";
//    				if(d.total == d.crawled){//采集成功
//    					detail = "采集<strong style='color:red'>"+d.total+"</strong>条，成功<strong style='color:red'>"+d.crawled+"</strong>条";
//    				}else if(d.crawled > 0 && d.total == (d.crawled + d.crawled_exp)){//采集部分失败
//    					detail = "采集<strong style='color:red'>"+d.total+"</strong>条，成功<strong style='color:red'>"+d.crawled+"</strong>条，异常<strong style='color:red'>"+d.crawled_exp+"</strong>条";
//    				}else if(d.total == d.crawled_exp){
//    					detail = "采集<strong style='color:red'>"+d.total+"</strong>条，异常<strong style='color:red'>"+d.crawled_exp+"</strong>条";
//    				}
    				detail = "<a href='"+path+"/a/ProductServlet?method=init&tid="+d.tid+"'>查看分析报告</a>";
    			}else if(d.crawlerStatus == "采集中"){
    				label = "<span class='label label-info'>采集中</span>";
    				var pr = Math.round((d.crawled / d.total) * 100); 
    				detail = '<div class="progress progress-striped active" style="width: 200px;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+pr+'%;">'+pr+'%</div></div>';
    				
    			}else if(d.crawlerStatus == "等待采集"){
    				label = "<span class='label label-default'>等待采集</span>";
    				//detail = "<strong style='color:red'>"+d.not_crawler+"</strong>条等待采集";
    			}
    			
    			tbody += "<tr>"
	    				+"<td><a href='"+path+"/a/ProductServlet?method=init&tid="+d.tid+"'><h4>"+d.tskName+"</h4></a></td>"
	    				+"<td>"+d.brandShortName+"</td>"
	    				+"<td>"+d.tskDescription+"</td>"
	    				+"<td>"+d.createTimeFormat+"</td>"
	    				+"<td>"+label+"</td>"
	    				+"<td>"+detail+"</td>"
	    				+"<td><a href='javascript:void(0);' onclick='delTask(\""+d.tid+"\", \""+d.createTimeFormat+"\");' class='btn btn-primary btn-xs' role='button'>删除</a></td>"
	    				+"</tr>";
    			
    		});
    		$("#task-content").html(tbody);
    	}
    }, 'json');
} 

$(function(){
	
    //=====================================默认加载====================================
	renderTable();
	//getCategoryByIid($("#ind").val());
	//=====================================默认加载====================================
	
	//切换tab
	var curTabIdx = 1;
	
	$("#tab2").click(function(){
		if(username == 'test'){
			showModal("测试账号仅提供查询功能");
			return false;
		}
	});
	
	$('#myTab a').on('shown.bs.tab', function (e) {
		
	    curTabIdx = e.target.id.replace('tab','');
	    showTabContent(curTabIdx);
		
	});
	
	
	function showTabContent(curTabIdx){
		if(curTabIdx == 1){
			renderTable();
		}else if(curTabIdx == 2){
			
			//清空
			$('#brand-search').val("");
			$('#prod').val("");
			$('#topLink').empty();
			$('#desc').val("");
			$("#add-task").attr("disabled","disabled"); 
			
			//加载类目
			getCategoryByIid($("#ind").val());
		}
	}
	
	//行业下拉
	$("#ind").change(function(){
		
		//加载类目，并且加载默认图表
		getCategoryByIid($("#ind").val());
		
	});
	
	function getCategoryByIid(iid){
		$.post(path+'/a/CategoryServlet', {
	        'method': "getCategoryByIid",
	        'iid': iid
	    }, function(data) {
	    	
	    	if(data && data.length > 0){
	    		var optionHtml = "";
	    		$.each(data, function(idx, d){
	    			
	    			optionHtml += "<option value='"+d.cid+"'>"+d.catName+"</option>";
	    			
	    		});
	    		$("#cat").empty();
	    		$("#cat").html(optionHtml);
	    	}
	    }, 'json');
	}
	
	
	var bProd = false, bBrand = false;
	
	//产品添加
	$("#add-task").click(function(){
		
		var prod = $("#prod").val().trim();
		var desc = $("#desc").val().trim();
		
		//$("#prod, #brand-search").trigger("blur");
		
		if((prod && prod != "")){
			
			//保存cookie
			setCookie(uid+"iid", $("#ind").val(), 30);
			setCookie(uid+"cid", $("#cat").val(), 30);
			setCookie(uid+"brandShortName", $('#brand-search').val(), 30);
			
			$.post(path+'/a/TaskServlet', {
		        'method': "hasPermission"
		    }, function(data) {
		    	if (data.status === 1) {
	        		
		    		//if(confirm("确定要保存吗？")){
	    			$.post(path+'/a/TaskServlet', {
				        'method': "save",
//				        'iid': $("#ind").val(),
//				        'cid': $("#cat").val(),
//					    'bid': $("#bid").val(),
				        'brandShortName': $('#brand-search').val(),
				        'prod': prod,
				        'desc': desc
				    }, function(data) {
				    	if (data.status === 1) {
			        		//showModal("数据采集需等待几分钟后才可查阅！");
				    		$("#tab1,#tab2").parent().toggleClass("active");
				    		$("#task-list,#task-add").toggleClass("in active");
				    		//showTabContent(1);
			            }else{
			            	showModal("添加产品失败！");
			            }
				    	
				    }, 'json');
		    		//}
		    		
	            }else{
	            	showModal("当前保存的产品数目已经达到上限，升级套餐可以添加更多产品数据哦");
	            }
		    	
		    }, 'json');
			
		}
		
	});
	
	function renderTable(){
		callback();
		//启动定时器 
		interval = window.setInterval("callback()", 5000);//每隔5000毫秒执行callback  
		
	}
	
	$('#prod').focus(function(){
		$("#brand-search").trigger("blur");
		if(!bBrand){
			$("#brand-search").focus();
		}
    });
	
	$('#prod').blur(function(){
		var input = $(this).val();
		
        if($.trim(input) != ""){
       	 	
        	if(input == $('#brand-search').val()){
        		$('#tip').text('产品关键字不能与品牌相同').show();
        		bProd = false;
        		return false;
        	}
        	if(input.match(/^[0-9a-zA-Z]$/)){
        		$('#tip').text('产品关键字不符合要求').show();
        		bProd = false;
        		return false;
        	}
        	
        	$('#tip').html('<img alt="" src="'+path+'/images/loading.gif">').show();
        	$.post(path+'/a/TaskServlet', {
    	        'method': "existProd",
    	        'iid': $("#ind").val(),
    	        'cid': $("#cat").val(),
//		        'bid': $("#bid").val(),
		        'brandShortName': $('#brand-search').val(),
    	        'prod': input
    	    }, function(data) {
    	    	if (data.status === 0) {
    	    		$('#tip').text('产品库中不存在['+input+']').show();
    	    		bProd = false;
    	    		$("#add-task").attr("disabled","disabled"); 
                }else{
                	$('#tip').hide();
                	bProd = true;
                	$("#add-task").removeAttr("disabled"); 
                }
    	    	
    	    }, 'json');
        	
        }else{
       	 	$('#tip').text('产品关键字不能为空').show();
       	 	bProd = false;
        }
    });
	
	$('#brand-search').blur(function(){
		var input = $(this).val();
		
        if($.trim(input) != ""){
       	 	
        	$('#tip-brand').hide();
        	bBrand = true;
        	
        }else{
       	 	$('#tip-brand').text('品牌名称不能为空').show();
       	 	bBrand = false;
        }
    });
	
//	var brands = null;
		
	$('#brand-search').typeahead({
		items: 20,
		/* 
		scrollHeight: 0,
		minLength: 0,
		showHintOnFocus: true, */
		source: function (query, process) {
			
			$.ajax({
				type : "POST",
				dataType : "json",// 返回json格式的数据
				url : path+'/a/BrandServlet',
				data : {
					method : "getShortBrandsByCid",
					brandName: query,
					'cid': $("#cat").val()
				},
				success : function(data) {

					if(data && data.length > 0){
						
//						brands = data;
						var results = _.map(data, function (brand) {
							return brand.brand_short_name;
						});
						process(results);
						
					}
				}
			});
			
		},
		highlighter: function (item) {
			
			return item;
	    },
	
	    updater: function (item) {
	        
	        return item;
	    },
	    
	    displayText: function(item){
//	    	var brand = _.find(brands, function (p) {
//	            return p.bid == item;
//	        });
//	    	return brand.brand_name;
	    	return item;
	    },
	    
	    afterSelect: function(item){
	    	
	    	//$("#bid").val(item);
	    	//加载产品top5
	    	$("#topLink").empty();
	    	$.post(path+'/a/TaskServlet', {
		        'method': "getKeywords",
		        'cid': $("#cat").val(),
		        'brandShortName': $('#brand-search').val()
		    }, function(data) {
		    	
		    	if(data && data.length > 0){
		    		var aHtml = "";
		    		$.each(data, function(idx, d){
		    			aHtml += "<a a href='javascript:void(0);' onclick='select_top(\""+$.trim(d.keywords)+"\");' >"+d.keywords+"</a>";
		    			
		    		});
		    		
		    		$("#topLink").html(aHtml);
		    	}
		    }, 'json');
	    	
	    }
	});
	
});