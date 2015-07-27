package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 热销店铺
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月27日 上午11:40:03 
 * @version V1.0
 */
public class HotShop implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int rowNum;
	private String shop_name;
	private String shop_img;
	private String region;
	private String sales_volume;
	private String sales_amount;
	private String tran_count;
	private String shop_id;
	private String shop_url;
	private String shop_type;
	
	public String getShop_type() {
		return shop_type;
	}
	public void setShop_type(String shop_type) {
		this.shop_type = shop_type;
	}
	public int getRowNum() {
		return rowNum;
	}
	public void setRowNum(int rowNum) {
		this.rowNum = rowNum;
	}
	public String getShop_name() {
		return shop_name;
	}
	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}
	public String getShop_img() {
		return shop_img;
	}
	public void setShop_img(String shop_img) {
		this.shop_img = shop_img;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getSales_volume() {
		return sales_volume;
	}
	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}
	public String getSales_amount() {
		return sales_amount;
	}
	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}
	public String getTran_count() {
		return tran_count;
	}
	public void setTran_count(String tran_count) {
		this.tran_count = tran_count;
	}
	public String getShop_id() {
		return shop_id;
	}
	public void setShop_id(String shop_id) {
		this.shop_id = shop_id;
	}
	public String getShop_url() {
		if(StringUtils.isNotBlank(this.getShop_id())){
			return SysUtil.getShopUrl(this.getShop_id());
		}
		return shop_url;
	}
	public void setShop_url(String shop_url) {
		this.shop_url = shop_url;
	}
	
	
	
}
