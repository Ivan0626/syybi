package com.sanyanyu.syybi.servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.BaseUser;
import com.sanyanyu.syybi.entity.LogLogin;
import com.sanyanyu.syybi.entity.LogSystem;
import com.sanyanyu.syybi.service.LogLoginService;
import com.sanyanyu.syybi.service.LogSystemService;
import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 请求处理基类
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月15日 下午8:00:14 
 * @version V1.0
 */
public abstract class BaseServlet extends HttpServlet {
	
	private static Logger logger = LoggerFactory.getLogger(BaseServlet.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -407094855122839400L;
	LogSystemService logSystemService;
	LogLoginService logLoginService;
	
	public String getUid(HttpServletRequest request){
		BaseUser baseUser = (BaseUser) request.getSession().getAttribute("user");
		
		return baseUser.getUid();
	}
	
	/**
	 * 获取客户的IP地址
	 * @param request
	 * @return
	 */
	public String getRemoteAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || ip.equalsIgnoreCase("unknown")) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	
	/**
	 * 保存用户行为日志
	 * @param remark
	 * @param method
	 * @param request
	 */
	public void saveLogSystem(String remark, String method, HttpServletRequest request){
		
		BaseUser baseUser = (BaseUser) request.getSession().getAttribute("user");
		
		//记录日志
		LogSystem logSystem = new LogSystem();
		logSystem.setUid(baseUser.getUid());
		logSystem.setRemark(remark);
		logSystem.setAction(this.getClass().getSimpleName() + "." + method);
		logSystem.setIp(getRemoteAddress(request));
		logSystem.setEmail(baseUser.getEmail());
		logSystemService.saveLogSystem(logSystem);
		
	}
	
	/**
	 * 保存用户行为日志
	 * @param remark
	 * @param method
	 * @param request
	 */
	public void saveLogSystem(String remark, String method, HttpServletRequest request, String email){
		
		//记录日志
		LogSystem logSystem = new LogSystem();
		logSystem.setRemark(remark);
		logSystem.setAction(this.getClass().getSimpleName() + "." + method);
		logSystem.setIp(getRemoteAddress(request));
		logSystem.setEmail(email);
		logSystemService.saveLogSystem(logSystem);
		
	}
	
	/**
	 * 保存用户登录日志
	 * @param remark
	 * @param method
	 * @param request
	 */
	public void saveLogLogin(String remark, String method, HttpServletRequest request){
		
		try {
			BaseUser baseUser = (BaseUser) request.getSession().getAttribute("user");
			//记录日志
			LogLogin logLogin = new LogLogin();
			//用户注销后再保存日志时，uid置为0,如果是-1，会报Out of range value for column 'uid'异常
			logLogin.setUid(baseUser==null? "0": baseUser.getUid());
			logLogin.setRemark(remark);
			logLogin.setAction(this.getClass().getSimpleName() + "." + method);
			logLogin.setIp(getRemoteAddress(request));
			logLogin.setLid(SysUtil.getUUID());
			logLoginService.saveLogLogin(logLogin);
		} catch (Exception e) {
			logger.error("保存用户登录日志失败", e);
		}
	}
	
	
}
