package com.sanyanyu.syybi.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;
import com.sanyanyu.syybi.utils.DateUtils;

/**
 * 用户表对应的实体类
 * 
 * @Description: 与用户表字段对应
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午12:54:31 
 * @version V1.0
 */
@Table(name="bi_base_user")
public class BaseUser implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String uid;
	private String userno = "";
	private String username = "";
	private String password = "";
	private Integer status = 0;
	private Integer pay = 0;
	private String payDate = "";
	private String email = "";
	private Integer emailStatus = 0;
	private String groupId;
	private String groupName;
	private String regDate = DateUtils.getDate();
	private Timestamp createTime = new Timestamp(System.currentTimeMillis());
	private String validateCode = "";
	private String validStartDate;
	private String validEndDate;
	
	private Integer points = 1000;
	private String userType;
	private String industry;
	private String channel;
	private String contactPerson;
	private String contactTel;
	private String companyName;
	
	private String shopName;
	
	private String attnCnt;
	
	private Integer shopNum;
	private Integer MarketNum;
	private Integer ScalpNum;
	private Integer HotNum;
	private Integer brandNum;
	private Integer goodsNum;
	
	public Integer getShopNum() {
		return shopNum;
	}
	public void setShopNum(Integer shopNum) {
		this.shopNum = shopNum;
	}
	public Integer getMarketNum() {
		return MarketNum;
	}
	public void setMarketNum(Integer marketNum) {
		MarketNum = marketNum;
	}
	public Integer getScalpNum() {
		return ScalpNum;
	}
	public void setScalpNum(Integer scalpNum) {
		ScalpNum = scalpNum;
	}
	public Integer getHotNum() {
		return HotNum;
	}
	public void setHotNum(Integer hotNum) {
		HotNum = hotNum;
	}
	public Integer getBrandNum() {
		return brandNum;
	}
	public void setBrandNum(Integer brandNum) {
		this.brandNum = brandNum;
	}
	public Integer getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(Integer goodsNum) {
		this.goodsNum = goodsNum;
	}
	public String getAttnCnt() {
		return attnCnt;
	}
	public void setAttnCnt(String attnCnt) {
		this.attnCnt = attnCnt;
	}
	@Column(name="shop_name")
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	@Column(name="points")
	public Integer getPoints() {
		return points;
	}
	public void setPoints(Integer points) {
		this.points = points;
	}
	@Column(name="user_type")
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	@Column(name="industry")
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	@Column(name="channel")
	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	@Column(name="contact_person")
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	@Column(name="contact_tel")
	public String getContactTel() {
		return contactTel;
	}
	public void setContactTel(String contactTel) {
		this.contactTel = contactTel;
	}
	@Column(name="company_name")
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	@Column(name="validate_code")
	public String getValidateCode() {
		return validateCode;
	}
	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	
	@Column(name="userno")
	public String getUserno() {
		return userno;
	}
	public void setUserno(String userno) {
		this.userno = userno;
	}
	
	@Column(name="username")
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Column(name="password")
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name="status")
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	@Column(name="pay")
	public Integer getPay() {
		return pay;
	}
	public void setPay(Integer pay) {
		this.pay = pay;
	}
	
	@Column(name="paydate")
	public String getPayDate() {
		return payDate;
	}
	public void setPayDate(String payDate) {
		this.payDate = payDate;
	}
	
	@Column(name="email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(name="emailstatus")
	public Integer getEmailStatus() {
		return emailStatus;
	}
	public void setEmailStatus(Integer emailStatus) {
		this.emailStatus = emailStatus;
	}
	
	@Column(name="groupid")
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	
	@Column(name="regdate")
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	
	@Column(name="createtime")
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	
	
	public static void main(String[] args) {
		
		Table tableName = (Table) BaseUser.class.getAnnotation(Table.class);
		
		System.out.println(tableName.name());
	}
	
	
}
