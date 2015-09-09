package com.sanyanyu.syybi.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 类目Entity
 * 
 * @Description: TODO
 * @author Ivan 2862099249@qq.com
 * @date 2015年6月1日 下午8:24:01 
 * @version V1.0
 */
@Table(name="tbbase.tb_base_cat_api")
public class CatEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer cid;
	private String catNo;
	private String catName;
	private String parentNo;
	private String isParent;
	private String indName;
	private Timestamp createTime;
	
	private String propName;
	
	private String flag;//标识，flag='ind'，表示父级类目为行业，flag='cat'，表示父级类目为类目
	
	private String att_cat;//行业下面有权限的类目或者类目下有权限的子类目
	
	private String cat_path;
	
	public String getCat_path() {
		return cat_path;
	}
	public void setCat_path(String cat_path) {
		this.cat_path = cat_path;
	}
	public String getPropName() {
		return propName;
	}
	public void setPropName(String propName) {
		this.propName = propName;
	}
	public String getAtt_cat() {
		return att_cat;
	}
	public void setAtt_cat(String att_cat) {
		this.att_cat = att_cat;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	@Column(name="cid")
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	
	@Column(name="cat_no")
	public String getCatNo() {
		return catNo;
	}
	public void setCatNo(String catNo) {
		this.catNo = catNo;
	}
	
	@Column(name="cat_name")
	public String getCatName() {
		return catName;
	}
	public void setCatName(String catName) {
		this.catName = catName;
	}
	
	@Column(name="parent_no")
	public String getParentNo() {
		return parentNo;
	}
	public void setParentNo(String parentNo) {
		this.parentNo = parentNo;
	}
	
	@Column(name="isparent")
	public String getIsParent() {
		return isParent;
	}
	public void setIsParent(String isParent) {
		this.isParent = isParent;
	}
	
	@Column(name="ind_name")
	public String getIndName() {
		return indName;
	}
	public void setIndName(String indName) {
		this.indName = indName;
	}
	
	@Column(name="createtime")
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	

}
