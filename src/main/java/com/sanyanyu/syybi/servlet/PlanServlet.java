package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.BaseGroup;
import com.sanyanyu.syybi.service.PermissionService;

/**
 * 前端套餐价格Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月7日 下午12:00:39 
 * @version V1.0
 */
public class PlanServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = LoggerFactory.getLogger(PlanServlet.class);
	
	private PermissionService permService;
	
    public PlanServlet() {
        super();
        
        permService = new PermissionService();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			List<BaseGroup> groupList = permService.getAllGroups();
			
			request.setAttribute("groupList", groupList);
			
		} catch (Exception e) {
			logger.error("获取所有权限组失败", e);
		}
		
		request.getRequestDispatcher("/index/plan.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
