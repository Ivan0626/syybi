package com.sanyanyu.syybi.listener;

import java.text.NumberFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.ProgressListener;

/**
 * 文件上传进度监听器
 * @Description: 文件上传进度监听器，以便将进度动态显示到客户端，增加用户体验度
 * @author Ivan 2862099249@qq.com
 * @date 2014年12月20日 上午11:28:01 
 * @version V1.0
 */
public class FileUploadProgressListener implements ProgressListener {

	private double megaBytes = -1;
	private HttpSession session;

	public FileUploadProgressListener(HttpServletRequest request) {
		session = request.getSession();
	}

	public void update(long pBytesRead, long pContentLength, int pItems) {
		double mBytes = pBytesRead ;//        / 1000000;
		double total = pContentLength; //      / 1000000;
		if (megaBytes == mBytes) {
			return;
		}
		//System.out.println("total====>" + total);
		//System.out.println("mBytes====>" + mBytes);
		megaBytes = mBytes;
		//System.out.println("megaBytes====>" + megaBytes);
		//System.out.println("We are currently reading item " + pItems);
		if (pContentLength == -1) {
			//System.out.println("So far, " + pBytesRead + " bytes have been read.");
		} else {
			//System.out.println("So far, " + pBytesRead + " of " + pContentLength + " bytes have been read.");
			double read = (mBytes / total);
			//System.out.println(read);
			NumberFormat nf = NumberFormat.getPercentInstance();
			//System.out.println("read===>" + nf.format(read));// 生成读取的百分比
																// 并放入session中
			session.setAttribute("read", nf.format(read));
		}
	}

}
