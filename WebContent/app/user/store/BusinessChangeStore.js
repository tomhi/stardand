/**
 * 业务变更store
 * author: spq
 */
Ext.define('AM.user.store.BusinessChangeStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.BusinessChangeModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/getBusinessChange.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});