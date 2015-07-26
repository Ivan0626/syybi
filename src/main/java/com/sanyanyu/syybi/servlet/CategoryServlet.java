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

import com.sanyanyu.syybi.entity.CatData;
import com.sanyanyu.syybi.entity.CatEntity;
import com.sanyanyu.syybi.service.CatService;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 类目树Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月2日 下午3:12:07 
 * @version V1.0
 */
public class CategoryServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
    
	private static Logger logger = LoggerFactory.getLogger(CategoryServlet.class);
	
	private CatService catService;
	
    public CategoryServlet() {
        super();
    }
    
    @Override
    public void init() throws ServletException {
    	super.init();
    	catService = new CatService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String method = request.getParameter("method");
		if("queryCat".equals(method)){//检索query
			
			String queryCatName = request.getParameter("queryCatName");
			
			if(StringUtils.isNotBlank(queryCatName)){
				
				try {
					List<CatEntity> catList = catService.queryCat(queryCatName, this.getUid(request));
					JSONArray json = JSONArray.fromObject(catList);
					
					response.getWriter().write(json.toString());
				} catch (Exception e) {
					logger.error("检索类目信息失败", e);
				}
				
			}
			
		}else if("loadInd".equals(method)){//加载load行业下的子类目
			
			String iid = request.getParameter("iid");
			
			List<CatEntity> catList = null;
			List<CatData> catDataList = null;
			
			try {
				catList = catService.getCatesByIid(iid, this.getUid(request));
			} catch (Exception e) {
				logger.error("获取行业下的类目信息失败", e);
			}
			try {
				catDataList = catService.getCateDatasByIid(iid, this.getUid(request), null, null, null, null);
			} catch (Exception e) {
				logger.error("获取行业下的类目对应叶子节点的统计数据失败", e);
			}
				
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("catList", catList);
			jsonObject.put("catDataList", catDataList);
			
			response.getWriter().write(jsonObject.toString());
			
		}else if("loadCat".equals(method)){//加载类目下的子类目及父类目或者行业
			
			String catNo = request.getParameter("catNo");
			if(StringUtils.isNotBlank(catNo)){
				try {
					List<CatEntity> childCats = catService.getChildCatsByCatNo(catNo);
					
					CatEntity parentCat = catService.getParentByCatNo(catNo);
					
					JSONObject json = new JSONObject();
					json.put("childCats", JSONArray.fromObject(childCats));
					json.put("parentCat", JSONObject.fromObject(parentCat));
					
					response.getWriter().write(json.toString());
				} catch (Exception e) {
					logger.error("获取类目下的子类目以及父级信息失败", e);
				}
			}
			
		}else if("loadProp".equals(method)){
			String catNo = request.getParameter("catNo");
			if(StringUtils.isNotBlank(catNo)){
				try {
					List<CatEntity> childProps = catService.getChildPropsByCatNo(catNo);
					
					CatEntity parentCat = catService.getParentByCatNo(catNo);
					
					JSONObject json = new JSONObject();
					json.put("childProps", JSONArray.fromObject(childProps));
					json.put("parentCat", JSONObject.fromObject(parentCat));
					
					response.getWriter().write(json.toString());
				} catch (Exception e) {
					logger.error("获取类目下的子类目以及父级信息失败", e);
				}
			}
		}
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
