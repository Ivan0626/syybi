/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.sanyanyu.syybi.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.time.DateFormatUtils;

/**
 * 日期工具类, 继承org.apache.commons.lang.time.DateUtils类
 * 
 * @author ThinkGem
 * @version 2013-3-15
 */
public class DateUtils extends org.apache.commons.lang.time.DateUtils {

	private static String[] parsePatterns = { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "yyyy/MM/dd",
			"yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" };

	/**
	 * 得到当前日期字符串 格式（yyyy-MM-dd）
	 */
	public static String getDate() {
		return getDate("yyyy-MM-dd");
	}
	
	public static String getCurMonth() {
		return getDate("yyyy-MM");
	}
	
	public static String getLastMonthDate(){
		return getOffsetMonth(-1, "yyyy-MM") + "-01";
	}

	/**
	 * 得到当前日期字符串 格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 */
	public static String getDate(String pattern) {
		return DateFormatUtils.format(new Date(), pattern);
	}

	/**
	 * 得到日期字符串 默认格式（yyyy-MM-dd） pattern可以为："yyyy-MM-dd" "HH:mm:ss" "E"
	 */
	public static String formatDate(Date date, Object... pattern) {
		String formatDate = null;
		if (pattern != null && pattern.length > 0) {
			formatDate = DateFormatUtils.format(date, pattern[0].toString());
		} else {
			formatDate = DateFormatUtils.format(date, "yyyy-MM-dd");
		}
		return formatDate;
	}

	/**
	 * 得到日期时间字符串，转换格式（yyyy-MM-dd HH:mm:ss）
	 */
	public static String formatDateTime(Date date) {
		return formatDate(date, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 得到当前时间字符串 格式（HH:mm:ss）
	 */
	public static String getTime() {
		return formatDate(new Date(), "HH:mm:ss");
	}

	/**
	 * 得到当前日期和时间字符串 格式（yyyy-MM-dd HH:mm:ss）
	 */
	public static String getDateTime() {
		return formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 得到当前年份字符串 格式（yyyy）
	 */
	public static String getYear() {
		return formatDate(new Date(), "yyyy");
	}

	/**
	 * 得到当前月份字符串 格式（MM）
	 */
	public static String getMonth() {
		return formatDate(new Date(), "MM");
	}

	/**
	 * 得到当天字符串 格式（dd）
	 */
	public static String getDay() {
		return formatDate(new Date(), "dd");
	}

	/**
	 * 得到当前星期字符串 格式（E）星期几
	 */
	public static String getWeek() {
		return formatDate(new Date(), "E");
	}

	/**
	 * 日期型字符串转化为日期 格式 { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm",
	 * "yyyy/MM/dd", "yyyy/MM/dd HH:mm:ss", "yyyy/MM/dd HH:mm" }
	 */
	public static Date parseDate(Object str) {
		if (str == null) {
			return null;
		}
		try {
			return parseDate(str.toString(), parsePatterns);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 获取过去的天数
	 * 
	 * @param date
	 * @return
	 */
	public static long pastDays(Date date) {
		long t = new Date().getTime() - date.getTime();
		return t / (24 * 60 * 60 * 1000);
	}

	public static Date getDateStart(Date date) {
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = sdf.parse(formatDate(date, "yyyy-MM-dd") + " 00:00:00");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static Date getDateEnd(Date date) {
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = sdf.parse(formatDate(date, "yyyy-MM-dd") + " 23:59:59");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * @Title:getDaysListBetweenDates
	 * @Description: 获得两个日期之间的连续日期.
	 * @param begin
	 *            开始日期 .
	 * @param end
	 *            结束日期 .
	 * @return
	 * @return List<String>
	 */
	public static List<String> getDaysListBetweenDates(String begin, String end) {
		List<String> dateList = new ArrayList<String>();
		Date d1;
		Date d2;
		d1 = DateUtils.parseDate(begin);
		d2 = DateUtils.parseDate(end);
		if (d1.compareTo(d2) > 0) {
			return dateList;
		}
		do {
			dateList.add(DateFormatUtils.format(d1, "yyyy-MM-dd"));
			d1 = DateUtils.addDays(d1, 1);
			
		} while (d1.compareTo(d2) <= 0);
		return dateList;
	}
	
	/**
	 * 获取两个月份之间的连续月份
	 * @param begin
	 * @param end
	 * @return
	 */
	public static List<String> getMonthListBetweenDates(String begin, String end){
		
		//参数校验
		if(StringUtils.isNotBlank(begin) && begin.indexOf("-") > -1 && begin.length() == 7
				&& StringUtils.isNotBlank(end) && end.indexOf("-") > -1 && end.length() == 7){
			
			List<String> monthList = new ArrayList<String>();
			
			Date d1 = DateUtils.parseDate(begin + "-01");
			Date d2 = DateUtils.parseDate(end + "-01");
			
			if(d1.compareTo(d2) > 0){
				return null;
			}
			
			do {
				
				monthList.add(DateFormatUtils.format(d1, "yyyy-MM"));
				
				d1 = DateUtils.addMonths(d1, 1);
				
			}while(d1.compareTo(d2) <= 0);
			
			return monthList;
			
		}
		
		return null;
		
	}
	
	/** 
     * @Title:getOffsetDate 
     * @Description: 得到与当前日期偏移量为X的日期。 
     * @param offset 
     * @return 
     * @return String 
     */  
    public static String getOffsetDate(int offset) {  
        Calendar cal = Calendar.getInstance();  
        cal.add(Calendar.DAY_OF_MONTH, offset);  
        String currentDate = DateFormatUtils.format(cal, "yyyy-MM-dd");  
        return currentDate;  
    }  
	
    public static String getOffsetMonth(int offset) {  
    	return getOffsetMonth(offset, "yyyyMM");
    }  
    
    public static String getOffsetMonth(int offset, String pattern) {  
        Calendar cal = Calendar.getInstance();  
        cal.add(Calendar.MONTH, offset);  
        String currentDate = DateFormatUtils.format(cal, pattern);  
        return currentDate;  
    }  
    

	/**
	 * @param args
	 * @throws ParseException
	 */
	public static void main(String[] args) throws ParseException {
		// System.out.println(formatDate(parseDate("2010/3/6")));
		// System.out.println(getDate("yyyy年MM月dd日 E"));
		// long time = new Date().getTime()-parseDate("2012-11-19").getTime();
		// System.out.println(time/(24*60*60*1000));
		
//		Date curDate = new Date();
//		
//		Date validEndDate = DateUtils.parseDate("2015-04-30");
//		Date beyondDate = DateUtils.addDays(validEndDate, 1);
//		
//		if(DateUtils.isSameDay(curDate, beyondDate)){
//			System.out.println("aaa");
//			
//		}
//		
//		System.out.println(getOffsetDate(-30));
//		System.out.println(getDaysListBetweenDates(getOffsetDate(-30), getDate()));
		
		System.out.println(DateUtils.formatDate(new Date(System.currentTimeMillis()), "yyyyMMddHHmmssSSS"));
		
		System.out.println(getOffsetMonth(-1));
		
		System.out.println(getMonthListBetweenDates("2015-07", "2015-03"));
	}
}
