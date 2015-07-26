package com.sanyanyu.syybi.service;

import java.sql.SQLException;
import java.util.Map;

import com.sanyanyu.syybi.entity.BaseAdvise;
import com.sanyanyu.syybi.entity.PointsLog;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.JDBCUtils;
import com.sanyanyu.syybi.utils.SqlUtil;
import com.sanyanyu.syybi.utils.StringUtils;

public class AdviseService extends BaseService {

	public AdviseService(){}
	
	//方便JUnit test
	public AdviseService(SqlUtil sqlUtil){
		this.sqlUtil = sqlUtil;
	}
	
	public void saveAdvise(BaseAdvise baseAdvise){
		
		try {
			JDBCUtils.startTransaction();
			
			sqlUtil.insert(baseAdvise);
			
			String sql = "update bi_base_user set points = points + 100 where uid = ?";
			sqlUtil.update(JDBCUtils.getConnection(), sql, baseAdvise.getUid());
			
			//当天只加一次积分
			sql = "SELECT count(0) as cnt FROM bi_base_points_log where remark = '提建议送积分' and uid = ? and date_format(createtime,'%Y-%m-%d') = ?";
			Map<String, Object> map = sqlUtil.search(sql, baseAdvise.getUid(), DateUtils.getDate());
			
			int cnt = StringUtils.toInteger(map.get("cnt"));
			if(cnt < 1){
				PointsLog points = new PointsLog();
				points.setPoints(100);
				points.setPointsType(1);
				points.setRemark("提建议送积分");
				points.setUid(baseAdvise.getUid());
				sqlUtil.insert(JDBCUtils.getConnection(), points);
			}
			
			JDBCUtils.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			JDBCUtils.rollbackTransaction();
		}finally{
			JDBCUtils.closeConnection();
		}
		
	}
	
}
