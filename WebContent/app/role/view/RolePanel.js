/**
 * 角色panel
 * author: spq
 */
Ext.define('AM.role.view.RolePanel', {
	extend : 'AM.util.Modul',
	alias : 'widget.rolepanel',
	requires: [
	     'AM.util.Modul'
	],
	
	modul: 'role',
	type: 'entity',
	/*
	height: 400,
	width: 1100,*/
	form: {			// 新增编辑界面form
		items : [{
				hidden: true,
				name : 'id'
			}, {
				fieldLabel : '角色名',
				name : 'roleName',
				xtype: 'textfield',
				allowBlank: false
			}
		]
	},
	
	searchItems: [{		// 搜索字段
			fieldLabel : '角色名',
			name : 'Q_roleName_S_LIKE',
			emptyText: '请输入角色名'
		}
	], 
	columns : [{		// 表格字段
			xtype : 'rownumberer'
		}, {
			dataIndex : 'id',
			hidden : true
		}, {
			header : '角色名',
			dataIndex : 'roleName',
			flex : 1,
			menuDisabled: true,
			draggable: false
		}
	],
	initComponent: function() {
		this.callParent();
	}
});
