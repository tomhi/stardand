/**
 * 图纸资料grid
 * author: spq
 */
Ext.define('AM.user.view.DrawingInfoGrid', {
	extend : 'AM.util.SimpleGrid',
	alias : 'widget.drawinginfogrid',
	requires: [
	     'AM.util.SimpleGrid'
	],
	store: 'AM.user.store.DrawingInfoStore',
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
