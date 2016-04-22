
Ext.define('AM.org.view.OrgTree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.orgtree',
	mixins: ['AM.util.TreeFilter'],
	title : '组织架构',
	animate: true,
	iconCls : 'detail',
	border : false,
	enableDD : false,
	split : true,
	//width : 212,
	minSize : 130,
	maxSize : 300,
	rootVisible : false,
	containerScroll : true,
	collapsible : true,
	autoScroll : false,
	store : 'AM.org.store.OrgTreeStore'
});
