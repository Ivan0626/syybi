package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 品牌分析Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月7日 下午9:18:08 
 * @version V1.0
 */
public class BrandList implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String brand_name;
	private String category;
	private String tmall;
	private String tmall_pre;
	private String taobao;
	private String taobao_pre;
	private String att_date;
	private String cat_name;
	
	public String getCat_name() {
		return cat_name;
	}
	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
	}
	public String getBrand_name() {
		return brand_name;
	}
	public void setBrand_name(String brand_name) {
		this.brand_name = brand_name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTmall() {
		return tmall;
	}
	public void setTmall(String tmall) {
		this.tmall = tmall;
	}
	public String getTmall_pre() {
		return tmall_pre;
	}
	public void setTmall_pre(String tmall_pre) {
		this.tmall_pre = tmall_pre;
	}
	public String getTaobao() {
		return taobao;
	}
	public void setTaobao(String taobao) {
		this.taobao = taobao;
	}
	public String getTaobao_pre() {
		return taobao_pre;
	}
	public void setTaobao_pre(String taobao_pre) {
		this.taobao_pre = taobao_pre;
	}
	public String getAtt_date() {
		return att_date;
	}
	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}
	
	
	
}
