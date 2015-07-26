package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 营销组合分析Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月3日 上午11:08:18 
 * @version V1.0
 */
@Table(name="tbdaily.tb_advert_total")
public class MarketEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String shopName;//店铺名称
	private String riseIndex;//飚量指数
	private String salesAmountPre;//上月销售额
	private String itemCount;//宝贝数量
	private String phoneShopAdv;//手机广告-店铺广告数
	private String phoneItemAdv;//手机广告-宝贝广告数
	private String phoneItemTrain;//手机直通车-宝贝广告数
	private String phoneItemPromotion;//手机商品促销-宝贝广告数
	private String webShopAdv;//web广告-店铺广告数
	private String webItemAdv;//web广告-宝贝广告数
	private String webShopTrain;//web直通车-店铺广告数
	private String webItemTrain;//web直通车-宝贝广告数
	private String taokeItem;//淘宝客宝贝数
	private String juItem;//聚划算-宝贝广告数
	private String cuItem;//商品促销-宝贝广告数
	private String shopId;
	private String asid;
	
	private String shopUrl;//店铺URL
	
	private String shopType;
	
	public String getShopType() {
		return shopType;
	}
	public void setShopType(String shopType) {
		this.shopType = shopType;
	}
	@Column(name="shop_name", sort=2, so=true, orderbyTag="t3")
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	
	@Column(name="rise_index", sort=3, so=true, orderbyTag="t4")
	public String getRiseIndex() {
		return riseIndex;
	}
	public void setRiseIndex(String riseIndex) {
		this.riseIndex = riseIndex;
	}
	
	@Column(name="sales_amount", sort=4, so=true, orderbyTag="t4")
	public String getSalesAmountPre() {
		return salesAmountPre;
	}
	public void setSalesAmountPre(String salesAmountPre) {
		this.salesAmountPre = salesAmountPre;
	}
	
	@Column(name="item_count", sort=5, so=true, orderbyTag="t3")
	public String getItemCount() {
		return itemCount;
	}
	public void setItemCount(String itemCount) {
		this.itemCount = itemCount;
	}
	
	@Column(name="phone_shop_adv", sort=6, so=true, orderbyTag="t2")
	public String getPhoneShopAdv() {
		return phoneShopAdv;
	}
	public void setPhoneShopAdv(String phoneShopAdv) {
		this.phoneShopAdv = phoneShopAdv;
	}
	
	@Column(name="phone_item_adv", sort=7, so=true, orderbyTag="t2")
	public String getPhoneItemAdv() {
		return phoneItemAdv;
	}
	public void setPhoneItemAdv(String phoneItemAdv) {
		this.phoneItemAdv = phoneItemAdv;
	}
	
	@Column(name="phone_item_train", sort=8, so=true, orderbyTag="t2")
	public String getPhoneItemTrain() {
		return phoneItemTrain;
	}
	public void setPhoneItemTrain(String phoneItemTrain) {
		this.phoneItemTrain = phoneItemTrain;
	}
	
	@Column(name="phone_item_promotion", sort=9, so=true, orderbyTag="t2")
	public String getPhoneItemPromotion() {
		return phoneItemPromotion;
	}
	public void setPhoneItemPromotion(String phoneItemPromotion) {
		this.phoneItemPromotion = phoneItemPromotion;
	}
	
	@Column(name="web_shop_adv", sort=10, so=true, orderbyTag="t2")
	public String getWebShopAdv() {
		return webShopAdv;
	}
	public void setWebShopAdv(String webShopAdv) {
		this.webShopAdv = webShopAdv;
	}
	
	@Column(name="web_item_adv", sort=11, so=true, orderbyTag="t2")
	public String getWebItemAdv() {
		return webItemAdv;
	}
	public void setWebItemAdv(String webItemAdv) {
		this.webItemAdv = webItemAdv;
	}
	
	@Column(name="web_shop_train", sort=12, so=true, orderbyTag="t2")
	public String getWebShopTrain() {
		return webShopTrain;
	}
	public void setWebShopTrain(String webShopTrain) {
		this.webShopTrain = webShopTrain;
	}
	
	@Column(name="web_item_train", sort=13, so=true, orderbyTag="t2")
	public String getWebItemTrain() {
		return webItemTrain;
	}
	public void setWebItemTrain(String webItemTrain) {
		this.webItemTrain = webItemTrain;
	}
	
	@Column(name="taoke_item", sort=14, so=true, orderbyTag="t2")
	public String getTaokeItem() {
		return taokeItem;
	}
	public void setTaokeItem(String taokeItem) {
		this.taokeItem = taokeItem;
	}
	
	@Column(name="ju_item", sort=15, so=true, orderbyTag="t2")
	public String getJuItem() {
		return juItem;
	}
	public void setJuItem(String juItem) {
		this.juItem = juItem;
	}
	
	@Column(name="cu_item", sort=16, so=true, orderbyTag="t2")
	public String getCuItem() {
		return cuItem;
	}
	public void setCuItem(String cuItem) {
		this.cuItem = cuItem;
	}
	
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	public String getAsid() {
		return asid;
	}
	public void setAsid(String asid) {
		this.asid = asid;
	}
	public String getShopUrl() {
		return shopUrl;
	}
	public void setShopUrl(String shopUrl) {
		this.shopUrl = shopUrl;
	}
	
}
