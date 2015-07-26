package com.sanyanyu.syybi.entity;

import java.sql.Timestamp;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 用户建议
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月30日 下午4:20:40 
 * @version V1.0
 */
@Table(name="bi_base_advise")
public class BaseAdvise {

	private Integer aid;
	private String uid;
	private String title;
	private String content;
	private String contact;
	
	private Timestamp createTime = new Timestamp(System.currentTimeMillis());;
	
	@Column(name="createtime")
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	
	public Integer getAid() {
		return aid;
	}
	public void setAid(Integer aid) {
		this.aid = aid;
	}
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	@Column(name="title")
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@Column(name="content")
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	@Column(name="contact")
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	
	
}
