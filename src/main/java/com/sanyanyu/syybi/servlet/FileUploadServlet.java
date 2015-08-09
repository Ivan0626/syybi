package com.sanyanyu.syybi.servlet;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sanyanyu.syybi.entity.AttDirDetail;
import com.sanyanyu.syybi.entity.FileUpload;
import com.sanyanyu.syybi.service.GoodsService;
import com.sanyanyu.syybi.utils.FileUtils;
import com.sanyanyu.syybi.utils.SysUtil;
import com.sanyanyu.syybi.utils.URLUtil;

/**
 * 文件上传的处理类
 * 
 * @Description: 文件上传的处理类
 * @author Ivan 2862099249@qq.com
 * @date 2014年12月20日 上午11:12:42
 * @version V1.0
 */
public class FileUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Logger logger = LoggerFactory.getLogger(FileUploadServlet.class);
	
	private GoodsService goodsService;
	
	public FileUploadServlet() {
		super();
		goodsService = new GoodsService();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		FileUpload fu = new FileUpload();
		fu.setMap(request);// 解析request
		Map<String, FileItem> files = fu.getFiles();

		FileItem fileItem = files.get("linkFile");
		
		String fileName = fu.getFileName(fileItem);
		
		String filePath = this.getServletContext().getRealPath("upload");
		
		FileUtils.createDirectory(filePath);
		
		File file = new File(filePath + "/" + fileName);
		
		String adid = fu.getParams().get("adid");
		
		try {

			fileItem.write(file);//写入磁盘
			
			//解析文件
			List<String> urlList = FileUtils.readTxtFile(file);
			
			JSONObject json = new JSONObject();
			
			String status = "";
			
			for(String urlStr : urlList){
				URL url = URLUtil.isConnect(urlStr);
				if(url == null){
					status = "invalid";
				}else{
					
					//提取id
					String queryParams = url.getQuery();
					
					String[] qArr = queryParams.split("&");
					
					String itemId = "";
					
					for(String q : qArr){
						String[] pArr = q.split("=");
						if("id".equals(pArr[0])){
							itemId = pArr[1];
							break;
						}
					}
					
					try {
						Map<String, Object> map = goodsService.getShopIdByItemId(itemId);
						
						if(map == null || map.isEmpty()){
							status = "not_exist";
						}else{
							
							String shopId = map.get("shop_id").toString();
							
							//判断是否已经关注该宝贝
							boolean exist = goodsService.getGoodsExist(adid, shopId, itemId);
							if(exist){
								status = "attned";
							}else{
								
								AttDirDetail detail = new AttDirDetail();
								detail.setAddid(SysUtil.getUUID());
								detail.setAdid(adid);
								detail.setItem_id(itemId);
								detail.setShop_id(shopId);
								
								//保存关注宝贝
								goodsService.saveGoods(detail);
								
								status = "success";
							}
						}
						
					} catch (Exception e) {
						logger.error("根据宝贝id反查店铺id失败", e);
						status = "failure";
					}
				}
			}
			
			file.delete();//删除文件
			
			json.put("status", status);
			
			response.getWriter().write(json.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
