
Ext.define('AM.main.view.NorthView', {

	extend : 'Ext.container.Container',
	alias : 'widget.northview',
	border : false,
	height : 70,
	layout : 'hbox',
	items : [{
			xtype : 'box',
			flex : 1,
			style : 'font-size: 20px;',
			html : 'Ext Portal'
		}, {
			width : 140,
			baseCls : 'x-plain',
			height : '100%',
			border : false,
			bbar : [{
					ref : 'onlineUser',
					text : '在线用户',
					iconCls : 'statusonline'
				}, {
					text : '注销',
					iconCls : 'computerdelete'
				}
			]
		}
	]
});
