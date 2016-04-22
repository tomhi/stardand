/**
 * 历年费用grid
 * author: spq
 */
Ext.define('AM.user.view.HistoryCostGrid', {
	extend : 'AM.util.SimpleGrid',
	alias : 'widget.historycostgrid',
	requires: [
	     'AM.util.SimpleGrid'
	],
	store: 'AM.user.store.HistoryCostStore',
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
})
