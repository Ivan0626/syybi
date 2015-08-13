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

import com.sanyanyu.syybi.entity.HotEntity;
import com.sanyanyu.syybi.entity.PageEntity;
import com.sanyanyu.syybi.entity.PageParam;
import com.sanyanyu.syybi.service.HotService;

/**
 * 热词分析
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月8日 上午10:36:25
 * @version V1.0
 */
public class HotAnalysisServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static Logger logger = LoggerFactory.getLogger(HotAnalysisServlet.class);

	private HotService hotService;
	
	public HotAnalysisServlet() {
		super();

		hotService = new HotService();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String m = request.getParameter("m");
		
		if("hot_list".equals(m)){//热词分析列表

			try {
				PageParam pageParam = PageParam.getPageParam(request);
				
				PageEntity<HotEntity> pageEntity = hotService.getHotList(this.getUid(request), pageParam);
				
				JSONObject json = JSONObject.fromObject(pageEntity);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("获取热词分析列表失败", e);
			}
		}else if("hot_attned".equals(m)){//已关注的热词搜索
			
			try {
				String q = new String(request.getParameter("q").getBytes("iso8859-1"), "utf-8");// 解决ajax
																								// get请求乱码
				if (StringUtils.isNotBlank(q)) {
					List<Map<String, Object>> list = hotService.getAttnedShop(this.getUid(request), q);

					JSONArray json = JSONArray.fromObject(list);

					response.getWriter().write(json.toString());
				}

			} catch (Exception e) {
				logger.error("搜索已关注的热词失败", e);
			}
			
		} else {
			request.getRequestDispatcher("/pages/hotAnalysis.jsp").forward(request, response);
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		this.doGet(request, response);
	}

}
