package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;

import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 宝贝列表Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月9日 下午5:51:07 
 * @version V1.0
 */
public class GoodsList implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String prd_name;
	private String prd_img;
	private String prd_url;
	
	private String category;
	private String avg_price;
	private String avg_price_tran;
	private String avg_price_tran_pre;
	private String zk_rate;
	private String zk_rate_pre;
	private String sales_volume;
	private String sales_volume_pre;
	private String sales_amount;
	private String sales_amount_pre;
	private String item_id;
	
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
	public void setHot(int hot) {
		this.hot = hot;
	}
	public String getPrd_img() {
		return prd_img;
	}
	public void setPrd_img(String prd_img) {
		this.prd_img = prd_img;
	}
	public String getPrd_url() {
		if(StringUtils.isNotBlank(this.getItem_id())){
			return SysUtil.getPrdUrl(this.getItem_id());
		}
		return prd_url;
	}
	public void setPrd_url(String prd_url) {
		this.prd_url = prd_url;
	}
	public String getPrd_name() {
		return prd_name;
	}
	public void setPrd_name(String prd_name) {
		this.prd_name = prd_name;
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
	public String getAvg_price_tran_pre() {
		return avg_price_tran_pre;
	}
	public void setAvg_price_tran_pre(String avg_price_tran_pre) {
		this.avg_price_tran_pre = avg_price_tran_pre;
	}
	public String getZk_rate() {
		return zk_rate;
	}
	public void setZk_rate(String zk_rate) {
		this.zk_rate = zk_rate;
	}
	public String getZk_rate_pre() {
		return zk_rate_pre;
	}
	public void setZk_rate_pre(String zk_rate_pre) {
		this.zk_rate_pre = zk_rate_pre;
	}
	public String getSales_volume() {
		return sales_volume;
	}
	public void setSales_volume(String sales_volume) {
		this.sales_volume = sales_volume;
	}
	public String getSales_volume_pre() {
		return sales_volume_pre;
	}
	public void setSales_volume_pre(String sales_volume_pre) {
		this.sales_volume_pre = sales_volume_pre;
	}
	public String getSales_amount() {
		return sales_amount;
	}
	public void setSales_amount(String sales_amount) {
		this.sales_amount = sales_amount;
	}
	public String getSales_amount_pre() {
		return sales_amount_pre;
	}
	public void setSales_amount_pre(String sales_amount_pre) {
		this.sales_amount_pre = sales_amount_pre;
	}
	public String getItem_id() {
		return item_id;
	}
	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}
	
	
	
}
