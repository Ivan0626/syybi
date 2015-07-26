<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>  	
<!-- #section:basics/sidebar.horizontal -->
<div id="sidebar" class="sidebar      h-sidebar                navbar-collapse collapse">
	<script type="text/javascript">
		try{ace.settings.check('sidebar' , 'fixed')}catch(e){}
	</script>

	<div class="sidebar-shortcuts" id="sidebar-shortcuts">
		<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
			<button class="btn btn-success">
				<i class="ace-icon fa fa-signal"></i>
			</button>

			<button class="btn btn-info">
				<i class="ace-icon fa fa-pencil"></i>
			</button>

			<!-- #section:basics/sidebar.layout.shortcuts -->
			<button class="btn btn-warning">
				<i class="ace-icon fa fa-users"></i>
			</button>

			<button class="btn btn-danger">
				<i class="ace-icon fa fa-cogs"></i>
			</button>

			<!-- /section:basics/sidebar.layout.shortcuts -->
		</div>

		<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
			<span class="btn btn-success"></span>

			<span class="btn btn-info"></span>

			<span class="btn btn-warning"></span>

			<span class="btn btn-danger"></span>
		</div>
	</div><!-- /.sidebar-shortcuts -->

	<ul class="nav nav-list" id="syy-nav">
		<li class="active open hover" id="syy-dashboard">
			<a href="${ctx }/a/Dashboard">
				<i class="menu-icon fa fa-tachometer"></i>
				<span class="menu-text"> 用户中心 </span>
			</a>

			<b class="arrow"></b>
		</li>

		<li class="hover" id="syy-industryAnalysis">
			<a href="${ctx }/a/IndustryAnalysis">
				<i class="menu-icon fa fa-desktop"></i>
				<span class="menu-text">
					行业分析
				</span>

				<b class="arrow fa fa-angle-down"></b>
			</a>
			<b class="arrow"></b>
		</li>

		<li class="hover">
			<a href="#">
				<i class="menu-icon fa fa-list"></i>
				<span class="menu-text"> 店铺分析 </span>

				<b class="arrow fa fa-angle-down"></b>
			</a>
			<b class="arrow"></b>
		</li>

		<li class="hover">
			<a href="#">
				<i class="menu-icon fa fa-file-o"></i>
				<span class="menu-text"> 宝贝分析 </span>

				<b class="arrow fa fa-angle-down"></b>
			</a>

			
			<b class="arrow"></b>
		</li>
		<li class="hover">
			<a href="#">
				<i class="menu-icon fa fa-list-alt"></i>
				<span class="menu-text"> 品牌分析 </span>
			</a>
			
			<b class="arrow"></b>
		</li>

		<li class="hover">
			<a href="#">
				<i class="menu-icon fa fa-calendar"></i>

				<span class="menu-text">
					数据对比
				</span>
			</a>

			<b class="arrow"></b>
		</li>

		<li class="hover" id="syy-diamondAnalysis">
			<a href="${ctx }/a/DiamondAnalysis">
				<i class="menu-icon fa fa-picture-o"></i>
				<span class="menu-text"> 钻展透视 </span>
			</a>

			<b class="arrow"></b>
		</li>

		<li class="hover" id="syy-marketAnalysis">
			<a href="${ctx }/a/MarketAnalysis">
				<i class="menu-icon fa fa-tag"></i>
				<span class="menu-text"> 营销组合分析 </span>

				<b class="arrow fa fa-angle-down"></b>
			</a>

			<b class="arrow"></b>
		</li>

		<li class="hover" id="syy-accountSetting">
			<a href="${ctx }/a/AccountSetting">
				<i class="menu-icon fa fa-pencil-square-o "></i>

				<span class="menu-text">
					账户设置
				</span>

				<b class="arrow fa fa-angle-down"></b>
			</a>
			<b class="arrow"></b>

		</li>
	</ul><!-- /.nav-list -->

	<!-- #section:basics/sidebar.layout.minimize -->

	<!-- /section:basics/sidebar.layout.minimize -->
	<script type="text/javascript">
		try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
	</script>
</div>
