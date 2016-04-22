/*
 * 用户修改窗口
 * author: spq
 */
Ext.define('AM.multiModel.view.UserEditWindow', {

	extend : 'Ext.window.Window',
	alias : 'widget.usereditwindow',
	requires : [
		'AM.user.view.AreaInfoGrid',
		'AM.user.view.HistoryCostGrid',
		'AM.user.view.BusinessChangeGrid',
		'AM.user.view.DrawingInfoGrid',
		'AM.user.view.AreaBalanceGrid'
	],
	title : '修改',
	iconCls : 'useredit',
	width : 800,
	height : 500,
	autoShow : true,
	modal : true,
	closeAction : 'close',
	border : false,
	defaults : {
		width : '100%'
	},
	layout : 'vbox',
	listeners : {
		show : function (win) {
			var id = this.userId;
			var form = win.down('form');

			win.getEl().mask('loading..');
			form.load({
				url : 'user/read.do',
				method : 'get',
				params : {
					id : id
				},
				success : function () {
					win.getEl().unmask();
				},
				failure : function (form, action) {
					Ext.Msg.alert("Load failed", action.result.errorMessage);
				}
			});
		}
	},

	items : [{
			xtype : 'tabpanel',
			flex : 1,
			height : 180,
			bodyStyle: 'border-bottom: 0px',
			items : [{
					title : '用户信息',
					xtype : 'fieldset',
					margin : '10 10 10 10',
					padding : '6 6 6 6',
					items : [{
							xtype : 'form',
							trackResetOnLoad : true,
							border : false,
							baseCls : 'x-plain',
							layout : {
								//type : 'vbox',
								align : 'stretch'
							},
							defaults : {
								layout : 'hbox',
								baseCls : 'x-plain',
								defaults : {
									margin : '4 10 4 10',
									xtype : 'textfield',
									labelWidth : 50,
									anchor : '100%',
									labelAlign : 'right',
									flex : 1
								}
							},
							items : [{
									flex : 1,
									items : [{
											hidden : true,
											name : 'id'
										}, {
											fieldLabel : '姓名',
											name : 'username'
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
											})
										}, {
											fieldLabel : 'Email',
											name : 'email',
											vtype : 'email'
										}
									]
								}, {
									xtype : 'textarea',
									fieldLabel : '备注',
									name : 'note',
									margin : '4 10 4 10',
									labelWidth : 50,
									anchor : '100%',
									labelAlign : 'right',
									flex : 2
								}
							]
						}
					]
				}, {
					title : '关联用户',
					html: '关联用户'
				}
			]
		}, {
			xtype : 'tabpanel',
			flex : 1,
			items : [{
					title : '面积信息',
					iconCls : 'applicationviewcolumns',
					xtype : 'areainfogrid'
				}, {
					title : '历年费用',
					iconCls : 'date',
					xtype : 'historycostgrid'
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
	],
	initComponent : function () {
		var me = this;
		this.buttons = [{
				text : '确定',
				handler : function (button) {
					var grid = me.grid;
					var win = button.up('window');
					var form = win.down('form');

					if (!form.isDirty()) {
						Ext.example.msg('提示', '你没有修改任何数据');
						return;
					}
					if (form.isValid()) {
						win.getEl().mask('正在提交..');
						form.submit({
							url : 'user/saveOrUpdate.do',
							success : function () {
								Ext.example.msg('提示', '保存成功');
								win.getEl().unmask();
								win.close();
								grid.getStore().reload();
							},
							failure : function (response, result) {
								win.getEl().unmask();
								var obj = Ext.decode(result.response.responseText);
								Ext.Msg.alert('error', obj.msg);
							}
						})
					} else {
						Ext.example.msg('提示', '有不合法填写');
					}
				}
			}
		];
		this.callParent();
	}
});
