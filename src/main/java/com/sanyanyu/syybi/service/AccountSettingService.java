package com.sanyanyu.syybi.service;

import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 账户设置Service
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月20日 下午8:08:19 
 * @version V1.0
 */
public class AccountSettingService extends BaseService {

	/**
	 * 获取所有行业
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getAllInds() throws Exception{
		
		String sql = "SELECT distinct iid,ind_name FROM tbbase.tb_base_cat_api where iid is not null order by cast(iid as unsigned int)";
		
		return sqlUtil.searchList(sql);
		
	}
	
	/**
	 * 根据行业获取类目
	 * @param iid
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getCatByIid(String iid) throws Exception{
		String sql = "SELECT cat_no,cat_name, cat_name_single FROM tbbase.tb_base_cat_api where parent_no = '0' and iid = ? order by cat_name_single";
		
		return sqlUtil.searchList(sql, iid);
	}
	
	/**
	 * 保存关注类目
	 * @param uid
	 * @param catNo
	 * @throws Exception
	 */
	public void saveCat(String uid, String catNo) throws Exception{
		
		String sql = "insert into tbweb.tb_attn_cat(id, uid, att_cat) values(?, ?, ?)";
		
		sqlUtil.insert(sql, SysUtil.getUUID(), uid, catNo);
		
	}
	
	/**
	 * 获取已关注的类目
	 * @param uid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getAttedCat(String uid) throws Exception{
		
		String sql = "select t2.iid, t2.ind_name,t2.cat_no, t2.cat_name, t2.cat_name_single from tbweb.tb_attn_cat t1"
				+ " join tbbase.tb_base_cat_api t2 on t1.att_cat = t2.cat_no where t1.uid = ?";
		
		return sqlUtil.search(sql, uid);
		
	}
	
	/**
	 * 获取关注类目数量
	 * @param uid
	 * @return
	 * @throws Exception
	 */
	public int getAttnCnt(String uid) throws Exception{
		
		String sql = "SELECT count(0) as cnt FROM tbweb.tb_attn_cat t where t.uid = ?";
		
		Map<String, Object> map = sqlUtil.search(sql, uid);
		return StringUtils.toInteger(map.get("cnt"));
		
	}
}
