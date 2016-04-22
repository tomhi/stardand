
Ext.define('AM.menu.view.Menu', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.themenu',
	
	title : '系统菜单',
	iconCls : 'detail',
	border : false,
	enableDD : false,
	split : true,
	width : 212,
	minSize : 130,
	maxSize : 300,
	rootVisible : false,
	containerScroll : true,
	collapsible : true,
	autoScroll : false,
	store : 'AM.menu.store.MenuStore'
});
