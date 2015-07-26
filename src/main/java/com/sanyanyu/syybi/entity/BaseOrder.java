package com.sanyanyu.syybi.entity;

import java.sql.Timestamp;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 订单信息
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年5月4日 下午9:25:38 
 * @version V1.0
 */
@Table(name="bi_base_order")
public class BaseOrder {

	private Integer oid;
	private String orderCode;
	private String orderName;
	private Integer amount;
	private String status = "未支付";//未支付、已支付
	private Timestamp createTime = new Timestamp(System.currentTimeMillis());
	private Timestamp payTime;
	private String detail;
	private String uid;
	
	private String createTimeFormat;
	private String payTimeFormat;
	
	private Integer usePoints;
	private String validStartDate;
	private String validEndDate;
	
	@Column(name="use_points")
	public Integer getUsePoints() {
		return usePoints;
	}

	public void setUsePoints(Integer usePoints) {
		this.usePoints = usePoints;
	}

	@Column(name="valid_start_date")
	public String getValidStartDate() {
		return validStartDate;
	}

	public void setValidStartDate(String validStartDate) {
		this.validStartDate = validStartDate;
	}

	@Column(name="valid_end_date")
	public String getValidEndDate() {
		return validEndDate;
	}

	public void setValidEndDate(String validEndDate) {
		this.validEndDate = validEndDate;
	}

	public String getPayTimeFormat() {
		return payTimeFormat;
	}

	public void setPayTimeFormat(String payTimeFormat) {
		this.payTimeFormat = payTimeFormat;
	}

	public String getCreateTimeFormat() {
		return createTimeFormat;
	}

	public void setCreateTimeFormat(String createTimeFormat) {
		this.createTimeFormat = createTimeFormat;
	}

	@Column(name="oid")
	public Integer getOid() {
		return oid;
	}

	public void setOid(Integer oid) {
		this.oid = oid;
	}

	@Column(name="order_code")
	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	@Column(name="order_name")
	public String getOrderName() {
		return orderName;
	}

	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}

	@Column(name="amount")
	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	@Column(name="status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name="createtime")
	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	@Column(name="paytime")
	public Timestamp getPayTime() {
		return payTime;
	}

	public void setPayTime(Timestamp payTime) {
		this.payTime = payTime;
	}

	@Column(name="detail")
	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	@Column(name="uid")
	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

}
