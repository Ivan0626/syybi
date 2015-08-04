package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;
import com.sanyanyu.syybi.utils.DateUtils;

@Table(name="tbweb.tb_attn_dir_detail")
public class AttDirDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String addid;
	private String adid;
	private String item_id;
	private String shop_id;
	private String att_date = DateUtils.getDate();
	
	@Column(name="addid")
	public String getAddid() {
		return addid;
	}
	public void setAddid(String addid) {
		this.addid = addid;
	}
	
	@Column(name="adid")
	public String getAdid() {
		return adid;
	}
	public void setAdid(String adid) {
		this.adid = adid;
	}
	
	@Column(name="item_id")
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}
	
	@Column(name="shop_id")
	public String getShop_id() {
		return shop_id;
	}
	public void setShop_id(String shop_id) {
		this.shop_id = shop_id;
	}
	
	@Column(name="att_date")
	public String getAtt_date() {
		return att_date;
	}
	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}
	
	
	
}
