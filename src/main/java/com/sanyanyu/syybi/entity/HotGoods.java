package com.sanyanyu.syybi.entity;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 热销宝贝Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月26日 下午4:37:41 
 * @version V1.0
 */
public class HotGoods extends AdvertBase {
    
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String avg_price;
	private String avg_price_tran;
	private String shop_name;
	private String shop_id;
	private String region;
	private String item_id;
	private String shop_url;
	
	private String shop_type;
	
	private int rowNum;
	
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
	public String getShop_url() {
		return SysUtil.getShopUrl(this.getShop_id());
	}
	public void setShop_url(String shop_url) {
		this.shop_url = shop_url;
	}
	public String getAvg_price() {
		return avg_price;
	}
	public void setAvg_price(String avg_price) {
		this.avg_price = avg_price;
	}

	public String getAvg_price_tran() {
		return avg_price_tran;
	}
	public void setAvg_price_tran(String avg_price_tran) {
		this.avg_price_tran = avg_price_tran;
	}
	public String getShop_name() {
		return shop_name;
	}
	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}
	public String getShop_id() {
		return shop_id;
	}
	public void setShop_id(String shop_id) {
		this.shop_id = shop_id;
	}
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}
	
}
