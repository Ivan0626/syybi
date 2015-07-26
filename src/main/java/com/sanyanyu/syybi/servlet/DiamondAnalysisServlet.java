package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.DiamondDetail;
import com.sanyanyu.syybi.entity.DiamondEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.service.DiamondService;
import com.sanyanyu.syybi.service.MarketService;

/**
 * 钻展透视Servlet实现
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月22日 上午10:24:32 
 * @version V1.0
 */
public class DiamondAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(DiamondAnalysisServlet.class);
	
	private DiamondService diamondService;
	private MarketService marketService;
       
    public DiamondAnalysisServlet() {
        super();
        
        diamondService = new DiamondService();
        marketService = new MarketService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if("list".equals(m)){//ajax加载列表数据
			
			PageParam pageParam = null;
			try {
				pageParam = PageParam.getPageParam(request, DiamondEntity.class);
			} catch (Exception e1) {
				logger.error("钻展信息分页查询的请求处理失败", e1);
			}
			try {
				//pageParam.setOrderEnabled(false);//默认不排序
				PageEntity<DiamondEntity> pageEntity = diamondService.getPageList(pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("查询钻展信息列表失败", e);
			}
			
		}else if("detail".equals(m)){
			
			try {
				//List<DiamondEntity> cateList = diamondService.getCategorys();
				List<CatApi> cateList = marketService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("cateList", cateList);
				
			} catch (Exception e) {
				logger.error("查询钻展详情的主营类目失败", e);
			}
			
			request.getRequestDispatcher("/pages/diamondDetail.jsp").forward(request, response);
			
		}else if("ajax_detail".equals(m)){
			String bpid = request.getParameter("bpid");
			
			String category = request.getParameter("category");
			String startDate = request.getParameter("startDate");
			String endDate = request.getParameter("endDate");
			
			PageParam pageParam = null;
			try {
				pageParam = PageParam.getPageParam(request, DiamondDetail.class);
			} catch (Exception e1) {
				logger.error("钻展详情分页查询的请求处理失败", e1);
			}
			try {
				PageEntity<DiamondDetail> pageEntity = diamondService.getDetailPageList(pageParam, bpid, category, startDate, endDate, this.getUid(request));
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("查询钻展详情列表失败", e);
			}
		}else if("ad_detail".equals(m)){
			
			String azid = request.getParameter("azid");
			
			try {
				DiamondDetail diamondDetail = diamondService.getDetailById(azid);
				
				request.setAttribute("diamondDetail", diamondDetail);
				request.getRequestDispatcher("/pages/adDetail.jsp").forward(request, response);
			} catch (Exception e) {
				logger.error("根据azid查询广告详情失败", e);
			}
			
		}else if("ad_distribute".equals(m)){
			
			String shopId = request.getParameter("shopId");
			
			try {
				List<DiamondDetail> list = diamondService.getAdDistribute(shopId);
				
				JSONArray json = JSONArray.fromObject(list);
				
				response.getWriter().write(json.toString());
			} catch (Exception e) {
				logger.error("查询店铺近60天的的广告分布失败", e);
			}
			
		}else{
			request.getRequestDispatcher("/pages/diamondAnalysis.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
