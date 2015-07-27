package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 上架跟踪Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月17日 下午3:34:45
 * @version V1.0
 */
public class ChngAdd implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String caid;
	private String prd_name;
	private String category;
	private String price;
	private String prd_img;
	private String prd_url;
	private String change_date;
	private String item_id;

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getCaid() {
		return caid;
	}

	public void setCaid(String caid) {
		this.caid = caid;
	}

	public String getPrd_name() {
		return prd_name;
	}

	public void setPrd_name(String prd_name) {
		this.prd_name = prd_name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPrd_img() {
		return prd_img;
	}

	public void setPrd_img(String prd_img) {
		this.prd_img = prd_img;
	}

	public String getPrd_url() {
		if(StringUtils.isNotBlank(this.getItem_id())){
			return SysUtil.getPrdUrl(this.getItem_id());
		}
		return prd_url;
	}

	public void setPrd_url(String prd_url) {
		this.prd_url = prd_url;
	}

	public String getChange_date() {
		return change_date;
	}

	public void setChange_date(String change_date) {
		this.change_date = change_date;
	}

}
