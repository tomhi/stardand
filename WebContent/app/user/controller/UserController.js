
Ext.define('AM.user.controller.UserController', {
	extend : Ext.app.Controller,
	stores : ['AM.user.store.UserStore'],
	models : ['AM.user.model.UserModel'],
	views : [
		'AM.user.view.UserPanel'
	],
	init : function () {
		this.control({
			'userpanel button[text=查询]' : {
				click : function (button) {

					var searchForm = button.up('form');
					var store = button.up('userpanel').down('usergrid').getStore();
					
					var params = searchForm.getForm().getValues();
					store.proxy.extraParams = params;
					store.load();
						
					/*
					var userpanel = b.up('userpanel');
					var userlist = userpanel.down('userlist');
					
					var username = userpanel.down('textfield[name=username]');
					var sex = userpanel.down('textfield[name=sex]');
					var email = userpanel.down('textfield[name=email]');
					
					userlist.store.filterBy(function(r) {
					
						var condition = true	;
						if(sex.getValue()) {
							condition = r.get('sex').indexOf(sex.getValue()) >= 0;
						}
						
						if(username.getValue()) {
							condition = condition && (r.get('username').indexOf(username.getValue()) >= 0);
						}
						if(email.getValue()) {
							condition = condition && (r.get('email').indexOf(email.getValue()) >= 0);
						}
						
						return condition;
					});*/
				}
			},
			'userpanel button[text=重置]' : {
				click : function (button) {
					var searchForm = button.up('form');
					searchForm.getForm().reset();

					var store = button.up('userpanel').down('usergrid').getStore();
					
					var params = searchForm.getForm().getValues();
					store.proxy.extraParams = params;
					store.load();
				}
			},
			'userpanel button[text=添加]' : {
				click : function (b) {
					Ext.create('Ext.Window', {
						//animateTarget : b,
						iconCls : 'useradd',
						title : '添加',
						width : 800,
						height : 500,
						autoShow : true,
						//modal : true,
						closeAction : 'close',
						layout : 'fit',
						border : false,
						buttons : [{
							text: '确定',
							handler: function() {
								alert()
							}
						}],
						items : {
							layout : {
								type : 'border'
								//padding : '5 5 5 5' // pad the layout from the window edges
							},
							items : [{
									title : '用户信息',
									xtype : 'fieldset',
									region : 'north',
									height : 180,
									margin : '10 10 10 10',
									padding : '6 6 6 6',
									items : [{
											xtype : 'form',
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
													/*items : [{
															fieldLabel : '姓名',
															name : 'username'
														}, {
															fieldLabel : '性别',
															name : 'sex',
															xtype : 'combo',
															editable : false,
															displayField : 'text',
															valueField : 'value',
															tpl : ['<tpl for=".">',
																'<div x-boundlist-item class="x-boundlist-item">',
																'<img src="ext/resources/icons/user.png" width="16" height="16">&nbsp;{text}',
																'</div>',
																'</tpl>'].join(''),
															store : Ext.create('Ext.data.Store', {
																fields : ['text', 'value'],
																data : [{
																		text : 'Boy',
																		value : 'm'
																	}, {
																		text : 'Girl',
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
												}, {*/
													items : [{
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
													flex : 1
												}
											]
										}
									]
								}, {
									xtype : 'tabpanel',
									region : 'center',
									bodyStyle : 'border-left:0px; border-right: 0px; border-bottom: 0px',
									defaults : {
										border : false
									},
									items : [{
											xtype : 'usergrid',
											title : '历年费用',
											iconCls : 'date'
										}, {
											xtype : 'usergrid',
											title : '面积信息',
											iconCls : 'applicationviewcolumns '
										}
									]
								}
							]
						}
					
					/*,
						bbar : Ext.create('Ext.ux.statusbar.StatusBar', {
							id : 'basic-statusbar',

							// defaults to use when the status is cleared:
							defaultText : 'Default status text',
							//defaultIconCls: 'default-icon',

							// values to set initially:
							text : 'Ready',
							iconCls : 'x-status-valid',

							// any standard Toolbar items:
							items : [{
									xtype : 'button',
									text : 'Show Warning & Clear',
									handler : function () {
										var sb = Ext.getCmp('basic-statusbar');
										sb.setStatus({
											text : 'Oops!',
											iconCls : 'x-status-error',
											clear : true // auto-clear after a set interval
										});
									}
								}, {
									xtype : 'button',
									text : 'Show Busy',
									handler : function () {
										var sb = Ext.getCmp('basic-statusbar');
										// Set the status bar to show that something is processing:
										sb.showBusy();
									}
								}, {
									xtype : 'button',
									text : 'Clear status',
									handler : function () {
										var sb = Ext.getCmp('basic-statusbar');
										// once completed
										sb.clearStatus();
									}
								}
							]
						})
						*/
					})
				}
			}
		});
	}
});
