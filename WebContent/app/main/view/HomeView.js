
/**
 * 首页
 * author: spq
 */
Ext.define('AM.main.view.HomeView', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.homeview',
	requires : [
	    //'Ext.view.BoundList'
		//'AM.main.view.portal.base.PortalPanel',
		//'AM.main.view.portal.base.PortalColumn',
		//'AM.main.view.portal.GridPortlet',
		//'AM.main.view.portal.ChartPortlet'
	],
	layout: 'hbox',
	border: false,
	defaults: {
		height: '100%',
		flex: 1,
		margin: '7 0 7 7',
		border: true
	},
	items: [
		{
			flex: 1,
			border: false,
			layout: 'vbox',
			defaults: { 
				width: '100%',
				flex: 1,
				frame: true
				//style: 'border: 1px green solid '
			},
			items: [
				{
					xtype: 'usergrid'
						/*title: 'fdafds',
	                    xtype: 'boundlist',
	                    itemId: 'boundlistId',
	                    height: 150,
	                    deferInitialRefresh: false,
	                    multiSelect: true,
	                    displayField: 'value1',
	                    valueField: 'value2',
	                    store: Ext.create('Ext.data.Store',{
	                        fields: ['value2', 'value1'],
	                        data: []
	                    })*/
				}, {
					title: '模块2',
					style: 'margin-top: 10px'
					//xtype: 'container'
				}
			]
		},{
			title: '模块3',
			html: '模块3',
			xtype: 'container',
			frame: true
		},{
			title: '模块4',
			html: '模块4',
			xtype: 'container',
			frame: true
		}
	]
});
