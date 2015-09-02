package com.sanyanyu.syybi.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.constants.FinalConstants;
import com.sanyanyu.syybi.entity.AttnDir;
import com.sanyanyu.syybi.entity.BaseUser;
import com.sanyanyu.syybi.entity.PointsLog;
import com.sanyanyu.syybi.utils.Base64Util;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.JDBCUtils;
import com.sanyanyu.syybi.utils.SendEmail;
import com.sanyanyu.syybi.utils.SqlUtil;
import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 用户信息的业务逻辑处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月15日 下午5:57:33
 * @version V1.0
 */
public class BaseUserService extends BaseService {

	private static Logger logger = LoggerFactory.getLogger(BaseUserService.class);
	
	public BaseUserService() {
	}

	// 方便JUnit test
	public BaseUserService(SqlUtil sqlUtil) {
		this.sqlUtil = sqlUtil;
	}

	/**
	 * 保存用户信息
	 * 
	 * @param baseUser
	 */
	public void saveBaseUser(HttpServletRequest request, BaseUser baseUser, String p) {

		JDBCUtils.startTransaction();
		try {
			sqlUtil.insert(JDBCUtils.getConnection(), baseUser);//保存用户信息
			
			sendEmail(request, baseUser.getEmail(), baseUser.getValidateCode());//发送邮件
			JDBCUtils.commitTransaction();
			
			PointsLog apoints = new PointsLog();
			apoints.setPoints(1000);
			apoints.setPointsType(1);
			apoints.setRemark("新人注册大礼包");
			
			//String uid = getBaseUserByUsername(baseUser.getUsername());
			
			apoints.setUid(baseUser.getUid());
			
			apoints.setPid(SysUtil.getUUID());
			sqlUtil.insert(JDBCUtils.getConnection(), apoints);
			
			//被推荐用户和推荐用户也要送积分
			if(StringUtils.isNotBlank(p)){
				
				String sql = "update bi_base_user set points = points + 500 where username = ?";
				
				sqlUtil.update(JDBCUtils.getConnection(), sql, baseUser.getUsername());
				
				PointsLog points = new PointsLog();
				points.setPoints(500);
				points.setPointsType(1);
				points.setRemark("被推荐注册送积分");
				points.setUid(getBaseUserByUsername(baseUser.getUsername()));
				
				sqlUtil.insert(JDBCUtils.getConnection(), points);
				
				String username = Base64Util.getFromBASE64(p);
				
				if(this.existUsername(username)){//送500积分
					
					sqlUtil.update(JDBCUtils.getConnection(), sql, username);
					
					PointsLog points2 = new PointsLog();
					points2.setPoints(500);
					points2.setPointsType(1);
					points2.setRemark("推荐注册送积分");
					points2.setUid(getBaseUserByUsername(username));
					
					sqlUtil.insert(JDBCUtils.getConnection(), points2);
				}
				
			}
			
			//生成默认宝贝目录（未归属宝贝）
			AttnDir dir = new AttnDir();
			dir.setUid(baseUser.getUid());
			dir.setDir_name(FinalConstants.DEFAULT_GOODS_DIR);
			dir.setAdid(SysUtil.getUUID());
			
			sqlUtil.insert(JDBCUtils.getConnection(), dir);
			
			JDBCUtils.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			JDBCUtils.rollbackTransaction();
		}finally{
			JDBCUtils.closeConnection();
		}
		
	}
	
	
	public void sendEmail(HttpServletRequest request, String email, String validateCode) {
		String registerUrl = request.getRequestURL() + "?method=active&code="+validateCode+"&email="+email;
		//发送邮件
		StringBuffer content = new StringBuffer();
		content.append("<table width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" style=\"font-family: '微软雅黑', Arial, Helvetica, sans-serif;;line-height:1.6;font-size:12px;color:#333333\">")
				.append(" <tbody>")
				.append("	<tr>")
				.append("		<td style=\"background:#ff7607;width:150px;text-align:center\">")
				.append("			<p style=\"text-decoration:none;font-size:16px;font-weight:800;color:white;\" >电商指数</p>")
				.append("		</td>")
				.append("		<td>")
				.append("		</td>")
				.append("	</tr>")
				.append("	<tr style=\background:#ffffff;font-size:14px\">")
				.append("		<td colspan=\"2\">")
				.append("	 		<p><a href=\"mailto:"+email+"\" target=\"_blank\">"+email+"</a> 你好:<br>欢迎使用 电商指数，请点击下面的链接验证你的注册邮箱:</p>")
				.append("	 		<div style=\"margin:10px 0;padding:10px;background:#fffadf;border-left:0px solid #233446\">")
				.append("		 		<a style=\"color:#233446;font-family:Monaco,Courier\" href=\""+registerUrl+"\" target=\"_blank\">")
				.append("		 			"+registerUrl)
				.append("		 		</a>")
				.append("	 		</div>")
				.append("	 		如果您无法打开上面的链接，请复制上面的链接到浏览器里面打开")
				.append("	 		<p>如果您没有在电商指数注册过，请忽略此邮件。</p>")
				.append("	   </td>")
				.append("	</tr>")
				.append("	<tr>")
				.append("		<td colspan=\"2\" style=\"background:#f0f0f0;color:#999999\">")
				.append("		此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账户被他人盗用")
				.append("		</td>")
				.append(" 	</tr>")
				.append(" </tbody>")
				.append("</table>");
		
		SendEmail.send(email, content.toString());
	}

	/**
	 * ajax验证email是否已经注册过
	 * 
	 * @param email
	 * @return
	 */
	public boolean existEmail(String email) {

		String sql = "select count(0) as cnt from bi_base_user where email = ?";

		Map<String, Object> resultMap = sqlUtil.search(sql, email);

		int count = StringUtils.toInteger(resultMap.get("cnt"));

		return count > 0;
	}

	/**
	 * ajax验证username是否已经注册过
	 * 
	 * @param email
	 * @return
	 */
	public boolean existUsername(String username) {

		String sql = "select count(0) as cnt from bi_base_user where username = ?";

		Map<String, Object> resultMap = sqlUtil.search(sql, username);

		int count = StringUtils.toInteger(resultMap.get("cnt"));

		return count > 0;
	}
	
	/**
	 * 反查uid
	 * 
	 * @param email
	 * @return
	 */
	public String getBaseUserByUsername(String username) {

		String sql = "select uid from bi_base_user where username = ?";

		Map<String, Object> resultMap = sqlUtil.search(sql, username);

		String uid = resultMap.get("uid").toString();

		return uid;
	}


	/**
	 * 通过邮箱号获取校验码
	 * 
	 * @param email
	 * @return
	 */
	public String findValidateCodeByEmail(String email) {

		String sql = "select validate_code from bi_base_user where email = ?";
		Map<String, Object> resultMap = sqlUtil.search(sql, email);

		return String.valueOf(resultMap.get("validate_code"));

	}

	/**
	 * 通过邮箱号查找用户
	 * 
	 * @param email
	 * @return
	 */
	public BaseUser findBaseUserByEmail(String email) {

		String sql = "select status, emailstatus as emailStatus, validate_code as validateCode from bi_base_user where email = ?";

		BaseUser baseUser = sqlUtil.search(BaseUser.class, sql, email);

		return baseUser;

	}
	
	/**
	 * 根据uid查找用户
	 * 
	 * @param email
	 * @return
	 */
	public BaseUser findBaseUserByUid(String uid) {

		String sql = "select user_type as userType from bi_base_user where uid = ?";

		BaseUser baseUser = sqlUtil.search(BaseUser.class, sql, uid);

		return baseUser;

	}

	/**
	 * 将邮箱状态置为已激活
	 * 
	 * @param email
	 */
	public void validEmailStatus(String email) {

		String validStartDate = DateUtils.getDate();
		//String validEndDate = FinalConstants.VALID_END_DATE;
		String validEndDate = DateUtils.formatDate(DateUtils.addMonths(new Date(), 1), "yyyy-MM-dd");//默认的旗舰版有效日期1个月
		String sql = "update bi_base_user set emailstatus = 1, valid_start_date = ?, valid_end_date = ? where email = ?";

		sqlUtil.update(sql, validStartDate, validEndDate, email);

	}

	/**
	 * 通过用户名、密码获取登录用户
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public BaseUser getBaseUserByUP(String username, String password) {

//		String sql = "select t1.shop_name as shopName, t1.points, t1.user_type as userType, t1.industry, t1.channel, t1.contact_person as contactPerson, t1.contact_tel as contactTel, t1.company_name as companyName, "
//				+ " t1.valid_start_date as validStartDate, t1.valid_end_date as validEndDate, t1.username, t1.password, t1.email, t1.groupid as groupId,t2.group_name as groupName, t1.regdate as regDate, t1.createtime as createTime,"
//				+ " t1.pay, t1.paydate as payDate,t1.uid FROM bi_base_user t1 left join bi_base_group t2 on t1.groupid = t2.gid where (t1.username = ? or t1.email = ?) and t1.password = ? and t1.status = 1 and t1.emailstatus = 1";

		String sql = "select t1.shop_name as shopName, t1.points, t1.user_type as userType, t1.industry, t1.channel, t1.contact_person as contactPerson,"
		 +" t1.contact_tel as contactTel, t1.company_name as companyName,  t1.valid_start_date as validStartDate, t1.valid_end_date as validEndDate,"
		 +" t1.username, t1.password, t1.email, t1.groupid as groupId,t2.group_name as groupName, t1.regdate as regDate, t1.createtime as createTime,"
		 +" t1.pay, t1.paydate as payDate,t1.uid,t2.goods_num as goodsNum, t2.shop_num as shopNum, t2.market_num as marketNum,"
		+" t2.scalp_num as scalpNum, t2.hot_num as hotNum, t2.brand_num as brandNum FROM tbweb.bi_base_user t1"
		 +" left join tbweb.bi_base_group t2 on t1.groupid = t2.gid "
		 +" where (t1.username = ? or t1.email = ?) and t1.password = ?"
		 +" and t1.status = 1 and t1.emailstatus = 1";
		
		BaseUser baseUser = sqlUtil.search(BaseUser.class, sql, username, username, password);

		return baseUser;

	}
	
	/**
	 * 通过uid获取用户信息
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public BaseUser getBaseUserByUid(String uid) {

		String sql = "select  t1.shop_name as shopName, t1.points, t1.user_type as userType, t1.industry, t1.channel, t1.contact_person as contactPerson, t1.contact_tel as contactTel, t1.company_name as companyName, "
				+ " t1.valid_start_date as validStartDate, t1.valid_end_date as validEndDate, t1.username, t1.password, t1.email, t1.groupid as groupId,t2.group_name as groupName, t1.regdate as regDate, t1.createtime as createTime,"
				+ " t1.pay, t1.paydate as payDate,t1.uid FROM bi_base_user t1 left join bi_base_group t2 on t1.groupid = t2.gid where t1.uid = ? and t1.status = 1 and t1.emailstatus = 1";

		BaseUser baseUser = sqlUtil.search(BaseUser.class, sql, uid);

		return baseUser;

	}

	/**
	 * 重置密码
	 * 
	 * @param email
	 */
	public void resetPassword(String newPassword, String email) {

		String sql = "update bi_base_user set password = ? where email = ?";

		sqlUtil.update(sql, new Object[] { newPassword, email });

	}
	
	/**
	 * 完善个人信息
	 * 
	 * @param email
	 */
	public void editPerson(String contactPerson, String contactTel, String industry, String channel, String uid, String shopName) {
		
		BaseUser baseUser = findBaseUserByUid(uid);
		
		String sql = "update bi_base_user set user_type = 'RadioButtonPerson',industry = ?,channel=?,contact_person=?,contact_tel=?,shop_name=? where uid = ?";
		
		if(StringUtils.isBlank(baseUser.getUserType())){//第一次完善个人信息，需要增加500积分
			sql = "update bi_base_user set points = points+500,user_type = 'RadioButtonPerson',industry = ?,channel=?,contact_person=?,contact_tel=?,shop_name=? where uid = ?";
			
			try {
				
				JDBCUtils.startTransaction();
				sqlUtil.update(JDBCUtils.getConnection(), sql,industry, channel, contactPerson, contactTel, shopName, uid);
				
				//添加到积分记录表
				PointsLog points = new PointsLog();
				points.setPoints(500);
				points.setPointsType(1);
				points.setRemark("完善个人资料奖励");
				points.setUid(uid);
				
				sqlUtil.insert(JDBCUtils.getConnection(), points);
				
				JDBCUtils.commitTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
				JDBCUtils.rollbackTransaction();
			} finally{
				JDBCUtils.closeConnection();
			}
		}else{
			sqlUtil.update(sql, industry, channel, contactPerson, contactTel, shopName, uid);
		}

	}
	
	/**
	 * 完善企业信息
	 * 
	 * @param email
	 */
	public void editCompany(String contactPerson, String contactTel, String industry, String channel,String companyName, String uid, String shopName) {

		BaseUser baseUser = findBaseUserByUid(uid);

		String sql = "update bi_base_user set user_type = 'RadioButtonOrg',industry = ?,channel=?,contact_person=?,contact_tel=?, company_name=?, shop_name = ? where uid = ?";
		if(StringUtils.isBlank(baseUser.getUserType())){//第一次完善个人信息，需要增加500积分
			sql = "update bi_base_user set points = points + 500, user_type = 'RadioButtonOrg',industry = ?,channel=?,contact_person=?,contact_tel=?, company_name=?, shop_name = ? where uid = ?";
			
			try {
				
				JDBCUtils.startTransaction();
				sqlUtil.update(JDBCUtils.getConnection(), sql,industry, channel, contactPerson, contactTel,companyName, shopName, uid);
				
				//添加到积分记录表
				PointsLog points = new PointsLog();
				points.setPoints(500);
				points.setPointsType(1);
				points.setRemark("完善个人资料奖励");
				points.setUid(uid);
				
				sqlUtil.insert(JDBCUtils.getConnection(), points);
				
				JDBCUtils.commitTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
				JDBCUtils.rollbackTransaction();
			} finally{
				JDBCUtils.closeConnection();
			}
		}else{
			sqlUtil.update(sql,industry, channel, contactPerson, contactTel,companyName, shopName, uid);
		}

	}

	/**
	 * 修改有效日期
	 * 
	 * @param validStartDate
	 * @param validEndDate
	 * @param groupName
	 */
	public void updateValidDate(String validStartDate, String validEndDate, String groupName, String email) {

		String sql = "update bi_base_user set valid_start_date = ?, valid_end_date = ?,"
				+ " groupid = (select max(gid) from bi_base_group t where t.group_name = ?)  where email = ?";

		sqlUtil.update(sql, new Object[] { validStartDate, validEndDate, groupName, email });

	}
	
	public void updateValidDate2(String validStartDate, String validEndDate, String groupId, String email) {

		String sql = "update bi_base_user set valid_start_date = ?, valid_end_date = ?, groupid = ?  where email = ?";

		sqlUtil.update(sql, new Object[] { validStartDate, validEndDate, groupId, email });

	}

}
