
Ext.define('AM.main.view.Viewport', {
	
	extend : 'Ext.container.Viewport',
	requires : [
		'AM.main.view.NorthView',
		'AM.main.view.CenterView',
		'AM.main.view.WestView'
	],
	layout : {
		type : 'border',
		padding : '0 5 5 5' // pad the layout from the window edges
	},
	items : [{
			xtype : 'northview',	// 上侧
			region : 'north'
		}, {
			xtype : 'centerview',		// 中央
			region : 'center'
		}, {
			xtype : 'westview',		// 左侧
			region : 'west'
		}
	],
	initComponent: function() {
		this.callParent();
	}
});
