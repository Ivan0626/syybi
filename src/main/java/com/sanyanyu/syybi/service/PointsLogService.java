package com.sanyanyu.syybi.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.PointsLog;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.JDBCUtils;
import com.sanyanyu.syybi.utils.SqlUtil;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 积分记录的业务逻辑处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月15日 下午5:57:33 
 * @version V1.0
 */
public class PointsLogService extends BaseService {
	
	public PointsLogService(){}
	
	//方便JUnit test
	public PointsLogService(SqlUtil sqlUtil){
		this.sqlUtil = sqlUtil;
	}
	
	/**
	 * 积分记录列表
	 * @param uid
	 * @return
	 */
	public List<PointsLog> getPoints(String uid, Integer pointsType){
		
		String sql = "SELECT createtime as createTimeFormat, points, remark FROM bi_base_points_log where uid = ? and points_type = ? order by createtime desc";
		
		List<PointsLog> pointsList = sqlUtil.searchList(PointsLog.class, sql, uid, pointsType);
		
		return pointsList;
	}
	
	/**
	 * 当天是否签到
	 * @param uid
	 * @return
	 */
	public boolean isQianDao(String uid){
		
		String curDate = DateUtils.getDate();
		String sql = "select count(0) as cnt from bi_base_points_log where DATE_FORMAT(createtime, '%Y-%m-%d') = ? and remark = '每日签到送积分' and uid = ?";
		
		Map<String, Object> map = sqlUtil.search(sql, curDate, uid);
		
		int cnt = StringUtils.toInteger(map.get("cnt"));
		
		return cnt > 0;
	}
	
	public void qianDao(String uid){
		
		String sql = "update bi_base_user set points = points + 20 where uid = ?";
		try {
			
			JDBCUtils.startTransaction();
			sqlUtil.update(JDBCUtils.getConnection(), sql, uid);
			
			PointsLog points = new PointsLog();
			points.setPoints(20);
			points.setPointsType(1);
			points.setRemark("每日签到送积分");
			points.setUid(uid);
			
			sqlUtil.insert(JDBCUtils.getConnection(), points);
			
			JDBCUtils.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			JDBCUtils.rollbackTransaction();
		}finally{
			JDBCUtils.closeConnection();
		}
	}
}
