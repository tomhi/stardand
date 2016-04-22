Ext.define('AM.role.store.RoleStore', {
	extend : 'Ext.data.Store',
	model : 'AM.role.model.RoleModel',
	autoLoad : false,
	pageSize : 10,
	proxy : {
		type : 'ajax',
		url : 'role/readAll.do',
		reader : {
			root : 'data',
			totalProperty : 'totalCount'
		}
	}
});