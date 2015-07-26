package com.sanyanyu.syybi.entity;

import java.io.Serializable;

/**
 * 广告分析Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月10日 下午3:27:19 
 * @version V1.0
 */
public class AdAnalysis implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String tran_date;
	private String sales_amount;
	private String sales_volume;
	private String tran_count;
	
	private int shop_ztc;//直通车广告汇总
	private int shop_normal;//普通钻展汇总
	private int shop_hot;//热门钻展汇总
	private int shop_tb_cu;//淘宝促销汇总（天天特价、淘金币、付邮试用）
	private int shop_activity;//淘宝活动汇总（双11、双12、超级卖霸）
	private int shop_taobaoke;//淘宝客汇总
	private int shop_hot_mobile;//手机热门钻展汇总
	private int shop_activity_mobile;//手机淘宝活动汇总
	private int shop_sale;//搭配减价
	
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
	
	private String adCuXiao;
	private int name_count;
	private int price_count;
	private int add_count;
	
	private String rise_index;
	
	public String getRise_index() {
		return rise_index;
	}
	public void setRise_index(String rise_index) {
		this.rise_index = rise_index;
	}
	public String getTran_date() {
		return tran_date;
	}
	public void setTran_date(String tran_date) {
		this.tran_date = tran_date;
	}
	public String getSales_amount() {
		return sales_amount;
	}
	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}
	public String getSales_volume() {
		return sales_volume;
	}
	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}
	public String getTran_count() {
		return tran_count;
	}
	public void setTran_count(String tran_count) {
		this.tran_count = tran_count;
	}
	public int getShop_ztc() {
		return shop_ztc;
	}
	public void setShop_ztc(int shop_ztc) {
		this.shop_ztc = shop_ztc;
	}
	public int getShop_normal() {
		return shop_normal;
	}
	public void setShop_normal(int shop_normal) {
		this.shop_normal = shop_normal;
	}
	public int getShop_hot() {
		return shop_hot;
	}
	public void setShop_hot(int shop_hot) {
		this.shop_hot = shop_hot;
	}
	public int getShop_tb_cu() {
		return shop_tb_cu;
	}
	public void setShop_tb_cu(int shop_tb_cu) {
		this.shop_tb_cu = shop_tb_cu;
	}
	public int getShop_activity() {
		return shop_activity;
	}
	public void setShop_activity(int shop_activity) {
		this.shop_activity = shop_activity;
	}
	public int getShop_taobaoke() {
		return shop_taobaoke;
	}
	public void setShop_taobaoke(int shop_taobaoke) {
		this.shop_taobaoke = shop_taobaoke;
	}
	public int getShop_hot_mobile() {
		return shop_hot_mobile;
	}
	public void setShop_hot_mobile(int shop_hot_mobile) {
		this.shop_hot_mobile = shop_hot_mobile;
	}
	public int getShop_activity_mobile() {
		return shop_activity_mobile;
	}
	public void setShop_activity_mobile(int shop_activity_mobile) {
		this.shop_activity_mobile = shop_activity_mobile;
	}
	public int getShop_sale() {
		return shop_sale;
	}
	public void setShop_sale(int shop_sale) {
		this.shop_sale = shop_sale;
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
	public String getAdCuXiao() {
		return adCuXiao;
	}
	public void setAdCuXiao(String adCuXiao) {
		this.adCuXiao = adCuXiao;
	}
	public int getName_count() {
		return name_count;
	}
	public void setName_count(int name_count) {
		this.name_count = name_count;
	}
	public int getPrice_count() {
		return price_count;
	}
	public void setPrice_count(int price_count) {
		this.price_count = price_count;
	}
	public int getAdd_count() {
		return add_count;
	}
	public void setAdd_count(int add_count) {
		this.add_count = add_count;
	}
}
