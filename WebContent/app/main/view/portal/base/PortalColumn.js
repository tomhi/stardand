
Ext.define('AM.main.view.portal.base.PortalColumn', {
	extend : 'Ext.container.Container',
	alias : 'widget.portalcolumn',

	requires : [
		'Ext.layout.container.Anchor',
		'AM.main.view.portal.base.Portlet'
	],

	layout : 'anchor',
	defaultType : 'portlet',
	cls : 'x-portal-column'

	// This is a class so that it could be easily extended
	// if necessary to provide additional behavior.
});
