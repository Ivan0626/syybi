package com.sanyanyu.syybi.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import com.sanyanyu.syybi.entity.BasePermission;
import com.sanyanyu.syybi.entity.BaseUser;
import com.sanyanyu.syybi.service.PermissionService;

/**
 * 用户权限过滤
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月28日 下午9:38:03
 * @version V1.0
 */
public class PermissionFilter implements Filter {

	private PermissionService permissionService;

	public PermissionFilter() {
	}

	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {

		HttpServletRequest hrequest = (HttpServletRequest) request;

		HttpServletResponse hresponse = (HttpServletResponse) response;

		BaseUser user = (BaseUser) hrequest.getSession().getAttribute("user");

		if(user != null){//用户已经登录
			List<BasePermission> permList = permissionService.getUserPermissions(user.getUid());

			String p = hrequest.getParameter("p");

			boolean hasPermission = false;
			if (StringUtils.isNotBlank(p)) {
				for (BasePermission perm : permList) {
					if (p.equals(perm.getPermNo())) {// 有权限
						hasPermission = true;
						break;
					}
				}
				if(!hasPermission){
					hresponse.sendRedirect(hrequest.getContextPath() + "/pages/notPermission.jsp?px="+p);
					return;
				}
			}
		}
		
		chain.doFilter(request, response);
	}

	public void init(FilterConfig fConfig) throws ServletException {

		this.permissionService = new PermissionService();

	}

}
