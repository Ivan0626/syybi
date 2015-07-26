package com.sanyanyu.syybi.entity;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 权限组与权限的关系
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月28日 下午4:49:52 
 * @version V1.0
 */
@Table(name="bi_base_group_perm")
public class GroupPermission {

	private Integer rid;
	private Integer gid;
	private Integer pid;
	
	@Column(name="rid")
	public Integer getRid() {
		return rid;
	}
	public void setRid(Integer rid) {
		this.rid = rid;
	}
	@Column(name="gid")
	public Integer getGid() {
		return gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	@Column(name="pid")
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	
	
	
}
