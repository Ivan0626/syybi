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
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.entity.ScalpEntity;
import com.sanyanyu.syybi.service.ShopService;

public class ShopAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(ShopAnalysisServlet.class);
	private ShopService shopService;
       
    public ShopAnalysisServlet() {
        super();
        
        shopService = new ShopService();
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
			
			
		}else if("hot_goods".equals(m)){
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<HotGoods> pageEntity = shopService.getHotGoods(this.getUid(request), pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("获取店铺分析-热销宝贝数据失败", e);
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
