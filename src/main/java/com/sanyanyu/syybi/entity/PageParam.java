package com.sanyanyu.syybi.entity;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.servlet.DiamondAnalysisServlet;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 页面请求参数Entity
 * 
 * @Description: dataTables http请求的相关参数，封装后交给serivice调用
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月26日 下午9:05:45 
 * @version V1.0
 */
public class PageParam implements Serializable {

	private static Logger logger = LoggerFactory.getLogger(PageParam.class);
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long draw;//请求次数
	private int start;//数据的起始位置
	private long length;//数据长度
	private int orderIndex = 0;//需要排序的列的索引，默认第一列
	private String orderDir = "asc";//排序的方式，默认从小到大
	private String orderColumn;//排序的列名
	private String searchValue;//检索的字符
	private String[] sArr;//检索的字段名，不需要的用null代替
	private String[] oArr;//排序字段
	private String searchSql;//检索的sql部分
	private String defaultOrderColumn;//默认排序的类
	private String oTag = "t";
	private boolean orderEnabled = true;
	
	private long totalRecords = -1;//-1表示不分页
	
	public long getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(long totalRecords) {
		this.totalRecords = totalRecords;
	}
	public boolean isOrderEnabled() {
		return orderEnabled;
	}
	public void setOrderEnabled(boolean orderEnabled) {
		this.orderEnabled = orderEnabled;
	}
	public String getoTag() {
		return oTag;
	}
	public void setoTag(String oTag) {
		this.oTag = oTag;
	}
	public String getDefaultOrderColumn() {
		return defaultOrderColumn;
	}
	public void setDefaultOrderColumn(String defaultOrderColumn) {
		this.defaultOrderColumn = defaultOrderColumn;
	}
	public long getDraw() {
		return draw;
	}
	public void setDraw(long draw) {
		this.draw = draw;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public long getLength() {
		return length;
	}
	public void setLength(long length) {
		this.length = length;
	}
	public int getOrderIndex() {
		return orderIndex;
	}
	public void setOrderIndex(int orderIndex) {
		this.orderIndex = orderIndex;
	}
	public String getOrderDir() {
		return orderDir == null ? "asc" : orderDir;
	}
	public void setOrderDir(String orderDir) {
		this.orderDir = orderDir;
	}
	public String getSearchValue() {
		return searchValue;
	}
	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}
	public String[] getsArr() {
		return sArr;
	}
	public void setsArr(String[] sArr) {
		this.sArr = sArr;
	}
	public String[] getoArr() {
		return oArr;
	}
	public void setoArr(String[] oArr) {
		this.oArr = oArr;
	}
	public String getOrderColumn() {
		return orderColumn;
	}
	public void setOrderColumn(String orderColumn) {
		this.orderColumn = orderColumn;
	}
	
	public String getSearchSql() {
		return searchSql;
	}
	public void setSearchSql(String searchSql) {
		this.searchSql = searchSql;
	}
	public static PageParam getPageParam(HttpServletRequest request, Class<?> cls) throws Exception{
		//请求次数
		long draw = StringUtils.toLong(request.getParameter("draw"));
		//数据的起始位置
		int start = StringUtils.toInteger(request.getParameter("start"));
		//数据的长度
		int length = StringUtils.toInteger(request.getParameter("length"));
		//排序列的索引
		int orderIndex = StringUtils.toInteger(request.getParameter("order[0][column]"));
		//排序方式
		String orderDir = request.getParameter("order[0][dir]");
		//检索的字符
		String searchValue = "";
		try {
			String sValue = request.getParameter("search[value]");
			if(StringUtils.isNotBlank(sValue)){
				searchValue = new String(URLDecoder.decode(sValue, "utf-8"));//支持中文检索
			}
		} catch (UnsupportedEncodingException e) {
			logger.error("参数search[value]转码失败", e);
		}
		
		Method[] methods = cls.getDeclaredMethods();
		//获取所有方法上的注解
		List<Column> cmList = new ArrayList<Column>();
		for(Method method : methods){
			Column cm = method.getAnnotation(Column.class);
			if(cm != null){
				cmList.add(cm);
			}
		}
		
		//排序
		Collections.sort(cmList, new Comparator<Column>() {
			public int compare(Column o1, Column o2) {
				return new Integer(o1.sort()).compareTo(new Integer(o2.sort()));
			}
		});
		
		String[] oArr = new String[cmList.size()];
		String[] sArr = new String[cmList.size()];
		//封装到soArr数组中
		for(int i = 0; i < cmList.size(); i++){
			if(cmList.get(i).so()){
				sArr[i] = cmList.get(i).name();
			}else{
				sArr[i] = null;
			}
			
			if(cmList.get(i).or()){
				oArr[i] = cmList.get(i).orderbyTag() +"."+ cmList.get(i).name();
			}else{
				oArr[i] = null;
			}
		}
		
		//检索的sql部分
		StringBuffer searchSql = new StringBuffer();
		if(StringUtils.isNotBlank(searchValue)){
			for(int i = 0; i < sArr.length; i++){
				String column = sArr[i];
				if(column != null){
					searchSql.append(" ").append(column).append(" like '%").append(searchValue).append("%'").append(" or");
				}
			}
			if(searchSql.length() > 0){
				searchSql.setLength(searchSql.length() - 2);//去掉or
			}
		}
		
		PageParam pageParam = new PageParam();
		pageParam.setDraw(draw);
		pageParam.setStart(start);
		pageParam.setLength(length);
		pageParam.setOrderIndex(orderIndex);
		pageParam.setOrderDir(orderDir);
		pageParam.setSearchValue(searchValue);
		pageParam.setsArr(sArr);
		pageParam.setoArr(oArr);
		pageParam.setOrderColumn(oArr[orderIndex]);
		pageParam.setSearchSql(searchSql.toString());
		
		return pageParam;
	}
	
	public static PageParam getPageParam(HttpServletRequest request) throws Exception{
		
		//最大列的索引
		int maxIndex = StringUtils.toInteger(request.getParameter("maxIndex"));
		List<String> oArr = new ArrayList<String>();
		List<String> oTagArr = new ArrayList<String>();
		for(int i = 0; i <= maxIndex; i++){
			String orderable = request.getParameter("columns["+i+"][orderable]");
			if(StringUtils.isNotBlank(orderable) && Boolean.valueOf(orderable)){
				oArr.add(request.getParameter("columns["+i+"][data]"));
				oTagArr.add(request.getParameter("columns["+i+"][name]"));
			}else{//用空值填充，起占位的作用
				oArr.add(null);
				oTagArr.add(null);
			}
		}
		
		//请求次数
		long draw = StringUtils.toLong(request.getParameter("draw"));
		//数据的起始位置
		int start = StringUtils.toInteger(request.getParameter("start"));
		//数据的长度
		int length = StringUtils.toInteger(request.getParameter("length"));
		//排序列的索引
		int orderIndex = StringUtils.toInteger(request.getParameter("order[0][column]"));
		//排序方式
		String orderDir = request.getParameter("order[0][dir]");
		//检索的字符
		String searchValue = "";
		try {
			String sValue = request.getParameter("search[value]");
			if(StringUtils.isNotBlank(sValue)){
				searchValue = new String(URLDecoder.decode(sValue, "utf-8"));//支持中文检索
			}
		} catch (UnsupportedEncodingException e) {
			logger.error("参数search[value]转码失败", e);
		}
		
		PageParam pageParam = new PageParam();
		pageParam.setDraw(draw);
		pageParam.setStart(start);
		pageParam.setLength(length);
		pageParam.setOrderIndex(orderIndex);
		pageParam.setOrderDir(orderDir);
		pageParam.setSearchValue(searchValue);
		
		String[] str = {};
		pageParam.setoArr(oArr.toArray(str));
		pageParam.setOrderColumn(pageParam.getoArr()[orderIndex]);
		pageParam.setoTag(oTagArr.toArray(str)[orderIndex]);
		
		return pageParam;
	}
	
	/**
	 * 构建sql，增加排序功能
	 * @param sql
	 * @return
	 */
	public String buildSql(String sql){
		
		StringBuffer sb = new StringBuffer(sql);
		
		//排序
		String orderColumn = this.getOrderColumn();
		if(StringUtils.isNotBlank(orderColumn)){
			
			if(StringUtils.isNotBlank(this.getoTag())){
				sb.append(" order by ").append(this.getoTag()).append(".").append(orderColumn.indexOf("_pre") > -1 ? orderColumn.replace("_pre", "") : orderColumn);
			}else{
				sb.append(" order by ").append(orderColumn);
			}
			
			sb.append(" ").append(this.getOrderDir());
		}
		
		//分页
		if(this.getLength() != -1 && this.getLength() != 0){
			sb.append(" limit ").append(this.getStart()).append(",").append(this.getLength());
		}
		
		return sb.toString();
	}
	
	
}
