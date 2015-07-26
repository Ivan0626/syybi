package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 搭配减价Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月16日 下午5:42:00
 * @version V1.0
 */
public class SaleShop implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String meal_id;
	private String sale_name;
	private String sale_num;
	private String prd_name;
	private String item_id;
	private String price;
	private String sale_price;
	private String sale_price_zk;

	public String getMeal_id() {
		return meal_id;
	}

	public void setMeal_id(String meal_id) {
		this.meal_id = meal_id;
	}

	public String getSale_name() {
		return sale_name;
	}

	public void setSale_name(String sale_name) {
		this.sale_name = sale_name;
	}

	public String getSale_num() {
		return sale_num;
	}

	public void setSale_num(String sale_num) {
		this.sale_num = sale_num;
	}

	public String getPrd_name() {
		return prd_name;
	}

	public void setPrd_name(String prd_name) {
		this.prd_name = prd_name;
	}

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getSale_price() {
		return sale_price;
	}

	public void setSale_price(String sale_price) {
		this.sale_price = sale_price;
	}

	public String getSale_price_zk() {
		return sale_price_zk;
	}

	public void setSale_price_zk(String sale_price_zk) {
		this.sale_price_zk = sale_price_zk;
	}

}
