package com.sanyanyu.syybi.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 前端首页Servlet
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年8月7日 下午12:00:39 
 * @version V1.0
 */
public class IndexServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
	
    public IndexServlet() {
        super();
        
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.getRequestDispatcher("/index/main.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
