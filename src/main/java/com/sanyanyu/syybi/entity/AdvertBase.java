package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 宝贝广告-基础类
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月12日 上午11:30:58 
 * @version V1.0
 */
public class AdvertBase implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String tran_date;// 时间
	private String sales_amount;// 销售额
	private String sales_volume;// 销量
	private String tran_count;// 成交次数
	
	private String prd_name;
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
	public String getPrd_img() {
		return prd_img;
	}
	public void setPrd_img(String prd_img) {
		this.prd_img = prd_img;
	}
	public String getPrd_url() {
		String prdUrl = SysUtil.getValue("product.url");
		
		return prdUrl + this.getItem_id();
	}
	public void setPrd_url(String prd_url) {
		this.prd_url = prd_url;
	}
	public String getTran_date() {
		return tran_date;
	}
	public void setTran_date(String tran_date) {
		this.tran_date = tran_date;
	}
	public String getSales_amount() {
		return sales_amount;
	}
	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}
	public String getSales_volume() {
		return sales_volume;
	}
	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}
	public String getTran_count() {
		return tran_count;
	}
	public void setTran_count(String tran_count) {
		this.tran_count = tran_count;
	}
	
	
	
}
