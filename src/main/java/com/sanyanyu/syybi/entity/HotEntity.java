package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 热词列表Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月13日 下午6:21:44
 * @version V1.0
 */
public class HotEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String seq;
	private String key;
	private String rise;
	private String cat_name;
	private String cat_path;
	private String att_date;
	private String id;

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getRise() {
		return rise;
	}

	public void setRise(String rise) {
		this.rise = rise;
	}

	public String getCat_name() {
		return cat_name;
	}

	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
	}

	public String getCat_path() {
		return cat_path;
	}

	public void setCat_path(String cat_path) {
		this.cat_path = cat_path;
	}

	public String getAtt_date() {
		return att_date;
	}

	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

}
