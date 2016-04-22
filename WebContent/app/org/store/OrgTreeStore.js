Ext.define('AM.org.store.OrgTreeStore',{
    extend: 'Ext.data.TreeStore',
 	model: 'AM.org.model.OrgTreeModel',
 	defaultRootId: 0,
 	proxy: {
        type: 'ajax',
        //url: 'data/orgTree.json',
        url: 'org/getTreeWithUser.do',
        reader: {
            type: 'json',
            successProperty: 'success'
        }
    }
});
