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
		<div class="main-content">
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
						<li class="active">钻展一览</li>
					</ul><!-- /.breadcrumb -->
				</div>

				<!-- /section:basics/content.breadcrumbs -->
				<div class="page-content">
					
					<%@ include file="/pages/aceSettings.jsp"%>
					<div class="row">
					
						<div class="col-sm-12">

							<div class="row">
								<div class="col-xs-12">
									
									<!-- div.dataTables_borderWrap -->
									<div>
										<table id="dynamic-table" class="table table-striped table-bordered table-hover">
											<thead>
												<tr role="row">
													<th style="text-align:center">钻展位置</th>
													<th style="text-align:center">钻展详情</th>
													<th style="text-align:center">展位缩略图</th>
													<th style="text-align:center">展位类型</th>
												</tr>
											</thead>
											<tbody>
												
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div><!-- /.col -->
					
					</div>
				</div><!-- /.page-content -->
			</div>
		</div><!-- /.main-content -->
	</div>
	
	<!-- page specific plugin scripts -->
	<script src="../assets/js/dataTables/jquery.dataTables.js"></script>
	<script src="../assets/js/dataTables/jquery.dataTables.bootstrap.js"></script>

	<!-- inline scripts related to this page -->
	<script type="text/javascript">
	
		var path = "${ctx}";
		
		jQuery(function($) {
			
			//选中navbar
			$('#syy-nav').find('.active').each(function(){
				var $class = 'active';
				if( $(this).hasClass('hover')) $class += ' open';
				
				$(this).removeClass($class);
			});
			$('#syy-diamondAnalysis').addClass('active open');
			
			$('#shop-search').click(function(){
				
				window.location.href = path + "/a/MarketAnalysis?m=searchB";
				
			});
			
			$('#dynamic-table')
			.dataTable( {
				//"paging":   false,
				"ordering": false,
				bAutoWidth: false,
				"aoColumns": [
					{"mDataProp":"position", "bSortable": false}, 
					{"mDataProp":"bpid", "bSortable": false },
					{"mDataProp":"picUrl", "bSortable": false },
					{"mDataProp":"positionType", "bSortable": true }
				],
				//"aaSorting": [[ 3, "asc" ]],
				"aLengthMenu": [[25, 50, 100], ["25", "50", "100"]],  //设置每页显示记录的下拉菜单    
				"oLanguage": {  //多语言配置 
                    "sProcessing": "正在加载中......",  
                    "sLengthMenu": "每页显示 _MENU_ 条记录",  
                    "sZeroRecords": "对不起，查询不到相关数据！",  
                    "sEmptyTable": "该范围内无数据！",//"表中无数据存在！",   
                    "sInfoEmpty": "",
                    "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",  
                    "sInfoFiltered": "数据表中共为 _MAX_ 条记录",  
                    "sSearch": "搜索",  
                    "oPaginate": {  
                        "sFirst": "首页",  
                        "sPrevious": "上一页",  
                        "sNext": "下一页",  
                        "sLast": "末页"  
                    }  
                },
                ajax: {
                    url: path+"/a/DiamondAnalysis?m=list",
                    data: function ( d ) {
                        //添加额外的参数传给服务器
                        d.search.value = encodeURI(d.search.value);
                    }	
                },
                serverSide: true,
                columnDefs: [{
                       targets: 1,
                       render: function (val, display, val_obj, prop) {
                    	   var position = encodeURI(encodeURI(val_obj.position));//编码
                    	   
                           var html = '<td><a href="'+path+'/a/DiamondAnalysis?m=detail&bpid='+val+'&position='+position+'">详情</a></td>';
                           return html;
                       }
                   },{
                       targets: 2,
                       render: function (val, display, val_obj, prop) {
                           
                           var html = '<td><a target="_blank" href="${imagePath}/'+val+'">查看</a></td>';
                           return html;
                       }
                   }
               ]
               
		    } );
			
		});
		
	</script>	
</body>
</html>