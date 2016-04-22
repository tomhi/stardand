
Ext.define('AM.org.controller.OrgController', {
	extend : Ext.app.Controller,
	stores : ['AM.org.store.OrgTreeStore'],
	models : ['AM.org.model.OrgTreeModel'],
	views : [
		'AM.org.view.OrgPanel',
		'AM.org.view.OrgTree'
	],
	requires: ['AM.util.Util'],
	init : function () {
		this.control({
			'orgpanel button': {
				click: this.queryTree
			},
			
			// 组织架构树
			'orgtree' : {
				afterrender: function(tree) {	// 渲染后默认展开第一级
					tree.expandPath('/0/1', 'id', '/',  function(success, lastNode) {
						//tree.getSelectionModel().select(lastNode);
					});
					//tree.expandAll();
				},
				
				// 单击在右侧显示对应部门下的人员
				itemclick : function (view, node, item, index, e, eOpts) {
					console.log(node.getPath());
					var tree = view.up('treepanel');
					var type = node.get('iconCls');
					if ('user' == type) {
						return;
					}
					var usergrid = view.up('orgpanel').down('usergrid');
					usergrid.getStore().load({
						params : {
							Q_orgid_S_EQ : node.get('id')
						}
					});
				},

				// 人员双击修改
				itemdblclick : function (view, node, item, index, e, eOpts) {
					var type = node.get('iconCls');
					if ('user' != type) {
						return;
					}
					var grid = view.up('orgpanel').down('usergrid');
					var id = node.get('id');
					this.editUser(id, item, function(form) {
						var username = form.getForm().findField('username').getValue();
						node.set('text', username);	// 将修改后的名称更新到树节点
						node.commit(); 
						grid.getStore().reload();	// 更新人员列表
					});
				},
				
				// 右键菜单
				itemcontextmenu : function (view, node, item, index, e, eOpts) {
					
					var tree = view.up('treepanel');
					var selection = tree.getSelectionModel().getSelection();
					
					var store = tree.getStore();
					var node = selection[0];//store.getNodeById(id);
					
					//e.preventDefault();
					Ext.EventManager.preventDefault(e);	// 阻止浏览器右键默认事件
					
					Ext.create('AM.org.view.ContextMenu', {
						node: node,	// 传入两个参数供调用
						tree: tree,
						treeItem: item
					}).showAt(Ext.get(item).getX() + 175, Ext.get(item).getY() + 9);
				}
			},
			
			'contextmenu menuitem[text=新增人员]': {
				click: this.addUser
			},
			'contextmenu menuitem[text=新增部门]': {
				click: this.addOrg
			},
			'contextmenu menuitem[text=修改]': {
				click: function(menuitem) {
					var menu = menuitem.up('contextmenu');
					var treeItem = menu.treeItem;
					var tree = menu.tree;
					var grid = tree.up('orgpanel').down('usergrid');
					
					var node = menu.node;
					var id = node.get('id');
					var type = node.get('iconCls');
					if ('user' == type) {
						/**
						 * menuitem 为右键菜单上的按钮
						 * treeItem 为组织树上选择的条目
						 */
						this.editUser(id, treeItem, function(form) {
							var username = form.getForm().findField('username').getValue();
							node.set('text', username);	// 将修改后的名称更新到树节点
							node.commit();
							grid.getStore().reload();	// 更新人员列表
						});
					} else {
						this.editOrg(menuitem);
					}
				}
			},
			'contextmenu menuitem[text=删除]': {
				click: function(menuitem) {
					var menu = menuitem.up('contextmenu');
					var node = menu.node;
					var type = node.get('iconCls');
					if ('user' == type) {
						this.deleteUser(menuitem)
					} else {
						this.deleteOrg(menuitem);
					}
				}
			}, 
			'orgpanel usergrid': {
				itemdblclick: function(grid, record, item, index, e, eOpts ) {
					var tree = grid.up('orgpanel').down('orgtree');//up('orgpanel');
				
					var id = record.get('id');
					this.editUser(id, item, function(form) {
						grid.getStore().reload();
						var node = tree.getStore().getNodeById(id);
						if(node) {
							var username = form.getForm().findField('username').getValue();
							node.set('text', username);	// 将修改后的名称更新到树节点
							node.commit();
						}
					});
				}
			}
		})
	},
	
	// 查询树
	queryTree: function(button) {
		var Counter = function() {
			var count = 0;
			return {
				getCount: function() {	// 计数器
					return ++ count;
				}
			}
		}();
		
		var tree = button.up('orgpanel').down('orgtree');
	
		tree.reset();
		tree.getEl().mask('loading..');
		
		var name = button.up('orgpanel').down('textfield[name=name]').getValue();
		var arr = Util.loadObject('org/getTreeByName.do?Q_text_S_LIKE=' + name);	// 从后台查询对应的记录
		
		Ext.each(arr, function(obj, i) {
			tree.expandPath('/0' + obj.path, 'id', '/',  function(success, lastNode) {		// 在树中展开对应的节点
				var c = Counter.getCount();
				if(arr.length == c) {	
					/**
					 * 等到所有的匹配记录的节点都展开后,过滤不相关节点
					 * (当计数的数值与数组的长度相等时, 说明这几个回调方法都已执行)
					 */
					tree.addCondition(name, 'text');
					tree.doQuery();
					tree.getEl().unmask();
					
					var usergrid = button.up('orgpanel').down('usergrid');
					
					usergrid.getStore().proxy.extraParams = {	// 在右侧表格中显示对应的数据
						Q_username_S_LIKE: name
					};
					usergrid.getStore().load();
				}
			});
		});
	},

	
	/**
		修改用户 , 三处在使用, 1是组织树人员双击事件, 2是右键菜单修改按钮,3人员列表双击
		@param id				: 人员id, 
		@param animationCom		: 动画element, 
		@param callBack			: 修改成功后的回调函数
	*/
	editUser: function(id, animationCom, callBack) {
	
		var me = this;
		Ext.widget('window', {
			title : '修改用户',
			iconCls : 'useredit',
			width : 500,
			height : 240,
			//modal : true,
			layout: 'fit',
			closeAction : 'close',
			animateTarget: animationCom,
			autoShow : true,
			buttons : [{
					text : '确定',
					scope: this,
					handler : function(button) {
						var win = button.up('window');
						var form = win.down('form');
						
						var form = win.down('form');
						if(!form.isDirty()) {
							Ext.example.msg('提示', '<font color=red>你没有修改任何数据</font>');
							return;
						}
						
						if(form.isValid()) {
							win.getEl().mask('正在提交..');
							form.submit({
								url: 'user/saveOrUpdate.do',
								params: {
									'id': id
								},
								success: function(f, action) {
									win.getEl().unmask();
									Ext.example.msg('提示', '<font color=green>修改成功</font>');
									
									win.close();
									callBack.call(me, form);	// 将form做为参数供调用
								},
								failure: function(response, result) {
									win.getEl().unmask();
									var obj = Ext.decode(result.response.responseText);
									Ext.Msg.alert('error', obj.msg);
								}
							})
						}
					}
				}, {
					text : '取消',
					handler : function (b) {
						b.up('window').close();
					}
				}
			],
			listeners: {
				show: function(win) {
					//win.getEl().mask('loading..');
					var form = win.down('form');
					console.log(form);
					form.load({
						url: 'user/read.do',
						method : 'get',
						params: {
							id: id
						},
						success: function() {
							//win.getEl().unmask();
						},
						failure: function(form, action) {
							alert('error');
							Ext.Msg.alert("Load failed", action.result.errorMessage);
						}
					});
				}
			},
			items : { 
				xtype : 'form',
				padding : '10 10 10 10',
				baseCls : 'x-plain',
				trackResetOnLoad: true,	// 为true时,执行form.load()操作,form不认为修改了数据
				defaults : {
					xtype : 'textfield',
					/*anchor : '100%',*/
					labelAlign : 'right',
					labelWidth : 60,
					allowBlank : false
				},
				items : [{
						xtype: 'hidden',
						name : 'id'
					}, {
						fieldLabel : '用户名',
						name : 'username',
						anchor: '-0' 
					}, {
						xtype: 'radiogroup',
	                    fieldLabel: '性别',
	                    columns: 3,
	                    defaults: {
	                        name: 'sex'
	                    },
	                    items: [{
	                        inputValue: 'm',
	                        boxLabel: '男'
	                    }, {
	                        inputValue: 'f',
	                        boxLabel: '女'
	                    }],
						anchor: '-0'
		                    
						/*fieldLabel : '性别',
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
						})*/
					}, {
						fieldLabel : 'Email',
						name : 'email',
						vtype : 'email',
						anchor: '-0'
					}, {
						fieldLabel : 'Note',
						name : 'note',
						xtype: 'textareafield',
						anchor: '-0 -77' 
					}
				]
			}
		});
	},
	
	// 添加用户
	addUser: function(menuitem) {
		
		var menu = menuitem.up('contextmenu');

		var tree = menu.tree;
		var store = tree.getStore();
		
		var selection = tree.getSelectionModel().getSelection();
		var node = selection[0];//store.getNodeById(id);
		var id = node.get('id');
		
		Ext.widget('window', {
			title : '新增用户',
			iconCls : 'useredit',
			width : 500,
			height : 240,
			//modal : true,
			layout: 'fit',
			closeAction : 'close',
			animateTarget: menu.treeItem,
			autoShow : true,
			buttons : [{
					text : '确定',
					scope: this,
					handler : function(button) {
						var win = button.up('window');
						var form = win.down('form');
						if(form.isValid()) {
							win.getEl().mask('正在提交..');
							form.submit({
								url: 'user/save.do',
								params: {
									'sysOrg.id': id
								},
								success: function(form, action) {
									
									var newUserId =  action.result.id;
									win.getEl().unmask();
									Ext.example.msg('提示', '<font color=green>保存成功</font>');
									
									if(node.isLoaded()) {	// 如果加载过，  appendChild
										node.appendChild({
											id: newUserId,
											text: form.getValues().username,
											leaf: true,
											iconCls: 'user'
										});
									}
									
									node.expand(null, function() {
										tree.getSelectionModel().select(store.getNodeById(newUserId));
									});
								
									win.close();
								},
								failure: function(response, result) {
									win.getEl().unmask();
									var obj = Ext.decode(result.response.responseText);
									Ext.Msg.alert('error', obj.msg);
								}
							})
						}
					}
				}, {
					text : '取消',
					handler : function (b) {
						b.up('window').close();
					}
				}
			],
			items : {
				xtype : 'form',
				padding : '10 10 10 10',
				baseCls : 'x-plain',
				trackResetOnLoad: true,
				defaults : {
					xtype : 'textfield',
					anchor : '100%',
					labelAlign : 'right',
					labelWidth : 60,
					allowBlank : false
				},
				items : [{
						xtype: 'hidden',
						name : 'id'
					}, {
						fieldLabel : '用户名',
						name : 'username',
						anchor: '-0'
					}, {
						xtype: 'radiogroup',
	                    fieldLabel: '性别',
	                    columns: 3,
	                    defaults: {
	                        name: 'sex'
	                    },
	                    items: [{
	                        inputValue: 'm',
	                        boxLabel: '男'
	                    }, {
	                        inputValue: 'f',
	                        boxLabel: '女'
	                    }],
						anchor: '-0'
						
						/*fieldLabel : '性别',
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
						})*/
					}, {
						fieldLabel : 'Email',
						name : 'email',
						vtype : 'email',
						anchor: '-0'
					}, {
						fieldLabel : 'Note',
						name : 'note',
						xtype: 'textareafield',
						anchor: '-0 -77' 
					}
				]
			}
		});
	},
	
	// 删除用户
	deleteUser: function(menuitem) {
		var menu = menuitem.up('contextmenu');
		var node = menu.node;
		var id = node.get('id');
		
		Ext.Msg.confirm('提示', '确定要删除吗?', function (btn) {
			if (btn == 'yes') {
				Ext.getBody().mask('正在删除中..');
				Ext.Ajax.request({
					url : 'user/remove.do',
					params: {
						id: id
					},
					type : 'json',
					async : false,
					success : function (response, opts) {
						Ext.getBody().unmask();
						var result = Ext.decode(response.responseText);                                                   
						if(result.success) {
							node.remove();
							Ext.example.msg('提示', '<font color=green>删除成功</font>');
						} else {
							Ext.Msg.alert('error', '删除失败, info:' + Ext.encode(result.msg));
						}
					},
					failure : function (response, opts) {
						Ext.getBody().unmask();
						//console.log('server-side failure with status code ' + response.status);
					}
				});
			}
		});
	},
	
	// 添加组织
	addOrg: function(menuitem) {
		var menu = menuitem.up('contextmenu');
		var node = menu.node;
		var id = node.get('id');

		var tree = menu.tree;
		var store = tree.getStore();

		Ext.create('Ext.Window', {
			title: '请输入部门名称',
			iconCls: 'Application',
			width: 300,
			height: 120,
			//modal : true,
			animateTarget: menu.treeItem,
			autoShow : true,
			layout: 'fit',
			items : {
				padding : '10 10 10 10',
				xtype : 'form',
				plain: true,
				baseCls: 'x-plain',
				items : [{
					fieldLabel : '部门名称',
					name : 'orgName',
					allowBlank: false,
					xtype : 'textfield',
					anchor: '-5'
				}]
			},
			buttons : [{
					text : '确定',
					handler : function (button) {
						var win = button.up('window');
						var form = win.down('form');
						if(form.isValid()) {
							win.getEl().mask('正在提交..');
							form.submit({
								url: 'org/save.do',
								params: {
									'parentOrg.id': id
								},
								success: function(form, action) {
									
									var newNodeId =  action.result.id;
									win.getEl().unmask();
									Ext.example.msg('提示', '<font color=green>保存成功</font>');
									
									if(node.isLoaded()) {	// 如果加载过，  appendChild
										node.appendChild({
											id: newNodeId,
											text: form.getValues().orgName
										});
									}
									
									node.expand(null, function() {
										tree.getSelectionModel().select(store.getNodeById(newNodeId));
									});
								
									win.close();
								},
								failure: function(response, result) {
									win.getEl().unmask();
									var obj = Ext.decode(result.response.responseText);
									Ext.Msg.alert('error', obj.msg);
								}
							})
						}
					}
				}
			]
		});
	},

	// 修改组织
	editOrg: function(menuitem) {
		
		var menu = menuitem.up('contextmenu');
		var node = menu.node;
		var id = node.get('id');
		console.log(id);

		var tree = menu.tree;
		var store = tree.getStore();

		Ext.create('Ext.Window', {
			title: '请输入部门名称',
			iconCls: 'Application',
			width: 300,
			height: 120,
			//modal : true,
			animateTarget: menu.treeItem,
			autoShow : true,
			layout: 'fit',
			items : {
				padding : '10 10 10 10',
				xtype : 'form',
				trackResetOnLoad: true,
				plain: true,
				baseCls: 'x-plain',
				items : [{
					fieldLabel : '部门名称',
					name : 'orgName',
					allowBlank: false,
					xtype : 'textfield',
					anchor: '-5'
				}]
			},
			listeners: {
				show: function(win) {
					var form = win.down('form');
					form.getForm().setValues({
						orgName: node.get('text')
					});
				}
			},
			buttons : [{
					text : '确定',
					handler : function (button) {
						var win = button.up('window');
						var form = win.down('form');
						if(!form.isDirty()) {
							Ext.example.msg('提示', '<font color=red>你没有修改任何数据</font>');
							return;
						}
						
						if(form.isValid()) {
							win.getEl().mask('正在提交..');
							form.submit({
								url: 'org/saveOrUpdate.do',
								params: {
									'id': id
								},
								success: function(form, action) {
									
									win.getEl().unmask();
									Ext.example.msg('提示', '<font color=green>修改成功</font>');
									
									node.set('text', form.findField('orgName').getValue());
									node.commit(); 
									win.close();
								},
								failure: function(response, result) {
									win.getEl().unmask();
									var obj = Ext.decode(result.response.responseText);
									Ext.Msg.alert('error', obj.msg);
								}
							})
						}
					}
				}
			] 
		});
	},
	
	// 删除组织
	deleteOrg: function(menuitem) {
		
		var menu = menuitem.up('contextmenu');
		var node = menu.node;
		var id = node.get('id');

		var childCount = 0;
		if(node.isLoaded()) {	// 如果节点已加载,子节点数量取childNodes.length
			childCount = node.childNodes.length;
		} else {				// 否则 子节点数量取node 的childCount
			childCount = node.get('childCount')
		}
		
		if(childCount > 0) {
			Ext.example.msg('提示', '<font color=red>该部门下不为空,不能删除</font>');
			return;
		}
		Ext.Msg.confirm('提示', '确定要删除吗?', function (btn) {
			if (btn == 'yes') {
				
				Ext.getBody().mask('正在删除中..');
				Ext.Ajax.request({
					url : 'org/remove.do',
					params: {
						id: id
					},
					type : 'json',
					async : false,
					success : function (response, opts) {
						Ext.getBody().unmask();
						var result = Ext.decode(response.responseText);                                                   
						if(result.success) {
							node.remove();
							Ext.example.msg('提示', '<font color=green>删除成功</font>');
						} else {
							Ext.Msg.alert('error', '删除失败, info:' + Ext.encode(result.msg));
						}
					},
					failure : function (response, opts) {
						Ext.getBody().unmask();
						//console.log('server-side failure with status code ' + response.status);
					}
				});
			}
		});
	}
});
