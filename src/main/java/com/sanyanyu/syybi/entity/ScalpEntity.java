package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import org.apache.commons.lang3.StringUtils;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 刷单分析的店铺列表
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月28日 下午5:34:21 
 * @version V1.0
 */
public class ScalpEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String shop_id;
	private String shop_name;
	private String shop_type;
	private String rise_index;
	private String sales_amount;
	private String sales_volume;
	private String tran_count;
	private String tran_date;
	private String item_count;
	private String shua_amount;
	private String shua_volume;
	private String shua_count;
	private String shop_url;
	
	private String rule;
	private String precision;
	
	/**店铺分析使用**/
	private String tag;
	private String region;
	private String sales_volume_pre;
	private String sales_amount_pre;
	private String att_date;
	
	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
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

	public String getAtt_date() {
		return att_date;
	}

	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}

	public String getRule() {
		return rule;
	}

	public void setRule(String rule) {
		this.rule = rule;
	}

	public String getPrecision() {
		return precision + "%";
	}

	public void setPrecision(String precision) {
		this.precision = precision;
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

	public String getTran_date() {
		return tran_date;
	}

	public void setTran_date(String tran_date) {
		this.tran_date = tran_date;
	}

	public String getShop_id() {
		return shop_id;
	}

	public void setShop_id(String shop_id) {
		this.shop_id = shop_id;
	}

	public String getShop_name() {
		return shop_name;
	}

	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}

	public String getShop_type() {
		return shop_type;
	}

	public void setShop_type(String shop_type) {
		this.shop_type = shop_type;
	}

	public String getRise_index() {
		return rise_index;
	}

	public void setRise_index(String rise_index) {
		this.rise_index = rise_index;
	}

	public String getSales_amount() {
		return sales_amount;
	}

	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}

	public String getItem_count() {
		return item_count;
	}

	public void setItem_count(String item_count) {
		this.item_count = item_count;
	}

	public String getShua_amount() {
		return shua_amount;
	}

	public void setShua_amount(String shua_amount) {
		this.shua_amount = shua_amount;
	}

	public String getShua_volume() {
		return shua_volume;
	}

	public void setShua_volume(String shua_volume) {
		this.shua_volume = shua_volume;
	}

	public String getShua_count() {
		return shua_count;
	}

	public void setShua_count(String shua_count) {
		this.shua_count = shua_count;
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
