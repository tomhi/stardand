/**
 * 面积结算grid
 * author: spq
 */
Ext.define('AM.user.view.AreaBalanceGrid', {
	extend : 'AM.util.SimpleGrid',
	alias : 'widget.areabalancegrid',
	requires: [
	     'AM.util.SimpleGrid'
	],
	store: 'AM.user.store.AreaBalanceStore',
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
