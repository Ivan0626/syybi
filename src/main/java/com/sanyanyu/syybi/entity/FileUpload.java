package com.sanyanyu.syybi.entity;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.sanyanyu.syybi.listener.FileUploadProgressListener;

public class FileUpload {
	private Map<String, String> params;
	private Map<String, FileItem> files;

	public FileUpload() {
		params = new HashMap<String, String>();
		files = new HashMap<String, FileItem>();
	}

	public void setMap(HttpServletRequest request) {
		// Create a factory for disk-based file items
		FileItemFactory factory = new DiskFileItemFactory();
		// Create a new file upload handler
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("utf-8");
		upload.setProgressListener(new FileUploadProgressListener(request));// 设置进度监听器
		// Parse the request
		try {
			List<FileItem> items = upload.parseRequest(request);
			Iterator<FileItem> iter = items.iterator();
			while (iter.hasNext()) {
				FileItem item = (FileItem) iter.next();
				if (item.isFormField()) {
					String name = item.getFieldName();
					String value = item.getString();
					params.put(name, value);
				} else {
					String name = item.getFieldName();
					files.put(name, item);
				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
	}

	public Map<String, String> getParams() {
		return params;
	}

	public Map<String, FileItem> getFiles() {
		return files;
	}

	// 用来获取文件的名字
	public String getFileName(FileItem item) {
		String fName = item.getName();
		//System.out.println("fname=====>" + fName);
		int lastIndex = fName.lastIndexOf("\\");
		fName = fName.substring(lastIndex + 1);
		//System.out.println("new fname=====>" + fName);
		return fName;
	}
}