//检测url链接
function isURL(str) { 
	var RegUrl = new RegExp(); 
	RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");//jihua.cnblogs.com 
	if (!RegUrl.test(str)) { 
		return false; 
	} 
	return true; 
} 

//温馨提示消息弹出框
function showMsg(msg, callback) {
	bootbox.dialog({
		message : "<span class='bigger-110'>" + msg + "</span>",
		buttons : {
			"button" : {
				"label" : "确定",
				"className" : "btn-sm",
				"callback": callback
			}
		}
	});
}

function confirmMsg(msg, callback){
	bootbox.confirm({  
        buttons: {  
            confirm: {  
                label: '确定',  
                className: 'btn-myStyle'  
            },  
            cancel: {  
                label: '取消',  
                className: 'btn-default'  
            }  
        },  
        message: msg,  
        callback: callback  
	 });
}

//获取两个月份之间的月份数
function getMonths(date1 , date2){
    //用-分成数组
    date1 = date1.split("-");
    date2 = date2.split("-");
    //获取年,月数
    var year1 = parseInt(date1[0]) , 
        month1 = parseInt(date1[1]) , 
        year2 = parseInt(date2[0]) , 
        month2 = parseInt(date2[1]) , 
        //通过年,月差计算月份差
        months = (year2 - year1) * 12 + (month2-month1) + 1;
    return months;    
}

//计算几个月
function addMonth(mtstr, n){   // n个月后 
   var s=mtstr.split("-");
   var yy=parseInt(s[0]); var mm=parseInt(s[1]-1);var dd=1;
   var dt=new Date(yy,mm,dd);
   dt.setMonth(dt.getMonth()+n);
   if( (dt.getFullYear()*12+dt.getMonth()) > (yy*12+mm + n) )
    {
    dt=new Date(dt.getFullYear(),dt.getMonth(),0);
    }
   var year = dt.getFullYear();
   var month = dt.getMonth()+1;
   var reMonth = year+"-" + (month < 10 ? "0"+month : month);
   return reMonth;
} 

//计算环比
function huanbi(preMonth, curMonth){
	var huanbi = 0;
	var img = '';
	var reObj = {};
	var preVolume = parseInt(preMonth);
	if(preVolume == 0){
		
		huanbi = 100;
		img = '<img src="'+global.path+'/assets/img/up_arrow_new.gif">';
		
	}else{
		var diff = (parseInt(curMonth) - preVolume);
		
		if(diff > 0){
			img = '<img src="'+global.path+'/assets/img/up_arrow_new.gif">';
		}else if(diff < 0){
			img = '<img src="'+global.path+'/assets/img/down_arrow_new.gif">';
		}
		
		if(diff != 0){
			huanbi = (diff / preVolume * 100).toFixed(2);
		}
	}
	reObj.huanbi = huanbi;
	reObj.img = img;
	return reObj;
}

var dataTableConfig = {};
// 多语言配置
dataTableConfig.language = {
	"processing" : "正在加载中......",
	"loadingRecords" : "正在加载中......",
	"lengthMenu" : "每页显示 _MENU_ 条记录",
	"zeroRecords" : "对不起，查询不到相关数据！",
	"emptyTable" : "该范围内无数据！",// "表中无数据存在！",
	"infoEmpty" : "",
	"info" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
	"infoFiltered" : "数据表中共为 _MAX_ 条记录",
	"search" : "搜索",
	"paginate" : {
		"first" : "首页",
		"previous" : "上一页",
		"next" : "下一页",
		"last" : "末页"
	}
};
// 去掉检索
dataTableConfig.dom = "<'row'<'col-xs-6'l>>t<'row'<'col-xs-6'i><'col-xs-6'p>>";

//渲染宝贝的广告图片	
function renderGoodsAd(toLink, path, full, onlyDisplay){
	var html = '';
	if(full.hot > 0){
		
		if(full.hot > 99){
			full.hot = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="热门钻展" title="热门钻展" src="'+ path+ '/assets/imagesLocal/hot.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=1">'
				+'<img alt="热门钻展" title="热门钻展" src="'+ path+ '/assets/imagesLocal/hot.png">'
				+'<b class="color-taobaoke-'+full.hot+'"></b>'
				+'</a>'
				+'</i>';
		}
	}
	if(full.normal > 0){
		
		if(full.normal > 99){
			full.normal = 99;
		}
		if(onlyDisplay){
			html += '<img alt="普通钻展" title="普通钻展" src="'+ path+ '/assets/imagesLocal/normal.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=2">'
				+'<img alt="普通钻展" title="普通钻展" src="'+ path+ '/assets/imagesLocal/normal.png">'
				+'<b class="color-taobaoke-'+full.normal+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.tb_cu > 0){

		if(full.tb_cu > 99){
			full.tb_cu = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="'+ path+ '/assets/imagesLocal/tbpromo.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=3">'
				+'<img alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="'+ path+ '/assets/imagesLocal/tbpromo.png">'
				+'<b class="color-taobaoke-'+full.tb_cu+'"></b>'
				+'</a>'
				+'</i>';
		}
		
		
	}
	if(full.activity > 0){

		if(full.activity > 99){
			full.activity = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="'+ path+ '/assets/imagesLocal/activity.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=4">'
				+'<img alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="'+ path+ '/assets/imagesLocal/activity.png">'
				+'<b class="color-taobaoke-'+full.activity+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.taobaoke > 0){

		if(full.taobaoke > 99){
			full.taobaoke = 99;
		}
		
		if(onlyDisplay){
			html += '<img class="" alt="淘宝客" title="淘宝客" src="'+ path+ '/assets/imagesLocal/taobaoke.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=5">'
				+'<img class="" alt="淘宝客" title="淘宝客" src="'+ path+ '/assets/imagesLocal/taobaoke.png">'
				+'<b class="color-taobaoke-'+full.taobaoke+'"></b>'
				+'</a>'
				+'</i>';
		}
		
		
	}
	if(full.ztc > 0){
		
		if(full.ztc > 99){
			full.ztc = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="直通车" title="直通车" src="'+ path+ '/assets/imagesLocal/zhitongche.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=6">'
				+'<img alt="直通车" title="直通车" src="'+ path+ '/assets/imagesLocal/zhitongche.png">'
				+'<b class="color-taobaoke-'+full.ztc+'"></b>'
				+'</a>'
				+'</i>';
		}
		
		
	}
	if(full.ju > 0){
		
		if(full.ju > 99){
			full.ju = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="聚划算" title="聚划算" src="'+ path+ '/assets/imagesLocal/juhuasuan.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=7">'
				+'<img alt="聚划算" title="聚划算" src="'+ path+ '/assets/imagesLocal/juhuasuan.png">'
				+'<b class="color-taobaoke-'+full.ju+'"></b>'
				+'</a>'
				+'</i>';
		}
		
		
	}
	if(full.normal_cu > 0){

		if(full.normal_cu > 99){
			full.normal_cu = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="商品促销" title="商品促销" src="'+ path+ '/assets/imagesLocal/promo.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=8">'
				+'<img alt="商品促销" title="商品促销" src="'+ path+ '/assets/imagesLocal/promo.png">'
				+'<b class="color-taobaoke-'+full.normal_cu+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.hot_mobile > 0){

		if(full.hot_mobile > 99){
			full.hot_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机热门钻展" title="手机热门钻展" src="'+ path+ '/assets/imagesLocal/hot_mobile.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=11">'
				+'<img alt="手机热门钻展" title="手机热门钻展" src="'+ path+ '/assets/imagesLocal/hot_mobile.png">'
				+'<b class="color-taobaoke-'+full.hot_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.tb_cu_mobile > 0){

		if(full.tb_cu_mobile > 99){
			full.tb_cu_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="'+ path+ '/assets/imagesLocal/tbpromo_mobile.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=13">'
				+'<img alt="手机淘宝促销（瞄一眼）" title="手机淘宝促销（瞄一眼）" src="'+ path+ '/assets/imagesLocal/tbpromo_mobile.png">'
				+'<b class="color-taobaoke-'+full.tb_cu_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.activity_mobile > 0){

		if(full.activity_mobile > 99){
			full.activity_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机淘宝活动" title="手机淘宝活动" src="'+ path+ '/assets/imagesLocal/activity_mobile.png">';
		}else{

			html += '<i class="ads_icon">'
			+'<a href="'+toLink+'&ad=12">'
			+'<img alt="手机淘宝活动" title="手机淘宝活动" src="'+ path+ '/assets/imagesLocal/activity_mobile.png">'
			+'<b class="color-taobaoke-'+full.activity_mobile+'"></b>'
			+'</a>'
			+'</i>';
		}
		
		
	}
	if(full.ztc_mobile > 0){

		if(full.ztc_mobile > 99){
			full.ztc_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机直通车" title="手机直通车" src="'+ path+ '/assets/imagesLocal/zhitongche_mobile.png">';
		}else{

			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=14">'
				+'<img alt="手机直通车" title="手机直通车" src="'+ path+ '/assets/imagesLocal/zhitongche_mobile.png">'
				+'<b class="color-taobaoke-'+full.ztc_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
		
	}
	if(full.normal_cu_mobile > 0){

		if(full.normal_cu_mobile > 99){
			full.normal_cu_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机促销" title="手机促销" src="'+ path+ '/assets/imagesLocal/promo_mobile.png">';
		}else{

			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=10">'
				+'<img alt="手机促销" title="手机促销" src="'+ path+ '/assets/imagesLocal/promo_mobile.png">'
				+'<b class="color-taobaoke-'+full.normal_cu_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	
	return html;
}	

//渲染店铺的广告图片	
function renderShopAd(toLink, path, full, onlyDisplay){
	var html = '';
	if(full.shop_hot > 0){
		
		if(full.shop_hot > 99){
			full.shop_hot = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="热门钻展" title="热门钻展" src="'+ path+ '/assets/imagesLocal/hot.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=hot">'
				+'<img alt="热门钻展" title="热门钻展" src="'+ path+ '/assets/imagesLocal/hot.png">'
				+'<b class="color-taobaoke-'+full.shop_hot+'"></b>'
				+'</a>'
				+'</i>';
		}
	}
	if(full.shop_normal > 0){
		
		if(full.shop_normal > 99){
			full.shop_normal = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="普通钻展" title="普通钻展" src="'+ path+ '/assets/imagesLocal/normal.png">';
		}else{
			html += '<i class="ads_icon">'
			+'<a href="'+toLink+'&ad=normal">'
			+'<img alt="普通钻展" title="普通钻展" src="'+ path+ '/assets/imagesLocal/normal.png">'
			+'<b class="color-taobaoke-'+full.shop_normal+'"></b>'
			+'</a>'
			+'</i>';
		}
	}
	/*if(full.shop_tb_cu > 0){

		if(full.shop_tb_cu > 99){
			full.shop_tb_cu = 99;
		}
		
		html += '<i class="ads_icon">'
		+'<a href="'+toLink+'&ad=tb_cu">'
		+'<img alt="淘宝促销（天天特价、淘金币、付邮试用等）" title="淘宝促销（天天特价、淘金币、付邮试用等）" src="'+ path+ '/assets/imagesLocal/tbpromo.png">'
		+'<b class="color-taobaoke-'+full.shop_tb_cu+'"></b>'
		+'</a>'
		+'</i>';
	}*/
	if(full.shop_activity > 0){

		if(full.shop_activity > 99){
			full.shop_activity = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="'+ path+ '/assets/imagesLocal/activity.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=activity">'
				+'<img alt="淘宝活动（类似双11、双12、原超级卖霸等）" title="淘宝活动（类似双11、双12、原超级卖霸等）" src="'+ path+ '/assets/imagesLocal/activity.png">'
				+'<b class="color-taobaoke-'+full.shop_activity+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.shop_taobaoke > 0){

		if(full.shop_taobaoke > 99){
			full.shop_taobaoke = 99;
		}
		
		if(onlyDisplay){
			html += '<img class="" alt="淘宝客" title="淘宝客" src="'+ path+ '/assets/imagesLocal/taobaoke.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=taobaoke">'
				+'<img class="" alt="淘宝客" title="淘宝客" src="'+ path+ '/assets/imagesLocal/taobaoke.png">'
				+'<b class="color-taobaoke-'+full.shop_taobaoke+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.shop_ztc > 0){
		
		if(full.shop_ztc > 99){
			full.shop_ztc = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="直通车" title="直通车" src="'+ path+ '/assets/imagesLocal/zhitongche.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=ztc">'
				+'<img alt="直通车" title="直通车" src="'+ path+ '/assets/imagesLocal/zhitongche.png">'
				+'<b class="color-taobaoke-'+full.shop_ztc+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.shop_hot_mobile > 0){

		if(full.shop_hot_mobile > 99){
			full.shop_hot_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机热门钻展" title="手机热门钻展" src="'+ path+ '/assets/imagesLocal/hot_mobile.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=hot_mobile">'
				+'<img alt="手机热门钻展" title="手机热门钻展" src="'+ path+ '/assets/imagesLocal/hot_mobile.png">'
				+'<b class="color-taobaoke-'+full.shop_hot_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	if(full.shop_activity_mobile > 0){

		if(full.shop_activity_mobile > 99){
			full.shop_activity_mobile = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="手机淘宝活动" title="手机淘宝活动" src="'+ path+ '/assets/imagesLocal/activity_mobile.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=activity_mobile">'
				+'<img alt="手机淘宝活动" title="手机淘宝活动" src="'+ path+ '/assets/imagesLocal/activity_mobile.png">'
				+'<b class="color-taobaoke-'+full.shop_activity_mobile+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	
	if(full.shop_sale > 0){

		if(full.shop_sale > 99){
			full.shop_sale = 99;
		}
		
		if(onlyDisplay){
			html += '<img alt="搭配减价" title="搭配减价" src="'+ path+ '/assets/imagesLocal/meal.png">';
		}else{
			html += '<i class="ads_icon">'
				+'<a href="'+toLink+'&ad=sale">'
				+'<img alt="搭配减价" title="搭配减价" src="'+ path+ '/assets/imagesLocal/meal.png">'
				+'<b class="color-taobaoke-'+full.shop_sale+'"></b>'
				+'</a>'
				+'</i>';
		}
		
	}
	
	return html;
}	
	

function loadDataTable(config) {
	var maxIndex = config.maxIndex;
	if (maxIndex) {

		var targets = [];
		for(var i = 0; i <= maxIndex; i++){
			targets.push(i);
		}
		
		config.columnDefs = [{
			className: 'datatables-header-center',//标题居中
			targets: targets
		},{
			fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {//内容居左
	            $(nTd).css('text-align', 'left').css('vertical-align', 'inherit');
		    },
		    targets: targets
		}];
		
		var table = $('#' + config.tableId).dataTable({
			paging : config.paging || false,
			destroy : config.destroy || false,
			autoWidth : false,
			processing : true,
			serverSide: true,
			language : dataTableConfig.language,
			dom : dataTableConfig.dom,
			columns : config.columns,
			columnDefs : config.columnDefs,
			footerCallback : config.footerCallback,
			order: config.order,
			ajax : {
				url : config.url,
				type : config.type || 'GET',
				data : config.data
			},
			serverSide : true,
			initComplete: config.initComplete
		});
		
		return table;

	}
	
	return null;

}


//获取子类目，主营类目的sId默认为0
function loadSelectCat(sId, path) {

	if (sId == '0') {
		// 清空子类目
		$('#s0').nextAll("select").remove();
	}

	var parentNo = $('#s' + sId).val();

	var hasChild = $('#s' + sId + " option:selected").attr("data-hasChild");

	$('#s' + sId).nextAll("select").remove();
	if (hasChild == '1') {
		$.get(path + '/a/MarketAnalysis', {
			'parentNo' : parentNo,
			'm' : 'add_cat'
		}, function(data) {

			if (data && data.length > 0) {

				var html = '<select id="s' + parentNo
						+ '" name="cat"  onchange="addCat(' + parentNo + ');">'
						+ '<option value="">请选择</option>';

				$.each(data, function(idx, d) {
					html += '<option value="' + d.catNo + '" data-hasChild="'
							+ d.hasChild + '" data-category="'+d.category+'">' + d.catName + '</option>';
				});
				html += '</select>';
				$('#cat-append').append(html);
			}
		}, 'json');
	}
}

//============================封装echarts组件=================================
var EC_READY = false;
var chart = null;

//加载Echarts组件
function loadEcharts(ecfn){
	require.config({
        paths: {
            echarts: global.path+'/assets/js/echarts/source'
        }
    });
	// 按需加载
    require(
        [
            'echarts',//加载echarts.js
            'echarts/chart/line',// 加载line.js
            'echarts/chart/bar',
            'echarts/chart/pie',
            'echarts/chart/map'
        ],ecfn
    );
}

//渲染图表
function renderChart(option, chartId){
	
	var chart = null;
	
	if(EC_READY){
		
		var ec = require('echarts');
		
		// 基于准备好的dom，初始化echarts图表
    	chart = ec.init(document.getElementById(chartId));
    	chart.setOption(option);
		
	}else{
		
		var ecfn = function (ec) {
		    
			EC_READY = true;
			
			// 基于准备好的dom，初始化echarts图表
			chart = ec.init(document.getElementById(chartId));
			chart.setOption(option);
		};
		loadEcharts(ecfn);
	}
	return chart;
}

var resizeTicket = null;
window.onload = function () {
    window.onresize = function () {
        clearTimeout(resizeTicket);
        resizeTicket = setTimeout(function (){
        	if(chart){
        		chart.resize();
        	}
        },200);
    };
};
