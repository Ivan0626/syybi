package com.sanyanyu.syybi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.DiamondDetail;
import com.sanyanyu.syybi.entity.DiamondEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 钻展透视Service
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月26日 下午4:38:46
 * @version V1.0
 */

public class DiamondService extends BaseService {

	private AccountSettingService accountSettingService;
	
	public DiamondService(){
		accountSettingService = new AccountSettingService();
	}
	
	/**
	 * 钻展一览
	 * 
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<DiamondEntity> getPageList(PageParam pageParam) throws Exception {

		PageEntity<DiamondEntity> pageEntity = new PageEntity<DiamondEntity>();

		// 总记录数
		String recordsTotalSql = "SELECT count(0) as recordsTotal FROM tbbase.tb_base_postion";
		// 查询列表sql
		String listSql = "SELECT position, bpid, pic_url as picUrl, position_type as positionType FROM tbbase.tb_base_postion ";
		pageParam.setDefaultOrderColumn("ad_pos");
		pageHandler(pageParam, pageEntity, DiamondEntity.class, recordsTotalSql, listSql);

		return pageEntity;
	}

	/**
	 * 获取主营类目
	 * @return
	 * @throws Exception
	 */
	public List<DiamondEntity> getCategorys() throws Exception {

		String sql = "select distinct t2.category from tbdaily.tb_advert_zuanz t1 left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id where t2.category <> '' and t2.category is not null";

		return sqlUtil.searchList(DiamondEntity.class, sql);

	}

	/**
	 * 钻展详情
	 * 
	 * @param pageParam
	 * @param position
	 * @return
	 * @throws Exception
	 */
	public PageEntity<DiamondDetail> getDetailPageList(PageParam pageParam, String bpid, String category, String startDate, String endDate, String uid) throws Exception {

		PageEntity<DiamondDetail> pageEntity = new PageEntity<DiamondDetail>();
		// 总记录数
		String recordsTotalSql = "select count(0) as recordsTotal from tbdaily.tb_advert_zuanz t1 "
				+ "left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id "
				+ "left join tbdaily.tb_tran_day_shop t3 on t1.shop_id = t3.shop_id and t1.put_date = t3.tran_date  where t2.shop_id is not null and t1.bpid = ?";
		
		// 查询列表sql
		String listSql = "select t1.ad_pic as adPic,t2.shop_name as shopName, t2.shop_url as shopUrl, t1.put_date as putDate,"
				+ "t2.category,t3.sales_amount as salesAmount,t3.sales_volume as salesVolume,t3.rise_index as riseIndex,t1.azid,"
				+ "t2.shop_type as shopType,t2.shop_id as shopId,t1.screenshots from tbdaily.tb_advert_zuanz t1 "
				+" left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id"
				+" left join tbdaily.tb_tran_day_shop t3 on t1.shop_id = t3.shop_id and t1.put_date = t3.tran_date where t2.shop_id is not null and t1.bpid = ?";
		
		List<Object> params = new ArrayList<Object>();
		params.add(bpid);
		
		if(StringUtils.isNotBlank(category)){
			
			recordsTotalSql += " and t2.category = ?";
			listSql += " and t2.category = ?";
			params.add(category);
		}else {//获取有权限的类目
			
			List<Map<String, Object>> mapList = accountSettingService.getAttedCat(uid);
			
			StringBuffer sb = new StringBuffer();
			for(int i = 0; i < mapList.size(); i++){
				sb.append(mapList.get(i).get("cat_name"));
				if(i != mapList.size() - 1){
					sb.append(",");
				}
			}
			recordsTotalSql += " and t2.category in ("+StringUtils.strIn(sb.toString())+")";
			listSql += " and t2.category in ("+StringUtils.strIn(sb.toString())+")";
		}
		if(StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)){
			recordsTotalSql += " and t1.put_date between str_to_date(?,'%Y-%m-%d') and str_to_date(?,'%Y-%m-%d')";
			listSql += " and t1.put_date between str_to_date(?,'%Y-%m-%d') and str_to_date(?,'%Y-%m-%d')";
			
			params.add(startDate);
			params.add(endDate);
		}
		
		pageHandler(pageParam, pageEntity, DiamondDetail.class, recordsTotalSql, listSql, params.toArray());

		return pageEntity;

	}
	
	/**
	 * 广告详情
	 * @param azid
	 * @return
	 * @throws Exception
	 */
	public DiamondDetail getDetailById(String azid) throws Exception{
		
		String sql = "select t1.azid,t1.put_date as putDate,t3.position,t1.screenshots, t1.ad_pic as adPic, t2.shop_name as shopName,"
				+ "t2.shop_url as shopUrl,t3.pic_url as picUrl,t2.shop_id as shopId,t1.bpid from tbdaily.tb_advert_zuanz t1 "
				+ "join tbbase.tb_base_postion t3 on t1.bpid = t3.bpid"
				+" join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id where t1.azid = ?";
		
		DiamondDetail diamondDetail = sqlUtil.search(DiamondDetail.class, sql, azid);
		
		return diamondDetail;
	}
	
	/**
	 * 获取店铺近60天的广告分布
	 * @param shopId
	 * @return
	 */
	public List<DiamondDetail> getAdDistribute(String shopId) throws Exception{
		
		String sql = "select position, count(0) as cnt from tbdaily.tb_advert_zuanz t1 join tbbase.tb_base_postion t2 on t1.bpid = t2.bpid where t1.shop_id = ? "
				+ "and t1.put_date between date_sub(curdate(), interval 2 month) and curdate() group by t2.position";
		
		List<DiamondDetail> list = sqlUtil.searchList(DiamondDetail.class, sql, shopId);
		
		return list;
	}

}
