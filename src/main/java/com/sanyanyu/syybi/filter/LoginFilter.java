package com.sanyanyu.syybi.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 检测用户是否登录的过滤器，未登录直接重定向到登录页面
 * @Description: 检测用户是否登录的过滤器，未登录直接重定向到登录页面
 * @author Ivan 2862099249@qq.com
 * @date 2014年11月29日 下午5:13:18 
 * @version V1.0
 */
public class LoginFilter implements Filter {

    public LoginFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest hrequest = (HttpServletRequest)request;
		
		HttpServletResponse hresponse = (HttpServletResponse)response;
		
		Object user = hrequest.getSession().getAttribute("user");
		
		if(user == null){
			hresponse.sendRedirect(hrequest.getContextPath()+"/index/login.jsp");
			return;
		}
		
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
