package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.utils.DateUtils;

/**
 * 热词关注Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月13日 下午4:43:49
 * @version V1.0
 */
public class AttnHot implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String uid;
	private String key_id;
	private String att_date = DateUtils.getDate();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getKey_id() {
		return key_id;
	}

	public void setKey_id(String key_id) {
		this.key_id = key_id;
	}

	public String getAtt_date() {
		return att_date;
	}

	public void setAtt_date(String att_date) {
		this.att_date = att_date;
	}

}
