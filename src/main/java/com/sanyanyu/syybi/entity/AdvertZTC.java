package com.sanyanyu.syybi.entity;

/**
 * 
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月16日 上午10:38:50
 * @version V1.0
 */
public class AdvertZTC extends AdvertBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String cat_name;// 店铺直通车类目广告
	private String keyword;// 店铺直通车关键词广告
	private String seq;

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getCat_name() {
		return cat_name;
	}

	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

}
