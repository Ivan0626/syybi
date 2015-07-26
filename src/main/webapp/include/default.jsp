<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="sitemesh"%>
<!DOCTYPE html>
<html>
 	<!-- 第一个装饰页面 -->
    <head>
 		<!-- 从被装饰页面获取title标签内容,并设置默认值-->
 		<title><sitemesh:title default="电商指数"/></title>
 		<%@include file="head.jsp" %>
 		<!-- 从被装饰页面获取head标签内容 -->
        <sitemesh:head/>
    </head>

    <body class="no-skin">
    	<!-- top顶部部分 -->
       	<jsp:include page="top.jsp"></jsp:include>
       	
       	<!-- /section:basics/navbar.layout -->
		<div class="main-container" id="main-container">
			<script type="text/javascript">
				try{ace.settings.check('main-container' , 'fixed')}catch(e){}
			</script>

			<!-- left导航菜单部分 -->
	       	<jsp:include page="left.jsp"></jsp:include>

			<!-- /section:basics/sidebar -->
			<div class="main-content">
				<div class="main-content-inner">
					<!-- 从被装饰页面获取body标签内容 -->
					<sitemesh:body />
				</div>
			</div><!-- /.main-content -->

			<jsp:include page="footer.jsp"></jsp:include>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
		</div><!-- /.main-container -->
    </body>
</html>