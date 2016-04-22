
Ext.define('AM.multiModel.view.TwoModelPanel', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.twomodelpanel',
	requires: [
	    'AM.user.view.AreaInfoGrid', 
	    'AM.user.view.HistoryCostGrid', 
	    'AM.user.view.BusinessChangeGrid', 
	    'AM.user.view.DrawingInfoGrid', 
	    'AM.user.view.AreaBalanceGrid'
	], 
	tbar : [{
			text : '添加',
			iconCls: 'Applicationadd'
		},'-',{
			text : '修改',
			iconCls: 'Applicationedit'
		},'-',{
			text : '删除',
			iconCls: 'Applicationdelete'
		}
	], 
	layout: 'vbox',
	defaults: {width: '100%', bodyStyle: 'border-bottom: 0px; border-left: 0px; border-right: 0px'},
	items : [{
			//title : '用户信息',
			//	iconCls: 'user',
			border: false,
			bodyStyle: 'border: 0px',
			xtype: 'usergrid',  
			ref: 'top',
			flex: 1,
			defaults: {border: false}
		}, {
			xtype : 'tabpanel',
			ref: 'bottom',
			flex: 1,
			defaults: {border: false},
			items : [{
					title : '面积信息',
					iconCls: 'applicationviewcolumns',
					xtype: 'areainfogrid'
				}, {
					title : '历年费用',
					iconCls: 'date',
					xtype: 'historycostgrid'
				}
			]
		}
	]
});
