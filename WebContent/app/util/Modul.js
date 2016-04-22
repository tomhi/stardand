/*
 * @author spq
 * 基本模块类，包含表格，增删改，及查询功能
 */
Ext.define('AM.util.Modul', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.modul',
	selType : 'checkboxmodel',
	//mixins : ['AM.util.Util'],
	requires: ['AM.util.BaseForm', 'AM.util.Util'],
	
	type: 'sql',	// 表格查询类型, default to 'sql'
	idField: 'id',	// 主键字段, default to 'ID'
	
	actionUrl: {
		read: 'read.do',
		readAll: 'readAll.do',
		readAllBySql: 'readAllBySql.do',
		save: 'save.do',
		saveOrUpdate: 'saveOrUpdate.do',
		remove: 'remove.do'
	},
	action : {
		add : function (button) {
			var me = this;	// 此处的this已在该方法被调用时指定为当前grid
			var form = me.form;
			
			Ext.create('Ext.Window', {
				iconCls : 'Applicationadd',
				title : '新增',
				width : 700,
				height : 200,
				modal: true,
				animateTarget: button,
				autoShow: true,
				layout : 'fit',
				items : Ext.create('AM.util.BaseForm', me.form),
				buttons : [{
						text : '确定',
						handler : function (button) {
					
							var win = button.up('window');
							var form = win.down('form');
							if(form.isValid()) {
								win.getEl().mask('正在提交..');
								form.submit({
									url: me.modul + '/' + me.actionUrl.save,
									success: function() {
										win.getEl().unmask();
										Ext.example.msg('提示', '保存成功');
										button.up('window').close();
										me.getStore().reload();
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
		edit : function (animateTarget) {
			console.log(animateTarget);
			var me = this;	// 此处的this已在该方法被调用时指定为当前grid
			
			var form = this.editForm || this.form;	// 如果指定了editForm,就取editForm,否则和新增的form一样都为form
			var baseForm = Ext.create('AM.util.BaseForm', form);
			
			var selection = this.getSelectionModel().getSelection();
			
			if (selection.length != 1) {
				Ext.example.msg('提示', '请选择一条');
				return;
			};
			
			Ext.create('Ext.Window', {
				iconCls : 'Applicationedit',
				title : '修改',
				width : 700,
				height : 200,
				modal: true,
				layout : 'fit',
				animateTarget: animateTarget,
				autoShow: true,
				closeAction: 'close',
				items : baseForm,
				listeners: {
					show: function(win) {
						//baseForm.loadRecord(selection[0]);
				
						var id = selection[0].get(me.idField);
						win.getEl().mask('loading..');
						baseForm.load({
							url: me.modul + '/' + me.actionUrl.read,
							method : 'get',
							params: {
								id: id
							},
							success: function() {
								win.getEl().unmask();
							},
							failure: function(form, action) {
								Ext.Msg.alert("Load failed", action.result.errorMessage);
							}
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
									url: me.modul + '/' + me.actionUrl.saveOrUpdate,
									success: function() {
										win.getEl().unmask();
										Ext.example.msg('提示', '保存成功');
										button.up('window').close();
										me.getStore().reload();
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
		remove : function () {
			var me = this; // 此处的this已在该remove方法被调用时指定为当前grid
			var selection = this.getSelectionModel().getSelection();
			if (selection.length == 0) {
				Ext.example.msg('提示', '至少选择一条');
				return;
			};
			var ids = [];
			Ext.each(selection, function (select, index) { // 考虑到多条删除,用的地址字符串拼接
				ids.push('id=' + select.get(me.idField));
			});

			Ext.Msg.confirm('提示', '确定?', function (btn) {
				if (btn == 'yes') {
					Ext.getBody().mask('正在删除中..');
					Ext.Ajax.request({
						url : me.modul + '/' + me.actionUrl.remove + '?' + ids.join('&'),
						type : 'json',
						async : false,
						success : function (response, opts) {
							Ext.getBody().unmask();
							Ext.example.msg('提示', '删除成功');
							me.getStore().reload();
						},
						failure : function (response, opts) {
							Ext.getBody().unmask();
							//console.log('server-side failure with status code ' + response.status);
						}
					});
				}
			});
		}
	},
	listeners : {
		itemdblclick: function(grid, record, item, index, e, eOpts ) {
			this.action.edit.call(this, item);
		}
	},
	initComponent : function () {
	
		var me = this;
		var fields,url;

		if(me.type == 'sql') {	// 如果是sql类型,地址为getFieldsBySql.do
			fields = Util.loadObject(me.modul + '/getFieldsBySql.do'); // 获取字段
			url = me.modul + '/' + me.actionUrl.readAllBySql + '?Q_createDate_date_OD=DESC';
		} else {
			fields = Util.loadObject(me.modul + '/getFields.do'); // 获取字段
			url = me.modul + '/' +  me.actionUrl.readAll+ '?Q_createDate_date_OD=DESC';
		}
		
		this.store = this.store || Ext.create('Ext.data.Store', {
			autoLoad : true,
			pageSize : 10,
			proxy : {
				type : 'ajax',
				url : url,
				reader : {
					root : 'data',
					totalProperty : 'totalCount'
				}
			},
			fields : fields
		});
		
		if(Ext.isArray(this.searchItems) && this.searchItems.length > 0) {
			this.searchItems.push({
				xtype : 'container',
				defaults : {
					xtype : 'button',
					iconCls : 'zoom'
				},
				items : [{
						text : '查询',
						margin : '0 8 0 0',
						handler : function (button) {
							me.getStore().proxy.extraParams = me.down('form').getValues();
							me.down('pagingtoolbar').moveFirst();	// 将分页条转到第一页
						}
					}, {
						xtype : 'button',
						text : '重置',
						handler : function (button) {
							me.down('form').getForm().reset();

							me.getStore().proxy.extraParams = {};
							me.down('pagingtoolbar').moveFirst();	// 将分页条转到第一页
						}
					}
				]
			});
		}
		
		// 按钮栏
		var buttonBar = Ext.widget('toolbar', {
			defaults : {
				scope : this // 事件默认作用域为当前对象
			},
			items : [{
					text : '新增',
					iconCls : 'Applicationadd',
					handler : this.action.add
				}, '-', {
					text : '修改',
					iconCls : 'Applicationedit',
					handler : this.action.edit
				}, '-', {
					text : '删除',
					iconCls : 'Applicationdelete',
					handler : this.action.remove
				}
			]
		});
		
		// 搜索栏
		var searchFields = (Ext.isArray(this.searchItems) && this.searchItems.length > 0) ? {
			style : 'border-top: 1px #99aabb solid;',
			xtype : 'form',
			layout : 'hbox',
			bodyStyle : 'background-color: #dfe8f6; border-left: 0px; border-right: 0px',
			defaults : {
				xtype : 'textfield',
				padding : '6 6 6 6',
				labelAlign : 'right',
				labelWidth : 40
			},
			items : me.searchItems
		} : null;
		             
		this.dockedItems = this.dockedItems || {
			xtype : 'panel',
			defaults : {
				border : false
			},
			items : [
		         buttonBar,
		         searchFields
			]
		};
		this.bbar = this.bbar || [{
				xtype : 'pagingtoolbar',
				store : this.store,
				displayMsg : '显示{0}-{1}条，共计{2}条',
				emptyMsg : "没有数据",
				beforePageText : "当前页",
				afterPageText : "共{0}页",
				displayInfo : true,
				border : false,
				style : 'padding: 0px; margin: 0px'
			}
		];
		this.callParent();
	}
});
