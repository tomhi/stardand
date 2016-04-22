
Ext.define('AM.org.view.OrgPanel', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.orgpanel',
	requires : [
		'Ext.ux.form.SearchField'
	],
	baseCls: 'x-plain',
	border : false,
	layout : {
		type : 'border'
		//padding : '0 0 0 0'
	},
	dockedItems : [{
		/*	xtype : 'toolbar',
			dock : 'top',
			items : [{
					text : '添加',
					iconCls : 'Applicationadd'
				}, '-', {
					text : '修改',
					iconCls : 'Applicationedit'
				}, '-', {
					text : '删除',
					iconCls : 'Applicationdelete'
				}
			]
		}, {*/
			xtype : 'form',
			layout : 'hbox',
			//bodyStyle : 'background-color: #dfe8f6; border-left: 0px; border-right: 0px',
			bodyStyle : 'background-color: #DFE8F6; border-left: 0px; border-right: 0px',
			defaults : {
				padding : '6 6 6 6',
				labelAlign : 'right',
				labelWidth : 190
			},
			items : [{
					fieldLabel : '请输入要查找的部门或人员名称',
					width : 500,
					name : 'name',
					xtype : 'textfield'
					//xtype : 'searchfield'
				}, {
					xtype : 'container',
					items : {
						xtype : 'button',
						text : '查询',
						iconCls : 'zoom'
					}
				}
			]
		}
	],

	items : [{
			region : 'west',
			width : 180,
			style: 'border-right: 1px #99BBE8 solid; border-top: 1px #99BBE8 solid',
			iconCls : 'group',
			xtype : 'orgtree'
		}, {
			region : 'center',
			xtype: 'usergrid',
			border: false,
			style: 'border-left: 1px #99BBE8 solid; border-top: 1px #99BBE8 solid'
		}
	]
});
