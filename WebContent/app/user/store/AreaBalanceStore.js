
/**
 * 面积结算store
 * author: spq
 */
Ext.define('AM.user.store.AreaBalanceStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.AreaBalanceModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/getAreaBalance.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});