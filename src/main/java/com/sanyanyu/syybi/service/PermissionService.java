package com.sanyanyu.syybi.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.constants.FinalConstants;
import com.sanyanyu.syybi.entity.BaseGroup;
import com.sanyanyu.syybi.entity.BasePermission;
import com.sanyanyu.syybi.utils.JDBCUtils;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 初始化权限
 * 
 * @Description: 目前暂时手动执行
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月28日 下午4:37:11
 * @version V1.0
 */
public class PermissionService extends BaseService {

	public static void main(String[] args) {

		PermissionService service = new PermissionService();

		service.init();

	}

	public int getFreeEditionDays() throws Exception{
		
		int days = 0;
		
		String sql = "SELECT usable_time FROM tbweb.bi_base_group where gid = 'FREE_EDITION'";
		Map<String, Object> map = sqlUtil.search(sql);
		
		if(map != null && !map.isEmpty()){
			String ut = map.get("usable_time").toString();
			
			if(ut.indexOf("周") > -1){
				
				days = 7 * StringUtils.toInteger(ut.replace("周", ""));
				
			}
			//TODO:转换其他计量单位
			
		}
		
		return days;
		
	}
	
	public List<BaseGroup> getAllGroups() throws Exception{
		
		String sql = "SELECT gid, group_name as groupName, price_month as priceMonth, price_quarter as priceQuarter, price_year as priceYear,apply_user as applyUser,"
				+" goods_num as goodsNum, industry_num as industryNum, price_quarter_old as priceQuarterOld, price_year_old as priceYearOld, shop_num as shopNum, market_num as marketNum,"
				+" scalp_num as scalpNum, hot_num as hotNum, brand_num as brandNum,promise, service_support as serviceSupport, usable_time as usableTime FROM tbweb.bi_base_group order by price_month";
		
		return sqlUtil.searchList(BaseGroup.class, sql);
		
	}
	
	public List<BasePermission> getUserPermissions(String uid){
		
		String sql = "select t4.perm_no as permNo from bi_base_user t1 left join bi_base_group t2 on t1.groupid = t2.gid"
				+" left join bi_base_group_perm t3 on t2.gid = t3.gid left join bi_base_permission t4 on t3.pid = t4.pid where t1.uid = ?";
		
		return sqlUtil.searchList(BasePermission.class, sql, uid);
		
	}
	
	public void init() {

		//清除权限信息
		
		List<BaseGroup> baseGroupList = new ArrayList<BaseGroup>();
		BaseGroup baseGroup1 = new BaseGroup();
		baseGroup1.setGid(FinalConstants.GROUP_FREE_EDITION);
		baseGroup1.setApplyUser("适合初级个人用户");
		baseGroup1.setGroupName("免费版");
		baseGroup1.setIndustryNum(1);
		baseGroup1.setGoodsNum(1);
		baseGroup1.setPriceQuarter(-1);
		baseGroup1.setPriceYear(-1);
		baseGroup1.setPriceQuarterOld(-1);
		baseGroup1.setPriceYearOld(-1);
		baseGroup1.setServiceSupport("QQ群、论坛、邮件");
		baseGroup1.setUsableTime("1周");

		BaseGroup baseGroup2 = new BaseGroup();
		baseGroup2.setGid(FinalConstants.GROUP_PROFESSIONAL_EDITION);
		baseGroup2.setApplyUser("适合专业级个人用户");
		baseGroup2.setGroupName("专业版");
		baseGroup2.setIndustryNum(1);
		baseGroup2.setGoodsNum(10);
		baseGroup2.setPriceMonth(688);
		baseGroup2.setPriceQuarter(1888);
		baseGroup2.setPriceYear(6888);
		baseGroup2.setPriceQuarterOld(3999);
		baseGroup2.setPriceYearOld(12999);
		baseGroup2.setShopNum(10);
		baseGroup2.setHotNum(10);
		baseGroup2.setServiceSupport("专业版QQ群");
		baseGroup2.setPromise("包年套餐签订软件服务合同，提供全方位售后保障");

		BaseGroup baseGroup3 = new BaseGroup();
		baseGroup3.setGid(FinalConstants.GROUP_ULTIMATE_EDITION);
		baseGroup3.setApplyUser("适合小型团队或企业");
		baseGroup3.setGroupName("旗舰版");
		baseGroup3.setIndustryNum(1);
		baseGroup3.setGoodsNum(30);
		baseGroup3.setShopNum(30);
		baseGroup3.setMarketNum(3);
		baseGroup3.setScalpNum(3);
		baseGroup3.setHotNum(50);
		baseGroup3.setServiceSupport("技术支持：旗舰版QQ群、电话；一对一专属优质服务");
		baseGroup3.setPromise("包年套餐签订软件服务合同，提供全方位金牌保障");
		baseGroup3.setPriceMonth(1688);
		baseGroup3.setPriceQuarter(4888);
		baseGroup3.setPriceYear(16888);
		baseGroup3.setPriceQuarterOld(8999);
		baseGroup3.setPriceYearOld(32999);
		

		BaseGroup baseGroup4 = new BaseGroup();
		baseGroup4.setGid(FinalConstants.GROUP_ENTERPRISE_EDITION);
		baseGroup4.setApplyUser("适合中大型企业");
		baseGroup4.setGroupName("企业版");
		baseGroup4.setIndustryNum(1);
		baseGroup4.setGoodsNum(60);
		baseGroup4.setShopNum(60);
		baseGroup4.setMarketNum(6);
		baseGroup4.setScalpNum(6);
		baseGroup4.setHotNum(100);
		baseGroup4.setBrandNum(6);
		baseGroup4.setServiceSupport("多项企业级专属功能；一对一专属优质服务");
		baseGroup4.setPromise("包年套餐签订软件服务合同，提供全方位企业级保障");
		
		baseGroup4.setPriceMonth(2688);
		baseGroup4.setPriceQuarter(8888);
		baseGroup4.setPriceYear(26888);
		baseGroup4.setPriceQuarterOld(16999);
		baseGroup4.setPriceYearOld(56999);

		baseGroupList.add(baseGroup1);
		baseGroupList.add(baseGroup2);
		baseGroupList.add(baseGroup3);
		baseGroupList.add(baseGroup4);
		
		JDBCUtils.startTransaction();
		try {
			//先清除
			sqlUtil.delete("delete from tbweb.bi_base_group");
			
			// 保存权限组
			sqlUtil.batchInsert(JDBCUtils.getConnection(), BaseGroup.class, baseGroupList);
			JDBCUtils.commitTransaction();

		} catch (SQLException e) {
			JDBCUtils.rollbackTransaction();
		} finally {
			JDBCUtils.closeConnection();
		}

		/*List<BasePermission> bpList = new ArrayList<BasePermission>();
		BasePermission bp1 = new BasePermission();
		bp1.setPermName("产品预测");
		BasePermission bp2 = new BasePermission();
		bp2.setPermName("类目分析");
		BasePermission bp3 = new BasePermission();
		bp3.setPermName("行业分析");
		BasePermission bp4 = new BasePermission();
		bp4.setPermName("品牌分析");
		BasePermission bp5 = new BasePermission();
		bp5.setPermName("产品分析");

		bpList.add(bp1);
		bpList.add(bp2);
		bpList.add(bp3);
		bpList.add(bp4);
		bpList.add(bp5);

		JDBCUtils.startTransaction();
		try {
			// 保存权限
			sqlUtil.batchInsert(JDBCUtils.getConnection(), BasePermission.class, bpList);

			// 保存权限组
			sqlUtil.batchInsert(JDBCUtils.getConnection(), BaseGroup.class, baseGroupList);
			JDBCUtils.commitTransaction();// 先提交下数据，方便反查id

			// 保存权限组与权限的关系
			// sqlUtil.batchInsert(JDBCUtils.getConnection(),
			// GroupPermission.class, gpList);

			// JDBCUtils.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			JDBCUtils.rollbackTransaction();
		} finally {
			JDBCUtils.closeConnection();
		}

		List<GroupPermission> gpList = new ArrayList<GroupPermission>();

		// 免费版授权
		Integer gid1 = getGidByName(baseGroup1.getGroupName());
		Integer pid4 = getPidByName(bp4.getPermName());
		Integer pid5 = getPidByName(bp5.getPermName());

		GroupPermission gp1_1 = new GroupPermission();
		gp1_1.setGid(gid1);
		gp1_1.setPid(pid4);
		GroupPermission gp1_2 = new GroupPermission();
		gp1_2.setGid(gid1);
		gp1_2.setPid(pid5);
		gpList.add(gp1_1);
		gpList.add(gp1_2);

		// 专业版授权
		Integer gid2 = getGidByName(baseGroup2.getGroupName());
		GroupPermission gp2_1 = new GroupPermission();
		gp2_1.setGid(gid2);
		gp2_1.setPid(pid4);
		GroupPermission gp2_2 = new GroupPermission();
		gp2_2.setGid(gid2);
		gp2_2.setPid(pid5);
		gpList.add(gp2_1);
		gpList.add(gp2_2);

		// 旗舰版授权
		Integer gid3 = getGidByName(baseGroup3.getGroupName());
		Integer pid2 = getPidByName(bp2.getPermName());
		Integer pid3 = getPidByName(bp3.getPermName());

		GroupPermission gp3_1 = new GroupPermission();
		gp3_1.setGid(gid3);
		gp3_1.setPid(pid4);
		GroupPermission gp3_2 = new GroupPermission();
		gp3_2.setGid(gid3);
		gp3_2.setPid(pid5);
		GroupPermission gp3_3 = new GroupPermission();
		gp3_3.setGid(gid3);
		gp3_3.setPid(pid2);
		GroupPermission gp3_4 = new GroupPermission();
		gp3_4.setGid(gid3);
		gp3_4.setPid(pid3);
		gpList.add(gp3_1);
		gpList.add(gp3_2);
		gpList.add(gp3_3);
		gpList.add(gp3_4);

		// 企业版授权
		Integer gid4 = getGidByName(baseGroup4.getGroupName());
		Integer pid1 = getPidByName(bp1.getPermName());

		GroupPermission gp4_1 = new GroupPermission();
		gp4_1.setGid(gid4);
		gp4_1.setPid(pid4);
		GroupPermission gp4_2 = new GroupPermission();
		gp4_2.setGid(gid4);
		gp4_2.setPid(pid5);
		GroupPermission gp4_3 = new GroupPermission();
		gp4_3.setGid(gid4);
		gp4_3.setPid(pid2);
		GroupPermission gp4_4 = new GroupPermission();
		gp4_4.setGid(gid4);
		gp4_4.setPid(pid3);
		GroupPermission gp4_5 = new GroupPermission();
		gp4_5.setGid(gid4);
		gp4_5.setPid(pid1);
		gpList.add(gp4_1);
		gpList.add(gp4_2);
		gpList.add(gp4_3);
		gpList.add(gp4_4);
		gpList.add(gp4_5);

		JDBCUtils.startTransaction();
		try {

			// 保存权限组与权限的关系
			sqlUtil.batchInsert(JDBCUtils.getConnection(), GroupPermission.class, gpList);

			JDBCUtils.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			JDBCUtils.rollbackTransaction();
		} finally {
			JDBCUtils.closeConnection();
		}*/

	}

	/**
	 * 通过权限名反查id
	 * 
	 * @param name
	 * @return
	 */
	public Integer getPidByName(String name) {

		String sql = "select pid from bi_base_permission where perm_name = ?";

		Map<String, Object> map = sqlUtil.search(sql, name);

		return StringUtils.toInteger(map.get("pid"));

	}

	/**
	 * 通过权限组名反查id
	 * 
	 * @param name
	 * @return
	 */
	public Integer getGidByName(String name) {

		String sql = "select gid from bi_base_group where group_name = ?";

		Map<String, Object> map = sqlUtil.search(sql, name);

		return StringUtils.toInteger(map.get("gid"));

	}

}
