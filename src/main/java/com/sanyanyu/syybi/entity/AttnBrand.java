package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;
import com.sanyanyu.syybi.utils.DateUtils;

@Table(name="tbweb.tb_attn_brand")
public class AttnBrand implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String addid;
	private String uid;
	private String brand_name;
	private String att_date = DateUtils.getDate();
	
	@Column(name="addid")
	public String getAddid() {
		return addid;
	}
	public void setAddid(String addid) {
		this.addid = addid;
	}
	
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	@Column(name="brand_name")
	public String getBrand_name() {
		return brand_name;
	}
	public void setBrand_name(String brand_name) {
		this.brand_name = brand_name;
	}
	
	@Column(name="att_date")
	public String getAtt_date() {
		return att_date;
	}
	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}
	
	
	
}
