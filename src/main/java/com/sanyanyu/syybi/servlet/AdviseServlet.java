package com.sanyanyu.syybi.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;

import com.sanyanyu.syybi.entity.BaseAdvise;
import com.sanyanyu.syybi.service.AdviseService;

public class AdviseServlet extends BaseServlet {
	private static final long serialVersionUID = 1L;

	private AdviseService adviseService;
	
    public AdviseServlet() {
        super();
    }

    @Override
    public void init() throws ServletException {
    	super.init();
    	
    	this.adviseService = new AdviseService();
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String method = request.getParameter("method");
		
		if("init".equals(method)){
			
			request.getRequestDispatcher("/index/advise.jsp").forward(request, response);
			
		}else if("save".equals(method)){
			String content = request.getParameter("content");
			if(StringUtils.isNotBlank(content)){
				
				BaseAdvise baseAdvise = new BaseAdvise();
				baseAdvise.setContact(request.getParameter("contact"));
				baseAdvise.setContent(content);
				baseAdvise.setTitle(request.getParameter("title"));
				baseAdvise.setUid(this.getUid(request));
				
				adviseService.saveAdvise(baseAdvise);
				
				JSONObject json = new JSONObject();
				json.put("status", 1);

				response.getWriter().print(json.toString());
				
			}
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		this.doGet(request, response);
		
	}

}
