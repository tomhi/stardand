Ext.define('AM.org.model.OrgTreeModel', { 
	extend: 'Ext.data.Model', 
	fields:  ['id', 'text', 'path', 'leaf', 'pid', 'childCount']
});