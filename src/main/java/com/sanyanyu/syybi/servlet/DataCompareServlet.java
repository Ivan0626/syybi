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
	private GoodsService goodsService;
       
    public DataCompareServlet() {
        super();
        
        goodsService = new GoodsService();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if ("xxx".equals(m)) {

		} else{
			
			request.getRequestDispatcher("/pages/dataCompare.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
