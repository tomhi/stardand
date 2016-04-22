Ext.define('AM.user.store.HistoryCostStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.HistoryCostModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/getHistoryCost.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});