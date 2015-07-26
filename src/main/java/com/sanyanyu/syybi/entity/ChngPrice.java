package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 调价跟踪Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月14日 下午5:11:48
 * @version V1.0
 */
public class ChngPrice implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String prd_name;
	private String cpid;
	private String category;
	private String price_old;
	private String price_new;
	private String change_date;
	private String prd_img;
	private String prd_url;
	
	private String item_id;

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getPrd_name() {
		return prd_name;
	}

	public void setPrd_name(String prd_name) {
		this.prd_name = prd_name;
	}

	public String getCpid() {
		return cpid;
	}

	public void setCpid(String cpid) {
		this.cpid = cpid;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPrice_old() {
		return price_old;
	}

	public void setPrice_old(String price_old) {
		this.price_old = price_old;
	}

	public String getPrice_new() {
		return price_new;
	}

	public void setPrice_new(String price_new) {
		this.price_new = price_new;
	}

	public String getChange_date() {
		return change_date;
	}

	public void setChange_date(String change_date) {
		this.change_date = change_date;
	}

	public String getPrd_img() {
		return prd_img;
	}

	public void setPrd_img(String prd_img) {
		this.prd_img = prd_img;
	}

	public String getPrd_url() {
		
		return SysUtil.getPrdUrl(this.getItem_id());
	}

	public void setPrd_url(String prd_url) {
		this.prd_url = prd_url;
	}

}
