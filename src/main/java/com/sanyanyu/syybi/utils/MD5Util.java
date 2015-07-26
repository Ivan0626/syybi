package com.sanyanyu.syybi.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.sanyanyu.syybi.alipay.config.AlipayConfig;
import com.sanyanyu.syybi.alipay.sign.MD5;
import com.sanyanyu.syybi.constants.FinalConstants;

/**
 * MD5工具类
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午4:10:46 
 * @version V1.0
 */
public class MD5Util {

	/**
	 * 将源字符串使用MD5加密为字节数组
	 * 
	 * @param source
	 * @return
	 */
	public static byte[] encode2bytes(String source) {
		byte[] result = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.reset();
			md.update(source.getBytes(FinalConstants.ENCODING));
			result = md.digest();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * 将源字符串使用MD5加密为32位16进制数
	 * 
	 * @param source
	 * @return
	 */
	public static String encode2hex(String source) {
		byte[] data = encode2bytes(source);
		StringBuffer hexString = new StringBuffer();
		for (int i = 0; i < data.length; i++) {
			String hex = Integer.toHexString(0xff & data[i]);

			if (hex.length() == 1) {
				hexString.append('0');
			}

			hexString.append(hex);
		}

		return hexString.toString();
	}

	/**
	 * 验证字符串是否匹配
	 * 
	 * @param unknown
	 *            待验证的字符串
	 * @param okHex
	 *            使用MD5加密过的16进制字符串
	 * @return 匹配返回true，不匹配返回false
	 */
	public static boolean validate(String unknown, String okHex) {
		return okHex.equals(encode2hex(unknown));
	}

	public static void main(String[] args) {
		
		String mysign = MD5.sign("", "1la_xKWTMa_XSAUQhH7_29A", AlipayConfig.input_charset);
		
		System.out.println(mysign);
	}
	
}