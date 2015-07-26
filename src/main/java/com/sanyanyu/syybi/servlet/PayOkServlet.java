package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.alipay.util.AlipayNotify;
import com.sanyanyu.syybi.service.LogLoginService;
import com.sanyanyu.syybi.service.LogSystemService;
import com.sanyanyu.syybi.service.OrderService;

/**
 * 订单处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年5月7日 下午5:01:18
 * @version V1.0
 */
public class PayOkServlet extends BaseServlet {

	private static Logger logger = LoggerFactory.getLogger(PayOkServlet.class);

	private static final long serialVersionUID = 1L;

	private OrderService orderService;

	@Override
	public void init() throws ServletException {
		super.init();

		this.logLoginService = new LogLoginService();
		this.logSystemService = new LogSystemService();
		this.orderService = new OrderService();
	}

	public PayOkServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		//获取支付宝GET过来反馈信息
		Map<String,String> params = new HashMap<String,String>();
		Map requestParams = request.getParameterMap();
		for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}
		
		//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
		//商户订单号

		String out_trade_no = request.getParameter("out_trade_no");

		//支付宝交易号

		String trade_no = request.getParameter("trade_no");

		//交易状态
		String trade_status = request.getParameter("trade_status");

		//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
		
		//计算得出通知验证结果
		boolean verify_result = AlipayNotify.verify(params);
		
		if(verify_result){//验证成功
			logger.info("支付宝交易返回的参数验证成功");
			//////////////////////////////////////////////////////////////////////////////////////////
			//请在这里加上商户的业务逻辑程序代码

			//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
			if(trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")){
				//判断该笔订单是否在商户网站中已经做过处理
					//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
					//如果有做过处理，不执行商户的业务程序
				
				try {
					orderService.handleOrder(out_trade_no, trade_no, this.getUid(request));
					
					request.setAttribute("orderHandleSuccess", true);
					logger.info("订单处理成功");
				} catch (Exception e) {
					e.printStackTrace();
					request.setAttribute("orderHandleSuccess", false);
					logger.info("订单处理失败");
				}
				
			}else{
				logger.info("支付宝交易状态返回有误,trade_status:"+trade_status);
			}
		
		}else{
			logger.info("支付宝交易返回的参数验证失败");
		}
		
		request.setAttribute("out_trade_no", out_trade_no);
		request.setAttribute("trade_no", trade_no);
		
		request.getRequestDispatcher("/pages/payok.jsp").forward(request, response);

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

}
