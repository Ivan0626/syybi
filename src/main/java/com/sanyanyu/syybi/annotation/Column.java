package com.sanyanyu.syybi.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 注解标识
 * 
 * @Description: 标记表中的字段
 * @author Ivan 2862099249@qq.com
 * @date 2015年3月13日 上午11:42:40 
 * @version V1.0
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {

	/* 与字段名对应 */
	String name();
	
	/* 字段的顺序 */
	int sort() default 0;
	
	/* 字段描述 */
	String desc() default "";
	
	/*是否需要检索*/
	boolean so() default false;
	
	/* 是否需要排序 */
	boolean or() default false;
	
	/* 排序字段所对应的表名或者别名 */
	String orderbyTag() default "";
	
}
