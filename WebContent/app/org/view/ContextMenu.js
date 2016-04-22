
/**
 * 树的右键菜单
 * author: spq
 */
Ext.define('AM.org.view.ContextMenu', {
	extend : 'Ext.menu.Menu',
	alias : 'widget.contextmenu',
	initComponent: function() {
		var me = this;
		var type = this.node.get('iconCls');
		if (type == 'user') {
			this.items = [{
					text : '修改',
					iconCls : 'Applicationformedit'
				}, {
					text : '删除',
					iconCls : 'Applicationformdelete'
				}
			]
		} else {
			this.items = [{
					text : '新增人员',
					iconCls : 'useradd'
				}, {
					text : '新增部门',
					iconCls : 'Applicationadd'
				}, {
					xtype : 'menuseparator'
				}, {
					text : '修改',
					iconCls : 'Applicationformedit'
				}, {
					text : '删除',
					iconCls : 'delete'
				}
			]
		}
		this.callParent();
	}
});
