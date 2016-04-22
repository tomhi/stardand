
/**
 * 三栏模块控制器
 * author: spq
 */
Ext.define('AM.threeModel.controller.ThreeModelController', {
	extend : Ext.app.Controller,
	stores : [
		'AM.user.store.UserStore',
		'AM.user.store.HistoryCostStore',
		'AM.user.store.BusinessChangeStore',
		'AM.user.store.DrawingInfoStore',
		'AM.user.store.AreaInfoStore',
		'AM.user.store.AreaBalanceStore'
	],
	models : [
        'AM.user.model.UserModel',
	    'AM.user.model.HistoryCostModel',
	    'AM.user.model.BusinessChangeModel',
	    'AM.user.model.DrawingInfoModel',
	    'AM.user.model.AreaInfoModel',
	    'AM.user.model.AreaBalanceModel'
	],
	views : [
		'AM.threeModel.view.ThreeModel'
	],
	init : function () {
		this.control({
			'threemodel button[text=添加]' : {
				click : function (button) {
					Ext.Msg.alert('info', button.text);
				}
			},
			'tabpanel[ref=top] usergrid': { 
				itemdblclick: function() {
					alert('itemdblclick');
				}
			},
			'tabpanel[ref=bottom] simplegrid': {		// 面积信息，历年费用，业务变更，图纸资料，面积结算几个tab只有在render的时候才加载数据
				render: function(grid) {
					if(typeof console != 'undefined') {
						console.log(grid.title);
					}
					grid.getStore().load();
				}
			}
		});
	}
});
