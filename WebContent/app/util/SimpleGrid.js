/*
 * @author spq
 * 轻量级grid
 */
Ext.define('AM.util.SimpleGrid', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.simplegrid',
	layout: 'fit',
	initComponent : function () {
		
		var me = this;
		
		/*
		 * 通过SimpleGrid监听的dataview事件，这里添加了两个常用的
		 * 如没有需要的，可自行去api中查找dataview的事件并添加到此处
		 */
		var events = {		
			'itemclick': true,
			'itemdblclick' : true
		};
		
		me.addEvents(events);
		
		var listeners = {
			itemclick: function(view, record, item, index, e, eOpts) {			//itemclick( this, record, item, index, e, eOpts )
				me.fireEvent('itemclick', me, record, item, index, e, eOpts);
			},
			itemdblclick: function(view, record, item, index, e, eOpts) {		//itemdblclick( this, record, item, index, e, eOpts )
				me.fireEvent('itemdblclick', me, record, item, index, e, eOpts);
			}
		};//的封装形式, 将SimpleGrid监听内层的dataview事件
		
		
		/*Ext.iterate(events, function(eventName, i) {
			listeners[eventName] = function() {
				var newArguments = [];		// 把arguments中的第一个值换由dataview对象换成当前对象(simplegrid)
				newArguments.push(me);
				Ext.iterate(arguments, function(a, i) {
					if(i != 0) {
						newArguments.push(arguments[i]);
					}
				});
				me.fireEvent(eventName, newArguments);
				me.fireEvent(eventName, arguments);
			}
		});*/
		
		// 标题
		var headTpl = [
			'<td class="x-grid-cell x-grid-td x-grid-cell-first x-unselectable x-grid-cell-special x-grid-cell-row-checker" role="gridcell">',
				'<div style="text-align:left;" class="x-grid-cell-inner " unselectable="on">',
					'<div class="x-grid-row-checker" style="">&nbsp;</div>',
				'</div>',
			'</td>'
		];
		
		// 行
		var bodyTpl = [
			'<td class="x-grid-cell x-grid-td x-unselectable x-grid-cell-special x-grid-cell-row-checker" role="gridcell">',
				'<div style="text-align:left;" class="x-grid-cell-inner " unselectable="on">',
					'<div class="x-grid-row-checker">&nbsp;</div>',
				'</div>',
			'</td>'
		];

		/**
		 * 此举是为了兼容grid的列中的flex属性
		 */
		var totalFlex = 0;	 	
		Ext.each(this.columns, function(column, i) {
			if(column.hidden != true) {
				if(Ext.isNumber(column.flex)) {
					totalFlex += column.flex;
				}
			}
		});
		
		Ext.each(this.columns, function(column, i) {
			if(column.hidden != true) {
				var header = column.header == undefined ? '' : column.header;
				var width = '';
				if(Ext.isNumber(column.width)) {
					width = column.width;
				} else if(Ext.isNumber(column.flex)) {	//兼容grid的列中的flex属性
					width = (column.flex / totalFlex * 100) + '%';
				}
				headTpl.push('<td width=' + width + ' class="x-column-header-inner" style=" background-color: #eee; border-left: 1px #ccc solid;">' + header + '</td>');
				bodyTpl.push([
					'<td class="x-grid-cell x-grid-td x-unselectable">',
						'<div style="text-align:left;width:' + width + 'px" class="x-grid-cell-inner" unselectable="on">{' + column.dataIndex + '}</div>',
					'</td>'
				].join(''));
			} 
		});
		this.tpl = this.tpl || [
			'<div style="overflow: auto;height: 100%;">',
				'<table class="simple_grid" width=auto cellpadding=1 cellspacing=0 border=0>',
					'<tr>',
						headTpl.join(''),
					'</tr>',
					'<tpl for=".">',
						'<tr class="x-grid-row x-grid-data-row">',
							bodyTpl.join(''),
						'</tr>',
					'</tpl>',
				'</table>',
			'</div>'
		];
		
		var config = {
			items: {
				xtype: 'dataview',
				store : me.store,
				overItemCls : 'x-grid-row-over',
				itemSelector : 'tr.x-grid-row',
				selectedItemCls :'x-grid-row-selected',
				/*listeners: Ext.apply(me.listeners, {
					scope: this
				}),*/
				listeners: listeners,
				tpl : this.tpl,
				multiSelect: true
				//style: 'overflow: auto;',
				//plugins : Ext.create('Ext.ux.DataView.DragSelector')
			},
			bbar : {
				xtype : 'pagingtoolbar',
				store : me.store,
				displayMsg : '显示{0}-{1}条，共{2}条',
				emptyMsg : "没有数据",
				beforePageText : "当前页",
				afterPageText : "共{0}页",
				displayInfo : true,
				border : false,
				style : 'padding: 0px; margin: 0px'
			}
		};
		Ext.apply(this, config);
		this.callParent();
	},
	getStore: function() {
		return this.items.get(0).getStore();
	},
	getSelectionModel: function() {
		return this.items.get(0).getSelectionModel();
	},
	selectRow: function(view, index) {
		//x-grid-row-selected x-grid-row-focused
		
		var row = view.getNodes(index,index);
		Ext.get(row).addCls('x-grid-row-selected x-grid-row-focused');
		//Ext.get(row).setStyle('background-position', '0 0');
		
		//var checkbox = Ext.get(row).query('x-grid-row-checker');
		//console.log(checkbox.el.dom);
		//checkbox.setStyle('border', '1px red solid')
	},
	unselectRow: function(view, index) {
		var row = view.getNodes(index,index);
		Ext.get(row).removeCls('x-grid-row-selected x-grid-row-focused');
	},
	mouseoverRow: function(view, index) {
		//x-grid-row-over
		//Ext.get(view.getNodes(index,index)).addCls('x-grid-row-ove'); 
	}
});
