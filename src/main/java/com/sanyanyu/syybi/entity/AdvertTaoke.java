package com.sanyanyu.syybi.entity;


/**
 * 宝贝广告-淘宝客Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月12日 上午11:14:59
 * @version V1.0
 */
public class AdvertTaoke extends AdvertBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String reserve_price;// 单价
	private String commission_rate_percent;// 佣金比例
	private String cal_commission;// 佣金
	private String total_fee;// 近30天推广佣金
	private String total_num;// 近30天推广量
	
	//以下是店铺的属性
	private String settle_amt;//成交金额：推广带来的销售额
	private String settle_num;//推广量：推广带来的销量
	private String commisiona_amt;//支出佣金
	
	public String getSettle_amt() {
		return settle_amt;
	}

	public void setSettle_amt(String settle_amt) {
		this.settle_amt = settle_amt;
	}

	public String getSettle_num() {
		return settle_num;
	}

	public void setSettle_num(String settle_num) {
		this.settle_num = settle_num;
	}

	public String getCommisiona_amt() {
		return commisiona_amt;
	}

	public void setCommisiona_amt(String commisiona_amt) {
		this.commisiona_amt = commisiona_amt;
	}

	public String getReserve_price() {
		return reserve_price;
	}

	public void setReserve_price(String reserve_price) {
		this.reserve_price = reserve_price;
	}

	public String getCommission_rate_percent() {
		return commission_rate_percent;
	}

	public void setCommission_rate_percent(String commission_rate_percent) {
		this.commission_rate_percent = commission_rate_percent;
	}

	public String getCal_commission() {
		return cal_commission;
	}

	public void setCal_commission(String cal_commission) {
		this.cal_commission = cal_commission;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getTotal_num() {
		return total_num;
	}

	public void setTotal_num(String total_num) {
		this.total_num = total_num;
	}

}
