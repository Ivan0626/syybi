package com.sanyanyu.syybi.utils;

import sun.misc.BASE64Decoder;

@SuppressWarnings("restriction")
public class Base64Util {

	public static void main(String[] args) {
		System.out.println(getBASE64("行业数据"));
		System.out.println(getFromBASE64("6KGM5Lia5pWw5o2u"));

	}

	// 将 s 进行 BASE64 编码
	public static String getBASE64(String s) {
		if (s == null)
			return null;
		return (new sun.misc.BASE64Encoder()).encode(s.getBytes());
	}

	// 将 BASE64 编码的字符串 s 进行解码
	public static String getFromBASE64(String s) {
		if (s == null)
			return null;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			byte[] b = decoder.decodeBuffer(s);
			return new String(b);
		} catch (Exception e) {
			return null;
		}
	}

}
