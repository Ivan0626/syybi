package com.sanyanyu.syybi.utils;

import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * 发送邮件的工具类
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午4:24:25 
 * @version V1.0
 */
public class SendEmail {

	public static final String HOST = "smtp.mxhichina.com";
	public static final String PROTOCOL = "smtp";
	public static final int PORT = 25;
	public static final String FROM = "service@ebindex.com";// 发件人的email
	public static final String PWD = "Sanyanyu.2015";// 发件人密码

	/**
	 * 获取Session
	 * 
	 * @return
	 */
	private static Session getSession() {
		Properties props = new Properties();
		props.put("mail.smtp.host", HOST);// 设置服务器地址
		props.put("mail.store.protocol", PROTOCOL);// 设置协议
		props.put("mail.smtp.port", PORT);// 设置端口
		props.put("mail.smtp.auth", true);

		Authenticator authenticator = new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(FROM, PWD);
			}

		};
		Session session = Session.getDefaultInstance(props, authenticator);

		return session;
	}

	public static void send(String toEmail, String content) {
		Session session = getSession();
		try {
			//System.out.println("--send--" + content);
			// Instantiate a message
			Message msg = new MimeMessage(session);

			// Set message attributes
			msg.setFrom(new InternetAddress(FROM));
			InternetAddress[] address = { new InternetAddress(toEmail) };
			msg.setRecipients(Message.RecipientType.TO, address);
			msg.setSubject("[电商指数]验证邮箱");
			msg.setSentDate(new Date());
			msg.setContent(content, "text/html;charset=utf-8");

			// Send the message
			Transport.send(msg);
		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		
		send("2862099249@qq.com", "测试邮件");
		
	}
}