package com.sanyanyu.syybi.entity;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 权限组实体
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月28日 下午4:39:25 
 * @version V1.0
 */
@Table(name="bi_base_group")
public class BaseGroup {

	private Integer gid;
	private String groupName;
	private Integer priceMonth;
	private Integer priceQuarter;
	private Integer priceYear;
	private Integer priceQuarterOld;
	private Integer priceYearOld;
	
	private String applyUser;//适用对象
	private Integer productNum;//可以监控的产品个数
	private Integer industryNum;//可以查看的行业个数
	
	private String validEndDate;//购买后到期日期
	
	public String getValidEndDate() {
		return validEndDate;
	}
	public void setValidEndDate(String validEndDate) {
		this.validEndDate = validEndDate;
	}
	@Column(name="price_quarter_old")
	public Integer getPriceQuarterOld() {
		return priceQuarterOld;
	}
	public void setPriceQuarterOld(Integer priceQuarterOld) {
		this.priceQuarterOld = priceQuarterOld;
	}
	@Column(name="price_year_old")
	public Integer getPriceYearOld() {
		return priceYearOld;
	}
	public void setPriceYearOld(Integer priceYearOld) {
		this.priceYearOld = priceYearOld;
	}
	@Column(name="gid")
	public Integer getGid() {
		return gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	@Column(name="group_name")
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	@Column(name="price_month")
	public Integer getPriceMonth() {
		return priceMonth;
	}
	public void setPriceMonth(Integer priceMonth) {
		this.priceMonth = priceMonth;
	}
	@Column(name="price_quarter")
	public Integer getPriceQuarter() {
		return priceQuarter;
	}
	public void setPriceQuarter(Integer priceQuarter) {
		this.priceQuarter = priceQuarter;
	}
	@Column(name="price_year")
	public Integer getPriceYear() {
		return priceYear;
	}
	public void setPriceYear(Integer priceYear) {
		this.priceYear = priceYear;
	}
	@Column(name="apply_user")
	public String getApplyUser() {
		return applyUser;
	}
	public void setApplyUser(String applyUser) {
		this.applyUser = applyUser;
	}
	@Column(name="product_num")
	public Integer getProductNum() {
		return productNum;
	}
	public void setProductNum(Integer productNum) {
		this.productNum = productNum;
	}
	@Column(name="industry_num")
	public Integer getIndustryNum() {
		return industryNum;
	}
	public void setIndustryNum(Integer industryNum) {
		this.industryNum = industryNum;
	}
	
	
	
}
