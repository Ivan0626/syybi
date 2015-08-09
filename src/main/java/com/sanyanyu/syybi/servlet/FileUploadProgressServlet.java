package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

/**
 * 文件上传进度处理类
 * @Description: 文件上传进度处理类，动态反馈文件的上传进度百分比
 * @author Ivan 2862099249@qq.com
 * @date 2014年12月20日 上午11:37:31 
 * @version V1.0
 */
public class FileUploadProgressServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static Logger logger = Logger.getLogger(FileUploadProgressServlet.class);

	public FileUploadProgressServlet() {
		super();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();

		String status = (String) session.getAttribute("read");// 获取上传进度百分比
		if("100%".equals(status)){
			session.removeAttribute("read");
		}
		logger.debug("=====================file upload status:"+status);
		out.println(status);// 响应
	}

}
