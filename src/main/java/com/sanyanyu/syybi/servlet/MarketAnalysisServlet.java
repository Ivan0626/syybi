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
import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.GoodsList;
import com.sanyanyu.syybi.entity.MarketEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.entity.PriceTrend;
import com.sanyanyu.syybi.entity.ShopSearch;
import com.sanyanyu.syybi.service.MarketService;

/**
 * 营销组合分析
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月8日 上午10:36:25
 * @version V1.0
 */
public class MarketAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static Logger logger = LoggerFactory.getLogger(MarketAnalysisServlet.class);

	private MarketService marketService;

	public MarketAnalysisServlet() {
		super();

		marketService = new MarketService();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String m = request.getParameter("m");
		if ("searchB".equals(m)) {// 飚量店铺搜索

			try {
				// 获取商品类别
				List<CatApi> catList = marketService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}

			request.getRequestDispatcher("/pages/shopSearch.jsp").forward(request, response);

		} else if ("add_cat".equals(m)) {// 宝贝广告、宝贝跟踪、宝贝营销组合

			String parentNo = request.getParameter("parentNo");

			try {
				// 获取商品子类目
				List<CatApi> catList = marketService.getCat(parentNo);// 主营类目

				JSONArray json = JSONArray.fromObject(catList);

				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("获取商品子类目失败", e);
			}

		} else if ("detail".equals(m)) {// 宝贝广告、宝贝跟踪、宝贝营销组合

			request.getRequestDispatcher("/pages/goodsDetail.jsp").forward(request, response);

		} else if ("shop_list".equals(m)) {// ajax请求，店铺列表数据

			PageParam pageParam = null;
			try {
				pageParam = PageParam.getPageParam(request, MarketEntity.class);
			} catch (Exception e1) {
				logger.error("店铺列表分页查询的请求处理失败", e1);
			}
			try {

				String shopName = request.getParameter("shopName");

				PageEntity<MarketEntity> pageEntity = marketService.getShopList(pageParam, this.getUid(request),
						shopName);

				JSONObject json = JSONObject.fromObject(pageEntity);

				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("查询店铺列表失败", e);
			}

		} else if ("shop_attned".equals(m)) {// 搜索已关注的店铺
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = marketService.getAttnedShop(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的店铺失败", e);
			}

		} else if ("attned".equals(m)) {// 搜索已关注的店铺
			try {
				String shopId = request.getParameter("shopId");
				String shopName = request.getParameter("shopName");
				if (StringUtils.isNotBlank(shopId)) {
					String msg = marketService.attnedShop(this.getUid(request), shopId, shopName);

					JSONObject json = new JSONObject();
					json.put("status", msg);
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("判断用户是否已经关注该店铺失败", e);
			}

		}else if("batch_attned".equals(m)){//批量关注
			try {
				String shopIds = request.getParameter("shopIds");
				
				if (StringUtils.isNotBlank(shopIds)) {
					
					marketService.attnedShop(this.getUid(request), shopIds);

					JSONObject json = new JSONObject();
					json.put("status", "1");
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("批量关注店铺失败", e);
			}
			
		} else if ("shop_attn".equals(m)) {// 添加关注店铺
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = marketService.getAttnShop(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的店铺失败", e);
			}

		} else if ("del_attn".equals(m)) {

			String shopIds = request.getParameter("shopIds");
			String msg = "";
			try {
				if (marketService.enabledDel(this.getUid(request), shopIds)) {

					marketService.delAttn(this.getUid(request), shopIds);

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

		} else if ("goods_list".equals(m)) {
			try {
				// 获取商品类别
				List<CatApi> catList = marketService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}
			request.getRequestDispatcher("/pages/goodsList.jsp").forward(request, response);

		} else if ("ajax_goods_list".equals(m)) {// ajax获取宝贝列表

			String shopId = request.getParameter("shopId");
			String category = request.getParameter("category");
			String prdName = request.getParameter("prdName");
			String adType = request.getParameter("adType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<GoodsList> pageEntity = marketService.getPageShopList(pageParam, shopId, category, prdName,
						adType);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取宝贝的分页列表失败", e);
			}
		} else if ("ajax_ad_anlysis".equals(m)) {

			String shopId = request.getParameter("shopId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<AdAnalysis> pageEntity = marketService.getPageAdList(pageParam, shopId, startDate, endDate);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取广告分析列表失败", e);
			}

		} else if ("ad_anlysis_chart".equals(m)) {

			String shopId = request.getParameter("shopId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				List<AdAnalysis> list = marketService.getChartData(shopId, startDate, endDate);

				JSONArray json = JSONArray.fromObject(list);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取广告分析图表数据失败", e);
			}

		} else if ("goods_ad".equals(m)) {

			String shopId = request.getParameter("shopId");
			String itemId = request.getParameter("itemId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			String adType = request.getParameter("adType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;
				if ("1".equals(adType)) {// 热门钻展
					pageEntity = marketService.getHots(pageParam, shopId, itemId, startDate, endDate, "热门钻展");
				} else if ("2".equals(adType)) {// 普通钻展
					pageEntity = marketService.getHots(pageParam, shopId, itemId, startDate, endDate, "普通钻展");
				} else if ("3".equals(adType)) {// 淘宝促销
					pageEntity = marketService.getTaobaoCus(pageParam, shopId, itemId, startDate, endDate);
				} else if ("4".equals(adType)) {// 淘宝活动
					pageEntity = marketService.getGoodsTaobaos(shopId, startDate, endDate, "0", pageParam);
				} else if ("5".equals(adType)) {// 淘宝客
					pageEntity = marketService.getTaokes(pageParam, shopId, itemId, startDate, endDate);
				} else if ("6".equals(adType)) {// 直通车
					pageEntity = marketService.getGoodsZTCs(shopId, startDate, endDate, pageParam);
				} else if ("7".equals(adType)) {// 聚划算
					pageEntity = marketService.getGoodsJus(shopId, startDate, endDate, pageParam);
				} else if ("8".equals(adType)) {// 商品促销
					pageEntity = marketService.getGoodsCus(shopId, startDate, endDate, pageParam);
				} else if ("10".equals(adType)) {// 手机促销
					pageEntity = marketService.getGoodsCuMs(shopId, startDate, endDate, pageParam);
				} else if ("11".equals(adType)) {// 手机热门钻展
					pageEntity = marketService.getGoodsZuans(shopId, startDate, endDate, "手机热门钻展", pageParam);
				} else if ("12".equals(adType)) {// 手机淘宝活动
					pageEntity = marketService.getGoodsTaobaos(shopId, startDate, endDate, "1", pageParam);
				} else if ("13".equals(adType)) {// 手机淘宝促销
					pageEntity = marketService.getGoodsTbCuMs(shopId, startDate, endDate, pageParam);
				} else if ("14".equals(adType)) {// 手机直通车
					pageEntity = marketService.getGoodsZTCMs(shopId, startDate, endDate, pageParam);
				}

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取宝贝广告数据失败", e);
			}

		} else if ("goods_gen".equals(m)) {

			String shopId = request.getParameter("shopId");
			String itemId = request.getParameter("itemId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			String genType = request.getParameter("genType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;

				if ("1".equals(genType)) {// 调价跟踪
					pageEntity = marketService.getChngPrices(pageParam, shopId, itemId, startDate, endDate);
				} else if ("2".equals(genType)) {// 改名跟踪
					pageEntity = marketService.getChngNames(pageParam, shopId, itemId, startDate, endDate);
				} else if ("3".equals(genType)) {// 上架跟踪
					pageEntity = marketService.getChngAdds(pageParam, shopId, startDate, endDate);
				}

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取宝贝跟踪数据失败", e);
			}
		} else if ("goods_market".equals(m)) {
			String shopId = request.getParameter("shopId");
			String itemId = request.getParameter("itemId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;

				pageEntity = marketService.getGoodsMarkets(pageParam, shopId, itemId, startDate, endDate);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取宝贝营销组合分析的数据失败", e);
			}
		} else if ("shop_detail".equals(m)) {

			try {
				// 获取商品类别
				List<CatApi> catList = marketService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}

			request.getRequestDispatcher("/pages/shopDetail.jsp").forward(request, response);
		} else if ("ajax_shop_goods_list".equals(m)) {

			String shopId = request.getParameter("shopId");
			String date = request.getParameter("date");
			String category = request.getParameter("category");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;

				pageEntity = marketService.getPageShopGoodList(pageParam, category, shopId, date);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取店铺营销组合分析-宝贝列表的数据失败", e);
			}

		} else if ("shop_ad".equals(m)) {

			String shopId = request.getParameter("shopId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			String adType = request.getParameter("adType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;

				if ("ztc".equals(adType)) {
					pageEntity = marketService.getShopZTCs(pageParam, shopId, startDate, endDate);
				} else if ("hot".equals(adType)) {
					pageEntity = marketService.getShopZuan(pageParam, shopId, startDate, endDate, "热门钻展");
				} else if ("normal".equals(adType)) {
					pageEntity = marketService.getShopZuan(pageParam, shopId, startDate, endDate, "普通钻展");
				} else if ("taobaoke".equals(adType)) {
					pageEntity = marketService.getShopTaokes(pageParam, shopId, startDate, endDate);
				} else if ("hot_mobile".equals(adType)) {
					pageEntity = marketService.getShopZuan(pageParam, shopId, startDate, endDate, "手机热门钻展");
				} else if ("sale".equals(adType)) {

					String date = request.getParameter("date");

					pageEntity = marketService.getSaleShops(pageParam, shopId, date);
				} else if ("activity".equals(adType)) {// 淘宝活动
					pageEntity = marketService.getShopTaobaos(pageParam, shopId, startDate, endDate, "0");
				} else if ("activity_mobile".equals(adType)) {// 手机淘宝活动
					pageEntity = marketService.getShopTaobaos(pageParam, shopId, startDate, endDate, "1");
				}

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取店铺广告数据失败", e);
			}

		} else if ("shop_goods_ad".equals(m)) {

			String shopId = request.getParameter("shopId");
			String date = request.getParameter("date");
			String prdName = request.getParameter("prdName");

			String adType = request.getParameter("adType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;
				if ("1".equals(adType)) {// 热门钻展
					pageEntity = marketService.getGoodsZuans(pageParam, shopId, prdName, date, "热门钻展");
				} else if ("2".equals(adType)) {// 普通钻展
					pageEntity = marketService.getGoodsZuans(pageParam, shopId, prdName, date, "普通钻展");
				} else if ("3".equals(adType)) {// 淘宝促销
					pageEntity = marketService.getGoodsTbCus(pageParam, shopId, prdName, date);
				} else if ("4".equals(adType)) {// 淘宝活动
					pageEntity = marketService.getGoodsTaobaos(pageParam, shopId, prdName, date, "0");
				} else if ("5".equals(adType)) {// 淘宝客
					pageEntity = marketService.getGoodsTaokes(pageParam, shopId, prdName, date);
				} else if ("6".equals(adType)) {// 直通车
					pageEntity = marketService.getGoodsZTCs(pageParam, shopId, prdName, date);
				} else if ("7".equals(adType)) {// 聚划算
					pageEntity = marketService.getGoodsJus(pageParam, shopId, prdName, date);
				} else if ("8".equals(adType)) {// 商品促销
					pageEntity = marketService.getGoodsCus(pageParam, shopId, prdName, date);
				} else if ("10".equals(adType)) {// 手机促销
					pageEntity = marketService.getGoodsCuMs(pageParam, shopId, prdName, date);
				} else if ("11".equals(adType)) {// 手机热门钻展
					pageEntity = marketService.getGoodsZuans(pageParam, shopId, prdName, date, "手机热门钻展");
				} else if ("12".equals(adType)) {// 手机淘宝活动
					pageEntity = marketService.getGoodsTaobaos(pageParam, shopId, prdName, date, "1");
				} else if ("13".equals(adType)) {// 手机淘宝促销
					pageEntity = marketService.getGoodsTbCuMs(pageParam, shopId, prdName, date);
				} else if ("14".equals(adType)) {// 手机直通车
					pageEntity = marketService.getGoodsZTCMs(pageParam, shopId, prdName, date);
				}

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取店铺下的宝贝广告数据失败", e);
			}

		} else if ("price_trend".equals(m)) {

			String shopId = request.getParameter("shopId");
			String itemId = request.getParameter("itemId");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<PriceTrend> pageEntity = marketService.getPriceTrends(shopId, startDate, endDate, itemId,
						pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取价格走势数据失败", e);
			}

		} else if ("page_shop_search".equals(m)) {

			String category = request.getParameter("category");
			String types = request.getParameter("types");
			String ntypes = request.getParameter("ntypes");
			String startReAmount = request.getParameter("startReAmount");
			String endReAmount = request.getParameter("endReAmount");
			String shopType = request.getParameter("shopType");
			String startAmount = request.getParameter("startAmount");
			String endAmount = request.getParameter("endAmount");
			String startRiseIndex = request.getParameter("startRiseIndex");
			String endRiseIndex = request.getParameter("endRiseIndex");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<ShopSearch> pageEntity = marketService.getPageShopSearch(pageParam, this.getUid(request),
						category, types, ntypes, startReAmount, endReAmount, shopType, startAmount, endAmount,
						startRiseIndex, endRiseIndex);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取飚量店铺数据失败", e);
			}

		} else {
			request.getRequestDispatcher("/pages/marketAnalysis.jsp").forward(request, response);
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		this.doGet(request, response);
	}

}
