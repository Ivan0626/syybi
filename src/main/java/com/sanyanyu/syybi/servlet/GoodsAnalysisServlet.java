package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.AdvertBase;
import com.sanyanyu.syybi.entity.AttDirDetail;
import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.DirEntity;
import com.sanyanyu.syybi.entity.GoodsList;
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.service.GoodsService;
import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;
import com.sanyanyu.syybi.utils.URLUtil;

/**
 * 宝贝分析Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月4日 上午11:33:02 
 * @version V1.0
 */
public class GoodsAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(GoodsAnalysisServlet.class);
	private GoodsService goodsService;
       
    public GoodsAnalysisServlet() {
        super();
        
        goodsService = new GoodsService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if ("attned".equals(m)) {// 添加关注目录
			try {
				String dirName = request.getParameter("dirName");
				if (StringUtils.isNotBlank(dirName)) {
					String msg = goodsService.attnedDir(this.getUid(request), dirName);

					JSONObject json = new JSONObject();
					json.put("status", msg);
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("宝贝分析-添加目录失败", e);
			}

		}else if("dir_list".equals(m)){//目录一览
			
			String dirName = request.getParameter("dirName");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<DirEntity> pageEntity = goodsService.getDirList(this.getUid(request), pageParam, dirName);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("宝贝分析-目录一览失败", e);
			}
		}else if("del_attn".equals(m)){//删除关注目录
			
			String dirIds = request.getParameter("dirIds");
			
			JSONObject json = new JSONObject();
			try {
				goodsService.delAttn(this.getUid(request), dirIds);
				
				json.put("status", "1");
				
			} catch (Exception e) {
				logger.error("宝贝分析-删除目录失败", e);
				json.put("status", "0");
			}
			response.getWriter().print(json.toString());
		}else if("del_attn_goods".equals(m)){//删除关注宝贝
			
			String itemIds = request.getParameter("itemIds");
			String adid = request.getParameter("adid");
			String msg = "";
			try {
				if (goodsService.enabledDel(adid, itemIds)) {

					goodsService.delAttnGoods(adid, itemIds);

					msg = "delSuccess";
				} else {
					msg = "disabledDel";
				}
				JSONObject json = new JSONObject();
				json.put("status", msg);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("删除关注的宝贝失败", e);
			}
			
		}else if("goods_list".equals(m)){//跳转到宝贝列表页面
			
			//加载宝贝目录
			
			String adid = request.getParameter("adid");
			
			try {
				List<Map<String, Object>> dirList = goodsService.getAttnedDirs(this.getUid(request), adid);
				
				request.setAttribute("dirList", dirList);
			} catch (Exception e) {
				logger.error("获取用户的关注目录失败", e);
			}
			
			try {
				Map<String, Object> priceMap = goodsService.getPriceMinMax(adid);
				
				request.setAttribute("priceMap", priceMap);
			} catch (Exception e) {
				logger.error("获取宝贝列表的最大和最小标价失败", e);
			}
			
			request.getRequestDispatcher("/pages/dirGoodsList.jsp").forward(request, response);
			
		}else if("ajax_goods_list".equals(m)){//ajax获取宝贝列表
			
			String adid = request.getParameter("adid");
			String prdName = request.getParameter("prdName");
			String category = request.getParameter("category");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<GoodsList> pageEntity = goodsService.getDirGoodsList(adid, prdName, category, pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("宝贝分析-宝贝列表数据失败", e);
			}
			
		}else if ("goods_attned".equals(m)) {// 搜索已关注的宝贝
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
				
				String adid = request.getParameter("adid");
				
				// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = goodsService.getAttnedGoods( adid, q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的宝贝失败", e);
			}

		}else if("attn_url".equals(m)){//关注宝贝链接
			
			String urlStr = request.getParameter("url");
			String adid = request.getParameter("adid");
			
			JSONObject json = new JSONObject();
			
			String status = "";
			
			URL url = URLUtil.isConnect(urlStr);
			if(url == null){
				status = "invalid";
			}else{
				
				//提取id
				String queryParams = url.getQuery();
				
				String[] qArr = queryParams.split("&");
				
				String itemId = "";
				
				for(String q : qArr){
					String[] pArr = q.split("=");
					if("id".equals(pArr[0])){
						itemId = pArr[1];
						break;
					}
				}
				
				try {
					Map<String, Object> map = goodsService.getShopIdByItemId(itemId);
					
					if(map == null || map.isEmpty()){
						status = "not_exist";
					}else{
						
						String shopId = map.get("shop_id").toString();
						
						//判断是否已经关注该宝贝
						boolean exist = goodsService.getGoodsExist(adid, shopId, itemId);
						if(exist){
							status = "attned";
						}else{
							
							AttDirDetail detail = new AttDirDetail();
							detail.setAddid(SysUtil.getUUID());
							detail.setAdid(adid);
							detail.setItem_id(itemId);
							detail.setShop_id(shopId);
							
							//保存关注宝贝
							goodsService.saveGoods(detail);
							
							status = "success";
						}
					}
					
				} catch (Exception e) {
					logger.error("根据宝贝id反查店铺id失败", e);
					status = "failure";
				}
			}
			json.put("status", status);
			
			response.getWriter().write(json.toString());
			
		}else if("to_dir".equals(m)){//移动目录
			
			String itemIds = request.getParameter("itemIds");
			String adid = request.getParameter("adid");
			
			String toAdid = request.getParameter("toAdid");
			
			JSONObject json = new JSONObject();
			try {
				goodsService.updateDetail(adid, itemIds, toAdid);
				
				json.put("status", "1");
				
			} catch (Exception e) {
				logger.error("移动宝贝失败", e);
				json.put("status", "0");
			}
			response.getWriter().print(json.toString());
			
		}else if ("goods_gen".equals(m)) {

			String adid = request.getParameter("adid");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			String genType = request.getParameter("genType");

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				PageEntity<?> pageEntity = null;

				if ("1".equals(genType)) {// 调价跟踪
					pageEntity = goodsService.getChngPrices(pageParam, startDate, endDate, adid);
				} else if ("2".equals(genType)) {// 改名跟踪
					pageEntity = goodsService.getChngNames(pageParam, startDate, endDate, adid);
				}

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("获取宝贝跟踪数据失败", e);
			}
		} else if("price_analysis".equals(m)){//价格段分析
			
			String adid = request.getParameter("adid");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");
			String shopType = request.getParameter("shopType");
			String startAvgPrice = request.getParameter("startAvgPrice");
			String endAvgPrice = request.getParameter("endAvgPrice");
			int priceSize = StringUtils.toInteger(request.getParameter("priceSize"));
			
			List<Map<String, String>> priceList = null;
			
			JSONObject json = new JSONObject();
			
			try {
				priceList = goodsService.getPriceCount(startAvgPrice, endAvgPrice, priceSize);
				
				json.put("priceList", priceList);
			} catch (Exception e) {
				logger.error("获取价格段失败", e);
			}
			
			try {
				if(priceList != null && priceList.size() > 0){
					Map<String, Object> priceData = goodsService.getPriceAnalysis(adid, startDate, endDate, shopType, startAvgPrice, endAvgPrice, priceList);
					json.put("priceData", priceData);
				}
				
			} catch (Exception e) {
				logger.error("获取价格段数据失败", e);
			}
			
			response.getWriter().print(json.toString());
			
		}else if("sales_trend".equals(m)){
			
			String adid = request.getParameter("adid");
			String showType = request.getParameter("showType");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");

			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<AdvertBase> pageEntity = goodsService.getSalesTrend(adid, showType, startDate, endDate, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取宝贝分析-销售趋势数据表失败", e);
			}
			
		}else if ("detail".equals(m)) {// 宝贝销售趋势、价格走势

			request.getRequestDispatcher("/pages/dirGoodsDetail.jsp").forward(request, response);

		}else if("searchB".equals(m)){
			
			try {
				List<Map<String, Object>> dirList = goodsService.getAttnedDirs(this.getUid(request));
				
				request.setAttribute("dirList", dirList);
			} catch (Exception e) {
				logger.error("获取所有用户的关注目录失败", e);
			}
			
			try {
				// 获取商品类别
				List<CatApi> catList = goodsService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}

			request.getRequestDispatcher("/pages/goodsSearch.jsp").forward(request, response);
		}else if("goods_search".equals(m)){
			
			String category = request.getParameter("category");
			String shopName = request.getParameter("shopName");
			
			String region = request.getParameter("region");
			
			String shopType = request.getParameter("shopType");
			
			String prdName = request.getParameter("prdName");
			String notPrdName = request.getParameter("notPrdName");
			String startAvgPrice = request.getParameter("startAvgPrice");
			String endAvgPrice = request.getParameter("endAvgPrice");
			
			String startAvgPriceTranPre = request.getParameter("startAvgPriceTranPre");
			String endAvgPriceTranPre = request.getParameter("endAvgPriceTranPre");
			
			String startVolumePre = request.getParameter("startVolumePre");
			String endVolumePre = request.getParameter("endVolumePre");
			
			String startVolume = request.getParameter("startVolume");
			String endVolume = request.getParameter("endVolume");
			
			String startAmountPre = request.getParameter("startAmountPre");
			String endAmountPre = request.getParameter("endAmountPre");
			
			String startAmount = request.getParameter("startAmount");
			String endAmount = request.getParameter("endAmount");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<HotGoods> pageEntity = goodsService.getGoodsSearchList(this.getUid(request), category, shopName, region, shopType, prdName, notPrdName, startAvgPrice, endAvgPrice, 
						startAvgPriceTranPre, endAvgPriceTranPre, startVolumePre, endVolumePre, startVolume, endVolume, startAmountPre, endAmountPre, startAmount, endAmount, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取宝贝分析-宝贝搜索数据表失败", e);
			}
			
			
			
		}else if("batch_attned".equals(m)){//批量关注
			
			JSONObject json = new JSONObject();
			try {
				
				String adid = request.getParameter("adid");
				String itemIds = request.getParameter("itemIds");
				
				if (StringUtils.isNotBlank(itemIds)) {
					
					goodsService.attnedGoods(this.getUid(request), adid, itemIds);

					json.put("status", "1");
				}

			} catch (Exception e) {
				logger.error("批量关注宝贝失败", e);
				json.put("status", "0");
			}
			
			response.getWriter().print(json.toString());
			
		} else{
			
			try {
				List<Map<String, Object>> attedList = goodsService.getAttnedShop(this.getUid(request));
				
				request.setAttribute("attedList", attedList);
				
			} catch (Exception e) {
				logger.error("获取已关注的店铺失败", e);
			}
			
			request.getRequestDispatcher("/pages/goodsAnalysis.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
