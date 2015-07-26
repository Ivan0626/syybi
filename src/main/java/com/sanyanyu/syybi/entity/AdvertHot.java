package com.sanyanyu.syybi.entity;

/**
 * 宝贝广告-热门钻展Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月13日 下午7:59:13 
 * @version V1.0
 */
public class AdvertHot extends AdvertBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String position;
	private String pic_url;
	private String ad_pic;//广告回放
	private String ad_dest_url;//活动回放
	private String ad_pos_url;//具体位置
	private String screenshots;

	public String getAd_dest_url() {
		return ad_dest_url;
	}

	public void setAd_dest_url(String ad_dest_url) {
		this.ad_dest_url = ad_dest_url;
	}

	public String getAd_pos_url() {
		return ad_pos_url;
	}

	public void setAd_pos_url(String ad_pos_url) {
		this.ad_pos_url = ad_pos_url;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getPic_url() {
		return pic_url;
	}

	public void setPic_url(String pic_url) {
		this.pic_url = pic_url;
	}

	public String getAd_pic() {
		return ad_pic;
	}

	public void setAd_pic(String ad_pic) {
		this.ad_pic = ad_pic;
	}

	public String getScreenshots() {
		return screenshots;
	}

	public void setScreenshots(String screenshots) {
		this.screenshots = screenshots;
	}

}
