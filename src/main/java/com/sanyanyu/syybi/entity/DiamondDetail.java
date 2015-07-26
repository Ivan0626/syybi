package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

@Table(name="tbdaily.tb_advert_zuanz")
public class DiamondDetail implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String adPic;
	private String shopName;
	private String putDate;
	private String category;
	private String salesAmount;
	private String salesVolume;
	private String riseIndex;
	private String azid;
	private String shopUrl;
	
	private String picUrl;

	private String screenshots;
	private String position;
	
	private String cnt;
	
	private String shopId;
	private String bpid;
	
	private String shopType;
	
	public String getShopType() {
		return shopType;
	}
	public void setShopType(String shopType) {
		this.shopType = shopType;
	}
	public String getBpid() {
		return bpid;
	}
	public void setBpid(String bpid) {
		this.bpid = bpid;
	}
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public String getCnt() {
		return cnt;
	}
	public void setCnt(String cnt) {
		this.cnt = cnt;
	}
	public String getPicUrl() {
		return picUrl;
	}
	public void setPicUrl(String picUrl) {
		this.picUrl = picUrl;
	}
	
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getScreenshots() {
		return screenshots;
	}
	public void setScreenshots(String screenshots) {
		this.screenshots = screenshots;
	}
	@Column(name="ad_pic", sort=1)
	public String getAdPic() {
		return adPic;
	}
	public void setAdPic(String adPic) {
		this.adPic = adPic;
	}
	
	@Column(name="shop_name", sort=2, or=true,  orderbyTag="t2")
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	
	@Column(name="put_date", sort=3, or=true, orderbyTag="t1")
	public String getPutDate() {
		return putDate;
	}
	public void setPutDate(String putDate) {
		this.putDate = putDate;
	}
	
	@Column(name="category", sort=4, or=true, orderbyTag="t2")
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	
	@Column(name="sales_amount", sort=5, or=true, orderbyTag="t3")
	public String getSalesAmount() {
		return salesAmount;
	}
	public void setSalesAmount(String salesAmount) {
		this.salesAmount = salesAmount;
	}
	
	@Column(name="sales_volume", sort=6, or=true, orderbyTag="t3")
	public String getSalesVolume() {
		return salesVolume;
	}
	public void setSalesVolume(String salesVolume) {
		this.salesVolume = salesVolume;
	}
	
	@Column(name="rise_index", sort=7, or=true, orderbyTag="t3")
	public String getRiseIndex() {
		return riseIndex;
	}
	public void setRiseIndex(String riseIndex) {
		this.riseIndex = riseIndex;
	}
	
	@Column(name="azid", sort=8)
	public String getAzid() {
		return azid;
	}
	public void setAzid(String azid) {
		this.azid = azid;
	}
	
	public String getShopUrl() {
		return shopUrl;
	}
	public void setShopUrl(String shopUrl) {
		this.shopUrl = shopUrl;
	}
	
}
