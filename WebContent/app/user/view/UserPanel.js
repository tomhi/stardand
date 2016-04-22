
Ext.define('AM.user.view.UserPanel', {

	extend : 'Ext.panel.Panel',
	alias : 'widget.userpanel',
	border : false,
	//title : '用户信息',
	requires: [
		'AM.user.view.UserGrid'
	],
	layout : {
		type : 'fit'
		//padding : '5 5 5 5' // pad the layout from the window edges
	},
	initComponent: function() {
		this.callParent();
	},
	dockedItems : [{
			xtype : 'toolbar',
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
		}, {
			xtype : 'form',
			layout : 'hbox',
			bodyStyle: 'background-color: #dfe8f6; border-left: 0px; border-right: 0px',
			defaults : {
				xtype : 'textfield',
				padding : '6 6 6 6',
				labelAlign : 'right',
				labelWidth : 50
			},
			items : [{
					fieldLabel : '姓名',
					name : 'Q_username_S_LIKE'
				}, {
					fieldLabel : '性别',
					name : 'Q_sex_S_EQ',
					xtype: 'combo',
					editable: false,
					displayField: 'text',
					valueField: 'value',
					store: Ext.create('Ext.data.Store',{
						fields: ['text', 'value'],
						data: [
							{text: '男', value:'m'},
							{text: '女', value:'f'}
						]
					})
				}, {
					fieldLabel : 'Email',
					name : 'Q_email_S_LIKE'
				}, {
					xtype : 'container',
					defaults: {
						xtype : 'button',
						iconCls: 'zoom'
					},
					items : [{
						text : '查询',
						margin: '0 8 0 0'
					}, {
						xtype : 'button',
						text : '重置'
					}]
				}
			]
		}
	],
	items : [{
			//region : 'north',
			//iconCls : 'user',
			border : false,
			xtype : 'usergrid'
		}
	]
});
