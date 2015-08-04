package com.sanyanyu.syybi.utils;

import java.net.HttpURLConnection;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class URLUtil {

	private static Logger logger = LoggerFactory.getLogger(URLUtil.class);
	
	private static final int REQUEST_COUNTS = 1; 

	public static void main(String[] args) {

		System.out.println(URLUtil.isConnect("https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.28.uUlgfm&id=43363722283&areaId=440300&cat_id=2&rn=3ae5f11fa9449fc58f3b600ec569bffc&standard=1&user_id=2359784945&is_b=1"));
		
	}

	/**
	 * 功能：检测当前URL是否可连接或是否有效, 描述：最多连接网络 REQUEST_COUNTS 次, 如果 REQUEST_COUNTS 次都不成功，视为该地址不可用
	 * 
	 * @param urlStr
	 *            指定URL网络地址
	 * @return URL
	 */
	public static synchronized URL isConnect(String urlStr) {
		int counts = 0;
		if (urlStr == null || urlStr.length() <= 0) {
			return null;
		}
		URL url = null;
		while (counts < REQUEST_COUNTS) {
			try {
				url = new URL(urlStr);
				HttpURLConnection con = (HttpURLConnection) url.openConnection();
				int state = con.getResponseCode();
				if (state == 200) {
					logger.info("URL可用！");
				}
				break;
			} catch (Exception ex) {
				counts++;
				logger.error("URL不可用，连接第 " + counts + " 次");
				urlStr = null;
				continue;
			}
		}
		return url;
	}

}
