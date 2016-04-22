package com.myproject.entity;

/*
 * 树节点类
 * author: spq
 */
public class TreeNode {

	private String id;
	private String text;
	private String leaf; // 是否是叶子节点
	private String iconCls; // 图标cls

	public TreeNode() {
		
	}

	public TreeNode(String id, String text, String iconCls, String leaf) {
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

	public String getLeaf() {
		return leaf;
	}

	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
}
