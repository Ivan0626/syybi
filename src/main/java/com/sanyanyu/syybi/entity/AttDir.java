package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 关注目录Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月4日 下午12:18:51 
 * @version V1.0
 */
@Table(name="tbweb.tb_attn_dir")
public class AttDir implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String adid;
	private String uid;
	private String dir_name;
	
	@Column(name="adid")
	public String getAdid() {
		return adid;
	}
	public void setAdid(String adid) {
		this.adid = adid;
	}
	
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	@Column(name="dir_name")
	public String getDir_name() {
		return dir_name;
	}
	public void setDir_name(String dir_name) {
		this.dir_name = dir_name;
	}
	
	
}
