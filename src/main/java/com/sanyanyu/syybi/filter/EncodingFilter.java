package com.sanyanyu.syybi.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 中文乱码过滤器
 * 
 * @Description: 中文乱码过滤器
 * @author Ivan 2862099249@qq.com
 * @date 2014年11月18日 下午12:09:12
 * @version V1.0
 */
public class EncodingFilter implements Filter {

	private FilterConfig config;

	public EncodingFilter() {
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {
		String encoding = config.getInitParameter("encoding");
		if (null != encoding && !"".equals(encoding)) {
			request.setCharacterEncoding(encoding);
			response.setCharacterEncoding(encoding);
		}
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {
		this.config = fConfig;
	}

}
