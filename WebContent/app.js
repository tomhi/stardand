
Ext.QuickTips.init();
Ext.Loader.setConfig({ //开启动态加载
	enabled : true,
	disableCaching : true
});

Ext.Loader.setPath('Ext.ux', 'ext/examples/ux');
Ext.Loader.setPath('Ext.ux.DataView', 'ext/examples/ux/DataView');

Ext.application({
	name : 'AM',
	//autoCreateViewport : true,
	appFolder : 'app', //指定根目录
	controllers : [
		'AM.main.controller.MainController'
	],
	launch: function() {
		Ext.create('AM.main.view.Viewport');
		
		/*
		Ext.widget('panel', {
			height: 100,
			renderTo: Ext.getBody(),
			//bodyStyle: 'autoScroll: true',
			style: 'height: 100px',
			items: Ext.widget('dataview', {
				overItemCls : 'hover',
				itemSelector : 'div.data',
				store: 'AM.user.store.UserStore',
				height: 100,
				style: 'border: 1px blue solid;overflow: auto;autoScroll: true',
				tpl: [
					'<div style="">',
					'<tpl for=".">',
						'<div class="data" >',
							'{id}',
						'</div>',
					'</tpl>',
					'</div>',
				],
				plugins : [
					Ext.create('Ext.ux.DataView.DragSelector')
				]
			})
		})
		*/
		
	}
});
