Ext.define('AM.user.view.UserGrid', {

	extend : 'AM.util.SimpleGrid',
	alias : 'widget.usergrid',
	store : 'AM.user.store.UserStore',
	
	//deferInitialrefresh: true,
	requires: [
  	     'AM.util.SimpleGrid'
  	],

	initComponent: function() {
		this.callParent();
	},
	columns : [{
			dataIndex : 'id',
			hidden : true
		}, {
			header : '姓名',
			dataIndex : 'username',
			flex : 2,
			menuDisabled: true,
			draggable: false
		}, {
			header : '性别',
			dataIndex : 'sex',
			flex : 1,
			renderer: function(v) {
				if(v == 'm') {
					return '男';
				} else if(v == 'f') {
					return '女'
				} else {
					return '-'
				}
			}
		}, {
			header : 'Email',
			dataIndex : 'email',
			flex : 1,
			menuDisabled: true,
			draggable: false
		}, {
			header : 'note',
			dataIndex : 'note',
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
