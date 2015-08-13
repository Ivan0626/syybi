package com.sanyanyu.syybi.service;

import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.HotEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;

/**
 * 热词分析Service
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月13日 下午6:29:16 
 * @version V1.0
 */
public class HotService extends BaseService {

	/**
	 * 获取热词分析列表
	 * @param uid
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<HotEntity> getHotList(String uid, PageParam pageParam) throws Exception{
		
		String sql = "SELECT t2.seq, t2.`key`, t2.rise, t2.cat_name, t2.cat_path, t1.att_date, t1.id FROM tbweb.tb_attn_hotkeywords t1"
		  +" join tbdaily.tb_index_hot_key t2 on t1.key_id = t2.id where t1.uid = ?";
		
		List<HotEntity> list = sqlUtil.searchList(HotEntity.class, pageParam.buildSql(sql), uid);
		
		return PageEntity.getPageEntity(pageParam, list);
		
	}
	
	/**
	 * 搜索用户已关注的热词
	 * 
	 * @param uid
	 * @param q
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getAttnedShop(String uid, String q) throws Exception {

		String sql = "SELECT shop_id, shop_name FROM tbweb.tb_attn_hotkeywords where uid = ? and att_type = 2 and shop_name like '" + q + "%'";

		return sqlUtil.searchList(sql, uid);

	}

	
}
