package com.sanyanyu.syybi.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * 系统配置文件工具类
 * @Description: 系统配置文件工具类
 * @author Ivan 2862099249@qq.com
 * @date 2014年11月27日 下午4:59:19 
 * @version V1.0
 */
public class PropertiesUtil {

	private static Properties props = new Properties();
	
	private static Logger logger = Logger.getLogger(PropertiesUtil.class);
	
	
	static{
		
		//获取系统配置文件properties的输入流
		InputStream inStream = PropertiesUtil.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
		BufferedReader bf = new BufferedReader(new InputStreamReader(inStream));//因为字节流是无法读取中文的，所以采取reader把inputStream转换成reader用字符流来读取中文
		try {
			//加载输入流到属性中
			props.load(bf);
		} catch (IOException e) {
			logger.error("Not found the msh.properties file:" + e, e);
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
		System.out.println(props.getProperty("comp.env.jdbc"));
	}
	
	
	
	
}
