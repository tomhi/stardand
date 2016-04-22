/**
 * 面积信息grid
 * author: spq
 */
Ext.define('AM.user.view.AreaInfoGrid', {
	extend : 'AM.util.SimpleGrid',
	alias : 'widget.areainfogrid',
	requires: [
	     'AM.util.SimpleGrid',
	],
	store: 'AM.user.store.AreaInfoStore',
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
