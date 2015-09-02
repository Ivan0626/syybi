package com.sanyanyu.syybi.entity;

import java.sql.Timestamp;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 积分记录
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年5月4日 下午9:32:42 
 * @version V1.0
 */
@Table(name="bi_base_points_log")
public class PointsLog {

	private String pid;
	private String uid;
	private Timestamp createTime = new Timestamp(System.currentTimeMillis());
	private Integer points;
	private String remark;
	private Integer pointsType;
	
	private String createTimeFormat;
	
	public String getCreateTimeFormat() {
		return createTimeFormat;
	}
	public void setCreateTimeFormat(String createTimeFormat) {
		this.createTimeFormat = createTimeFormat;
	}
	
	@Column(name="pid")
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	@Column(name="createtime")
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	
	@Column(name="points")
	public Integer getPoints() {
		return points;
	}
	public void setPoints(Integer points) {
		this.points = points;
	}
	
	@Column(name="remark")
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Column(name="points_type")
	public Integer getPointsType() {
		return pointsType;
	}
	public void setPointsType(Integer pointsType) {
		this.pointsType = pointsType;
	}
	
	
}
