package com.myproject.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import core.model.BaseModel;

@Entity
@Table(name = "sys_org")
public class SysOrg extends BaseModel {
	
	@Column
	private String orgName;		// 名称
	
	@Column
	private String path;		// 节点路径
	
	@ManyToOne
    @JoinColumn(name="pid")
	private SysOrg parentOrg;

	//@Transient
	// @OneToMany(cascade = { CascadeType.MERGE }, mappedBy = "depart")  
  //  @LazyCollection(LazyCollectionOption.EXTRA)
	
	//@Transient
/*	@OneToMany(targetEntity = Users.class, cascade = { CascadeType.PERSIST,
		CascadeType.MERGE }, mappedBy = "depart", fetch = FetchType.EAGER)
	private List<Users> users;*/
	
	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public SysOrg getParentOrg() {
		return parentOrg;
	}

	public void setParentOrg(SysOrg parentOrg) {
		this.parentOrg = parentOrg;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	} 
}
