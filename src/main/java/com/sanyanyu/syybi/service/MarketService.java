package com.sanyanyu.syybi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.sanyanyu.syybi.entity.AdAnalysis;
import com.sanyanyu.syybi.entity.AdvertCu;
import com.sanyanyu.syybi.entity.AdvertHot;
import com.sanyanyu.syybi.entity.AdvertJu;
import com.sanyanyu.syybi.entity.AdvertTaoke;
import com.sanyanyu.syybi.entity.AdvertZTC;
import com.sanyanyu.syybi.entity.AttnShop;
import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.ChngAdd;
import com.sanyanyu.syybi.entity.ChngName;
import com.sanyanyu.syybi.entity.ChngPrice;
import com.sanyanyu.syybi.entity.GoodsEntity;
import com.sanyanyu.syybi.entity.GoodsList;
import com.sanyanyu.syybi.entity.GoodsMarket;
import com.sanyanyu.syybi.entity.MarketEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.entity.PriceTrend;
import com.sanyanyu.syybi.entity.SaleShop;
import com.sanyanyu.syybi.entity.ShopSearch;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 营销组合分析Service
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月3日 下午4:34:54
 * @version V1.0
 */
public class MarketService extends BaseService {

	/**
	 * 店铺列表
	 * 
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<MarketEntity> getShopList(PageParam pageParam, String uid, String shopName) throws Exception {

		PageEntity<MarketEntity> pageEntity = new PageEntity<MarketEntity>();
		// 总记录数
		String recordsTotalSql = "SELECT count(0) as recordsTotal FROM tbweb.tb_attn_shop t1 left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id where uid=?";

		String preMonth = DateUtils.getOffsetMonth(-1);

		// 查询列表sql
		String listSql = "select t3.shop_name as shopName, t4.rise_index as riseIndex, t4.sales_amount as salesAmountPre, t3.item_count as itemCount, t2.phone_shop_adv as phoneShopAdv,"
				+ " t2.phone_item_adv as phoneItemAdv, t2.phone_item_train as phoneItemTrain, t2.phone_item_promotion as phoneItemPromotion,t2.web_shop_adv as webShopAdv,"
				+ " t2.web_item_adv as webItemAdv, t2.web_shop_train as webShopTrain, t2.web_item_train as webItemTrain, t2.taoke_item as taokeItem, t2.ju_item as juItem, "
				+ " t2.cu_item as cuItem,t1.shop_id as shopId, t1.asid, t3.shop_url as shopUrl, t3.shop_type as shopType from tbweb.tb_attn_shop t1"
				+ " left join tbdaily.tb_advert_total t2 on t1.shop_id = t2.shop_id"
				+ " left join tbbase.tb_base_shop t3 on t1.shop_id = t3.shop_id"
				+ " left join tbdaily.tb_tran_month_shop t4 on t1.shop_id = t4.shop_id and t4.tran_month = '"
				+ preMonth + "' where t1.uid=?";

		List<Object> params = new ArrayList<Object>();
		params.add(uid);

		if (StringUtils.isNotBlank(shopName)) {
			recordsTotalSql += " and t2.shop_name = ?";
			listSql += " and t3.shop_name = ?";

			params.add(shopName);
		}

		pageHandler(pageParam, pageEntity, MarketEntity.class, recordsTotalSql, listSql, params.toArray());

		return pageEntity;
	}

	/**
	 * 搜索用户已关注的店铺
	 * 
	 * @param uid
	 * @param q
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getAttnedShop(String uid, String q) throws Exception {

		String sql = "SELECT shop_id, shop_name FROM tbweb.tb_attn_shop where uid = ? and shop_name like '" + q + "%'";

		return sqlUtil.searchList(sql, uid);

	}

	/**
	 * 判断该用户是否已经关注了该店铺
	 * 
	 * @param uid
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	public boolean getAttnedExist(String uid, String shopId, String shopName) throws Exception {

		String sql = "select count(0) as cnt from tbbase.tb_base_shop where shop_id = ? and shop_name = ?";

		Map<String, Object> baseMap = sqlUtil.search(sql, shopId, shopName);
		int baseCount = StringUtils.toInteger(baseMap.get("cnt"));
		return baseCount > 0;
	}

	/**
	 * 关注店铺
	 * 
	 * @param uid
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	public String attnedShop(String uid, String shopId, String shopName) throws Exception {

		boolean exist = getAttnedExist(uid, shopId, shopName);
		if (exist) {// 存在则添加到关注列表

			AttnShop shop = new AttnShop();
			shop.setAsid(SysUtil.getUUID());
			shop.setShopId(shopId);
			shop.setShopName(shopName);
			shop.setUid(uid);
			sqlUtil.insert(shop);

			return "success";
		} else {
			return "notexist";
		}

	}
	
	/**
	 * 批量关注
	 * @param uid
	 * @param shopId
	 * @param shopName
	 * @return
	 * @throws Exception
	 */
	public void attnedShop(String uid, String shopIds) throws Exception {

		String[] shopIdArr = shopIds.split(",");
		
		List<AttnShop> list = new ArrayList<AttnShop>();
		for(String shopId : shopIdArr){
			
			String[] sArr = shopId.split("@");
			
			AttnShop shop = new AttnShop();
			shop.setAsid(SysUtil.getUUID());
			shop.setShopId(sArr[0]);
			shop.setShopName(sArr[1]);
			shop.setUid(uid);
			list.add(shop);
		}
		sqlUtil.batchInsert(AttnShop.class, list);
	}

	/**
	 * 获取可以关注的店铺
	 * 
	 * @param uid
	 * @param q
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getAttnShop(String uid, String q) throws Exception {

		String sql = "SELECT shop_id, shop_name FROM tbbase.tb_base_shop t1 where t1.shop_name <> '' and t1.shop_name like '"
				+ q
				+ "%'"
				+ " and not exists (select 'X' from tbweb.tb_attn_shop t2 where t1.shop_id = t2.shop_id and t2.uid = ? ) order by t1.shop_name limit 50";

		return sqlUtil.searchList(sql, uid);

	}

	/**
	 * 判断是否满足删除关注的店铺的条件（添加一个月后才能删除）
	 * 
	 * @param uid
	 * @param shopIds
	 * @return
	 * @throws Exception
	 */
	public boolean enabledDel(String uid, String shopIds) throws Exception {

		String sql = "select count(0) as cnt from tbweb.tb_attn_shop where shop_id in (" + StringUtils.strIn(shopIds)
				+ ") and uid = ? and str_to_date(att_date, '%Y-%m-%d') < date_sub(curdate(), interval 1 month)";

		Map<String, Object> map = sqlUtil.search(sql, uid);

		int cnt = StringUtils.toInteger(map.get("cnt"));

		return cnt > 0;
	}

	/**
	 * 删除关注的店铺
	 * 
	 * @param uid
	 * @param shopIds
	 * @throws Exception
	 */
	public void delAttn(String uid, String shopIds) throws Exception {

		String sql = "delete FROM tbweb.tb_attn_shop where shop_id in (" + StringUtils.strIn(shopIds) + ") and uid = ?";

		sqlUtil.delete(sql, uid);

	}

	/**
	 * 获取商品类别
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<CatApi> getCat(String parentNo) throws Exception {

		String sql = "SELECT cat_no as catNo, cat_name as category, CONCAT_WS('-',cat_name_single,cat_name) as catName, isparent as hasChild FROM tbbase.tb_base_cat_api where parent_no = ? order by cat_name_single";

		return sqlUtil.searchList(CatApi.class, sql, parentNo);

	}
	
	/**
	 * 获取商品类别
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<CatApi> getCat(String parentNo, String uid) throws Exception {

		String sql = "select t2.* from tbweb.tb_attn_cat t1 "
		+" join (SELECT cat_no as catNo, cat_name as category, CONCAT_WS('-',cat_name_single,cat_name) as catName, isparent as hasChild FROM tbbase.tb_base_cat_api where parent_no = ? order by cat_name_single) t2 on t1.att_cat = t2.catNo"
		+" where t1.uid = ?";
		
		return sqlUtil.searchList(CatApi.class, sql, parentNo, uid);

	}

	/**
	 * 飚量店铺搜索
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<ShopSearch> getSearchShops() throws Exception {

		String sql = "select t2.shop_name as shopName, t2.region, t3.sales_volume as salesVolume,t3.sales_amount as salesAmount,t3.tran_count as tranCount,"
				+ " t4.sales_volume as salesVolumePre,t4.sales_amount as salesAmountPre,t4.tran_count as tranCountPre, t3.rise_index as riseIndex from tbdaily.tb_advert_total t1"
				+ " left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id"
				+ " left join tbdaily.tb_tran_month_shop t3 on t1.shop_id = t3.shop_id and t3.tran_month = ''"
				+ " left join tbdaily.tb_tran_month_shop t4 on t1.shop_id = t4.shop_id and t4.tran_month = ''"
				+ " where not exists (select 'X' from tbweb.tb_attn_shop t5 where t1.shop_id = t5.shop_id and t5.uid = '1')";

		return null;

	}

	/**
	 * 获取店铺下的宝贝列表，并按月统计
	 * 
	 * @param shopId
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getShopList(String shopId) throws Exception {

		StringBuffer sql = new StringBuffer();
		sql.append(
				"SELECT t1.item_id,t2.prd_name,t1.category,t1.avg_price,t1.avg_price_tran, t4.avg_price_tran,t1.zk_rate,t4.zk_rate, t1.sales_volume, t4.sales_volume, t1.sales_amount, t4.sales_amount,")
				.append("t3.hot,t3.normal,t3.tb_cu,t3.activity,t3.taobaoke,t3.ztc,t3.ju,t3.normal_cu,t3.hot_mobile,t3.tb_cu_mobile,t3.activity_mobile,t3.ztc_mobile,t3.normal_cu_mobile FROM tbdaily.tb_tran_month t1 ")
				.append(" left join tbbase.tb_base_product t2 on t1.item_id = t2.item_id")
				.append(" left join tbdaily.tb_advert_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id")
				.append(" left join tbdaily.tb_tran_month t4 on t1.shop_id = t4.shop_id and t1.item_id = t4.item_id and t4.tran_month = '"
						+ DateUtils.getOffsetMonth(-1) + "'")
				.append(" where t1.shop_id = ? and t1.tran_month = '" + DateUtils.getCurMonth() + "'");

		return sqlUtil.searchList(sql.toString(), shopId);

	}

	/**
	 * 获取分页的宝贝列表
	 * 
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<GoodsList> getPageShopList(PageParam pageParam, String shopId, String category, String prdName,
			String adType) throws Exception {

		PageEntity<GoodsList> pageEntity = new PageEntity<GoodsList>();

		String reSql = " FROM tbdaily.tb_tran_month t1 "
				+ " left join tbbase.tb_base_product t2 on t1.item_id = t2.item_id"
				+ " left join tbdaily.tb_advert_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id"
				+ " left join tbdaily.tb_tran_month t4 on t1.shop_id = t4.shop_id and t1.item_id = t4.item_id and t4.tran_month = '"
				+ DateUtils.getOffsetMonth(-1, "yyyy-MM") + "'" + " where t1.shop_id = ? and t1.tran_month = '"
				+ DateUtils.getCurMonth() + "'";

		List<Object> params = new ArrayList<Object>();
		params.add(shopId);
		if (StringUtils.isNotBlank(category)) {
			
			reSql += " and t2.cat_path like '" + category + "%'";
		}
		if (StringUtils.isNotBlank(prdName)) {
			reSql += " and t2.prd_name like '%" + prdName + "%'";
		}
		if (StringUtils.isNotBlank(adType)) {// TODO：需要根绝广告数是否为0处理

		}

		String totalSql = "select count(0) as recordsTotal" + reSql;
		Map<String, Object> totalMap = sqlUtil.search(totalSql, params.toArray());

		long recordsTotal = StringUtils.toLong(totalMap.get("recordsTotal"));
		pageEntity.setRecordsFiltered(recordsTotal);
		pageEntity.setRecordsTotal(recordsTotal);

		// 排序
		String orderSql = " order by " + pageParam.getoTag() + ".";
		if (StringUtils.isNotBlank(pageParam.getOrderColumn()) && pageParam.getOrderColumn().indexOf("pre") > -1) {// 特殊处理
			orderSql += pageParam.getOrderColumn().replace("_pre", "");
		} else {
			orderSql += pageParam.getOrderColumn();
		}
		orderSql += " " + pageParam.getOrderDir();

		String searchFields = "t1.item_id,t2.prd_name,t2.prd_img,t1.category,t2.cat_path,t1.avg_price,t1.avg_price_tran, t4.avg_price_tran as avg_price_tran_pre,t1.zk_rate,t4.zk_rate as zk_rate_pre, "
				+ "t1.sales_volume, t4.sales_volume as sales_volume_pre, t1.sales_amount, t4.sales_amount as sales_amount_pre,"
				+ "t3.hot,t3.normal,t3.tb_cu,t3.activity,t3.taobaoke,t3.ztc,t3.ju,t3.normal_cu,t3.hot_mobile,t3.tb_cu_mobile,t3.activity_mobile,t3.ztc_mobile,t3.normal_cu_mobile";
		String pageSql = "select " + searchFields + reSql + orderSql + " limit " + pageParam.getStart() + ","
				+ pageParam.getLength();

		List<GoodsList> pageList = sqlUtil.searchList(GoodsList.class, pageSql, params.toArray());

		pageEntity.setData(pageList);

		pageEntity.setDraw(pageParam.getDraw());
		return pageEntity;
	}

	/**
	 * 广告分析列表
	 * 
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdAnalysis> getPageAdList(PageParam pageParam, String shopId, String startDate, String endDate)
			throws Exception {

		String sql = "select * from (select t1.tran_date, t1.sales_amount, t1.sales_volume, t1.tran_count,t1.rise_index,t2.ztc as shop_ztc, t2.normal as shop_normal, t2.hot as shop_hot,"
				+ "t2.tb_cu as shop_tb_cu, t2.activity as shop_activity, t2.taobaoke as shop_taobaoke,t2.hot_mobile as shop_hot_mobile,t2.activity_mobile as shop_activity_mobile,"
				+ "t2.sale as shop_sale,t3.hot, t3.normal, t3.tb_cu, t3.activity,t3.taobaoke,t3.ztc,t3.ju,t3.normal_cu,t3.hot_mobile,t3.tb_cu_mobile,t3.activity_mobile,"
				+ "t3.ztc_mobile,t3.normal_cu_mobile,"
				+ "(select count(0) from tbdaily.tb_chng_name t4 where t1.shop_id = t4.shop_id and t1.tran_date = t4.change_date) as name_count, "
				+ "(select count(0) from tbdaily.tb_chng_price t5 where t1.shop_id = t5.shop_id and t1.tran_date = t5.change_date) as price_count,"
				+ "(select count(0) from tbdaily.tb_chng_add t6 where t1.shop_id = t6.shop_id and t1.tran_date = t6.change_date) as add_count"
				+ " FROM tbdaily.tb_tran_day_shop t1 "
				+ " left join tbdaily.tb_advert_shop t2 on t1.shop_id = t2.shop_id and t1.tran_date = t2.put_date"
				+ " left join tbdaily.tb_advert_product t3 on t1.shop_id = t3.shop_id and t1.tran_date = t3.put_date"
				+ " where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')) t";

		
		List<AdAnalysis> list = sqlUtil.searchList(AdAnalysis.class, pageParam.buildSql(sql), shopId, startDate, endDate);
	
		PageEntity<AdAnalysis> pageEntity = PageEntity.getPageEntity(pageParam, list);
	
		return pageEntity;
		
	}

	/**
	 * 获取广告分析图表的数据
	 * 
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public List<AdAnalysis> getChartData(String shopId, String startDate, String endDate) throws Exception {

		String sql = "select tran_date, sales_volume, sales_amount / 10000, tran_count from tbdaily.tb_tran_day_shop "
				+ "where shop_id = ? and tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d') order by tran_date";

		return sqlUtil.searchList(AdAnalysis.class, sql, shopId, startDate, endDate);
	}

	/**
	 * 宝贝广告-淘宝客
	 * 
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertTaoke> getTaokes(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate) throws Exception {

		String sql = "SELECT t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.reserve_price,t2.commission_rate_percent,t2.cal_commission,t2.total_fee,t2.total_num"
				+ " FROM tbdaily.tb_tran_day t1"
				+ " left join tbdaily.tb_advert_taoke t2 on t2.shop_id = t1.shop_id and t2.item_id = t1.item_id and t2.catch_date = t1.tran_date"
				+ " where t1.shop_id = ? and t1.item_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertTaoke> list = sqlUtil.searchList(AdvertTaoke.class, pageParam.buildSql(sql), shopId, itemId,
				startDate, endDate);

		PageEntity<AdvertTaoke> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 宝贝广告-热门钻展
	 * 
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getHots(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate, String adType) throws Exception {

		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count, t4.position,t4.pic_url,t4.ad_pic,t4.screenshots from tbdaily.tb_tran_day t1"
				+ " left join (select t2.put_date,t2.shop_id,t2.item_id,t3.position,t3.pic_url,t2.ad_pic,t2.screenshots from tbdaily.tb_advert_zuanz t2 "
				+ " join tbbase.tb_base_postion t3 on t2.bpid = t3.bpid where t3.ad_type = ?) t4"
				+ " on t1.tran_date = t4.put_date and t1.shop_id = t4.shop_id and t1.item_id = t4.item_id"
				+ " where t1.shop_id = ? and t1.item_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), adType, shopId, itemId,
				startDate, endDate);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 宝贝广告-淘宝促销
	 * 
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getTaobaoCus(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate) throws Exception {

		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content as position,"
				+ " t2.ad_url as pic_url,t2.ad_url as ad_pic,t2.ad_url as screenshots from tbdaily.tb_tran_day t1 left join tbdaily.tb_advert_cu t2 "
				+ " on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '淘宝促销' "
				+ " where t1.shop_id = ? and t1.item_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), shopId, itemId, startDate,
				endDate);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 改名跟踪
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<ChngName> getChngNames(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate) throws Exception {

		String sql = "SELECT cnid, item_id, prd_name_old,prd_name_new,category,price,prd_img,change_date FROM tbdaily.tb_chng_name where shop_id = ? ";

		if(StringUtils.isNotBlank(itemId)){
			sql += " and item_id = '"+itemId+"'";
		}
		
		sql += " and change_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<ChngName> list = sqlUtil.searchList(ChngName.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<ChngName> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 调价跟踪
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<ChngPrice> getChngPrices(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate) throws Exception {

		String sql = "SELECT cpid, item_id, prd_name, category,price_old, price_new,prd_img,change_date FROM tbdaily.tb_chng_price where shop_id = ?";

		if(StringUtils.isNotBlank(itemId)){
			sql += " and item_id = '"+itemId+"'";
		}
		
		sql += " and change_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<ChngPrice> list = sqlUtil.searchList(ChngPrice.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<ChngPrice> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 上架跟踪
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<ChngAdd> getChngAdds(PageParam pageParam, String shopId, String startDate, String endDate) throws Exception {

		String sql = "SELECT caid, prd_name, category, price,prd_img,change_date, item_id FROM tbdaily.tb_chng_add"
				+" where shop_id = ? and change_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<ChngAdd> list = sqlUtil.searchList(ChngAdd.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<ChngAdd> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	
	
	/**
	 * 宝贝营销组合分析
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param itemId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<GoodsMarket> getGoodsMarkets(PageParam pageParam, String shopId, String itemId, String startDate,
			String endDate) throws Exception {

		String sql = "SELECT t1.tran_date, t1.sales_amount,t1.sales_volume,t1.tran_count,"
				+ " t2.hot,t2.normal,t2.tb_cu,t2.activity,t2.taobaoke,t2.ztc,t2.ju,t2.normal_cu,t2.normal_cu_mobile,t2.hot_mobile,t2.tb_cu_mobile,t2.activity_mobile,t2.ztc_mobile,"
				+ " concat_ws('=><br>',t3.prd_name_old,t3.prd_name_new) as chngName,concat_ws('=>',t4.price_old,t4.price_new) as chngPrice FROM tbdaily.tb_tran_day t1"
				+ " left join tbdaily.tb_advert_product t2 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t1.tran_date = t2.put_date"
				+ " left join tbdaily.tb_chng_name t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id and t1.tran_date = t3.change_date"
				+ " left join tbdaily.tb_chng_price t4 on t1.shop_id = t4.shop_id and t1.item_id = t4.item_id and t1.tran_date = t4.change_date"
				+ " where t1.shop_id = ? and t1.item_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		List<GoodsMarket> list = sqlUtil.searchList(GoodsMarket.class, pageParam.buildSql(sql), shopId, itemId,
				startDate, endDate);

		PageEntity<GoodsMarket> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 店铺营销组合分析-宝贝列表
	 * 
	 * @param shopId
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<GoodsEntity> getPageShopGoodList(PageParam pageParam, String category, String shopId, String date)
			throws Exception {

		String totalSql = "select count(0) as cnt FROM tbdaily.tb_tran_day t1 left join tbbase.tb_base_product t2 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
				+ " where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";

		if (StringUtils.isNotBlank(category)) {
			
			totalSql += " and t2.cat_path like '" + category + "%'";
		}	
		
		Map<String, Object> map = sqlUtil.search(totalSql, shopId, date);

		long totalRecords = StringUtils.toLong(map.get("cnt"));
		pageParam.setTotalRecords(totalRecords);

		String sql = "SELECT t1.tran_date,t2.item_id,t2.prd_img,t2.prd_name,t1.category,t2.cat_path,t1.avg_price,t1.avg_price_tran,t1.sales_volume,t1.sales_amount,t1.tran_count,"
				+ " (select  count(0) from tbdaily.tb_chng_name t3 where t1.shop_id = t3.shop_id and t1.item_id = t3.item_id and t3.change_date between str_to_date('"
				+ DateUtils.getLastMonthDate()
				+ "', '%Y-%m-%d') and str_to_date('"
				+ DateUtils.getDate()
				+ "', '%Y-%m-%d')) as name_count,"
				+ " (select  count(0) from tbdaily.tb_chng_price t4 where t1.shop_id = t4.shop_id and t1.item_id = t4.item_id and t4.change_date between str_to_date('"
				+ DateUtils.getLastMonthDate()
				+ "', '%Y-%m-%d') and str_to_date('"
				+ DateUtils.getDate()
				+ "', '%Y-%m-%d')) as price_count,"
				+ " max(t5.change_date) as change_date,"
				+ " sum(t6.hot) as hot,sum(t6.normal) as normal,sum(t6.tb_cu) as tb_cu,sum(t6.activity) as activity,sum(t6.taobaoke) as taobaoke,sum(t6.ztc) as ztc,sum(t6.ju) as ju,"
				+ " sum(t6.normal_cu) as normal_cu,sum(t6.normal_cu_mobile) as normal_cu_mobile,sum(t6.hot_mobile) as hot_mobile,sum(t6.tb_cu_mobile) as tb_cu_mobile,sum(t6.activity_mobile) as activity_mobile,sum(t6.ztc_mobile) as ztc_mobile"
				+ " FROM tbdaily.tb_tran_day t1"
				+ " left join tbbase.tb_base_product t2 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
				+ " left join tbdaily.tb_chng_add t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id and t5.change_date between str_to_date('"
				+ DateUtils.getLastMonthDate()
				+ "', '%Y-%m-%d') and str_to_date('"
				+ DateUtils.getDate()
				+ "', '%Y-%m-%d')"
				+ " left join tbdaily.tb_advert_product t6 on t1.shop_id = t6.shop_id and t1.item_id = t6.item_id and t6.put_date between str_to_date('"
				+ DateUtils.getLastMonthDate()
				+ "', '%Y-%m-%d') and str_to_date('"
				+ DateUtils.getDate()
				+ "', '%Y-%m-%d')" + " where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";

		if (StringUtils.isNotBlank(category)) {
			
			sql += " and t2.cat_path like '" + category + "%'";
		}	
		
		List<GoodsEntity> list = sqlUtil.searchList(GoodsEntity.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<GoodsEntity> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 店铺广告-直通车
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertZTC> getShopZTCs(PageParam pageParam, String shopId, String startDate, String endDate)
			throws Exception {

		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.keyword from tbdaily.tb_tran_day_shop t1"
				+ " left join tbdaily.tb_advert_shop_ztc t2 on t1.shop_id = t2.shop_id and t1.tran_date = t2.catch_date"
				+ " where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertZTC> list = sqlUtil.searchList(AdvertZTC.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertZTC> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 店铺广告-钻展
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @param zuanType
	 *            热门钻展、普通钻展
	 * @return
	 */
	public PageEntity<AdvertHot> getShopZuan(PageParam pageParam, String shopId, String startDate, String endDate,
			String zuanType) {

		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count, t4.position,t4.pic_url,t4.ad_pic,t4.screenshots from tbdaily.tb_tran_day t1"
				+ " left join (select t2.put_date,t2.shop_id,t2.item_id,t3.position,t3.pic_url,t2.ad_pic,t2.screenshots from tbdaily.tb_advert_zuanz t2 "
				+ " join tbbase.tb_base_postion t3 on t2.bpid = t3.bpid where t3.ad_type = ? and t2.item_id = '') t4 "
				+ " on t1.tran_date = t4.put_date and t1.shop_id = t4.shop_id "
				+ " where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), zuanType, shopId,
				startDate, endDate);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}

	/**
	 * 店铺广告-淘宝客
	 * 
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertTaoke> getShopTaokes(PageParam pageParam, String shopId, String startDate, String endDate)
			throws Exception {

		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.settle_amt,t2.settle_num,t2.commisiona_amt from tbdaily.tb_tran_day_shop t1"
				+ " left join tbdaily.tb_advert_taoke_shop t2 on t1.shop_id = t2.shop_id and t1.tran_date = t2.catch_date"
				+ " where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertTaoke> list = sqlUtil.searchList(AdvertTaoke.class, pageParam.buildSql(sql), shopId, startDate,
				endDate);

		PageEntity<AdvertTaoke> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 店铺广告-搭配减价
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @return
	 * @throws Exception
	 */
	public PageEntity<SaleShop> getSaleShops(PageParam pageParam, String shopId, String date)
			throws Exception {

		String sql = "SELECT t1.meal_id,max(t1.sale_name) as sale_name,max(t1.sale_num) as sale_num,GROUP_CONCAT(t1.prd_name SEPARATOR '@') as prd_name,"
				+ " GROUP_CONCAT(t1.item_id SEPARATOR '@') as item_id,GROUP_CONCAT(t1.price SEPARATOR '@') as price,max(t1.sale_price) as sale_price,"
				+ " max(t1.sale_price_zk) as sale_price_zk FROM tbdaily.tb_advert_sale_shop t1 "
				+ " where t1.shop_id = ? and t1.catch_date = str_to_date(?, '%Y-%m-%d') group by t1.meal_id";

		List<SaleShop> list = sqlUtil.searchList(SaleShop.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<SaleShop> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-淘宝客
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertTaoke> getGoodsTaokes(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "SELECT t3.prd_name, t3.prd_img, t1.item_id,t2.sales_amount,t2.sales_volume,t2.tran_count,t1.reserve_price,t1.commission_rate_percent,t1.cal_commission,t1.total_fee,t1.total_num"
					+" FROM tbdaily.tb_tran_day t2"
					+" left join tbdaily.tb_advert_taoke t1 on t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t1.catch_date = t2.tran_date"
					+" left join tbbase.tb_base_product t3 on t2.shop_id = t3.shop_id and t2.item_id = t3.item_id "
					+" where t2.shop_id = ? and t2.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertTaoke> list = sqlUtil.searchList(AdvertTaoke.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertTaoke> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-钻展
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @param zuanType
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getGoodsZuans(PageParam pageParam, String shopId, String prdName, String date, String zuanType) throws Exception{
		
		String sql = "select t5.prd_name, t5.prd_img,t1.item_id, t1.sales_amount,t1.sales_volume,t1.tran_count, t4.position,t4.pic_url,t4.ad_pic,t4.screenshots from tbdaily.tb_tran_day t1"
					+" left join (select t2.put_date,t2.shop_id,t2.item_id,t3.position,t3.pic_url,t2.ad_pic,t2.screenshots from tbdaily.tb_advert_zuanz t2 "
					+" join tbbase.tb_base_postion t3 on t2.bpid = t3.bpid where t3.ad_type = ?) t4"
					+" on t1.tran_date = t4.put_date and t1.shop_id = t4.shop_id and t1.item_id = t4.item_id"
					+" left join tbbase.tb_base_product t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t5.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), zuanType, shopId, date);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertHot> getGoodsZuans(String shopId, String startDate, String endDate, String zuanType, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date, t1.sales_amount,t1.sales_volume,t1.tran_count, t4.position,t4.pic_url,t4.ad_pic,t4.screenshots from tbdaily.tb_tran_day t1"
					+" left join (select t2.put_date,t2.shop_id,t2.item_id,t3.position,t3.pic_url,t2.ad_pic,t2.screenshots from tbdaily.tb_advert_zuanz t2 "
					+" join tbbase.tb_base_postion t3 on t2.bpid = t3.bpid where t3.ad_type = ?) t4"
					+" on t1.tran_date = t4.put_date and t1.shop_id = t4.shop_id and t1.item_id = t4.item_id"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), zuanType, shopId, startDate, endDate);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-淘宝促销
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getGoodsTbCus(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t5.prd_name, t5.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content as position,"
					+" t2.ad_url as pic_url,t2.ad_url as ad_pic,t2.ad_url as screenshots from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_cu t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '淘宝促销'"
					+" left join tbbase.tb_base_product t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t5.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-手机淘宝促销
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getGoodsTbCuMs(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String distUrl = "http://page.m.tmall.com/myy/myy_cjy.html";
		
		String sql = "select t5.prd_name, t5.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content as position,"
					+" '"+distUrl+"' as pic_url,'"+distUrl+"' as ad_pic,'"+distUrl+"' as screenshots from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_phone_sale t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '手机淘宝促销'"
					+" left join tbbase.tb_base_product t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t5.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertHot> getGoodsTbCuMs(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String distUrl = "http://page.m.tmall.com/myy/myy_cjy.html";
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content as position,"
					+" '"+distUrl+"' as pic_url,'"+distUrl+"' as ad_pic,'"+distUrl+"' as screenshots from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_phone_sale t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '手机淘宝促销'"
					+" left join tbbase.tb_base_product t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id "
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-直通车
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertZTC> getGoodsZTCs(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t3.prd_name, t3.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,group_concat(t2.keyword SEPARATOR '@') as keyword,group_concat(t2.seq SEPARATOR '@') as seq from tbdaily.tb_tran_day t1"
					+" left join tbdaily.tb_advert_prod_ztc t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" left join tbbase.tb_base_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		sql += " group by t1.item_id";
		List<AdvertZTC> list = sqlUtil.searchList(AdvertZTC.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertZTC> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertZTC> getGoodsZTCs(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,group_concat(t2.keyword SEPARATOR '@') as keyword,group_concat(t2.seq SEPARATOR '@') as seq from tbdaily.tb_tran_day t1"
					+" left join tbdaily.tb_advert_prod_ztc t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d') group by t1.item_id";

		List<AdvertZTC> list = sqlUtil.searchList(AdvertZTC.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertZTC> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-聚划算
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertJu> getGoodsJus(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t3.prd_name, t3.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_ju t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" left join tbbase.tb_base_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		List<AdvertJu> list = sqlUtil.searchList(AdvertJu.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertJu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertJu> getGoodsJus(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_ju t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertJu> list = sqlUtil.searchList(AdvertJu.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertJu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-商品促销
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertCu> getGoodsCus(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t3.prd_name, t3.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_cu t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '商品促销'"
					+" left join tbbase.tb_base_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		List<AdvertCu> list = sqlUtil.searchList(AdvertCu.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertCu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertCu> getGoodsCus(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_cu t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '商品促销'"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";

		List<AdvertCu> list = sqlUtil.searchList(AdvertCu.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertCu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-手机直通车
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertZTC> getGoodsZTCMs(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t3.prd_name, t3.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,group_concat(t2.keyword SEPARATOR '@') as keyword,group_concat(t2.seq SEPARATOR '@') as seq from tbdaily.tb_tran_day t1"
					+" left join tbdaily.tb_advert_prod_ztc_m t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" left join tbbase.tb_base_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		sql += " group by t1.item_id";
		List<AdvertZTC> list = sqlUtil.searchList(AdvertZTC.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertZTC> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertZTC> getGoodsZTCMs(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,group_concat(t2.keyword SEPARATOR '@') as keyword,group_concat(t2.seq SEPARATOR '@') as seq from tbdaily.tb_tran_day t1"
					+" left join tbdaily.tb_advert_prod_ztc_m t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d') group by t1.item_id";
		
		List<AdvertZTC> list = sqlUtil.searchList(AdvertZTC.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertZTC> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 宝贝广告-手机促销
	 * @param pageParam
	 * @param shopId
	 * @param prdName
	 * @param date
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertCu> getGoodsCuMs(PageParam pageParam, String shopId, String prdName, String date) throws Exception{
		
		String sql = "select t3.prd_name, t3.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,concat_ws(':',t2.activity_content,t2.price) as activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_phone_sale t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '手机促销'"
					+" left join tbbase.tb_base_product t3 on t1.shop_id = t3.shop_id and t1.item_id = t3.item_id "
					+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t3.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertCu> list = sqlUtil.searchList(AdvertCu.class, pageParam.buildSql(sql), shopId, date);

		PageEntity<AdvertCu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	public PageEntity<AdvertCu> getGoodsCuMs(String shopId, String startDate, String endDate, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,concat_ws(':',t2.activity_content,t2.price) as activity_content from tbdaily.tb_tran_day t1 "
					+" left join tbdaily.tb_advert_phone_sale t2 on t1.tran_date = t2.catch_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.activity_type = '手机促销'"
					+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertCu> list = sqlUtil.searchList(AdvertCu.class, pageParam.buildSql(sql), shopId, startDate, endDate);

		PageEntity<AdvertCu> pageEntity = PageEntity.getPageEntity(pageParam, list);

		return pageEntity;
	}
	
	/**
	 * 店铺广告-淘宝活动
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @param isphone
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getShopTaobaos(PageParam pageParam, String shopId, String startDate, String endDate, String isphone) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.position,"
				+" t2.ad_pos_url,t2.ad_dest_url,t2.ad_pic,t2.screenshots from tbdaily.tb_tran_day t1 "
				+" left join tbdaily.tb_advert_taobao t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t2.isphone = ? and t2.item_id = ''"
				+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), isphone, shopId, startDate, endDate);
	
		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);
	
		return pageEntity;
		
	}
	
	/**
	 * 宝贝广告-淘宝活动
	 * @param pageParam
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @param isphone
	 * @return
	 * @throws Exception
	 */
	public PageEntity<AdvertHot> getGoodsTaobaos(PageParam pageParam, String shopId, String prdName, String date, String isphone) throws Exception{
		
		String sql = "select t5.prd_name, t5.prd_img, t1.item_id,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.position,"
				+" t2.ad_pos_url,t2.ad_dest_url,t2.ad_pic,t2.screenshots from tbdaily.tb_tran_day t1 "
				+" left join tbdaily.tb_advert_taobao t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.isphone = ?  and t2.item_id <> ''"
				+" left join tbbase.tb_base_product t5 on t1.shop_id = t5.shop_id and t1.item_id = t5.item_id "
				+" where t1.shop_id = ? and t1.tran_date = str_to_date(?, '%Y-%m-%d')";
		
		if(StringUtils.isNotBlank(prdName)){
			sql += " and t5.prd_name like '%"+prdName+"%'";
		}
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), isphone, shopId, date);
		
		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);
	
		return pageEntity;
		
	}
	
	public PageEntity<AdvertHot> getGoodsTaobaos(String shopId, String startDate, String endDate, String isphone, PageParam pageParam) throws Exception{
		
		String sql = "select t1.tran_date,t1.sales_amount,t1.sales_volume,t1.tran_count,t2.position,"
				+" t2.ad_pos_url,t2.ad_dest_url,t2.ad_pic,t2.screenshots from tbdaily.tb_tran_day t1 "
				+" left join tbdaily.tb_advert_taobao t2 on t1.tran_date = t2.put_date and t1.shop_id = t2.shop_id and t1.item_id = t2.item_id and t2.isphone = ?"
				+" where t1.shop_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<AdvertHot> list = sqlUtil.searchList(AdvertHot.class, pageParam.buildSql(sql), isphone, shopId, startDate, endDate);
		
		PageEntity<AdvertHot> pageEntity = PageEntity.getPageEntity(pageParam, list);
	
		return pageEntity;
		
	}
	
	/**
	 * 价格走势
	 * @param shopId
	 * @param startDate
	 * @param endDate
	 * @param itemId
	 * @param pageParam
	 * @return
	 * @throws Exception
	 */
	public PageEntity<PriceTrend> getPriceTrends(String shopId, String startDate, String endDate, String itemId, PageParam pageParam) throws Exception{
		
		String sql = "SELECT t1.tran_date, t1.avg_price, t1.avg_price_tran, t1.sales_volume FROM tbdaily.tb_tran_day t1 "
				+" where t1.shop_id = ? and t1.item_id = ? and t1.tran_date between str_to_date(?, '%Y-%m-%d') and str_to_date(?, '%Y-%m-%d')";
		
		List<PriceTrend> list = sqlUtil.searchList(PriceTrend.class, pageParam.buildSql(sql), shopId,itemId, startDate, endDate);
		
		PageEntity<PriceTrend> pageEntity = PageEntity.getPageEntity(pageParam, list);
	
		return pageEntity;
		
	}
	
	/**
	 * 飚量店铺检索
	 * @param pageParam
	 * @param uid
	 * @param category
	 * @param types
	 * @param ntypes
	 * @param startReAmount
	 * @param endReAmount
	 * @param shopType
	 * @param startAmount
	 * @param endAmount
	 * @param startRiseIndex
	 * @param endRiseIndex
	 * @return
	 * @throws Exception
	 */
	public PageEntity<ShopSearch> getPageShopSearch(PageParam pageParam, String uid, String category, String types, String ntypes, String startReAmount, String endReAmount, String shopType, String startAmount, String endAmount, String startRiseIndex, String endRiseIndex) throws Exception{
		
		String curMonth = DateUtils.getCurMonth();
		
		String preMonth = DateUtils.getOffsetMonth(-1, "yyyy-MM");
		
		String coreSql = "SELECT t1.shop_id,t2.rate_link,t2.shop_name,t2.shop_img,t2.shop_url,t2.shop_type,t2.region,t1.sales_volume,t1.sales_amount,t1.tran_count,t3.sales_volume as pre_sales_volume,t3.sales_amount as pre_sales_amount,"
				+" t3.tran_count as pre_tran_count,sum(t5.sales_amount) as re_sales_amount,t1.rise_index,"
				+" sum(t4.hot) as hot,sum(t4.normal) as normal,sum(t4.tb_cu) as tb_cu,sum(t4.activity) as activity,sum(t4.taobaoke) as taobaoke,sum(t4.ztc) as ztc,sum(t4.ju) as ju,"
				+" sum(t4.normal_cu) as normal_cu,sum(t4.normal_cu_mobile) as normal_cu_mobile,sum(t4.hot_mobile) as hot_mobile,sum(t4.tb_cu_mobile) as tb_cu_mobile,sum(t4.activity_mobile) as activity_mobile,sum(t4.ztc_mobile) as ztc_mobile,t5.cat_path FROM tbdaily.tb_tran_month_shop t1"
				+" left join tbbase.tb_base_shop t2 on t1.shop_id = t2.shop_id"
				+" left join tbdaily.tb_tran_month_shop t3 on t1.shop_id = t3.shop_id and t3.tran_month = '"+preMonth+"'"
				+" left join tbdaily.tb_advert_product t4 on t1.shop_id = t4.shop_id and  date_format(t4.put_date, '%Y-%m') = t1.tran_month"
				+" left join tbdaily.tb_tran_month t5 on t1.shop_id = t5.shop_id and t5.tran_month = '"+preMonth+"'"
				+" where t1.tran_month = '"+curMonth+"'";
		
		StringBuffer totalSql = new StringBuffer();
		totalSql.append("select count(0) as recordsTotal from (")
		.append(coreSql).append(") t where t.cat_path like '"+category+"%' ");
		
		StringBuffer pageSql = new StringBuffer();
		pageSql.append("select t.*,t6.asid from (")
		.append(coreSql).append(") t left join tbweb.tb_attn_shop t6 on t.shop_id = t6.shop_id and t6.uid = '"+uid+"' where t.cat_path like '"+category+"%' ");
		
		List<Object> params = new ArrayList<Object>();
		StringBuffer whereSql = new StringBuffer();
		if(StringUtils.isNotBlank(types)){
			
			typeToSql(types, whereSql, ">");
			
		}
		
		if(StringUtils.isNotBlank(ntypes)){
			
			typeToSql(ntypes, whereSql, "<");
			
		}
		
		if(StringUtils.isNotBlank(startReAmount)){
			
			whereSql.append(" and t.re_sales_amount > ?");
			params.add(startReAmount);
			
		}
		
		if(StringUtils.isNotBlank(endReAmount)){
			whereSql.append(" and t.re_sales_amount < ?");
			params.add(endReAmount);
		}
		
		if(StringUtils.isNotBlank(shopType)){
			whereSql.append(" and t.shop_type = ?");
			params.add(shopType);
		}
		
		if(StringUtils.isNotBlank(startAmount)){
			whereSql.append(" and t.sales_amount > ?");
			params.add(startAmount);
		}
		
		if(StringUtils.isNotBlank(endAmount)){
			whereSql.append(" and t.sales_amount < ?");
			params.add(endAmount);
		}
		
		if(StringUtils.isNotBlank(startRiseIndex)){
			whereSql.append(" and t.rise_index > ?");
			params.add(startRiseIndex);
		}
		
		if(StringUtils.isNotBlank(endRiseIndex)){
			whereSql.append(" and t.rise_index < ?");
			params.add(endRiseIndex);
		}
		
		totalSql.append(whereSql);
		
		PageEntity<ShopSearch> pageEntity = new PageEntity<ShopSearch>();
		
		Map<String, Object> totalMap = sqlUtil.search(totalSql.toString(), params.toArray());
		
		long recordsTotal = StringUtils.toLong(totalMap.get("recordsTotal"));
		pageEntity.setRecordsFiltered(recordsTotal);
		pageEntity.setRecordsTotal(recordsTotal);

		// 排序
		String orderSql = "order by " + pageParam.getoTag() + ".";
		if (StringUtils.isNotBlank(pageParam.getOrderColumn()) && pageParam.getOrderColumn().indexOf("pre") > -1) {// 特殊处理
			orderSql += pageParam.getOrderColumn().replace("_pre", "");
		} else {
			orderSql += pageParam.getOrderColumn();
		}
		orderSql += " " + pageParam.getOrderDir();

		pageSql.append(whereSql).append(" ").append(orderSql).append(" limit " + pageParam.getStart() + ","+ pageParam.getLength());

		List<ShopSearch> pageList = sqlUtil.searchList(ShopSearch.class, pageSql.toString(), params.toArray());

		pageEntity.setData(pageList);

		pageEntity.setDraw(pageParam.getDraw());
		
		return pageEntity;
	}

	private void typeToSql(String types, StringBuffer whereSql, String gl) {
		String[] typeArr = types.split(",");
		for(String type : typeArr){
			
			if("1".equals(type)){
				whereSql.append(" and t.hot "+gl+" 0");
			}else if("2".equals(type)){
				whereSql.append(" and t.normal "+gl+" 0");
			}else if("3".equals(type)){
				whereSql.append(" and t.tb_cu "+gl+" 0");
			}else if("4".equals(type)){
				whereSql.append(" and t.activity "+gl+" 0");
			}else if("5".equals(type)){
				whereSql.append(" and t.taobaoke "+gl+" 0");
			}else if("6".equals(type)){
				whereSql.append(" and t.ztc "+gl+" 0");
			}else if("7".equals(type)){
				whereSql.append(" and t.ju "+gl+" 0");
			}else if("8".equals(type)){
				whereSql.append(" and t.normal_cu "+gl+" 0");
			}else if("11".equals(type)){
				whereSql.append(" and t.hot_mobile "+gl+" 0");
			}else if("13".equals(type)){
				whereSql.append(" and t.tb_cu_mobile "+gl+" 0");
			}else if("12".equals(type)){
				whereSql.append(" and t.activity_mobile "+gl+" 0");
			}else if("14".equals(type)){
				whereSql.append(" and t.ztc_mobile "+gl+" 0");
			}else if("10".equals(type)){
				whereSql.append(" and t.normal_cu_mobile "+gl+" 0");
			}
		}
	}
	
}
