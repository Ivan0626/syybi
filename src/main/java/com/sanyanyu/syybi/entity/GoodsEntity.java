package com.sanyanyu.syybi.entity;


/**
 * 店铺营销组合分析-宝贝列表
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月15日 下午5:57:00
 * @version V1.0
 */
public class GoodsEntity extends AdvertBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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

	private String category;
	private String avg_price;
	private String avg_price_tran;
	private String change_date;
	private int name_count;
	private int price_count;
	
	private String cat_path;
	

	public String getCat_path() {
		return cat_path;
	}

	public void setCat_path(String cat_path) {
		this.cat_path = cat_path;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getAvg_price() {
		return avg_price;
	}

	public void setAvg_price(String avg_price) {
		this.avg_price = avg_price;
	}

	public String getAvg_price_tran() {
		return avg_price_tran;
	}

	public void setAvg_price_tran(String avg_price_tran) {
		this.avg_price_tran = avg_price_tran;
	}

	public String getChange_date() {
		return change_date;
	}

	public void setChange_date(String change_date) {
		this.change_date = change_date;
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

}
