
/**
 * 用户新增窗口
 * author: spq
 */
Ext.define('AM.multiModel.view.UserAddWindow', {

	extend : 'Ext.window.Window',
	alias : 'widget.useraddwindow',
	requires : [
		// 'AM.user.view.AreaInfoGrid',
		// 'AM.user.view.HistoryCostGrid',
		// 'AM.user.view.BusinessChangeGrid',
		// 'AM.user.view.DrawingInfoGrid',
		// 'AM.user.view.AreaBalanceGrid'
	],

	//animateTarget : button,
	iconCls : 'useradd',
	title : '添加',
	width : 800,
	height : 300,
	autoShow : true,
	modal : true,
	closeAction : 'close',
	layout : 'fit',
	border : false,
	items : {
		layout : 'vbox',
		defaults : {
			width : '100%'
		},
		items : {
			title : '用户信息',
			xtype : 'fieldset',
			region : 'north',
			height : 180,
			flex : 1,
			margin : '10 10 10 10',
			padding : '6 6 6 6',
			items : {
				xtype : 'form',
				border : false,
				/*layout : {
					//type : 'vbox',
					align : 'stretch'
				},*/
				defaults : {
					layout : 'hbox',
					baseCls : 'x-plain',
					margin : '4 10 4 10',
					defaults : {
						xtype : 'textfield',
						labelWidth : 50,
						//anchor : '100%',
						labelAlign : 'right',
						flex : 1
					}
				},
				items : [{
						items : [{
								fieldLabel : '姓名',
								name : 'username',
								anchor: '-5'
							}, {
								fieldLabel : '性别',
								name : 'sex',
								xtype : 'combo',
								editable : false,
								displayField : 'text',
								valueField : 'value',
								store : Ext.create('Ext.data.Store', {
									fields : ['text', 'value'],
									data : [{
											text : '男',
											value : 'm'
										}, {
											text : '女',
											value : 'f'
										}
									]
								}),
								anchor: '-5'
							}, {
								fieldLabel : 'Email',
								name : 'email',
								vtype : 'email',
								anchor: '-5'
							}
						],
						anchor: '-5'
					}, {
						xtype : 'textarea',
						fieldLabel : '备注',
						name : 'note',
						labelWidth : 50,
						labelAlign : 'right',
						height : 140, 
						anchor: '-5' 
					}
				]
			}
		}
	},
	initComponent: function() {
		var me = this;
		this.buttons = [{
				text : '确定',
				handler : function (btn) {
					var grid = me.grid;
					var win = btn.up('window');
					var form = win.down('form');
					if (form.isValid()) {
						win.getEl().mask('正在提交..');
						form.submit({
							url : 'user/save.do',
							success : function () {
								win.getEl().unmask();
								Ext.example.msg('提示', '保存成功');
								win.close();
								grid.getStore().reload();
							},
							failure : function (response, result) {
								win.getEl().unmask();
								var obj = Ext.decode(result.response.responseText);
								Ext.Msg.alert('error', obj.msg);
							}
						})
					}
				}
			}
		];
		this.callParent();
	}
});
