package com.sanyanyu.syybi.service;

import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.utils.SqlUtil;
import com.sanyanyu.syybi.utils.StringUtils;

public abstract class BaseService {

	SqlUtil sqlUtil;
	
	public BaseService(){
		SqlUtil sqlUtil = new SqlUtil();
		this.sqlUtil = sqlUtil;
	}
	
	protected <T> void pageHandler(PageParam pageParam, PageEntity<T> pageEntity, Class<T> cls, String recordsTotalSql, String listSql, Object... params) {
		
		this.pageHandler(pageParam, pageEntity, cls, recordsTotalSql, listSql, "", params);
	}
	
	protected <T> void pageHandler(PageParam pageParam, PageEntity<T> pageEntity, Class<T> cls, String recordsTotalSql, String listSql, String orderbyTag, Object... params) {
		
		Map<String, Object> recordsTotalMap = sqlUtil.search(recordsTotalSql, params);
		long recordsTotal = StringUtils.toLong(recordsTotalMap.get("recordsTotal"));
		pageEntity.setRecordsTotal(recordsTotal);
		
		//加上过滤条件的总记录数
		if(StringUtils.isNotBlank(pageParam.getSearchSql())){
			String recordsFilteredSql = recordsTotalSql;
			if(params.length > 0){
				recordsFilteredSql += " and " + pageParam.getSearchSql();
			}else{
				recordsFilteredSql += " where " + pageParam.getSearchSql();
			}
			
			Map<String, Object> recordsFilteredMap = sqlUtil.search(recordsFilteredSql, params);
			pageEntity.setRecordsFiltered(StringUtils.toLong(recordsFilteredMap.get("recordsTotal")));
		}else{
			pageEntity.setRecordsFiltered(recordsTotal);
		}
		
		//分页查询结果
		StringBuffer sql = new StringBuffer();
		sql.append(listSql);
		if(StringUtils.isNotBlank(pageParam.getSearchSql())){
			if(params.length > 0){
				sql.append(" and ").append(pageParam.getSearchSql());
			}else{
				sql.append(" where ").append(pageParam.getSearchSql());
			}
		}
		if(pageParam.isOrderEnabled()){
			if(StringUtils.isNotBlank(pageParam.getOrderColumn()) && StringUtils.isNotBlank(pageParam.getOrderDir())){
				sql.append(" order by ").append(orderbyTag).append(pageParam.getOrderColumn()).append(" ").append(pageParam.getOrderDir());
			}else{//默认排序
				sql.append(" order by ").append(orderbyTag).append(pageParam.getDefaultOrderColumn());
			}
		}
		
		if(pageParam.getLength() != -1){
			sql.append(" limit ").append(pageParam.getStart()).append(",").append(pageParam.getLength());
		}
		
		List<T> data = sqlUtil.searchList(cls, sql.toString(), params);
		pageEntity.setData(data);
		
		pageEntity.setDraw(pageParam.getDraw());
	}
	
}
