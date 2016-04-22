/**
 * 面积信息store
 * author: spq
 */
Ext.define('AM.user.store.AreaInfoStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.AreaInfoModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/getAreaInfo.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});