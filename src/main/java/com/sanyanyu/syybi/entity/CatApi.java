package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 淘宝后台类目Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月7日 下午4:22:32 
 * @version V1.0
 */
public class CatApi implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String catNo;
	private String catName;
	private String hasChild;//有没有子类，1表示有，0表示无
	
	private String category;//检索类目，供查询用
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getHasChild() {
		return hasChild;
	}
	public void setHasChild(String hasChild) {
		this.hasChild = hasChild;
	}
	public String getCatNo() {
		return catNo;
	}
	public void setCatNo(String catNo) {
		this.catNo = catNo;
	}
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	
	
}
