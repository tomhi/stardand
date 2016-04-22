/**
 * 业务变更grid
 * author: spq
 */
Ext.define('AM.user.view.BusinessChangeGrid', {
	extend : 'AM.util.SimpleGrid',
	alias : 'widget.businesschangegrid',
	requires: [
	     'AM.util.SimpleGrid'
	],
	title: 'fdafds',
	store: 'AM.user.store.BusinessChangeStore',
	columns : [{
			dataIndex : 'id',
			hidden : true
		}, {
			header : '姓名',
			dataIndex : 'username',
			flex: 1
		}, {
			header : '性别',
			dataIndex : 'sex',
			flex: 1
		}, {
			header : 'email',
			dataIndex : 'EMAIL',
			flex: 1
		}
]
});
