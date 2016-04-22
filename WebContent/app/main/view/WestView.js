
Ext.define('AM.main.view.WestView', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.westview',
	iconCls : 'chartorganisation',
	animCollapse : true,
	width : 200,
	minWidth : 150,
	maxWidth : 400,
	split : true,
	collapsible : true,
	layout : {
		type : 'accordion',
		animate : true
	},
	bbar : {
		height : 20,
		items : ['->', '版权所有 Copyright Reserved', '->']
	},
	border: true,
	items : [{
			title : '收费业务',
			xtype: 'themenu',
			iconCls: 'calculator'
		}, {
			title : '系统设置',
			autoScroll : true,
			iconCls : 'cog'
		}
	]
});
