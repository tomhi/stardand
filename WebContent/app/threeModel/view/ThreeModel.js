
Ext.define('AM.threeModel.view.ThreeModel', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.threemodel',
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
	defaults: {width: '100%',bodyStyle: 'border-bottom: 0px; border-left: 0px; border-right: 0px',},
	items : [{
			xtype: 'tabpanel',
			ref: 'top',
			flex: 1,
			defaults: {border: false},
			items: [
				{ 
					title : '用户信息',
					iconCls: 'user',
					xtype: 'usergrid'  
				}, {
					title: '关联用户',
					iconCls: 'user'
				}
			]
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
				}, {
					title : '业务变更',
					iconCls: 'date',
					xtype: 'businesschangegrid'
				}, {
					title : '图纸资料',
					iconCls: 'date',
					xtype: 'drawinginfogrid'
				}, {
					title : '面积结算',
					iconCls: 'date',
					xtype: 'areabalancegrid'
				}
			]
		}
	]
});
