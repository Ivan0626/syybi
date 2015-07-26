package com.sanyanyu.syybi.entity;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 权限实体
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月28日 下午4:45:12 
 * @version V1.0
 */
@Table(name="bi_base_permission")
public class BasePermission {

	private Integer pid;
	private String permName;
	private String permNo;
	
	@Column(name="pid")
	public Integer getPid() {
		return pid;
	}
	public void setPid(Integer pid) {
		this.pid = pid;
	}
	@Column(name="perm_name")
	public String getPermName() {
		return permName;
	}
	public void setPermName(String permName) {
		this.permName = permName;
	}
	@Column(name="perm_no")
	public String getPermNo() {
		return permNo;
	}
	public void setPermNo(String permNo) {
		this.permNo = permNo;
	}
	
	
	
	
}
