package com.sanyanyu.syybi.service;

import com.sanyanyu.syybi.entity.LogSystem;

/**
 * 用户行为日志的业务逻辑处理
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月15日 下午5:58:06 
 * @version V1.0
 */
public class LogSystemService extends BaseService {
	
	/**
	 * 保存
	 * @param logLogin
	 */
	public void saveLogSystem(LogSystem logSystem){
		
		sqlUtil.insert(logSystem);
		
	}
	
}
