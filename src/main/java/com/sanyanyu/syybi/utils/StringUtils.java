package com.sanyanyu.syybi.utils;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringEscapeUtils;

/**
 * 字符串工具类, 继承org.apache.commons.lang3.StringUtils类
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午12:58:25
 * @version V1.0
 */
public class StringUtils extends org.apache.commons.lang3.StringUtils {

	/**
	 * 过滤字符串的html标签
	 */
	private final static String regxpForHtml = "<([^>]*)>";
	public final static String userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0";

	public static String filterHtml(String str) {
		Pattern pattern = Pattern.compile(regxpForHtml);
		Matcher matcher = pattern.matcher(str);
		StringBuffer sb = new StringBuffer();
		boolean result1 = matcher.find();
		while (result1) {
			matcher.appendReplacement(sb, "");
			result1 = matcher.find();
		}
		matcher.appendTail(sb);
		return sb.toString();
	}

	public static String lowerFirst(String str) {
		if (StringUtils.isBlank(str)) {
			return "";
		} else {
			return str.substring(0, 1).toLowerCase() + str.substring(1);
		}
	}

	public static String upperFirst(String str) {
		if (StringUtils.isBlank(str)) {
			return "";
		} else {
			return str.substring(0, 1).toUpperCase() + str.substring(1);
		}
	}

	/**
	 * 替换掉HTML标签方法
	 */
	public static String replaceHtml(String html) {
		if (isBlank(html)) {
			return "";
		}
		String regEx = "<.+?>";
		Pattern p = Pattern.compile(regEx);
		Matcher m = p.matcher(html);
		String s = m.replaceAll("");
		return s;
	}

	/**
	 * 缩略字符串（不区分中英文字符）
	 * 
	 * @param str
	 *            目标字符串
	 * @param length
	 *            截取长度
	 * @return
	 */
	public static String abbr(String str, int length) {
		if (str == null) {
			return "";
		}
		try {
			StringBuilder sb = new StringBuilder();
			int currentLength = 0;
			for (char c : replaceHtml(StringEscapeUtils.unescapeHtml4(str)).toCharArray()) {
				currentLength += String.valueOf(c).getBytes("GBK").length;
				if (currentLength <= length - 3) {
					sb.append(c);
				} else {
					sb.append("...");
					break;
				}
			}
			return sb.toString();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 缩略字符串（替换html）
	 * 
	 * @param str
	 *            目标字符串
	 * @param length
	 *            截取长度
	 * @return
	 */
	public static String rabbr(String str, int length) {
		return abbr(replaceHtml(str), length);
	}

	/**
	 * 转换为Double类型
	 */
	public static Double toDouble(Object val) {
		if (val == null) {
			return 0D;
		}
		try {
			return Double.valueOf(trim(val.toString()));
		} catch (Exception e) {
			return 0D;
		}
	}

	/**
	 * 转换为Float类型
	 */
	public static Float toFloat(Object val) {
		return toDouble(val).floatValue();
	}

	/**
	 * 转换为Long类型
	 */
	public static Long toLong(Object val) {
		return toDouble(val).longValue();
	}

	/**
	 * 转换为Integer类型
	 */
	public static Integer toInteger(Object val) {
		return toLong(val).intValue();
	}

	/**
	 * 获得用户远程地址
	 */
	public static String getRemoteAddr(HttpServletRequest request) {
		String remoteAddr = request.getHeader("X-Real-IP");
		if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("X-Forwarded-For");
		} else if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("Proxy-Client-IP");
		} else if (isNotBlank(remoteAddr)) {
			remoteAddr = request.getHeader("WL-Proxy-Client-IP");
		}
		return remoteAddr != null ? remoteAddr : request.getRemoteAddr();
	}

	/**
	 * 去除制表符
	 * 
	 * @param str
	 * @return
	 */
	public static String replaceBlank(String str) {
		String dest = "";
		if (StringUtils.isNotBlank(str)) {
			Pattern p = Pattern.compile("\\\\t|\\\\r|\\\\n|\\t|\\r|\\n|\\s*");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest;
	}

	/**
	 * 提取数字
	 * 
	 * @param str
	 * @return
	 */
	public static String getNumber(String str) {
		String dest = "";
		if (StringUtils.isNotBlank(str)) {
			dest = Pattern.compile("[^0-9]").matcher(str).replaceAll("");
		}
		return dest;
	}

	/**
	 * 根据给出的字段名获取相应的get方法
	 * 
	 * @param name
	 *            给出的字段名
	 * @return 返回相应字段的get方法
	 */
	public static String getMethodName(String name) {
		char[] ch = name.toCharArray();
		ch[0] -= 32;
		String str = new String(ch);
		return "get" + str;
	}

	/**
	 * 生成随即密码
	 * 
	 * @param pwd_len
	 *            生成的密码的总长度
	 * @return 密码的字符串
	 */
	public static String genRandomNum(int pwd_len) {
		// 35是因为数组是从0开始的，26个字母+10个 数字
		final int maxNum = 36;
		int i; // 生成的随机数
		int count = 0; // 生成的密码的长度
		char[] str = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
				't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

		StringBuffer pwd = new StringBuffer("");
		Random r = new Random();
		while (count < pwd_len) {
			// 生成随机数，取绝对值，防止 生成负数，

			i = Math.abs(r.nextInt(maxNum)); // 生成的数最大为36-1

			if (i >= 0 && i < str.length) {
				pwd.append(str[i]);
				count++;
			}
		}

		return pwd.toString().toUpperCase();
	}
	
	/**
	 * 保留两位小数，并显示为千分位
	 * @param val
	 * @return
	 */
	public static String formatDecimal(Double val){
		
		return formatDecimal(val, "###,##0.00");
	}
	
	/**
	 * 
	 * @param val
	 * @return
	 */
	public static String formatDecimal(Double val, String pattern){
		if(val == null) return null;
		
		DecimalFormat df = new DecimalFormat(pattern);
		return df.format(val);
	}
	
	/**
	 * 千分位表示
	 * @param val
	 * @return
	 */
	public static String formatInteger(Integer val){
		return formatInteger(val, "###,##0");
	}
	
	public static String formatInteger(Integer val, String pattern){
		if(val == null) return null;
		
		DecimalFormat df = new DecimalFormat(pattern);
		return df.format(val);
	}
	
	/**
	 * 保留两位小数
	 * @param val
	 * @return
	 */
	public static String formatPercent100(Double val){
		if(val == null) return null;
		NumberFormat format = NumberFormat.getPercentInstance();// 获取格式化类实例 

	    format.setMinimumFractionDigits(2);// 设置小数位 
	    
	    return format.format(val / 100.0);
	}
	
	public static String formatPercent(Double val){
		if(val == null) return null;
		NumberFormat format = NumberFormat.getPercentInstance();// 获取格式化类实例 

	    format.setMinimumFractionDigits(2);// 设置小数位 
	    
	    return format.format(val);
	}

	/**
	 * 生成sql中in部分
	 * @param val
	 * @return 比如：1111,222,333==>'1111','222','333'
	 */
	public static String strIn(String val){
		
		return "'" + val.replace(",", "','") + "'";
		
	}
	
	//转化字符串为十六进制编码  
	public static String toHexString(String s) {  
	   String str = "";  
	   for (int i = 0; i < s.length(); i++) {  
	    int ch = (int) s.charAt(i);  
	    String s4 = Integer.toHexString(ch);  
	    str = str + s4;  
	   }  
	   return str;  
	}  
	
	public static void main(String[] args) {
		
		String str = " 三能";
		String str2 = " 三能";
		
		System.out.println("|"+ str + "|");
		System.out.println("|"+ toHexString(str) + "|");
		System.out.println("|"+ toHexString(str2) + "|");
		
		System.out.println("|"+ str.trim() + "|");
		System.out.println("|"+ str2.trim() + "|");
		System.out.println("|"+ replaceBlank(str) + "|");
		
		 //System.out.println(genRandomNum(10));
	}

	
}
