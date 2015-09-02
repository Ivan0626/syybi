package com.sanyanyu.syybi.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import com.sanyanyu.syybi.constants.FinalConstants;
import com.sanyanyu.syybi.entity.BaseUser;
import com.sanyanyu.syybi.service.BaseUserService;
import com.sanyanyu.syybi.service.LogSystemService;
import com.sanyanyu.syybi.utils.MD5Util;
import com.sanyanyu.syybi.utils.SendEmail;
import com.sanyanyu.syybi.utils.StringUtils;
import com.sanyanyu.syybi.utils.SysUtil;

/**
 * 用户注册
 * 
 * @Description: 处理用户注册相关的验证，保存功能
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午3:16:36 
 * @version V1.0
 */
public class RegisterServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;
    
	private BaseUserService baseUserService;
	
	@Override
	public void init() throws ServletException {
		super.init();
		
		this.baseUserService = new BaseUserService();
		this.logSystemService = new LogSystemService();
	}
	
    public RegisterServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String method = request.getParameter("method");
		
		if("existEmail".equals(method)){
			
			this.existEmail(request, response);
			
			String inputemail = request.getParameter("inputemail");
			
			this.saveLogSystem("邮箱唯一性校验", method, request, inputemail);
			
		}else if("existUsername".equals(method)){
			
			this.existUsername(request, response);
			
			String inputemail = request.getParameter("inputusername");
			
			this.saveLogSystem("用户名唯一性校验", method, request, inputemail);
			
		}else if("register".equals(method)){
			
			//保存注册信息
			String email = request.getParameter("email");
			String passwd = request.getParameter("passwd");
			String username = request.getParameter("username");
			String p = request.getParameter("p");
			
			BaseUser baseUser = new BaseUser();
			baseUser.setEmail(email);
			baseUser.setPassword(MD5Util.encode2hex(passwd));
			baseUser.setUsername(username);
			baseUser.setUserno(username);
			baseUser.setStatus(1);//有效用户
			baseUser.setGroupId(FinalConstants.GROUP_FREE_EDITION);//默认为免费版
			
			String validateCode = MD5Util.encode2hex(username + email);
			baseUser.setValidateCode(validateCode);
			
			baseUser.setUid(SysUtil.getUUID());
			baseUserService.saveBaseUser(request, baseUser, p);
			
			JSONObject json = new JSONObject();
			json.put("status", 1);
			
			response.getWriter().print(json.toString());
			
			this.saveLogSystem("用户注册", method, request, email);
		}else if("resend".equals(method)){//再次发送
			
			String email = request.getParameter("email");
			
			String validateCode = baseUserService.findValidateCodeByEmail(email);
			
			baseUserService.sendEmail(request, email, validateCode);
			
			JSONObject json = new JSONObject();
			json.put("status", 1);
			
			response.getWriter().print(json.toString());
			
			this.saveLogSystem("激活邮件再次发送", method, request, email);
		}else if("active".equals(method)){//激活
			
			String email = request.getParameter("email");
			String code = request.getParameter("code");
			
			BaseUser baseUser = baseUserService.findBaseUserByEmail(email);
			
			if(baseUser != null){
				if(baseUser.getStatus() != 0){//当前用户有效
					
					if(baseUser.getEmailStatus() == 0){//没有被激活
						
						if(baseUser.getValidateCode().equals(code)){
							
							//更新数据库
							baseUserService.validEmailStatus(email);
							
							//激活成功
							response.sendRedirect(request.getContextPath()+"/index/activeSuccess.jsp");
							
							this.saveLogSystem("注册邮件激活", method, request, email);
						}
						
					}else{
						//已经被激活
					}
					
				}else{
					//当前用户无效
				}
			}
		}else if("forgetPassword".equals(method)){//忘记密码
			
			String email = request.getParameter("email");
			
			//重置密码
			String newPassword = StringUtils.genRandomNum(10);
			
			baseUserService.resetPassword(MD5Util.encode2hex(newPassword), email);
			
			//发送邮件
			String loginUrl = request.getRequestURL().toString().replace("RegisterServlet","") + "index/index.jsp";
			//发送邮件
			StringBuffer content = new StringBuffer();
			content.append("<table width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" style=\"font-family: '微软雅黑', Arial, Helvetica, sans-serif;;line-height:1.6;font-size:12px;color:#333333\">")
					.append(" <tbody>")
					.append("	<tr>")
					.append("		<td style=\"background:#ff7607;width:150px;text-align:center\">")
					.append("			<p style=\"text-decoration:none;font-size:16px;font-weight:800;color:white;\" >电商指数</p>")
					.append("		</td>")
					.append("		<td>")
					.append("		</td>")
					.append("	</tr>")
					.append("	<tr style=\background:#ffffff;font-size:14px\">")
					.append("		<td colspan=\"2\">")
					.append("	 		<p><a href=\"mailto:"+email+"\" target=\"_blank\">"+email+"</a> 你好:<br>欢迎使用 电商指数，密码已重置为："+newPassword+", 请点击下面的链接重新登录:</p>")
					.append("	 		<div style=\"margin:10px 0;padding:10px;background:#fffadf;border-left:0px solid #233446\">")
					.append("		 		<a style=\"color:#233446;font-family:Monaco,Courier\" href=\""+loginUrl+"\" target=\"_blank\">")
					.append("		 			"+loginUrl)
					.append("		 		</a>")
					.append("	 		</div>")
					.append("	 		如果您无法打开上面的链接，请复制上面的链接到浏览器里面打开")
					.append("	 		<p>如果您没有在电商指数登录过，请忽略此邮件。</p>")
					.append("	   </td>")
					.append("	</tr>")
					.append("	<tr>")
					.append("		<td colspan=\"2\" style=\"background:#f0f0f0;color:#999999\">")
					.append("		此为系统邮件，请勿回复<br>请保管好您的邮箱，避免账户被他人盗用")
					.append("		</td>")
					.append(" 	</tr>")
					.append(" </tbody>")
					.append("</table>");
			
			SendEmail.send(email, content.toString());
			
			JSONObject json = new JSONObject();
			json.put("status", 1);
			
			response.getWriter().print(json.toString());
			
			this.saveLogSystem("忘记密码邮件发送", method, request, email);
		}
	}

	
	/**
	 * 邮箱校验
	 * @param inputemail
	 * @param response
	 * @throws IOException
	 */
	private void existEmail(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		String inputemail = request.getParameter("inputemail");
		
		boolean exist = baseUserService.existEmail(inputemail);
		
		JSONObject json = new JSONObject();
		json.put("exists", exist ? 1 : 0);
		
		response.getWriter().print(json.toString());
		
	}
	
	/**
	 * 用户名校验
	 * @param inputemail
	 * @param response
	 * @throws IOException
	 */
	private void existUsername(HttpServletRequest request, HttpServletResponse response) throws IOException{
		
		String inputusername = request.getParameter("inputusername");
		
		boolean exist = baseUserService.existUsername(inputusername);
		
		JSONObject json = new JSONObject();
		json.put("exists", exist ? 1 : 0);
		
		response.getWriter().print(json.toString());
		
	}

	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}
