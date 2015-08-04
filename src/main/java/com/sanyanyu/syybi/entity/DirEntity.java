package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 目录一览Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月4日 下午4:19:03 
 * @version V1.0
 */
public class DirEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String dir_name;
	private String adid;
	private String item_count;
	private String avg_price;
	private String avg_price_tran;
	private String avg_price_tran_pre;
	private String sales_volume;
	private String sales_volume_pre;
	private String sales_amount_pre;

	public String getDir_name() {
		return dir_name;
	}

	public void setDir_name(String dir_name) {
		this.dir_name = dir_name;
	}

	public String getAdid() {
		return adid;
	}

	public void setAdid(String adid) {
		this.adid = adid;
	}

	public String getItem_count() {
		return item_count;
	}

	public void setItem_count(String item_count) {
		this.item_count = item_count;
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

	public String getAvg_price_tran_pre() {
		return avg_price_tran_pre;
	}

	public void setAvg_price_tran_pre(String avg_price_tran_pre) {
		this.avg_price_tran_pre = avg_price_tran_pre;
	}

	public String getSales_volume() {
		return sales_volume;
	}

	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
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

}
