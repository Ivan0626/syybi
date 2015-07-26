<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="com.sanyanyu.syybi.utils.DateUtils"%>
<%@ include file="/include/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>钻展透视</title>

<link rel="stylesheet" href="../assets/css/syybi.css" />

</head>
<body>
	
	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try{ace.settings.check('main-container' , 'fixed')}catch(e){}
		</script>

		<!-- /section:basics/syy-sidebar -->
		<div class="main-content" >
			<div class="main-content-inner">
				<!-- #section:basics/content.breadcrumbs -->
				<div class="breadcrumbs" id="breadcrumbs">
					<script type="text/javascript">
						try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}
					</script>
					<ul class="breadcrumb">
						<li>
							<i class="ace-icon fa fa-home home-icon"></i>
							<a href="${ctx }/a/Dashboard">首页</a>
						</li>
						<li>钻展透视</li>
						<li><a href="${ctx }/a/DiamondAnalysis">钻展一览 </a></li>
						<li class="active">钻展详情: <%=java.net.URLDecoder.decode(request.getParameter("position"), "utf-8") %></li>
					</ul><!-- /.breadcrumb -->
				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					<%@ include file="/pages/aceSettings.jsp"%>

					<div class="row">
					
						<div class="col-sm-12">
							
							<div class="row">
								<div class="col-sm-12">
									<div class="widget-box">
										<div class="widget-header">
											<h4 class="widget-title">检索条件</h4>
											<div class="widget-toolbar" style="padding-right: 25px;">
												<a href="#" data-action="collapse">
													<i class="ace-icon fa fa-chevron-up"></i>
												</a>
		
												<a href="#" data-action="close">
													<i class="ace-icon fa fa-times"></i>
												</a>
											</div>
										</div>
		
										<div class="widget-body">
										
											<div class="widget-main">
												
												<div class="widget-elem">
													<label for="category">主营类目</label>

													<select id="category" name="category"  style="margin-left: 50px;">
														<option value="">请选择</option>
														<c:forEach items="${cateList }" var="cate">
															<option value="${cate.category }">${cate.catName }</option>
														</c:forEach>
													</select>
												</div>
												
												<div class="widget-elem">
													<label for="d43211">投放时间</label>
													<input style="margin-left: 50px;padding: 0 0;height:auto;" size="15" type="text" value="<%=DateUtils.getOffsetDate(-6) %>" class="Wdate" name="d43211" id="d43211" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-{%d-6}',maxDate:'#F{$dp.$D(\'d43222\')||\'%y-%M-%d\'}'})"/>
													到
													<input style="padding: 0 0;height:auto;" size="15" type="text" class="Wdate" value="<%=DateUtils.getDate() %>" name="d43222" id="d43222" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'d43211\')||\'%y-%M-{%d-6}\';}',maxDate:'%y-%M-%d'})"/>
												</div>
												
												<div class="form-actions center" style="margin:0 auto;padding: 9px 10px 0;">
													<button type="button" class="btn btn-sm btn-success" id="search-btn">
														检索
														<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
								
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="dynamic-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th style="text-align:center">投放素材</th>
													<th style="text-align:center">投放店铺</th>
													<th style="text-align:center">投放时间</th>
													<th style="text-align:center">店铺主营类目</th>
													<th style="text-align:center">当日销售额</th>
													<th style="text-align:center">当日销量</th>
													<th style="text-align:center">飙量</th>
													<th style="text-align:center">操作</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<!-- /section:elements.tab -->
						</div><!-- /.col -->
					
					</div>
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>
	
	<script src="../assets/js/My97DatePicker/WdatePicker.js"></script>
	<script src="../assets/js/bootbox.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var path = "${ctx}";
		var bpid = "${param.bpid}";
		var imagePath = "${imagePath}";
		var table = null;
		
		jQuery(function($) {
			
			//选中navbar
			$('#syy-nav').find('.active').each(function(){
				var $class = 'active';
				if( $(this).hasClass('hover')) $class += ' open';
				
				$(this).removeClass($class);
			});
			$('#syy-diamondAnalysis').addClass('active open');
			
			table = $('#dynamic-table')
			.dataTable( {
				bAutoWidth: false,
				"aoColumns": [
				  	{"mDataProp":"adPic", "bSortable": false}, 
					{"mDataProp":"shopName"},
					{"mDataProp":"putDate"},
					{"mDataProp":"category"},
					{"mDataProp":"salesAmount"},
					{"mDataProp":"salesVolume"},
					{"mDataProp":"riseIndex"},
					{"mDataProp":"azid", "bSortable": false}
				],
				"aaSorting": [[ 1, "asc" ]],
				"oLanguage": {  
                    "sProcessing": "正在加载中......",  
                    "sLengthMenu": "每页显示 _MENU_ 条记录",  
                    "sZeroRecords": "对不起，查询不到相关数据！",  
                    "sEmptyTable": "该范围内无数据！",//"表中无数据存在！",  
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",  
                    "sInfoEmpty": "",
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",  
                    "sSearch": "搜索",  
                    "oPaginate": {  
                        "sFirst": "首页",  
                        "sPrevious": "上一页",  
                        "sNext": "下一页",  
                        "sLast": "末页"  
                    }  
                },
                sServerMethod: "POST",//利用post提交，不需要考虑中文乱码
                ajax: {
                    url: path+"/a/DiamondAnalysis?m=ajax_detail",
                    data: function ( d ) {
                        //添加额外的参数传给服务器
                        d.bpid = bpid;
                        d.category = $("#category").val();
                        d.startDate = $("#d43211").val();
                        d.endDate = $("#d43222").val();
                    }		
                },
                "sDom":"<'row'<'col-xs-6'l>>"+
            			"t"+
            		"<'row'<'col-xs-6'i><'col-xs-6'p>>",//去掉检索
                serverSide: true ,
                columnDefs: [{
                       targets: 0,
                       render: function (val, display, val_obj, prop) {
                           var html = '<td><img width="380px" height="150px" src="'+imagePath+'/'+val+'"></td>';
                           //var html = '<td><img width="380px" height="150px" src="'+val+'"></td>';
                           if(!val){
                        	   html = '<td><img width="380px" height="150px" src="${ctx}/images/notfound.jpg"></td>';
                           }
                           return html;
                       }
                   },{
                       targets: 1,
                       render: function (val, display, val_obj, prop) {
                    	   var html = '<a target="_blank" href="'+val_obj.shopUrl+'">'+val+'</a>';
                           
                    	   if(val_obj.shopType == 'TMALL'){
                    		   html = '<img src="'+path+'/assets/imagesLocal/bc_shop_icon.png"> <a target="_blank" href="'+val_obj.shopUrl+'">'+val+'</a>';
                           }
                    	   
                           return html;
                       }
                   },{
                       targets: 7,
                       render: function (val, display, val_obj, prop) {
                           
                    	   var html = '<div class="hidden-sm hidden-xs action-buttons">'
							+'<a href="${ctx}/a/DiamondAnalysis?m=ad_detail&azid='+val_obj.azid+'">'
								+'<img alt="广告类别" title="广告类别" src="${ctx}/assets/imagesLocal/guang.png">'
							+'</a>'

							+'<a href="${ctx}/a/DiamondAnalysis?m=ad_detail&azid='+val_obj.azid+'&tab=tab2">'
								+'<img alt="广告投放分布" title="广告投放分布" src="${ctx}/assets/imagesLocal/fen.png">'
							+'</a>'
							+'<a href="${imagePath }/'+val_obj.screenshots+'">'
								+'<img alt="广告详情" title="广告详情" src="${ctx}/assets/imagesLocal/xiang.png">'
							+'</a>'
							+'</div>';
                    	   
                           return html;
                       }
                   },{
                   	className:"datatables-body-td","targets":[4,5,6]
                   }
               ]
               
		    } );
			
			//检索
			$('#search-btn').click(function(){
				
				var startDate = $('#d43211').val();
				var endDate = $('#d43222').val();
				
				if(startDate == '' || endDate == ''){
					bootbox.dialog({
						message: "<span class='bigger-110'>投放时间不能为空</span>",
						buttons: 			
						{
							"button" :
							{
								"label" : "确定",
								"className" : "btn-sm"
							}
						}
					});
					return;
				}
				
				if(table){
					table.fnDraw();
				}
				
			});
		});
		
	</script>	
</body>
</html>