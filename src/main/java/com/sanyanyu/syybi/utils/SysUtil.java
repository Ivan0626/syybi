package com.sanyanyu.syybi.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.UUID;

import org.apache.log4j.Logger;

/**
 * 系统配置文件工具类
 * @Description: 系统配置文件工具类
 * @author Ivan 2862099249@qq.com
 * @date 2014年11月27日 下午4:59:19 
 * @version V1.0
 */
public class SysUtil {

	private static Properties props = new Properties();
	
	private static Logger logger = Logger.getLogger(SysUtil.class);
	
	
	static{
		
		//获取系统配置文件properties的输入流
		InputStream inStream = SysUtil.class.getClassLoader().getResourceAsStream("syybi.properties");
		BufferedReader bf = new BufferedReader(new InputStreamReader(inStream));//因为字节流是无法读取中文的，所以采取reader把inputStream转换成reader用字符流来读取中文
		try {
			//加载输入流到属性中
			props.load(bf);
		} catch (IOException e) {
			logger.error("Not found the syybi.properties file:" + e, e);
		}
		
	}
	
	/**
	 * 根据name获取properties文件中的value
	 * @param name
	 * @return
	 */
	public static String getValue(String name){
		return props.getProperty(name);
	}
	
	public static void main(String[] args) {
		
		double a = 97.99;
		double b = 496.01;
		
		double diff = (b - a) * 1.0 / 5;
		
		for(int i = 0; i < 5; i++){
			System.out.println(StringUtils.formatDecimal(a+(i*diff), "#####0.00") +"-" + StringUtils.formatDecimal((a + (i+1)*diff), "#####0.00"));
		}
		
		
		
		
		System.out.println(props.getProperty("imagePath"));
	}
	
	/**
	 * 生成uuid
	 * @return
	 */
	public static String getUUID(){
		
		return UUID.randomUUID().toString();
		
	}
	
	/**
	 * 生成店铺的URL
	 * @param shopId
	 * @return
	 */
	public static String getShopUrl(String shopId){
		return getValue("shop.url").replace("{0}", shopId);
	}
	
	/**
	 * 生成产品的URL
	 * @param itemId
	 * @return
	 */
	public static String getPrdUrl(String itemId){
		return getValue("product.url").replace("{0}", itemId);
	}
	
	
}
