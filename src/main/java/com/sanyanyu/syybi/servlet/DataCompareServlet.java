package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.net.URL;
import java.util.LinkedHashMap;
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
import com.sanyanyu.syybi.service.DataCompareService;
import com.sanyanyu.syybi.service.GoodsService;
import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;
import com.sanyanyu.syybi.utils.URLUtil;

/**
 * 数据对比Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月4日 上午11:33:02 
 * @version V1.0
 */
public class DataCompareServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(DataCompareServlet.class);
	private DataCompareService dataCompareService;
       
    public DataCompareServlet() {
        super();
        
        dataCompareService = new DataCompareService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if ("shop".equals(m)) {

			String shopType = request.getParameter("shopType");
			
			try {
				List<Map<String, Object>> mapList = dataCompareService.getShopList(this.getUid(request), shopType);
				
				JSONArray json = JSONArray.fromObject(mapList);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("获取店铺列表失败", e);
			}
			
			
		}else if("cat_shop".equals(m)){//根据店铺id获取主营类目
			
			String shopId = request.getParameter("shopId");
			
			try {
				List<Map<String, Object>> mapList = dataCompareService.getCatByShop(shopId);
				
				JSONArray json = JSONArray.fromObject(mapList);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("根据店铺id获取主营类目失败", e);
			}
			
		} else{
			
			request.getRequestDispatcher("/pages/dataCompare.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
