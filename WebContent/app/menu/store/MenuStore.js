Ext.define('AM.menu.store.MenuStore',{
    extend: 'Ext.data.TreeStore',
 	model: 'AM.menu.model.MenuModel',
 	proxy: {
        type: 'ajax',
        url: 'data/menu.json',
        reader: {
            type: 'json',
            successProperty: 'success'
        }
    } 
});
