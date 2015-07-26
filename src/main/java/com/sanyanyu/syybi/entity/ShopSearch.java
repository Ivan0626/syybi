package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 飚量店铺搜索Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月8日 下午3:24:48
 * @version V1.0
 */
public class ShopSearch implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String shop_id;
	private String shop_name;
	private String shop_img;
	private String shop_url;
	private String shop_type;
	private String region;
	private String sales_volume;
	private String sales_amount;
	private String tran_count;
	private String pre_sales_volume;
	private String pre_sales_amount;
	private String pre_tran_count;
	private String re_sales_amount;
	private String rise_index;

	private int hot;// 热门钻展数量
	private int normal;// 普通钻展数量
	private int tb_cu;// 淘宝促销数量
	private int activity;// 淘宝活动数量
	private int taobaoke;// 淘宝客数量
	private int ztc;// 直通车数量
	private int ju;// 聚划算数量
	private int normal_cu;// 商品促销数量
	private int normal_cu_mobile;// 手机促销数量
	private int hot_mobile;// 手机热门钻展数量
	private int tb_cu_mobile;// 手机淘宝促销数量
	private int activity_mobile;// 手机淘宝活动数量
	private int ztc_mobile;// 手机直通车数量
	
	private String asid;
	
	private String rate_link;

	public String getRate_link() {
		return rate_link;
	}

	public void setRate_link(String rate_link) {
		this.rate_link = rate_link;
	}

	public String getAsid() {
		return asid;
	}

	public void setAsid(String asid) {
		this.asid = asid;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getShop_id() {
		return shop_id;
	}

	public void setShop_id(String shop_id) {
		this.shop_id = shop_id;
	}

	public String getShop_name() {
		return shop_name;
	}

	public void setShop_name(String shop_name) {
		this.shop_name = shop_name;
	}

	public String getShop_img() {
		return shop_img;
	}

	public void setShop_img(String shop_img) {
		this.shop_img = shop_img;
	}

	public String getShop_url() {
		return shop_url;
	}

	public void setShop_url(String shop_url) {
		this.shop_url = shop_url;
	}

	public String getShop_type() {
		return shop_type;
	}

	public void setShop_type(String shop_type) {
		this.shop_type = shop_type;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getSales_volume() {
		return sales_volume;
	}

	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}

	public String getSales_amount() {
		return sales_amount;
	}

	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}

	public String getTran_count() {
		return tran_count;
	}

	public void setTran_count(String tran_count) {
		this.tran_count = tran_count;
	}

	public String getPre_sales_volume() {
		return pre_sales_volume;
	}

	public void setPre_sales_volume(String pre_sales_volume) {
		this.pre_sales_volume = pre_sales_volume;
	}

	public String getPre_sales_amount() {
		return pre_sales_amount;
	}

	public void setPre_sales_amount(String pre_sales_amount) {
		this.pre_sales_amount = pre_sales_amount;
	}

	public String getPre_tran_count() {
		return pre_tran_count;
	}

	public void setPre_tran_count(String pre_tran_count) {
		this.pre_tran_count = pre_tran_count;
	}

	public String getRe_sales_amount() {
		return re_sales_amount;
	}

	public void setRe_sales_amount(String re_sales_amount) {
		this.re_sales_amount = re_sales_amount;
	}

	public String getRise_index() {
		return rise_index;
	}

	public void setRise_index(String rise_index) {
		this.rise_index = rise_index;
	}

	public int getHot() {
		return hot;
	}

	public void setHot(int hot) {
		this.hot = hot;
	}

	public int getNormal() {
		return normal;
	}

	public void setNormal(int normal) {
		this.normal = normal;
	}

	public int getTb_cu() {
		return tb_cu;
	}

	public void setTb_cu(int tb_cu) {
		this.tb_cu = tb_cu;
	}

	public int getActivity() {
		return activity;
	}

	public void setActivity(int activity) {
		this.activity = activity;
	}

	public int getTaobaoke() {
		return taobaoke;
	}

	public void setTaobaoke(int taobaoke) {
		this.taobaoke = taobaoke;
	}

	public int getZtc() {
		return ztc;
	}

	public void setZtc(int ztc) {
		this.ztc = ztc;
	}

	public int getJu() {
		return ju;
	}

	public void setJu(int ju) {
		this.ju = ju;
	}

	public int getNormal_cu() {
		return normal_cu;
	}

	public void setNormal_cu(int normal_cu) {
		this.normal_cu = normal_cu;
	}

	public int getNormal_cu_mobile() {
		return normal_cu_mobile;
	}

	public void setNormal_cu_mobile(int normal_cu_mobile) {
		this.normal_cu_mobile = normal_cu_mobile;
	}

	public int getHot_mobile() {
		return hot_mobile;
	}

	public void setHot_mobile(int hot_mobile) {
		this.hot_mobile = hot_mobile;
	}

	public int getTb_cu_mobile() {
		return tb_cu_mobile;
	}

	public void setTb_cu_mobile(int tb_cu_mobile) {
		this.tb_cu_mobile = tb_cu_mobile;
	}

	public int getActivity_mobile() {
		return activity_mobile;
	}

	public void setActivity_mobile(int activity_mobile) {
		this.activity_mobile = activity_mobile;
	}

	public int getZtc_mobile() {
		return ztc_mobile;
	}

	public void setZtc_mobile(int ztc_mobile) {
		this.ztc_mobile = ztc_mobile;
	}

}
