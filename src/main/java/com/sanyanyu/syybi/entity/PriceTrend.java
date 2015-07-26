package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 价格走势Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月19日 下午5:54:21
 * @version V1.0
 */
public class PriceTrend implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String tran_date;
	private String avg_price;// 标价
	private String avg_price_tran;// 成交均价
	private String sales_volume;// 销量

	public String getTran_date() {
		return tran_date;
	}

	public void setTran_date(String tran_date) {
		this.tran_date = tran_date;
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

	public String getSales_volume() {
		return sales_volume;
	}

	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}

}
