package com.sanyanyu.syybi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.constants.FinalConstants;
import com.sanyanyu.syybi.entity.CatData;
import com.sanyanyu.syybi.entity.CatEntity;
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.HotShop;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.SqlUtil;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 类目Service
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月1日 下午8:59:43 
 * @version V1.0
 */
public class CatService extends BaseService {

	public CatService(){}
	
	public CatService(SqlUtil sqlUtil){
		this.sqlUtil = sqlUtil;
	}
	
	/**
	 * 根据父级类目的编号查找它的子类目
	 * @param parentNo 父级类目编号
	 * @return
	 * @throws Exception
	 */
	public List<CatEntity> getChildCatsByCatNo(String parentNo) throws Exception {
		
		String sql = "select cat_no as catNo, cat_name as catName, isparent as isParent, cat_path from tbbase.tb_base_cat_api where parent_no = ? order by cat_name_single";
		
		return sqlUtil.searchList(CatEntity.class, sql, parentNo);
		
	}
	
	/**
	 * 获取叶子节点对应的属性列表
	 * @param catNo
	 * @return
	 * @throws Exception
	 */
	public List<CatEntity> getChildPropsByCatNo(String catNo) throws Exception{
		
		String sql = "select prop_name as propName from tbbase.tb_base_cat_prop where cat_no = ? and prop_name <> '品牌'";
		
		return sqlUtil.searchList(CatEntity.class, sql, catNo);
		
	}
	
	/**
	 * 根据类目编号获取父级类目或者行业
	 * @param childNo
	 * @return
	 * @throws Exception
	 */
	public CatEntity getParentByCatNo(String childNo) throws Exception{
		
		//获取父级
		String sql = "select distinct iid as catNo, ind_name as catName, 'ind' as flag, '' as cat_path from  tbbase.tb_base_cat_api where iid = (select iid from tbbase.tb_base_cat_api where cat_no = ? limit 1)"
				+" union all"
				+" select cat_no as catNo, cat_name as catName, 'cat' as flag, cat_path from  tbbase.tb_base_cat_api where cat_no = (select parent_no from tbbase.tb_base_cat_api where cat_no = ? limit 1)";
		
		return sqlUtil.search(CatEntity.class, sql, childNo, childNo);
	}
	
	/**
	 * 根据行业id查找该行业下面的子类目
	 * @param iid 行业id
	 * @return
	 * @throws Exception
	 */
	public List<CatEntity> getCatesByIid(String iid, String uid) throws Exception{
		
		//String sql = "select cat_no as catNo, cat_name as catName, isparent as isParent from tbbase.tb_base_cat_api where iid = ? order by cat_name_single";
		
		String sql = "select t1.cat_no as catNo, t1.cat_name as catName, t1.isparent as isParent, t2.att_cat, t1.cat_path from tbbase.tb_base_cat_api t1"
		 +" left join tbweb.tb_attn_cat t2 on t1.cat_no = t2.att_cat  and t2.uid = ? where t1.iid = ? order by t1.cat_name_single";
		
		return sqlUtil.searchList(CatEntity.class, sql, uid, iid);
	}
	
	/**
	 * 检索行业模块时返回的数据
	 * @param iid
	 * @param uid
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<CatData> getCateDatasByIid2(String iid, String uid, String startMonth, String endMonth, String shopType,  PageParam pageParam) throws Exception{
		
		List<CatData> list = this.getCateDatasByIid(iid, uid, startMonth, endMonth, shopType, pageParam);
		
		PageEntity<CatData> pageEntity = PageEntity.getPageEntity(pageParam, list);
		 
		return pageEntity;
		
	}
	
	/**
	 * 检索子行业模块时返回的数据
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<CatData> getCateDatasByCatNo2(String catNo, String startMonth, String endMonth, String shopType,  PageParam pageParam, String chartWay) throws Exception{
		
		List<CatData> list = this.getCateDatasByCatNo(catNo, startMonth, endMonth, shopType, pageParam, chartWay);
		
		PageEntity<CatData> pageEntity = PageEntity.getPageEntity(pageParam, list);
		 
		return pageEntity;
		
	}
	
	/**
	 * 获取行业下的叶子节点
	 * @param iid
	 * @param uid
	 * @return
	 */
	private List<Map<String, Object>> getLeafListByIid(String iid, String uid){
		
		return getLeafListByIid(iid, uid, null);
	}
	
	private List<Map<String, Object>> getLeafListByIid(String iid, String uid, String catPath){
		//查找类目对应的叶子节点
		String sql = "";
		if(StringUtils.isNotBlank(catPath)){
			sql = "select t1.cat_no,ifnull(tbbase.getLeafLstByPath(CONCAT('"+catPath+"', ' » ', t1.cat_name)),t1.cat_no) as leafNo from tbbase.tb_base_cat_api t1" 
					+" join tbweb.tb_attn_cat t2 on t1.cat_no = t2.att_cat and t2.uid = ?"
					+" where t1.iid = ?";
		}else{
			sql = "select t1.cat_no,ifnull(tbbase.getLeafLstByPath(t1.cat_name),t1.cat_no) as leafNo from tbbase.tb_base_cat_api t1" 
					+" join tbweb.tb_attn_cat t2 on t1.cat_no = t2.att_cat and t2.uid = ?"
					+" where t1.iid = ?";
		}
		
		List<Map<String, Object>> leafList = sqlUtil.searchList(sql, uid, iid);
		
		return leafList;
	}
	
	/**
	 * 获取类目下的每个子类目对应的叶子节点
	 * @param catNo
	 * @return
	 */
	private List<Map<String, Object>> getLeafListByCatNo(String catNo){
		
		String sql = "select cat_no, ifnull(tbbase.getLeafLst(cat_no),cat_no) as leafNo from tbbase.tb_base_cat_api where parent_no = ?";
		
		return sqlUtil.searchList(sql, catNo);
		
	}
	
	private List<Map<String, Object>> getLeafListByCatNo(String catNo, String catPath){
		
		String sql = "select cat_no, ifnull(tbbase.getLeafLstByPath(CONCAT('"+catPath+"', ' » ', cat_name)),cat_no) as leafNo from tbbase.tb_base_cat_api where parent_no = ?";
		
		return sqlUtil.searchList(sql, catNo);
		
	}
	
	/**
	 * 获取指定catNos的叶子节点
	 * @param catNos
	 * @return
	 */
	private List<Map<String, Object>> getCatNosLeafList(String catNos){
		//查找类目对应的叶子节点
		String sql = "select t1.cat_no,tbbase.getLeafLst(t1.cat_no) as leafNo from tbbase.tb_base_cat_api t1 where t1.cat_no in ("+StringUtils.strIn(catNos)+")";
		
		List<Map<String, Object>> leafList = sqlUtil.searchList(sql);
		
		return leafList;
	}
	
	/**
	 * 品牌分析-行业分析
	 * @param catNos
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<CatData> getCateDatasByBrand(String catNos, String startMonth, String endMonth, String shopType, PageParam pageParam) throws Exception{
		
		List<Map<String, Object>> leafList = getCatNosLeafList(catNos);
		
		List<CatData> list = getCatDataByMonths(leafList, startMonth, endMonth, shopType, pageParam, null);
		
		return PageEntity.getPageEntity(pageParam, list);
		
	}
	
	/**
	 * 获取类目下所有叶子节点
	 * @param catNo
	 * @return
	 */
	public Map<String, Object> getLeafListByCatNo2(String catNo){
		
		String sql = "select tbbase.getLeafLst(?) as leafNo";
		
		return sqlUtil.search(sql, catNo);
		
	}
	
	/**
	 * 统计类目的销量、销售额、成交次数
	 * @param leafList
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 */
	private List<CatData> getCatDataByMonths(List<Map<String, Object>> leafList, String startMonth, String endMonth, String shopType, PageParam pageParam, String chartWay){
		
		StringBuffer sb = new StringBuffer();
		 
		sb.append("select t2.cat_no,t3.cat_name,t2.sales_volume, round(t2.sales_volume/sum(t2.sales_volume)*100,2) as volumeWeight,t2.sales_amount, round(t2.sales_amount/sum(t2.sales_amount)*100,2) as amountWeight,t2.tran_count, round(t2.tran_count/sum(t2.tran_count)*100,2) as countWeight from ("); 
		
		if(StringUtils.isBlank(startMonth)){
			startMonth = DateUtils.getCurMonth();
		}
		if(StringUtils.isBlank(endMonth)){
			endMonth = DateUtils.getCurMonth();
		}
		if(StringUtils.isBlank(shopType)){
			shopType = FinalConstants.DEFAULT_SHOP_TYPE;
		}
		
		for(int i = 0; i < leafList.size(); i++){
			
			Map<String, Object> leaf = leafList.get(i);
			
			sb.append(" select '").append(leaf.get("cat_no")).append("' as cat_no, ifnull(sum(t1.sales_volume),0) as sales_volume,ifnull(sum(t1.sales_amount),0) as sales_amount,ifnull(sum(t1.tran_count),0) as tran_count from tbdaily.tb_tran_month_cat t1")
			.append(" where t1.cat_no in (").append(StringUtils.strIn(leaf.get("leafNo").toString())).append(")")
			.append(" and str_to_date(t1.tran_month,'%Y-%m') between str_to_date('"+startMonth+"', '%Y-%m') and str_to_date('"+endMonth+"', '%Y-%m') ");
			
			if(!"ALL".equals(shopType)){
				sb.append(" and t1.shop_type = '"+shopType+"'");
			}
			
			if(i != leafList.size() - 1){
				sb.append(" union all ");
			}
		}
		
		sb.append(" ) t2 left join tbbase.tb_base_cat_api t3 on t2.cat_no = t3.cat_no group by t2.cat_no");

		String pageSql = "";
		if(pageParam != null){
			
			if(StringUtils.isNotBlank(chartWay)){
				pageParam.setoTag("t2");
				if("volume".equals(chartWay)){
					pageParam.setOrderColumn("sales_volume");
				}else if("amount".equals(chartWay)){
					pageParam.setOrderColumn("sales_amount");
				}else if("count".equals(chartWay)){
					pageParam.setOrderColumn("tran_count");
				}
				pageParam.setOrderDir("desc");
			}
			
			pageSql = pageParam.buildSql(sb.toString());
			
			
		}else{
			
			if(StringUtils.isNotBlank(chartWay)){
				if("volume".equals(chartWay)){
					pageSql = sb.append(" order by t2.sales_volume desc").toString();
				}else if("amount".equals(chartWay)){
					pageSql = sb.append(" order by t2.sales_amount desc").toString();
				}else if("count".equals(chartWay)){
					pageSql = sb.append(" order by t2.tran_count desc").toString();
				}
				
			}else{
				pageSql = sb.append(" order by t3.cat_name_single desc").toString();
			}
			
		}
		
		List<CatData> list = sqlUtil.searchList(CatData.class, pageSql);
		
		return list;
	}
	
	/**
	 * 点击行业时返回给行业规模的数据，为柱状图提供数据
	 * @param iid
	 * @param uid
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public List<CatData> getCateDatasByIid(String iid, String uid, String startMonth, String endMonth, String shopType, PageParam pageParam) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByIid(iid, uid);
		
		List<CatData> list = getCatDataByMonths(leafList, startMonth, endMonth, shopType, pageParam, null);
		
		return list;
		
	}
	
	/**
	 * 点击类目时返回给子行业模块的数据，为柱状图提供数据
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public List<CatData> getCateDatasByCatNo(String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByCatNo(catNo);
		
		List<CatData> list = getCatDataByMonths(leafList, startMonth, endMonth, shopType, pageParam, null);
		
		return list;
		
	}
	
	public List<CatData> getCateDatasByCatNo(String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam, String chartWay) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByCatNo(catNo);
		
		List<CatData> list = getCatDataByMonths(leafList, startMonth, endMonth, shopType, pageParam, chartWay);
		
		return list;
		
	}
	
	public List<CatData> getCateDatasByCatNo(String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam, String chartWay, String catPath) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByCatNo(catNo, catPath);
		
		List<CatData> list = getCatDataByMonths(leafList, startMonth, endMonth, shopType, pageParam, chartWay);
		
		return list;
		
	}
	
	/**
	 * 封装获取行业趋势的数据业务逻辑
	 * @param leafList
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @return
	 */
	private List<Map<String, Object>> getIndTrendDatas(List<Map<String, Object>> leafList, String startMonth, String endMonth, String shopType){
		
		List<String> monthList = DateUtils.getMonthListBetweenDates(startMonth, endMonth);
		StringBuffer colTags = new StringBuffer();
		StringBuffer colTags2 = new StringBuffer();
		StringBuffer colTags3 = new StringBuffer();
		StringBuffer cols = new StringBuffer();
		StringBuffer cols2 = new StringBuffer();
		StringBuffer cols3 = new StringBuffer();
		for(int i = 0; i < monthList.size(); i++){
			
			String month = monthList.get(i);
			
			String cTag = "a"+month.replace("-", "");
			colTags.append(cTag);
			
			String cTag2 = "b"+month.replace("-", "");
			colTags2.append(cTag2);
			
			String cTag3 = "c"+month.replace("-", "");
			colTags3.append(cTag3);
			
			
			cols.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.sales_volume,0)),0) as ").append(cTag);
			
			cols2.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.sales_amount,0)),0) as ").append(cTag2);
			
			cols3.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.tran_count,0)),0) as ").append(cTag3);
			
			if(i != monthList.size() - 1){
				
				colTags.append(",");
				cols.append(",");
				
				colTags2.append(",");
				cols2.append(",");
				
				colTags3.append(",");
				cols3.append(",");
			}
			
		}
		
		StringBuffer sb = new StringBuffer();
		
		sb.append("select t2.cat_no,t3.cat_name,").append(colTags).append(",").append(colTags2).append(",").append(colTags3).append(" from (");
		
		for(int i = 0; i < leafList.size(); i++){
			
			Map<String, Object> leaf = leafList.get(i);
			
			sb.append("select '").append(leaf.get("cat_no")).append("' as cat_no,").append(cols).append(",").append(cols2).append(",").append(cols3)
			.append(" from tbdaily.tb_tran_month_cat t1")
			.append(" where t1.cat_no in (").append(StringUtils.strIn(leaf.get("leafNo").toString())).append(")")
			.append(" and str_to_date(t1.tran_month,'%Y-%m') between str_to_date('"+startMonth+"', '%Y-%m') and str_to_date('"+endMonth+"', '%Y-%m') ");
			
			if(!"ALL".equals(shopType)){
				sb.append(" and t1.shop_type = '"+shopType+"'");
			}
			
			if(i != leafList.size() - 1){
				sb.append(" union all ");
			}
		}
		
		sb.append(" ) t2 left join tbbase.tb_base_cat_api t3 on t2.cat_no = t3.cat_no order by t3.cat_name_single");
		
		return sqlUtil.searchList(sb.toString());
		
	}
	
	/**
	 * 获取行业趋势数据（第一层）
	 * @param iid
	 * @param uid
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getIndTrends(String iid, String uid, String startMonth, String endMonth, String shopType) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByIid(iid, uid);
		
		List<Map<String, Object>> list = getIndTrendDatas(leafList, startMonth, endMonth, shopType);
		
		return list;
		
	}
	
	public List<Map<String, Object>> getIndTrends(String catNos, String startMonth, String endMonth, String shopType) throws Exception{
		
		List<Map<String, Object>> leafList = this.getCatNosLeafList(catNos);
		
		List<Map<String, Object>> list = getIndTrendDatas(leafList, startMonth, endMonth, shopType);
		
		return list;
		
	}
	
	/**
	 * 获取子行业趋势数据
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getIndTrendSubs(String catNo, String startMonth, String endMonth, String shopType) throws Exception{
		
		List<Map<String, Object>> leafList = getLeafListByCatNo(catNo);
		
		List<Map<String, Object>> list = getIndTrendDatas(leafList, startMonth, endMonth, shopType);
		
		return list;
		
	}
	
	/**
	 * 检索类目
	 * @param queryCatName 查询条件：类目名称
	 * @return
	 * @throws Exception
	 */
	public List<CatEntity> queryCat(String queryCatName, String uid) throws Exception{
		
//		String sql = "select * from (select distinct iid as catNo, ind_name as catName, 1 as isParent,  'ind' as flag,  cat_name_single from tbbase.tb_base_cat_api where ind_name like '%"+queryCatName+"%'"
//					+" union all"
//					+" select cat_no as catNo, cat_name as catName, isparent as isParent, 'cat' as flag, cat_name_single  from tbbase.tb_base_cat_api where cat_name like '%"+queryCatName+"%') t  order by t.cat_name_single";
		
		 String sql = "select t1.cat_no as catNo, t1.cat_name as catName, t1.isparent as isParent, 'cat' as flag, t1.cat_name_single,t4.att_cat,t1.top_cat, t1.cat_path  from tbbase.tb_base_cat_api t1"
				 +" left join (select t2.att_cat, t3.top_cat from tbweb.tb_attn_cat t2 join tbbase.tb_base_cat_api t3 on t2.att_cat = t3.cat_no and t2.uid = ? ) t4 on t1.top_cat = t4.top_cat"
				 +" where t1.cat_name like '%"+queryCatName+"%' order by t1.cat_name_single";
		
		return sqlUtil.searchList(CatEntity.class, sql, uid);
		
	}
	
	/**
	 * 获取热销宝贝数据
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<HotGoods> getHotGoods(String uid, String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam, String flag) throws Exception{
		
		String catNoIns = "";
		if("ind".equals(flag)){
			Map<String, Object> leaf = this.getLeafListByCatNo2(catNo);
			catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
		}else if("brand".equals(flag)){
			catNoIns = catNo;
		}
		
		StringBuffer sb = new StringBuffer();
		
		List<Object> params = new ArrayList<Object>();
		params.add(startMonth);
		params.add(endMonth);
		
		sb.append(" select (@rowNum:=@rowNum+1) as rowNum,concat_ws(',',tt2.shop_id, tt2.item_id) as asid, tt1.* from (")
		 .append(" select t2.prd_img,t2.prd_name,t1.avg_price, round(avg(t1.avg_price_tran),2) as avg_price_tran,sum(t1.sales_volume) as sales_volume,sum(t1.sales_amount) as sales_amount,")
		.append(" sum(t1.tran_count) as tran_count,t1.shop_name,t1.shop_id,t1.shop_type,t2.region,t2.item_id from  tbdaily.tb_tran_month t1 ")
		.append(" join tbbase.tb_base_product t2 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id")
		.append(" where str_to_date(t1.tran_month,'%Y-%m') between str_to_date(?, '%Y-%m') and str_to_date(?, '%Y-%m')");
		
		if(!"ALL".equals(shopType)){
			sb.append(" and t1.shop_type = ?");
			params.add(shopType);
		}
		
		sb.append(" and t2.cat_no in ("+catNoIns+") GROUP BY t2.item_id");
		
		String pageSql = pageParam.buildSql(sb.toString());
		
		pageSql += " limit 0, 100";
		
		pageSql += ") tt1"
				+" left join (select a1.shop_id, a1.item_id from tbweb.tb_attn_dir_detail a1 join tbweb.tb_attn_dir a2 on a2.adid = a1.adid"
				+" where a2.uid = ? group by a1.shop_id, a1.item_id)  tt2 on tt1.shop_id = tt2.shop_id and tt1.item_id = tt2.item_id ,(Select (@rowNum :=0) ) tt ";
		
		params.add(uid);
		
		List<HotGoods> list = sqlUtil.searchList(HotGoods.class, pageSql, params.toArray());
		
		return PageEntity.getPageEntity(pageParam, list);
		
	}
	
	/**
	 * 热销店铺
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<HotShop> getHotShops(String uid, String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam, String flag) throws Exception{
		
		String catNoIns = "";
		if("ind".equals(flag)){
			Map<String, Object> leaf = this.getLeafListByCatNo2(catNo);
			catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
		}else if("brand".equals(flag)){
			catNoIns = catNo;
		}
		
		
		StringBuffer sb = new StringBuffer();
		
		List<Object> params = new ArrayList<Object>();
		params.add(startMonth);
		params.add(endMonth);
		
		sb.append("select (@rowNum:=@rowNum+1) as rowNum, tt2.asid, tt1.* from (")
		.append(" select t4.shop_name,t4.shop_img,t4.region,t3.sales_volume,t3.sales_amount,t3.tran_count,t3.shop_id,t4.shop_type from (")
		.append(" select t1.shop_id,sum(t1.sales_volume) as sales_volume,sum(t1.sales_amount) as sales_amount,")
		.append(" sum(t1.tran_count) as tran_count from  tbdaily.tb_tran_month t1")
		.append(" join tbbase.tb_base_product t2 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id")
		.append(" where str_to_date(t1.tran_month,'%Y-%m') between str_to_date(?, '%Y-%m') and str_to_date(?, '%Y-%m')");
		
		if(!"ALL".equals(shopType)){
			sb.append(" and t1.shop_type = ?");
			params.add(shopType);
		}
		
		sb.append(" and t1.cat_no in ("+catNoIns+") group by t1.shop_id)")
			.append(" t3 join tbbase.tb_base_shop t4 on t3.shop_id = t4.shop_id GROUP BY t3.shop_id");
		
		String pageSql = pageParam.buildSql(sb.toString());
		
		pageSql += " limit 0, 100";
		
		pageSql += ") tt1"
				+"  left join tbweb.tb_attn_shop tt2 on tt1.shop_id = tt2.shop_id and tt2.uid = ? and tt2.att_type = 1,(Select (@rowNum :=0) ) tt";
		
		params.add(uid);
		
		List<HotShop> list = sqlUtil.searchList(HotShop.class, pageSql, params.toArray());
		
		return PageEntity.getPageEntity(pageParam, list);
		
	}
	
	/**
	 * 获取子类目各品牌规模数据（Top20）
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public List<CatData> getBrandScale(String catNo, String startMonth, String endMonth, String shopType, PageParam pageParam, String chartWay) throws Exception{
		
		return getPropScale(catNo, startMonth, endMonth, shopType, pageParam, "品牌", chartWay);
		
	}

	/**
	 * 获取属性规模数据
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @param propName
	 * @return
	 * @throws Exception
	 */
	public List<CatData> getPropScale(String catNo, String startMonth, String endMonth, String shopType,
			PageParam pageParam, String propName, String chartWay) throws Exception {
		StringBuffer sb = new StringBuffer();
		
		List<Object> params = new ArrayList<Object>();
		
		params.add(propName);
		params.add(catNo);
		if(StringUtils.isNotBlank(startMonth)){
			params.add(startMonth);
		}else{
			params.add(DateUtils.getCurMonth());
		}
		
		if(StringUtils.isNotBlank(endMonth)){
			params.add(endMonth);
		}else{
			params.add(DateUtils.getCurMonth());
		}
		
		sb.append("select t1.prop_value as cat_name,sum(t1.sales_volume) as sales_volume,sum(t1.sales_amount) as sales_amount,")
		.append(" sum(t1.tran_count) as tran_count from tbdaily.tb_tran_month_prop t1")
		.append(" join tbbase.tb_base_cat_prop t2 on t1.cat_no = t2.cat_no and t1.prop_name = t2.prop_name")
		.append(" where t1.prop_name = ? and t1.cat_no = ?")
		.append(" and str_to_date(t1.tran_month,'%Y-%m') between str_to_date(?, '%Y-%m') and str_to_date(?, '%Y-%m')");
		
		if(StringUtils.isNotBlank(shopType)){
			if(!"ALL".equals(shopType)){
				sb.append(" and t1.shop_type = ?");
				params.add(shopType);
			}
		}else{
			sb.append(" and t1.shop_type = ?");
			params.add(FinalConstants.DEFAULT_SHOP_TYPE);
		}
		
		sb.append(" group by t1.prop_value");
		
		
		String pageSql = "";
		if(pageParam != null){
			
			if(StringUtils.isNotBlank(chartWay)){
				if("volume".equals(chartWay)){
					pageParam.setOrderColumn("sum(t1.sales_volume)");
				}else if("amount".equals(chartWay)){
					pageParam.setOrderColumn("sum(t1.sales_amount)");
				}else if("count".equals(chartWay)){
					pageParam.setOrderColumn("sum(t1.tran_count)");
				}
				pageParam.setOrderDir("desc");
			}
			
			pageSql = pageParam.buildSql(sb.toString());
		}else{
			
			if(StringUtils.isNotBlank(chartWay)){
				if("volume".equals(chartWay)){
					pageSql = sb.append(" order by sum(t1.sales_volume) desc").toString();
				}else if("amount".equals(chartWay)){
					pageSql = sb.append(" order by sum(t1.sales_amount) desc").toString();
				}else if("count".equals(chartWay)){
					pageSql = sb.append(" order by sum(t1.tran_count) desc").toString();
				}
				
			}
			
			pageSql = sb.toString();
		}
         
		pageSql += " limit 0,20";

		List<CatData> list = sqlUtil.searchList(CatData.class, pageSql, params.toArray());
		
		//统计占比
		double salesAmountTotal = 0, salesVolumeTotal = 0, tranCountTotal = 0;
		for(CatData catData : list){
			
			salesAmountTotal += StringUtils.toDouble(catData.getSales_amount());
			salesVolumeTotal += StringUtils.toDouble(catData.getSales_volume());
			tranCountTotal += StringUtils.toDouble(catData.getTran_count());
		}
		
		for(CatData catData : list){
			
			catData.setAmountWeight(StringUtils.formatPercent(StringUtils.toDouble(catData.getSales_amount()) / salesAmountTotal));
			catData.setCountWeight(StringUtils.formatPercent(StringUtils.toDouble(catData.getTran_count()) / tranCountTotal));
			catData.setVolumeWeight(StringUtils.formatPercent(StringUtils.toDouble(catData.getSales_volume()) / salesVolumeTotal));
		}
		
		return list;
	}
	
	/**
	 * 属性规模（TOP20）
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @param propName
	 * @return
	 * @throws Exception
	 */
	public PageEntity<CatData> getPropScaleByCatNo(String catNo, String startMonth, String endMonth, String shopType,  PageParam pageParam, String propName, String chartWay) throws Exception{
		
		List<CatData> list = this.getPropScale(catNo, startMonth, endMonth, shopType, pageParam, propName, chartWay);
		
		PageEntity<CatData> pageEntity = PageEntity.getPageEntity(pageParam, list);
		 
		return pageEntity;
		
	}
	
	/**
	 * 检索各品牌规模（TOP20）
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<CatData> getBrandScaleByCatNo(String catNo, String startMonth, String endMonth, String shopType,  PageParam pageParam, String chartWay) throws Exception{
		
		List<CatData> list = this.getBrandScale(catNo, startMonth, endMonth, shopType, pageParam, chartWay);
		
		PageEntity<CatData> pageEntity = PageEntity.getPageEntity(pageParam, list);
		 
		return pageEntity;
		
	}
	
	/**
	 * 各品牌趋势（TOP20）
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @return
	 */
	public List<Map<String, Object>> getBrandTrends(String catNo, String startMonth, String endMonth, String shopType){
		
		return getPropTrend(catNo, startMonth, endMonth, shopType, "品牌");
		
	}

	/**
	 * 属性趋势（TOP20）
	 * @param catNo
	 * @param startMonth
	 * @param endMonth
	 * @param shopType
	 * @param propName
	 * @return
	 */
	public List<Map<String, Object>> getPropTrend(String catNo, String startMonth, String endMonth, String shopType, String propName) {
		List<String> monthList = DateUtils.getMonthListBetweenDates(startMonth, endMonth);
		StringBuffer colTags = new StringBuffer();
		StringBuffer colTags2 = new StringBuffer();
		StringBuffer colTags3 = new StringBuffer();
		StringBuffer cols = new StringBuffer();
		StringBuffer cols2 = new StringBuffer();
		StringBuffer cols3 = new StringBuffer();
		for(int i = 0; i < monthList.size(); i++){
			
			String month = monthList.get(i);
			
			String cTag = "a"+month.replace("-", "");
			colTags.append(cTag);
			
			String cTag2 = "b"+month.replace("-", "");
			colTags2.append(cTag2);
			
			String cTag3 = "c"+month.replace("-", "");
			colTags3.append(cTag3);
			
			
			cols.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.sales_volume,0)),0) as ").append(cTag);
			
			cols2.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.sales_amount,0)),0) as ").append(cTag2);
			
			cols3.append("ifnull(sum(if(t1.tran_month='").append(month).append("',t1.tran_count,0)),0) as ").append(cTag3);
			
			if(i != monthList.size() - 1){
				
				colTags.append(",");
				cols.append(",");
				
				colTags2.append(",");
				cols2.append(",");
				
				colTags3.append(",");
				cols3.append(",");
			}
			
		}
		
		StringBuffer sb = new StringBuffer();
		List<Object> params = new ArrayList<Object>();
		params.add(propName);
		params.add(catNo);
		params.add(startMonth);
		params.add(endMonth);
		sb.append("select * from (select t1.prop_value as cat_name,").append(cols).append(",").append(cols2).append(",").append(cols3).append(" from tbdaily.tb_tran_month_prop t1")
			.append(" join tbbase.tb_base_cat_prop t2 on t1.cat_no = t2.cat_no and t1.prop_name = t2.prop_name")
			.append(" where t1.prop_name = ? and t1.cat_no = ?")
			.append(" and str_to_date(t1.tran_month,'%Y-%m') between str_to_date(?, '%Y-%m') and str_to_date(?, '%Y-%m')");
			
		if(!"ALL".equals(shopType)){
			sb.append(" and t1.shop_type = ?");
			params.add(shopType);
		}	
		sb.append(" group by t1.prop_value limit 0,20) t");
		
		return sqlUtil.searchList(sb.toString(), params.toArray());
	}
	
}
