
Ext.define('AM.user.view.UserList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	store : 'AM.user.store.UserStore',
	selType : 'checkboxmodel',
	initComponent: function() {
		this.callParent();
	},
	bbar : [{
			xtype : 'pagingtoolbar',
			store : 'AM.user.store.UserStore',
			displayMsg : '显示{0}-{1}条，共计{2}条',
			emptyMsg : "没有数据",
			beforePageText : "当前页",
			afterPageText : "共{0}页",
			displayInfo : true,
			border : false,
			style : 'padding: 0px; margin: 0px'
		}
	],
	columns : [{
			xtype : 'rownumberer'
		}, {
			dataIndex : 'id',
			hidden : true
		}, {
			header : '姓名',
			dataIndex : 'username',
			flex : 1,
			menuDisabled: true,
			draggable: false
		}, {
			header : '性别',
			dataIndex : 'sex',
			flex : 1,
			menuDisabled: true,
			draggable: false
		}, {
			header : 'Email',
			dataIndex : 'email',
			flex : 1,
			menuDisabled: true,
			draggable: false
		}, {
			dataIndex : 'orgId',
			hidden: true,
			menuDisabled: true,
			draggable: false
		}
	]
});
