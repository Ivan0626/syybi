package com.sanyanyu.syybi.service;

import java.util.List;
import java.util.Map;

/**
 * 数据对比
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月10日 下午3:42:36 
 * @version V1.0
 */
public class DataCompareService extends BaseService {

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
	
}
