package com.myproject.vo;

/*
 * 树节点类
 * author: spq
 */
public class TreeNode {

	private String id;
	private String text;
	private Boolean leaf; 		// 是否是叶子节点
	private String iconCls; 	// 图标cls
	private Boolean expanded; 	// 是否展开
	private String path; 		// 路径

	private Integer childCount; // 子节点个数

	private String type;		// 种类(人员, org)

	public TreeNode() {
		
	}

	public TreeNode(String id, String text, String iconCls, Boolean leaf) {
		this.iconCls = iconCls;
		this.id = id;
		this.leaf = leaf;
		this.text = text;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}
	
	public Boolean getExpanded() {
		return expanded;
	}

	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}

	public Integer getChildCount() {
		return childCount;
	}

	public void setChildCount(Integer childCount) {
		this.childCount = childCount;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
}
