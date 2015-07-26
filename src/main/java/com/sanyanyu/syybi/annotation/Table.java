package com.sanyanyu.syybi.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 注解标识
 * 
 * @Description: 标记实体映射数据库的哪一张表
 * @author Ivan 2862099249@qq.com
 * @date 2015年4月12日 下午2:06:25 
 * @version V1.0
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Table {

	/* 表名 */
	String name();
	
}
