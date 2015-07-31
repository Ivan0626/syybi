package com.sanyanyu.syybi.entity;

import org.apache.commons.lang3.StringUtils;

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
	
	/** 以下字段在店铺分析-热销宝贝使用 **/
	private String cat_path;
	private String avg_price_tran_pre;
	private String sales_volume_pre;
	private String sales_amount_pre;
	private String sales_total;
	
	public String getCat_path() {
		return cat_path;
	}
	public void setCat_path(String cat_path) {
		this.cat_path = cat_path;
	}
	public String getAvg_price_tran_pre() {
		return avg_price_tran_pre;
	}
	public void setAvg_price_tran_pre(String avg_price_tran_pre) {
		this.avg_price_tran_pre = avg_price_tran_pre;
	}
	public String getSales_volume_pre() {
		return sales_volume_pre;
	}
	public void setSales_volume_pre(String sales_volume_pre) {
		this.sales_volume_pre = sales_volume_pre;
	}
	public String getSales_amount_pre() {
		return sales_amount_pre;
	}
	public void setSales_amount_pre(String sales_amount_pre) {
		this.sales_amount_pre = sales_amount_pre;
	}
	public String getSales_total() {
		return sales_total;
	}
	public void setSales_total(String sales_total) {
		this.sales_total = sales_total;
	}
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
		if(StringUtils.isNotBlank(this.getShop_id())){
			return SysUtil.getShopUrl(this.getShop_id());
		}
		return shop_url;
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
