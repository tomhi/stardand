
Ext.define('AM.multiModel.view.HistoryCostWindow', {

	extend : 'Ext.window.Window',
	alias : 'widget.historycostwindow',
	requires : [
		'AM.user.view.AreaInfoGrid',
		'AM.user.view.HistoryCostGrid',
		'AM.user.view.BusinessChangeGrid',
		'AM.user.view.DrawingInfoGrid',
		'AM.user.view.AreaBalanceGrid'
	],
	title : '查看历年费用信息',

	iconCls : 'userinfo',
	autoShow : true,
	modal : true,
	closeAction : 'close',
	border : false,
	layout : 'fit',
	items : [{
			xtype : 'tabpanel',
			items : [{
					title : '历年费用',
					iconCls : 'date',
					xtype : 'historycostgrid'
				}, {
					title : '面积信息',
					iconCls : 'applicationviewcolumns',
					xtype : 'areainfogrid'
				}, {
					title : '业务变更',
					iconCls : 'date',
					xtype : 'businesschangegrid'
				}, {
					title : '图纸资料',
					iconCls : 'date',
					xtype : 'drawinginfogrid'
				}, {
					title : '面积结算',
					iconCls : 'date',
					xtype : 'areabalancegrid'
				}
			]
		}
	]
});
