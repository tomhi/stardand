/**
 * 图纸资料store
 * author: spq
 */
Ext.define('AM.user.store.DrawingInfoStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.DrawingInfoModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/getDrawingInfo.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});