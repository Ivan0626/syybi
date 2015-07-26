package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 行业规模的月报表
 * 
 * @Description: 按类目展示
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月23日 下午6:07:34
 * @version V1.0
 */
public class CatData implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String cat_no;
	private String cat_name;
	private String sales_amount;// 销售额
	private String sales_volume;// 销量
	private String tran_count;// 成交次数

	private String amountWeight;// 销售额占比
	private String volumeWeight;// 销量占比
	private String countWeight;// 成交次数占比

	public String getCat_no() {
		return cat_no;
	}

	public void setCat_no(String cat_no) {
		this.cat_no = cat_no;
	}

	public String getCat_name() {
		return cat_name;
	}

	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
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

	public String getAmountWeight() {
		return amountWeight;
	}

	public void setAmountWeight(String amountWeight) {
		this.amountWeight = amountWeight;
	}

	public String getVolumeWeight() {
		return volumeWeight;
	}

	public void setVolumeWeight(String volumeWeight) {
		this.volumeWeight = volumeWeight;
	}

	public String getCountWeight() {
		return countWeight;
	}

	public void setCountWeight(String countWeight) {
		this.countWeight = countWeight;
	}

}
