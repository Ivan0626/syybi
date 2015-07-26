package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.CatData;
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.service.AccountSettingService;
import com.sanyanyu.syybi.service.CatService;

/**
 * 行业分析Servlet
 * 
 * @Description: 返回页面内容和页面一开始需要加载的数据
 * @author Ivan 2862099249@qq.com
 * @date 2015年5月30日 下午2:36:09 
 * @version V1.0
 */
public class IndustryAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(IndustryAnalysisServlet.class);
	
	
	private AccountSettingService accountSettingService;
	private CatService catService;
	
    public IndustryAnalysisServlet() {
        super();
    }
    
    @Override
    public void init() throws ServletException {
    	super.init();
    	accountSettingService = new AccountSettingService();
    	catService = new CatService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if("ind_scale".equals(m)){
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				String iid = request.getParameter("iid");
				
				String startMonth = request.getParameter("startMonth");
				String endMonth = request.getParameter("endMonth");
				String shopType = request.getParameter("shopType");
				
				PageEntity<CatData> pageEntity = catService.getCateDatasByIid2(iid, this.getUid(request), startMonth, endMonth, shopType, pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);

				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("检索行业下的行业规模失败", e);
			}
			
		}else if("ind_scale_sub".equals(m)){
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);
				String catNo = request.getParameter("catNo");
				
				String startMonth = request.getParameter("startMonth");
				String endMonth = request.getParameter("endMonth");
				String shopType = request.getParameter("shopType");
				
				PageEntity<CatData> pageEntity = catService.getCateDatasByCatNo2(catNo, startMonth, endMonth, shopType, pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);

				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("检索行业下的行业规模失败", e);
			}
			
		}else if("ind_trend".equals(m)){

			String iid = request.getParameter("iid");
			
			String startMonth = request.getParameter("startMonth");
			String endMonth = request.getParameter("endMonth");
			String shopType = request.getParameter("shopType");
			
			try {
				List<Map<String, Object>> mapList = catService.getIndTrends(iid, this.getUid(request), startMonth, endMonth, shopType);
				
				JSONArray json = JSONArray.fromObject(mapList);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("检索行业下的行业趋势失败", e);
			}
			
			
		}else if("ind_trend_sub".equals(m)){

			String catNo = request.getParameter("catNo");
			
			String startMonth = request.getParameter("startMonth");
			String endMonth = request.getParameter("endMonth");
			String shopType = request.getParameter("shopType");
			
			try {
				List<Map<String, Object>> mapList = catService.getIndTrendSubs(catNo, startMonth, endMonth, shopType);
				
				JSONArray json = JSONArray.fromObject(mapList);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("检索类目下的子行业趋势失败", e);
			}
			
			
		}else if("ind_goods".equals(m)){
			
			String catNo = request.getParameter("catNo");
			
			String startMonth = request.getParameter("startMonth");
			String endMonth = request.getParameter("endMonth");
			String shopType = request.getParameter("shopType");
			
			try {
				
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<HotGoods> pageEntity = catService.getHotGoods(catNo, startMonth, endMonth, shopType, pageParam);
				
				JSONObject json =  JSONObject.fromObject(pageEntity);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("检索类目下的子行业的热销宝贝失败", e);
			}
			
		}else{
			try {
				
				List<Map<String, Object>> indList = accountSettingService.getAllInds();
				
				request.setAttribute("indList", indList);
				
				Map<String, Object> attedCat = accountSettingService.getAttedCat(this.getUid(request));
				
				request.setAttribute("attedCat", attedCat);
				
				request.getRequestDispatcher("/pages/industryAnalysis.jsp").forward(request, response);
			} catch (Exception e) {
				logger.error("获取所有行业数据失败", e);
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
