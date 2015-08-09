package com.sanyanyu.syybi.entity;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 分页参数Entity
 * 
 * @Description: dataTables ajax请求时后台返回的json对象
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月26日 下午6:26:59
 * @version V1.0
 */
public class PageEntity<T> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<T> data;// 结果集
	private long recordsTotal;// 总记录数
	private long recordsFiltered = 0;// 符合查询条件的总记录数
	private long draw;// 请求次数
	
	private List<Map<String, Object>> extList;//扩展属性

	public List<Map<String, Object>> getExtList() {
		return extList;
	}

	public void setExtList(List<Map<String, Object>> extList) {
		this.extList = extList;
	}

	public List<T> getData() {
		return data;
	}

	public void setData(List<T> data) {
		this.data = data;
	}

	public long getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(long recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public long getRecordsFiltered() {
		return recordsFiltered;
	}

	public void setRecordsFiltered(long recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}

	public long getDraw() {
		return draw;
	}

	public void setDraw(long draw) {
		this.draw = draw;
	}

	// 返回dataTables需要的实体对象
	public static <T> PageEntity<T> getPageEntity(PageParam pageParam, List<T> list) {

		PageEntity<T> pageEntity = new PageEntity<T>();

		if(pageParam != null){
			if(pageParam.getLength() != -1 && pageParam.getTotalRecords() == 0){//分页的情况：特殊处理mysql查询为空，结果集却返回一行NULL值 TODO：查找原因
				list = null;
			}
			
			pageEntity.setData(list);
			pageEntity.setDraw(pageParam.getDraw());
			if (pageParam.getLength() == -1 && list != null) {//不分页
				pageEntity.setRecordsFiltered(list.size());
				pageEntity.setRecordsTotal(list.size());
			}else{
				pageEntity.setRecordsFiltered(pageParam.getTotalRecords());
				pageEntity.setRecordsTotal(pageParam.getTotalRecords());
			}

		}else{
			pageEntity.setData(list);
		}
		
		return pageEntity;
		
	}

}
