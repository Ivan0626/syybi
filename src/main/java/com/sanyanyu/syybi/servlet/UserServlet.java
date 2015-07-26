package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.constants.FinalConstants;
import com.sanyanyu.syybi.entity.BaseOrder;
import com.sanyanyu.syybi.entity.BaseUser;
import com.sanyanyu.syybi.entity.PointsLog;
import com.sanyanyu.syybi.service.BaseUserService;
import com.sanyanyu.syybi.service.LogLoginService;
import com.sanyanyu.syybi.service.LogSystemService;
import com.sanyanyu.syybi.service.OrderService;
import com.sanyanyu.syybi.service.PointsLogService;
import com.sanyanyu.syybi.utils.Base64Util;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.MD5Util;
import com.sanyanyu.syybi.utils.StringUtils;

public class UserServlet extends BaseServlet {
	
	private static Logger logger = LoggerFactory.getLogger(UserServlet.class);
	
	private static final long serialVersionUID = 1L;

	private BaseUserService baseUserService;
	private OrderService orderService;
	private PointsLogService pointsLogService;

	@Override
	public void init() throws ServletException {
		super.init();

		this.baseUserService = new BaseUserService();
		this.logLoginService = new LogLoginService();
		this.logSystemService = new LogSystemService();
		this.orderService = new OrderService();
		this.pointsLogService = new PointsLogService();
	}

	public UserServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String method = request.getParameter("method");

		if ("login".equals(method)) {

			String username = request.getParameter("username");
			String password = request.getParameter("password");

			String p = request.getParameter("p");
			
			boolean isLogined = false;
			
			if("demo".equals(Base64Util.getFromBASE64(p))){
				username = FinalConstants.DEMO_USERNAME;
				password = FinalConstants.DEMO_PASSWORD;
			}
			
			if ((StringUtils.isNotBlank(username) && StringUtils.isNotBlank(password))) {
				
				//logger.info(username + ":" + password);
				BaseUser baseUser = baseUserService.getBaseUserByUP(username, MD5Util.encode2hex(password));
				
				if(baseUser != null){
					
					//判断之前用户的session是否注销
					// 是否已经登录
					Object user = request.getSession().getAttribute("user");
					if(user != null){//注销,非法用户禁止登陆，例如：利用session未失效功能
						request.getSession().removeAttribute("user");
					}
					//收费用户如果到期，直接降为免费版
					if(!"免费版".equals(baseUser.getGroupName())){
						
						Date curDate = new Date();
						
						Date validEndDate = DateUtils.parseDate(baseUser.getValidEndDate());
						Date beyondDate = DateUtils.addDays(validEndDate, 1);
						
						if(DateUtils.isSameDay(curDate, beyondDate)){
							//更新为免费版
							baseUserService.updateValidDate(baseUser.getRegDate(), FinalConstants.VALID_END_DATE, "免费版", baseUser.getEmail());
							
							baseUser.setGroupName("免费版");
							baseUser.setValidStartDate(baseUser.getRegDate());
							baseUser.setValidEndDate(FinalConstants.VALID_END_DATE);
							
						}
						
					}
					
					// 放到session中
					request.getSession().setAttribute("user", baseUser);
					
					boolean isQianDao = pointsLogService.isQianDao(this.getUid(request));
					request.setAttribute("isQianDao", isQianDao);

					// 跳转到主页面
					request.getRequestDispatcher("/a/Dashboard").forward(request, response);

					isLogined = true;

					// 记录日志
					this.saveLogLogin("用户登录", method, request);
					
				}
				
			}

			if (!isLogined) {
				response.sendRedirect(request.getContextPath() + "/index/login.jsp?error=true");
			}
			
		} else if ("logout".equals(method)) {
			
			response.sendRedirect(request.getContextPath() + "/index/login.jsp");

			try {
				// 记录日志
				this.saveLogLogin("用户注销", method, request);
				request.getSession().removeAttribute("user");
			} catch (Exception e) {
				logger.error("获取session失效，因为服务器已停止", e);
			}

		} else if ("modifyPassword".equals(method)) {

			String email = request.getParameter("email");
			String password = request.getParameter("password");
			if (StringUtils.isNotBlank(email) && StringUtils.isNotBlank(password)) {

				baseUserService.resetPassword(MD5Util.encode2hex(password), email);

				JSONObject json = new JSONObject();
				json.put("status", 1);

				response.getWriter().print(json.toString());
				
				//记录日志
				this.saveLogSystem("修改密码", method, request);

			}

		}else if("editMember".equals(method)){
			
			String userType = request.getParameter("userType");
			String contactPerson = request.getParameter("contactPerson");
			String contactTel = request.getParameter("contactTel");
			String industry = request.getParameter("industry");
			String channel = request.getParameter("channel");
			
			String companyName = request.getParameter("companyName");
			
			String shopName = request.getParameter("shopName");
			
			if("RadioButtonOrg".equals(userType)){
				
				baseUserService.editCompany(contactPerson, contactTel, industry, channel, companyName, this.getUid(request), shopName);
				
			}else if("RadioButtonPerson".equals(userType)){
				
				baseUserService.editPerson(contactPerson, contactTel, industry, channel, this.getUid(request), shopName);
				
			}
			
			JSONObject json = new JSONObject();
			json.put("status", 1);

			response.getWriter().print(json.toString());
			
		}else if("init".equals(method)){
			
			BaseUser baseUser = baseUserService.getBaseUserByUid(this.getUid(request));
			
			request.getSession().setAttribute("user", baseUser);//session覆盖
			
			boolean isQianDao = pointsLogService.isQianDao(this.getUid(request));
			request.setAttribute("isQianDao", isQianDao);
			
			// 跳转到主页面
			request.getRequestDispatcher("/pages/main.jsp").forward(request, response);
			
		}else if("getOrders".equals(method)){
			
			List<BaseOrder> orderList = orderService.getOrders(this.getUid(request));
			
			JSONArray json = JSONArray.fromObject(orderList);
			response.getWriter().write(json.toString());
			
		}else if("getPoints".equals(method)){
			
			String pointsType = request.getParameter("pointsType");
			
			List<PointsLog> pointsList =  pointsLogService.getPoints(this.getUid(request), StringUtils.toInteger(pointsType));
			
			JSONArray json = JSONArray.fromObject(pointsList);
			response.getWriter().write(json.toString());
			
		}else if("qianDao".equals(method)){
			
			pointsLogService.qianDao(this.getUid(request));
			
			JSONObject json = new JSONObject();
			json.put("status", 1);

			response.getWriter().print(json.toString());
			
		} else {
			request.getSession().removeAttribute("user");
			response.sendRedirect(request.getContextPath() + "/index/login.jsp");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

	

}
