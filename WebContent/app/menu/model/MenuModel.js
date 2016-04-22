Ext.define('AM.menu.model.MenuModel', { 
	extend: 'Ext.data.Model', 
	fields:  ['id', 'text','controller','leaf', 'expanded', 'titleIcon', 'defaultPanel', 'children']
});