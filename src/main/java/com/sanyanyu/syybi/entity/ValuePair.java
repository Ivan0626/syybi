package com.sanyanyu.syybi.entity;

import java.io.Serializable;

public class ValuePair implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name1;
	private String value1;
	private String name2;
	private String value2;
	public String getName1() {
		return name1;
	}
	public void setName1(String name1) {
		this.name1 = name1;
	}
	public String getValue1() {
		return value1;
	}
	public void setValue1(String value1) {
		this.value1 = value1;
	}
	public String getName2() {
		return name2;
	}
	public void setName2(String name2) {
		this.name2 = name2;
	}
	public String getValue2() {
		return value2;
	}
	public void setValue2(String value2) {
		this.value2 = value2;
	}
	
	
	
}
