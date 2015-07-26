package com.sanyanyu.syybi.servlet;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.alipay.config.AlipayConfig;
import com.sanyanyu.syybi.alipay.util.AlipaySubmit;
import com.sanyanyu.syybi.entity.BaseGroup;
import com.sanyanyu.syybi.entity.BaseOrder;
import com.sanyanyu.syybi.service.LogLoginService;
import com.sanyanyu.syybi.service.LogSystemService;
import com.sanyanyu.syybi.service.OrderService;
import com.sanyanyu.syybi.utils.Base64Util;
import com.sanyanyu.syybi.utils.DateUtils;
import com.sanyanyu.syybi.utils.StringUtils;

/**
 * 订单处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年5月7日 下午5:01:18
 * @version V1.0
 */
public class OrderServlet extends BaseServlet {

	private static Logger logger = LoggerFactory.getLogger(OrderServlet.class);

	private static final long serialVersionUID = 1L;

	private OrderService orderService;

	@Override
	public void init() throws ServletException {
		super.init();

		this.logLoginService = new LogLoginService();
		this.logSystemService = new LogSystemService();
		this.orderService = new OrderService();
	}

	public OrderServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String method = request.getParameter("method");

		if ("confirm".equals(method)) {// 确认订单
			// 专业版，旗舰版
			String v = request.getParameter("v");

			if (StringUtils.isNotBlank(v)) {
				String groupName = Base64Util.getFromBASE64(v);

				BaseGroup baseGroup = orderService.getBaseGroup(groupName);
				request.setAttribute("baseGroup", baseGroup);

				// 跳转到主页面
				request.getRequestDispatcher("/pages/confirmOrder.jsp").forward(request, response);
			}
		} else if ("order".equals(method)) {// 生成订单

			String groupName = request.getParameter("groupName");
			String payMoney = request.getParameter("payMoney");
			String payType = request.getParameter("payType");
			String payNum = request.getParameter("payNum");
			String points = request.getParameter("points");
			String validEndDate = request.getParameter("validEndDate");

			String validStartDate = DateUtils.getDate();

			BaseOrder baseOrder = new BaseOrder();
			baseOrder.setOrderCode("SYYO-"
					+ DateUtils.formatDate(new Date(System.currentTimeMillis()), "yyyyMMddHHmmssSSS"));
			baseOrder.setOrderName("购买：" + payType + groupName);
			baseOrder.setAmount(StringUtils.toInteger(payMoney));
			baseOrder.setDetail(payType + groupName + "，数量：" + payNum);
			baseOrder.setUid(this.getUid(request));
			baseOrder.setUsePoints(StringUtils.toInteger(points));
			baseOrder.setValidStartDate(validStartDate);
			baseOrder.setValidEndDate(validEndDate);

			orderService.saveOrder(baseOrder);

			request.setAttribute("baseOrder", baseOrder);

			request.getRequestDispatcher("/pages/pay.jsp").forward(request, response);

		} else if ("pay".equals(method)) {// 支付

			// //////////////////////////////////请求参数//////////////////////////////////////

			// 支付类型
			String payment_type = "1";
			// 必填，不能修改
			// 服务器异步通知页面路径
			//String notify_url = "http://" + request.getLocalAddr() + ":" + request.getLocalPort() + request.getContextPath() + "/pages/notify_url.jsp";
			String notify_url = "";
			// 需http://格式的完整路径，不能加?id=123这类自定义参数

			// 页面跳转同步通知页面路径
			//String return_url = "http://" + request.getLocalAddr() + ":" + request.getLocalPort() + request.getContextPath() + "/pages/return_url.jsp";
			String return_url = "http://" + request.getLocalAddr() + ":" + request.getLocalPort() + request.getContextPath() + "/a/PayOkServlet";
			// 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/

			// 商户订单号
			String out_trade_no = request.getParameter("WIDout_trade_no");
			// 商户网站订单系统中唯一订单号，必填

			// 订单名称
			String subject = request.getParameter("WIDsubject");
			// 必填

			// 付款金额
			String total_fee = request.getParameter("WIDtotal_fee");
			// 必填

			// 订单描述

			String body = request.getParameter("WIDbody");
			// 商品展示地址
			String show_url = request.getParameter("WIDshow_url");
			// 需以http://开头的完整路径，例如：http://www.商户网址.com/myorder.html

			// 防钓鱼时间戳
			String anti_phishing_key = "";
			// 若要使用请调用类文件submit中的query_timestamp函数

			// 客户端的IP地址
			String exter_invoke_ip = "";
			// 非局域网的外网IP地址，如：221.0.0.1

			// ////////////////////////////////////////////////////////////////////////////////

			// 把请求参数打包成数组
			Map<String, String> sParaTemp = new HashMap<String, String>();
			sParaTemp.put("service", "create_direct_pay_by_user");
			sParaTemp.put("partner", AlipayConfig.partner);
			sParaTemp.put("seller_email", AlipayConfig.seller_email);

			sParaTemp.put("_input_charset", AlipayConfig.input_charset);
			sParaTemp.put("payment_type", payment_type);
			sParaTemp.put("notify_url", notify_url);
			sParaTemp.put("return_url", return_url);
			sParaTemp.put("out_trade_no", out_trade_no);
			sParaTemp.put("subject", subject);
			sParaTemp.put("total_fee", total_fee);
			//sParaTemp.put("total_fee", "0.01");
			sParaTemp.put("body", body);
			sParaTemp.put("show_url", show_url);
			sParaTemp.put("anti_phishing_key", anti_phishing_key);
			sParaTemp.put("exter_invoke_ip", exter_invoke_ip);
			
//			String usePoints = request.getParameter("usePoints");
//			String validStartDate = request.getParameter("validStartDate");
//			String validEndDate = request.getParameter("validEndDate");
//			String extend_param = "usePoints^"+usePoints+"|"+"validStartDate^"+validStartDate+"|"+"validEndDate^"+validEndDate;
//			sParaTemp.put("extend_param", extend_param);

			// 建立请求
			String sHtmlText = AlipaySubmit.buildRequest(sParaTemp, "get", "确认");
			
			request.setAttribute("sHtmlText", sHtmlText);

			request.getRequestDispatcher("/pages/alipayapi.jsp").forward(request, response);
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

}
