
/**
 * 用户列表store
 * author: spq
 */
Ext.define('AM.user.store.UserStore', {
	extend : 'Ext.data.Store',
	model : 'AM.user.model.UserModel',
	autoLoad : true,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'user/readAllBySql.do?Q_createdate_s_OD=DESC',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});