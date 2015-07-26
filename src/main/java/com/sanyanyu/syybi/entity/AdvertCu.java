package com.sanyanyu.syybi.entity;

/**
 * 宝贝广告-商品促销
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月12日 上午11:28:31
 * @version V1.0
 */
public class AdvertCu extends AdvertBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	// PS:淘宝促销(显示的字段与钻展一致)
	// 商品促销
	private String activity_content;
	
	private String price;//手机淘宝促销、手机促销用

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) { 	
		this.price = price;
	}

	public String getActivity_content() {
		return activity_content;
	}

	public void setActivity_content(String activity_content) {
		this.activity_content = activity_content;
	}

}
