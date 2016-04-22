
/**
 * 多栏模块控制器
 * author: spq
 */
Ext.define('AM.multiModel.controller.MultiModelController', {
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
		'AM.multiModel.view.TwoModelPanel',	// 二栏
		'AM.multiModel.view.UserEditWindow',
		'AM.multiModel.view.HistoryCostWindow'
	],
	init : function () {
		this.control({
			'usereditwindow simplegrid': {	//用户个性界面下的面积信息，历年费用，业务变更，图纸资料，面积结算几个tab只有在render的时候才加载数据	
				render: function(grid) {
					var win = grid.up('window');
					var id = win.userId;	// 获取用户id
					
					grid.getStore().proxy.extraParams = {
						Q_userid_S_EQ: id	// 根据用户id从子表查询对应记录
					}
					grid.getStore().load();	// render的时候才加载数据
				}
			},
			'usereditwindow historycostgrid': {	// 用户修改窗口中的历年费用grid	
				itemdblclick: function(grid) {	// 双击历年费用，展示对应年度的收费信息、核减信息、退费信息、停供信息、交费信息、拆网信息、预开信息等
					var selection = grid.getSelectionModel().getSelection();
					var uuid = selection[0].get('ID');		
					var year = selection[0].get('YEAR');	// 对应年份
					Ext.create('AM.multiModel.view.HistoryCostWindow', {
						width : 600,
						height : 400,
						uuid: uuid,
						year: year
					});
				}
			},
			'historycostwindow simplegrid': {	// 历年费用窗口下的几个tab
				render: function(grid) {		// render的时候才加载数据
					var win = grid.up('window');
					var uuid = win.uuid;
					var year = win.year;
					grid.getStore().proxy.extraParams = {
						Q_historyid_S_EQ: uuid,	// 根据id从子表查询对应记录
						Q_year_S_EQ: year
					}
					grid.getStore().load();
				}
			},
			'twomodelpanel button[text=添加]' : {
				click : this.showAddWindow
			},
			'twomodelpanel button[text=修改]' : {
				click : this.showEditWindow				// 修改按钮双击
			},
			'twomodelpanel usergrid': {
				itemdblclick: this.showEditWindow		// 用户列表双击
			},
			
			'twomodelpanel button[text=删除]' : {
				click: this.deleteUser		
			},
			
			'tabpanel[ref=bottom] simplegrid': {	// 二栏模块下面的几个tab
				render: function(grid) {
					grid.getStore().load();
				}
			}
		});
	},
	
	// 用户添加界面
	showAddWindow: function(button) {
		var grid = button.up('twomodelpanel').down('usergrid');
		Ext.create('AM.multiModel.view.UserAddWindow', {
			grid: grid	// 传grid目的是要在新增完毕后刷新grid
		})
	},
	
	// 用户修改界面
	showEditWindow: function(com) {		
	
		var grid = com.up('twomodelpanel').down('usergrid');
		var selection = grid.getSelectionModel().getSelection();
		if (selection.length != 1) {
			Ext.example.msg('提示', '请选择一条');
			return;
		};
		var userId = selection[0].get('id');
		
		Ext.create('AM.multiModel.view.UserEditWindow', {
			userId: userId,
			grid: grid
		})
	},
	
	// 删除用户
	deleteUser: function(button) {
		var me = this; 
		var grid = button.up('twomodelpanel').down('simplegrid');
		
		var selection = grid.getSelectionModel().getSelection();
		if (selection.length == 0) {
			Ext.example.msg('提示', '至少选择一条');
			return;
		};
		var ids = [];
		Ext.each(selection, function (select, index) { // 考虑到多条删除,用的地址字符串拼接
			ids.push('id=' + select.get('id'));
		});

		Ext.Msg.confirm('提示', '确定删除该用户吗?', function (btn) {
			if (btn == 'yes') {
				Ext.getBody().mask('正在删除中..');
				Ext.Ajax.request({
					url : 'user/remove.do?' + ids.join('&'),
					type : 'json',
					async : false,
					success : function (response, opts) {
						Ext.getBody().unmask();
						Ext.example.msg('提示', '删除成功');
						grid.getStore().reload();
					},
					failure : function (response, opts) {
						Ext.getBody().unmask();
						//console.log('server-side failure with status code ' + response.status);
					}
				});
			}
		});
	}
});
