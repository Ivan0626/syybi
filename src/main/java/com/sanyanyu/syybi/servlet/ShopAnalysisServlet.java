package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.AdAnalysis;
import com.sanyanyu.syybi.entity.AdvertBase;
import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.CatData;
import com.sanyanyu.syybi.entity.GoodsList;
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.entity.ScalpEntity;
import com.sanyanyu.syybi.entity.ShopRate;
import com.sanyanyu.syybi.entity.ShopSearch;
import com.sanyanyu.syybi.service.GoodsService;
import com.sanyanyu.syybi.service.ShopService;

public class ShopAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(ShopAnalysisServlet.class);
	private ShopService shopService;
	private GoodsService goodsService;
       
    public ShopAnalysisServlet() {
        super();
        
        shopService = new ShopService();
        goodsService = new GoodsService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if("shop_list".equals(m)){//店铺列表
			
			String shopName = request.getParameter("shopName");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<ScalpEntity> pageEntity = shopService.getShopList(pageParam, this.getUid(request), shopName);
				
				JSONObject json = JSONObject.fromObject(pageEntity);

				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("获取店铺分析-店铺列表失败", e);
			}
			
		}else if ("shop_attned".equals(m)) {// 搜索已关注的店铺
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = shopService.getAttnedShop(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的店铺失败", e);
			}

		}else if ("shop_attn".equals(m)) {// 添加关注店铺
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = shopService.getAttnShop(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的店铺失败", e);
			}

		}else if ("attned".equals(m)) {// 添加关注的店铺
			try {
				String shopId = request.getParameter("shopId");
				String shopName = request.getParameter("shopName");
				if (StringUtils.isNotBlank(shopId)) {
					String msg = shopService.attnedShop(this.getUid(request), shopId, shopName);

					JSONObject json = new JSONObject();
					json.put("status", msg);
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("判断用户是否已经关注该店铺失败", e);
			}

		}else if ("del_attn".equals(m)) {

			String shopIds = request.getParameter("shopIds");
			String msg = "";
			try {
				if (shopService.enabledDel(this.getUid(request), shopIds)) {

					shopService.delAttn(this.getUid(request), shopIds);

					msg = "delSuccess";
				} else {
					msg = "disabledDel";
				}
				JSONObject json = new JSONObject();
				json.put("status", msg);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("删除关注的店铺失败", e);
			}

		}else if("shop_compare".equals(m)){
			
			String shopIds = request.getParameter("shopIds");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<AdAnalysis> pageEntity = shopService.getShopCompares(shopIds, pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("获取店铺分析-店铺对比数据失败", e);
			}
			
		}else if("shop_trend".equals(m)){
			
			String shopIds = request.getParameter("shopIds");
			
			try {
				
				List<Map<String, Object>> list = shopService.getShopTrends(shopIds);
				
				JSONArray json = JSONArray.fromObject(list);
				
				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("获取店铺分析-店铺对比-店铺走势图数据失败", e);
			}
			
			
		}else if("cat_analysis".equals(m)){//店铺的类目分析
			
			String shopIds = request.getParameter("shopIds");
			
			List<Map<String, Object>> catList = null;
			try {
				catList = shopService.getCatByShopIds(shopIds);
			} catch (Exception e) {
				logger.error("获取店铺分析-类目分析-所有类目数据失败", e);
			}
			
			List<Map<String, Object>> catData = null;
			
			try {
				catData = shopService.getCatAnalysis(shopIds, catList);
			} catch (Exception e) {
				logger.error("获取店铺分析-类目分析数据失败", e);
			}
			
			JSONObject json = new JSONObject();
			json.put("catList", catList);
			json.put("catData", catData);
			
			response.getWriter().print(json.toString());
			
		}else if("hot_goods".equals(m)){
			
			String category = request.getParameter("category");
			String shopType = request.getParameter("shopType");
			String prdName = request.getParameter("prdName");
			String volumeTotal = request.getParameter("volumeTotal");
			String amountTotal = request.getParameter("amountTotal");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<HotGoods> pageEntity = shopService.getHotGoods2(this.getUid(request), category, shopType, prdName, volumeTotal, amountTotal, pageParam);
				
				List<Map<String, Object>> dirList = goodsService.getAttnedDirs(this.getUid(request));
				pageEntity.setExtList(dirList);;
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("获取店铺分析-热销宝贝数据失败", e);
			}
			
		}else if("goods_list".equals(m)){
			
			// 获取商品类别
			try {
				List<CatApi> catList = shopService.getCat("0", this.getUid(request));
				
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品类别失败", e);
			}
			
			request.getRequestDispatcher("/pages/shopGoodsList.jsp").forward(request, response);
			
		}else if ("ajax_goods_list".equals(m)) {// ajax获取宝贝列表

			String shopId = request.getParameter("shopId");
			String category = request.getParameter("category");
			String prdName = request.getParameter("prdName");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<GoodsList> pageEntity = shopService.getShopGoodsList(shopId, category, prdName,pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-宝贝列表数据表失败", e);
			}
		}else if("sales_trend".equals(m)){
			
			String shopId = request.getParameter("shopId");
			String showType = request.getParameter("showType");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<AdvertBase> pageEntity = shopService.getSalesTrend(shopId, showType, startDate, endDate, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-销售趋势数据表失败", e);
			}
			
		}else if("shop_cat_analysis".equals(m)){
			
			String shopId = request.getParameter("shopId");
			String orderWay = request.getParameter("orderWay");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<CatData> pageEntity = shopService.getCatAnalysis(shopId, startDate, endDate, orderWay, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-类目分析数据表失败", e);
			}
			
		}else if("shop_detail".equals(m)){
			
			String shopId = request.getParameter("shopId");

			try {

				ShopSearch shopDetail = shopService.getShopDetail(shopId);
				
				JSONObject json = JSONObject.fromObject(shopDetail);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-店铺详情数据表失败", e);
			}
			
		}else if("dynamic_rate".equals(m)){
			
			String shopId = request.getParameter("shopId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<ShopRate> pageEntity = shopService.getDynamicRate(shopId, startDate, endDate, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-动态评分数据表失败", e);
			}
			
		}else if ("detail".equals(m)) {// 宝贝销售趋势、价格走势

			request.getRequestDispatcher("/pages/shopGoodsDetail.jsp").forward(request, response);

		}else if ("searchB".equals(m)) {// 飚量店铺搜索

			try {
				// 获取商品类别
				List<CatApi> catList = shopService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}

			request.getRequestDispatcher("/pages/shopSearch2.jsp").forward(request, response);

		}else if("shop_search".equals(m)){
			
			String category = request.getParameter("category");
			String prdName = request.getParameter("prdName");
			String notPrdName = request.getParameter("notPrdName");
			String startAvgPrice = request.getParameter("startAvgPrice");
			String endAvgPrice = request.getParameter("endAvgPrice");
			String monthType = request.getParameter("monthType");
			String startAvgPriceTran = request.getParameter("startAvgPriceTran");
			String endAvgPriceTran = request.getParameter("endAvgPriceTran");
			String shopType = request.getParameter("shopType");
			String region = request.getParameter("region");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<HotGoods> pageEntity = shopService.getShopSearchList(this.getUid(request), category, prdName, notPrdName, startAvgPrice, endAvgPrice, monthType, startAvgPriceTran, endAvgPriceTran, shopType, region, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取店铺分析-店铺搜索数据表失败", e);
			}
			
			
			
		}else if("batch_attned".equals(m)){//批量关注
			try {
				String shopIds = request.getParameter("shopIds");
				
				if (StringUtils.isNotBlank(shopIds)) {
					
					shopService.attnedShop(this.getUid(request), shopIds);

					JSONObject json = new JSONObject();
					json.put("status", "1");
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("批量关注店铺失败", e);
			}
			
		}else{
			
			try {
				List<Map<String, Object>> attedList = shopService.getAttnedShop(this.getUid(request));
				
				request.setAttribute("attedList", attedList);
				
				// 获取商品类别
				List<CatApi> catList = shopService.getCat("0", this.getUid(request));
				request.setAttribute("catList", catList);
				
			} catch (Exception e) {
				logger.error("获取已关注的店铺失败", e);
			}
			
			request.getRequestDispatcher("/pages/shopAnalysis.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
