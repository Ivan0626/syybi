package com.sanyanyu.syybi.entity;

import java.io.Serializable;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;
import com.sanyanyu.syybi.utils.DateUtils;

/**
 * 关注店铺
 * 
 * @Description: 用户可以添加关注的店铺
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月4日 下午6:23:29 
 * @version V1.0
 */
@Table(name="tbweb.tb_attn_shop")
public class AttnShop implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String asid;
	private String uid;
	private String shopId;
	private String shopName;
	private String attDate = DateUtils.getDate();
	
	@Column(name="asid")
	public String getAsid() {
		return asid;
	}
	public void setAsid(String asid) {
		this.asid = asid;
	}
	@Column(name="uid")
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	@Column(name="shop_id")
	public String getShopId() {
		return shopId;
	}
	public void setShopId(String shopId) {
		this.shopId = shopId;
	}
	@Column(name="shop_name")
	public String getShopName() {
		return shopName;
	}
	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
	@Column(name="att_date")
	public String getAttDate() {
		return attDate;
	}
	public void setAttDate(String attDate) {
		this.attDate = attDate;
	}
	
	
	
}
