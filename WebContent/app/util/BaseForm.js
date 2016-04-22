/*
 * @author spq
 * 
 */
Ext.define('AM.util.BaseForm', {
	extend : 'Ext.form.Panel',
	alias : 'widget.baseform',
	baseCls : 'x-plain',
	plain : true,
	trackResetOnLoad: true,
	layout : {
         type : 'table',
         columns : 3
    },
	margin : '10 0 10 0',
	defaults : {
    	margin : '5 5 5 5',
    	labelAlign: 'right',
    	labelWidth: 60,
		xtype : 'textfield',
		//allowBlank: false,
		width: '80%'
	}
});
