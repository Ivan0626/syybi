package com.sanyanyu.syybi.service;

import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.DataCompare;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 数据对比
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月10日 下午3:42:36 
 * @version V1.0
 */
public class DataCompareService extends BaseService {

	private CatService catService;
	
	public DataCompareService(){
		catService = new CatService();
	}
	
	/**
	 * 店铺分析的关注店铺列表
	 * @param uid
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getShopList(String uid, String shopType) throws Exception{
		
		String sql = "SELECT t1.shop_id, t1.shop_name FROM tbweb.tb_attn_shop t1"
				+" join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id where t1.att_type = 1 and t1.uid = ?";
		
		if(!"ALL".equals(shopType)){
			sql += " and t2.shop_type = '"+shopType+"'";
		}
		
		return sqlUtil.searchList(sql, uid);
		
	}
	
	/**
	 * 通过店铺id获取主营类目
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getCatByShop(String shopId) throws Exception{
		
		String sql = " select t3.cat_no, t3.cat_name,t3.cat_name_single, t3.isparent from (select t1.category from tbbase.tb_base_shop t1 where t1.shop_id = ?) t2"
				+" join tbbase.tb_base_cat_api t3 on t2.category = t3.cat_name order by t3.cat_name_single";
		
		return sqlUtil.searchList(sql, shopId);
		
	}
	
	/**
	 * 关注的品牌
	 * @param uid
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getBrand(String uid) throws Exception{
		
		String sql = "SELECT brand_name FROM tbweb.tb_attn_brand where uid = ?";
		
		return sqlUtil.searchList(sql, uid);
		
	}
	
	/**
	 * 品牌关联的顶级类目
	 * @param brandName
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getCatByBrand(String brandName) throws Exception{
		
		String sql = "select tt2.cat_no, tt2.cat_name, tt2.cat_name_single, tt2.isparent from ("
			+" select t1.cat_no from ("
			+" SELECT tbbase.getParentCatNo(cat_no) as cat_no FROM tbdaily.tb_tran_month_prop where prop_name = '品牌' and tran_month = ? and prop_value = ?"
			+" ) t1 group by t1.cat_no) tt1"
			+" join tbbase.tb_base_cat_api tt2 on tt1.cat_no = tt2.cat_no order by tt2.cat_name_single";
		
		return sqlUtil.searchList(sql, DateUtils.getOffsetMonth(-1, "yyyy-MM"), brandName);
		
	}
	
	private String buildMonthColumns(List<String> monthList, String tableTag){
		StringBuffer cols = new StringBuffer();
		StringBuffer cols2 = new StringBuffer();
		StringBuffer cols3 = new StringBuffer();
		for(int i = 0; i < monthList.size(); i++){
			
			String month = monthList.get(i);
			cols.append("if("+tableTag+".tran_month='").append(month).append("', sum("+tableTag+".sales_volume), 0) as a").append(month.replace("-", ""));
			cols2.append("if("+tableTag+".tran_month='").append(month).append("', sum("+tableTag+".sales_amount), 0) as b").append(month.replace("-", ""));
			cols3.append("if("+tableTag+".tran_month='").append(month).append("', sum("+tableTag+".tran_count), 0) as c").append(month.replace("-", ""));
			
			if(i != monthList.size() - 1){
				cols.append(",");
				cols2.append(",");
				cols3.append(",");
			}
		}
		
		String columns = cols.append(",").append(cols2).append(",").append(cols3).toString();
		return columns;
	}
	
	private String buildDayColumns(List<String> dayList, String tableTag){
		StringBuffer cols = new StringBuffer();
		StringBuffer cols2 = new StringBuffer();
		StringBuffer cols3 = new StringBuffer();
		for(int i = 0; i < dayList.size(); i++){
			
			String day = dayList.get(i);
			cols.append("sum(if("+tableTag+".tran_date=str_to_date('").append(day).append("', '%Y-%m-%d'), "+tableTag+".sales_volume, 0)) as a").append(day.replace("-", ""));
			cols2.append("sum(if("+tableTag+".tran_date=str_to_date('").append(day).append("', '%Y-%m-%d'), "+tableTag+".sales_amount, 0)) as b").append(day.replace("-", ""));
			cols3.append("sum(if("+tableTag+".tran_date=str_to_date('").append(day).append("', '%Y-%m-%d'), "+tableTag+".tran_count, 0)) as c").append(day.replace("-", ""));
			
			if(i != dayList.size() - 1){
				cols.append(",");
				cols2.append(",");
				cols3.append(",");
			}
		}
		
		String columns = cols.append(",").append(cols2).append(",").append(cols3).toString();
		return columns;
	}
	
	/**
	 * 按月对比
	 * @param compareList
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> compareMonth(List<DataCompare> compareList, String startDate, String endDate) throws Exception{
		
		List<String> monthList = DateUtils.getMonthListBetweenDates(startDate, endDate);
		
		if(compareList != null && compareList.size() > 0){
			
			if(compareList.size() > 10){
				return null;
			}
			
			StringBuffer sql = new StringBuffer();
			
			//循环对比对象
			for(int i = 0; i < compareList.size(); i++){
				
				DataCompare compare = compareList.get(i);
				
				if(i != 0){
					sql.append(" union all ");
				}
				
				if("1".equals(compare.getCompareType())){//店铺
					
					if("0".equals(compare.getCatNo())){//没选类目
						
						String columns = buildMonthColumns(monthList, "t2");
						
						sql.append("select '").append(compare.getName()).append("' as compare,").append(columns)
						.append(" from  tbbase.tb_base_shop t1")
						.append(" left join tbdaily.tb_tran_month_shop t2 on t1.shop_id = t2.shop_id")
						.append(" where t1.shop_id = '").append(compare.getShopId()).append("' and str_to_date(t2.tran_month,'%Y-%m') between str_to_date('")
						.append(startDate).append("', '%Y-%m') and str_to_date('").append(endDate).append("', '%Y-%m')  group by compare");
						
					}else{//选了类目
						
						String columns = buildMonthColumns(monthList, "t3");
						
						Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
						String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
						
						sql.append("select '").append(compare.getName()).append("' as compare,").append(columns).append(" from (")
						.append(" select t1.item_id, t1.shop_id from tbbase.tb_base_product t1 where t1.shop_id = '").append(compare.getShopId())
						.append("' and t1.cat_no in (").append(catNoIns).append(")) t2")
						.append(" left join tbdaily.tb_tran_month t3 on t2.item_id = t3.item_id and t2.shop_id = t3.shop_id")
						.append(" where str_to_date(t3.tran_month,'%Y-%m') between str_to_date('")
						.append(startDate).append("', '%Y-%m') and str_to_date('").append(endDate).append("', '%Y-%m') group by compare");
						
						
					}
					
				}else if("2".equals(compare.getCompareType())){//行业
					
					String columns = buildMonthColumns(monthList, "t");
					
					Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
					String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
					
					sql.append(" select '").append(compare.getName()).append("' as compare,").append(columns)
					.append(" from tbdaily.tb_tran_month_cat t where t.cat_no in (").append(catNoIns).append(") ")
					.append(" and str_to_date(t.tran_month,'%Y-%m') between str_to_date('")
					.append(startDate).append("', '%Y-%m') and str_to_date('").append(endDate).append("', '%Y-%m')");
					
					if(!"ALL".equals(compare.getShopType())){
						sql.append(" and t.shop_type = '"+compare.getShopType()+"'");
					}
					
					sql.append(" group by compare");
					
				}else if("3".equals(compare.getCompareType())){//品牌
					
					String columns = buildMonthColumns(monthList, "t");
					
					sql.append("select '").append(compare.getName()).append("' as compare,").append(columns)
					.append(" from tbdaily.tb_tran_month_prop t ")
					.append(" where t.prop_name = '品牌' and t.prop_value = '"+compare.getBrandName()+"' and str_to_date(t.tran_month,'%Y-%m') between str_to_date('")
					.append(startDate).append("', '%Y-%m') and str_to_date('").append(endDate).append("', '%Y-%m')");
					
					if(!"ALL".equals(compare.getShopType())){
						sql.append(" and t.shop_type = '"+compare.getShopType()+"'");
					}
					
					if(!"0".equals(compare.getCatNo())){//选了类目
						
						Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
						String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
						
						sql.append(" and t.cat_no in ("+catNoIns+") ");
						
					}
					
					sql.append(" group by compare");
					
				}
				
				
			}
			
			return sqlUtil.searchList(sql.toString());
			
		}
		return null;
	}
	
	/**
	 * 按日对比
	 * @param compareList
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> compareDay(List<DataCompare> compareList, String startDate, String endDate, List<String> dayList) throws Exception{
		
		if(compareList != null && compareList.size() > 0){
			
			if(compareList.size() > 10){
				return null;
			}
			
			StringBuffer sql = new StringBuffer();
			
			//循环对比对象
			for(int i = 0; i < compareList.size(); i++){
				
				DataCompare compare = compareList.get(i);
				
				if(i != 0){
					sql.append(" union all ");
				}
				
				if("1".equals(compare.getCompareType())){//店铺
					
					if("0".equals(compare.getCatNo())){//没选类目
						
						String columns = buildDayColumns(dayList, "t2");
						
						sql.append("select '").append(compare.getName()).append("' as compare,").append(columns)
						.append(" from  tbbase.tb_base_shop t1")
						.append(" left join tbdaily.tb_tran_day_shop t2 on t1.shop_id = t2.shop_id")
						.append(" where t1.shop_id = '"+compare.getShopId()+"' and t2.tran_date between str_to_date('"+startDate+"', '%Y-%m-%d') and str_to_date('"+endDate+"', '%Y-%m-%d')")
						.append(" group by compare");
						
					}else{//选了类目
						
						String columns = buildDayColumns(dayList, "t3");
						
						Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
						String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
						
						sql.append("select '").append(compare.getName()).append("' as compare,").append(columns).append(" from (")
						.append(" select t1.item_id, t1.shop_id from tbbase.tb_base_product t1 where t1.shop_id = '").append(compare.getShopId())
						.append("' and t1.cat_no in (").append(catNoIns).append(")) t2")
						.append(" left join tbdaily.tb_tran_day t3 on t2.item_id = t3.item_id and t2.shop_id = t3.shop_id")
						.append(" where t3.tran_date between str_to_date('"+startDate+"', '%Y-%m-%d') and str_to_date('"+endDate+"', '%Y-%m-%d') group by compare");
						
						
					}
					
				}else if("2".equals(compare.getCompareType())){//行业
					
					String columns = buildDayColumns(dayList, "t3");
					
					Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
					String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
					
					sql.append("select '").append(compare.getName()).append("' as compare,").append(columns).append(" from (")
					.append(" select t1.item_id, t1.shop_id from tbbase.tb_base_product t1 where t1.cat_no in (").append(catNoIns).append(")) t2")
					.append(" left join tbdaily.tb_tran_day t3 on t2.item_id = t3.item_id and t2.shop_id = t3.shop_id")
					.append(" where t3.tran_date between str_to_date('"+startDate+"', '%Y-%m-%d') and str_to_date('"+endDate+"', '%Y-%m-%d') ");
					
					if(!"ALL".equals(compare.getShopType())){
						sql.append(" and t3.shop_type = '"+compare.getShopType()+"'");
					}
					
					sql.append(" group by compare");
					
				}else if("3".equals(compare.getCompareType())){//品牌
					
					String columns = buildDayColumns(dayList, "t3");
					
					
					
					sql.append("select '").append(compare.getName()).append("' as compare,").append(columns)
					.append(" from (")
					.append(" select t1.item_id, t1.shop_id from tbbase.tb_base_product t1 where exists (")
					.append(" select 'X' from tbdaily.tb_tran_month_prop t where t.prop_name = '品牌' and t.tran_month = '"+DateUtils.getOffsetMonth(-1, "yyyy-MM")+"' and t.prop_value = '"+compare.getBrandName()+"' and t1.cat_no = t.cat_no");
					
					if(!"0".equals(compare.getCatNo())){//选了类目
						
						Map<String, Object> leaf = catService.getLeafListByCatNo2(compare.getCatNo());
						String catNoIns = StringUtils.strIn(leaf.get("leafNo").toString());
						
						sql.append(" and t.cat_no in ("+catNoIns+") ");
						
					}
					
					sql.append("  )) t2")
					.append(" left join tbdaily.tb_tran_day t3 on t2.item_id = t3.item_id and t2.shop_id = t3.shop_id")
					.append(" where t3.tran_date between str_to_date('"+startDate+"', '%Y-%m-%d') and str_to_date('"+endDate+"', '%Y-%m-%d')");
					
					if(!"ALL".equals(compare.getShopType())){
						sql.append(" and t3.shop_type = '"+compare.getShopType()+"'");
					}
					
					sql.append(" group by compare");
					
				}
				
				
			}
			return sqlUtil.searchList(sql.toString());
			
		}
		return null;
	}
	
}
