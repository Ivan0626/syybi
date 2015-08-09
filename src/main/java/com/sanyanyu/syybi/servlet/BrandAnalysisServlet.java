package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.net.URLDecoder;
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

import com.sanyanyu.syybi.entity.AttnBrand;
import com.sanyanyu.syybi.entity.BrandList;
import com.sanyanyu.syybi.entity.CatApi;
import com.sanyanyu.syybi.entity.CatData;
import com.sanyanyu.syybi.entity.HotGoods;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.service.BrandService;
import com.sanyanyu.syybi.service.CatService;

/**
 * 品牌分析Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月7日 下午12:00:39 
 * @version V1.0
 */
public class BrandAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(BrandAnalysisServlet.class);
	private BrandService brandService;
	private CatService catService;
       
    public BrandAnalysisServlet() {
        super();
        
        brandService = new BrandService();
        catService = new CatService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if ("brand_attn".equals(m)) {// 添加关注品牌
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = brandService.getAttnBrand(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索关注的品牌失败", e);
			}

		}else if ("attned".equals(m)) {// 添加关注的品牌
			try {
				String brandName = request.getParameter("brandName");
				if (StringUtils.isNotBlank(brandName)) {
					String msg = brandService.attnedBrand(this.getUid(request), brandName);

					JSONObject json = new JSONObject();
					json.put("status", msg);
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("判断用户是否已经关注该品牌失败", e);
			}
		}else if ("brand_analysis".equals(m)) {
			try {
				
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<BrandList> pageEntity = brandService.getBrandAnalysisList(this.getUid(request), pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("获取品牌分析数据失败", e);
			}
		}else if ("del_attn".equals(m)) {

			String brandNames = request.getParameter("brandNames");
			String msg = "";
			try {
				if (brandService.enabledDel(this.getUid(request), brandNames)) {

					brandService.delAttn(this.getUid(request), brandNames);

					msg = "delSuccess";
				} else {
					msg = "disabledDel";
				}
				JSONObject json = new JSONObject();
				json.put("status", msg);
				response.getWriter().print(json.toString());
			} catch (Exception e) {
				logger.error("删除关注的品牌失败", e);
			}

		}else if("searchB".equals(m)){
			
			try {
				// 获取商品类别
				List<CatApi> catList = brandService.getCat("0", this.getUid(request));// 主营类目
				request.setAttribute("catList", catList);
			} catch (Exception e) {
				logger.error("获取商品主类别失败", e);
			}

			request.getRequestDispatcher("/pages/brandSearch.jsp").forward(request, response);
		}else if("brand_search".equals(m)){
			
			String category = request.getParameter("category");
			String brandName = request.getParameter("brandName");
			
			try {
				PageParam pageParam = PageParam.getPageParam(request);

				PageEntity<AttnBrand> pageEntity = brandService.getBrandSearchList(this.getUid(request), category, brandName, pageParam);

				JSONObject json = JSONObject.fromObject(pageEntity);
				response.getWriter().print(json.toString());

			} catch (Exception e) {
				logger.error("获取品牌分析-品牌搜索数据表失败", e);
			}
			
			
			
		}else if("batch_attned".equals(m)){//批量关注
			try {
				String brandNames = request.getParameter("brandNames");
				
				if (StringUtils.isNotBlank(brandNames)) {
					
					brandService.batchAttnedShop(this.getUid(request), brandNames);

					JSONObject json = new JSONObject();
					json.put("status", "1");
					response.getWriter().print(json.toString());
				}

			} catch (Exception e) {
				logger.error("批量关注品牌失败", e);
			}
			
		}else if("brand_ind".equals(m)){
			
			String brandName = request.getParameter("brandName");
			
			if(StringUtils.isNotBlank(brandName)){
				
				brandName = new String(URLDecoder.decode(brandName, "utf-8"));//支持中文检索
				
				String catNos = "";
				try {
					List<CatApi> catList = brandService.getCatByBrand(brandName);
					
					for(int i = 0; i < catList.size(); i++){
						
						catNos += catList.get(i).getCatNo();
						
						if(i != catList.size() - 1){
							catNos += ",";
						}
					}
					
					request.setAttribute("catList", catList);
					request.setAttribute("catNos", catNos);
					
				} catch (Exception e) {
					logger.error("获取品牌关联的顶层类目失败", e);
				}
				
				try {
					
					PageEntity<CatData> pageEntity = catService.getCateDatasByBrand(catNos, null, null, null, null);
					List<CatData> catDataList = pageEntity.getData();
					
					JSONArray json = JSONArray.fromObject(catDataList);
					
					request.setAttribute("catDataList", json.toString());
				} catch (Exception e) {
					logger.error("获取行业下的类目对应叶子节点的统计数据失败", e);
				}
			}
			
			request.getRequestDispatcher("/pages/brandIndAnalysis.jsp").forward(request, response);
		}else{
			
			try {
				// 获取商品类别
				List<CatApi> catList = brandService.getCat("0", this.getUid(request));
				request.setAttribute("catList", catList);
				
			} catch (Exception e) {
				logger.error("获取商品类别失败", e);
			}
			
			request.getRequestDispatcher("/pages/brandAnalysis.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
