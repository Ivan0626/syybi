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
@Table(name="tbweb.bi_base_group")
public class BaseGroup {

	private String gid;
	private String groupName;
	private Integer priceMonth = 0;
	private Integer priceQuarter = 0;
	private Integer priceYear = 0;
	private Integer priceQuarterOld = 0;
	private Integer priceYearOld = 0;
	
	private String applyUser;//适用对象
	private Integer goodsNum = 0;//可以监控的产品个数
	private Integer industryNum = 0;//可以查看的行业个数
	
	private String validEndDate;//购买后到期日期
	
	private Integer shopNum = 0;
	private Integer MarketNum = 0;
	private Integer ScalpNum = 0;
	private Integer HotNum = 0;
	private Integer brandNum = 0;
	
	private String serviceSupport;
	private String promise;
	private String usableTime;
	
	@Column(name="usable_time")
	public String getUsableTime() {
		return usableTime;
	}
	public void setUsableTime(String usableTime) {
		this.usableTime = usableTime;
	}
	@Column(name="shop_num")
	public Integer getShopNum() {
		return shopNum;
	}
	public void setShopNum(Integer shopNum) {
		this.shopNum = shopNum;
	}
	
	@Column(name="market_num")
	public Integer getMarketNum() {
		return MarketNum;
	}
	public void setMarketNum(Integer marketNum) {
		MarketNum = marketNum;
	}
	
	@Column(name="scalp_num")
	public Integer getScalpNum() {
		return ScalpNum;
	}
	public void setScalpNum(Integer scalpNum) {
		ScalpNum = scalpNum;
	}
	
	@Column(name="hot_num")
	public Integer getHotNum() {
		return HotNum;
	}
	public void setHotNum(Integer hotNum) {
		HotNum = hotNum;
	}
	
	@Column(name="brand_num")
	public Integer getBrandNum() {
		return brandNum;
	}
	public void setBrandNum(Integer brandNum) {
		this.brandNum = brandNum;
	}
	
	@Column(name="service_support")
	public String getServiceSupport() {
		return serviceSupport;
	}
	public void setServiceSupport(String serviceSupport) {
		this.serviceSupport = serviceSupport;
	}
	
	@Column(name="promise")
	public String getPromise() {
		return promise;
	}
	public void setPromise(String promise) {
		this.promise = promise;
	}
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
	public String getGid() {
		return gid;
	}
	public void setGid(String gid) {
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
	@Column(name="goods_num")
	public Integer getGoodsNum() {
		return goodsNum;
	}
	public void setGoodsNum(Integer goodsNum) {
		this.goodsNum = goodsNum;
	}
	@Column(name="industry_num")
	public Integer getIndustryNum() {
		return industryNum;
	}
	public void setIndustryNum(Integer industryNum) {
		this.industryNum = industryNum;
	}
	
	
	
}
