package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 改名跟踪Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月14日 下午12:27:07
 * @version V1.0
 */
public class ChngName implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String prd_img;
	private String prd_name_new;
	private String cnid;
	private String category;
	private String prd_name_old;
	private String price;
	private String change_date;
	
	private String item_id;
	
	private String prd_url;

	public String getPrd_url() {
		return SysUtil.getPrdUrl(this.getItem_id());
	}

	public void setPrd_url(String prd_url) {
		this.prd_url = prd_url;
	}

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getPrd_img() {
		return prd_img;
	}

	public void setPrd_img(String prd_img) {
		this.prd_img = prd_img;
	}

	public String getPrd_name_new() {
		return prd_name_new;
	}

	public void setPrd_name_new(String prd_name_new) {
		this.prd_name_new = prd_name_new;
	}

	public String getCnid() {
		return cnid;
	}

	public void setCnid(String cnid) {
		this.cnid = cnid;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPrd_name_old() {
		return prd_name_old;
	}

	public void setPrd_name_old(String prd_name_old) {
		this.prd_name_old = prd_name_old;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getChange_date() {
		return change_date;
	}

	public void setChange_date(String change_date) {
		this.change_date = change_date;
	}

}
