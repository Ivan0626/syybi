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

import com.sanyanyu.syybi.service.AccountSettingService;

/**
 * 账户设置Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年7月20日 下午8:09:55 
 * @version V1.0
 */
public class AccountSettingServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private static Logger logger = LoggerFactory.getLogger(AccountSettingServlet.class);
	
	private AccountSettingService accountSettingService;
	
    public AccountSettingServlet() {
        super();
    }

    @Override
    public void init() throws ServletException {
    	super.init();
    	
    	this.accountSettingService = new AccountSettingService();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String m = request.getParameter("m");
		
		if("ind_cat".equals(m)){
			
			String iid = request.getParameter("iid");
			
			try {
				List<Map<String, Object>> catList = accountSettingService.getCatByIid(iid);
				
				JSONArray json = JSONArray.fromObject(catList);
				
				response.getWriter().write(json.toString());
				
			} catch (Exception e) {
				logger.error("根据行业获取类目失败", e);
			}
		}else if("save_cat".equals(m)){
			
			String catNo = request.getParameter("catNo");
			
			try {
				if(StringUtils.isNotBlank(catNo)){
					accountSettingService.saveCat(this.getUid(request), catNo);
					
					JSONObject json = new JSONObject();
					json.put("status", 1);

					response.getWriter().print(json.toString());
				}
				
			} catch (Exception e) {
				logger.error("保存关注类目失败", e);
				
				JSONObject json = new JSONObject();
				json.put("status", 0);

				response.getWriter().print(json.toString());
			}
		}else if("attn_cnt".equals(m)){
			
			try {
				int cnt = accountSettingService.getAttnCnt(this.getUid(request));
				
				JSONObject json = new JSONObject();
				json.put("cnt", cnt);

				response.getWriter().print(json.toString());
				
			} catch (Exception e) {
				logger.error("获取关注类目数失败", e);
			}
			
			
		}else{
			try {
				List<Map<String, Object>> indList = accountSettingService.getAllInds();
				
				request.setAttribute("indList", indList);
				
				Map<String, Object> attedCat = accountSettingService.getAttedCatSingle(this.getUid(request));
				
				request.setAttribute("attedCat", attedCat);
				
			} catch (Exception e) {
				logger.error("获取所有行业失败", e);
			}
			
			request.getRequestDispatcher("/pages/accountSetting.jsp").forward(request, response);
		}
		
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		this.doGet(request, response);
		
	}

}
