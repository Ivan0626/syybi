package com.sanyanyu.syybi.service;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import com.sanyanyu.syybi.entity.BaseGroup;
import com.sanyanyu.syybi.entity.BaseOrder;
import com.sanyanyu.syybi.entity.PointsLog;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.JDBCUtils;
import com.sanyanyu.syybi.utils.SqlUtil;

/**
 * 订单管理的业务逻辑处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月15日 下午5:57:33 
 * @version V1.0
 */
public class OrderService extends BaseService {
	
	public OrderService(){}
	
	//方便JUnit test
	public OrderService(SqlUtil sqlUtil){
		this.sqlUtil = sqlUtil;
	}
	
	/**
	 * 订单列表
	 * @param uid
	 * @return
	 */
	public List<BaseOrder> getOrders(String uid){
		
		String sql = "select order_code as orderCode, order_name as orderName, amount, status, createtime as createTimeFormat, paytime as payTimeFormat, detail from bi_base_order where uid = ? order by createtime desc";
		
		List<BaseOrder> orderList = sqlUtil.searchList(BaseOrder.class, sql, uid);
		
		return orderList;
	}
	
	/**
	 * 根据版本名称获取相关信息
	 * @param groupName
	 * @return
	 */
	public BaseGroup getBaseGroup(String groupName){
		
		String sql = "SELECT group_name as groupName,price_month as priceMonth, price_quarter as priceQuarter, price_quarter_old as priceQuarterOld,price_year as priceYear, price_year_old as priceYearOld FROM bi_base_group where group_name = ?";
		BaseGroup baseGroup =  sqlUtil.search(BaseGroup.class, sql, groupName);
		
		baseGroup.setValidEndDate(DateUtils.formatDate(DateUtils.addMonths(new Date(), 1), "yyyy-MM-dd"));
		
		return baseGroup;
	}
	
	/**
	 * 保存订单
	 * @param baseOrder
	 */
	public void saveOrder(BaseOrder baseOrder){
		
		sqlUtil.insert(baseOrder);
		
	}
	
	/**
	 * 支付完成后，处理订单、增加积分消费记录（如果消费了积分）、修改用户套餐信息
	 * @param orderCode
	 * @param tradeNo
	 * @param uid
	 */
	public void handleOrder(String orderCode, String tradeNo, String uid) throws Exception{
		
		String sql = "select status, use_points as usePoints, valid_start_date as validStartDate, valid_end_date as validEndDate, order_name as orderName from bi_base_order where order_code = ?";
		BaseOrder baseOrder = sqlUtil.search(BaseOrder.class, sql, orderCode);
		
		if(baseOrder != null){
			if("未支付".equals(baseOrder.getStatus())){
				
				try {
					JDBCUtils.startTransaction();
					
					//更新订单状态、支付时间、支付宝交易号
					sql = "update bi_base_order set status = ?, paytime = ?, trade_no = ? where order_code = ?";
					sqlUtil.update(JDBCUtils.getConnection(), sql, "已支付", new Timestamp(System.currentTimeMillis()), tradeNo, orderCode);
					
					//增加积分消费记录
					if(baseOrder.getUsePoints() > 0){//有消费积分才添加记录
						PointsLog points = new PointsLog();
						points.setPoints(baseOrder.getUsePoints());
						points.setPointsType(0);
						points.setRemark("购买套餐积分兑换");
						points.setUid(uid);
						sqlUtil.insert(JDBCUtils.getConnection(), points);
					}
					
					//修改用户套餐信息，总积分，所属权限组，使用开始日期，使用结束日期
					if(baseOrder.getOrderName().indexOf("专业版") > -1){
						
						sql = "update bi_base_user t1 set t1.points = t1.points - "+baseOrder.getUsePoints()+", t1.valid_start_date = ?, t1.valid_end_date = ?, t1.groupid = (select max(t2.gid) from bi_base_group t2 where t2.group_name = '专业版') where uid = ?";
						
					}else if(baseOrder.getOrderName().indexOf("旗舰版") > -1){
						
						sql = "update bi_base_user t1 set t1.points = t1.points - "+baseOrder.getUsePoints()+", t1.valid_start_date = ?, t1.valid_end_date = ?, t1.groupid = (select max(t2.gid) from bi_base_group t2 where t2.group_name = '旗舰版') where uid = ?";
						
					}
					sqlUtil.update(JDBCUtils.getConnection(), sql, baseOrder.getValidStartDate(), baseOrder.getValidEndDate(), uid);
					
					JDBCUtils.commitTransaction();
				} catch (SQLException e) {
					e.printStackTrace();
					JDBCUtils.rollbackTransaction();
				}finally{
					JDBCUtils.closeConnection();
				}
				
			}else{
				//不做处理
			}
		}
		
		
		
	}
	
	public void test() {
		
		BaseOrder order = new BaseOrder();
		order.setAmount(100000);
		order.setDetail("test");
		order.setOrderCode("SYYO-20150504120827");
		order.setOrderName("test");
		order.setStatus("未支付");
		order.setUid("14");
		
		sqlUtil.insert(order);
	}
	
	public static void main(String[] args) {
		OrderService o = new OrderService();
		o.test();
	}
	
	
	
}
