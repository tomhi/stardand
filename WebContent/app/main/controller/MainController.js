
/**
 * 入口controllner
 * autohr: spq
 */
Ext.define('AM.main.controller.MainController', {
	extend : Ext.app.Controller,
	stores : ['AM.user.store.UserStore', 'AM.menu.store.MenuStore'],
	models : ['AM.user.model.UserModel'],
	views : ['AM.menu.view.Menu', 'AM.user.view.UserGrid', 'AM.main.view.HomeView'],

	requires : [
		//'AM.controller.user.UserController',
		//'AM.view.threeModel.ThreeModel'
	],
	init : function () {
		this.control({
			'themenu' : {		// 左侧菜单
				itemclick : this.loadFunction
			},
			'viewport button[ref=onlineUser]' : {	// 在线用户按钮
				click : function (b, e, eOpts) {
					var onlinewindow = Ext.getCmp('onlinewindow');
					if (onlinewindow == null) {
						Ext.create('AM.user.view.OnlineWindow', {
							id : 'onlinewindow',
							animateTarget : b,
							x : b.getX() - 350,
							y : b.getY()
						}).show();
					} else {
						onlinewindow.close();
						/*
						onlinewindow.showAt(
						b.getX() - 350,
						b.getY(), {});
						 */
					}
				}
			}, 
			'viewport': {
				afterrender: function(viewport) {	// 添加首页（选择在afterrender时add home， 而不是viewport直接设置home，是因为home较大）
					var tabPanel = viewport.down('centerview');
					var tab = Ext.create('Ext.Panel', { //创建选项卡
						title : '首页',
						itemId : 'home',
						iconCls : 'userhome',
						layout : 'fit'
					});
					tabPanel.add(tab);			// 先添加一个空tab
					tabPanel.setActiveTab(tab); //激活
	
					tab.mask('loading...');

					setTimeout(function () {	// 再添加主页面
						tab.add({
							xtype : 'homeview',
							border : false
						})
						tab.unmask(); //等待取消
					})
				}
			}
		});
	},

	loadFunction : function (tree, rec, item,index, eventObj) {

		var me = this;
		if (!rec.get('leaf')) {
			return;
		}

		var controller = rec.get('controller');
		var defaultPanel = rec.get('defaultPanel');
		var titleIcon = rec.get('titleIcon');

		var mid = rec.get('id');
		//var tabPanel = Ext.getCmp('tabpanel'); //获取主选项卡
		var tabPanel = tree.up('viewport').down('centerview');

		var tabId = 'portalTab-' + mid; //获取记录的的值
		var tab = tabPanel.queryById(tabId); //根据id获取选项卡
		if (null != tab) {
			tabPanel.setActiveTab(tab); //激活选项卡
		} else {
			if (controller) {
				var a = new Date().getTime();
				tab = Ext.create('Ext.Container', { //创建选项卡
					title : rec.get('text'),
					itemId : tabId,
					iconCls : titleIcon,
					closable : true,
					layout : 'fit'
				});
				tabPanel.add(tab);
				tabPanel.setActiveTab(tab); //激活

				tab.getEl().mask('loading...');
				//me.getController(controller).init(this); // Ext4.1版本，多次执行init会多次绑定controller中的事件
				me.getController(controller); // Ext4.2版本

				setTimeout(function () {
					tab.add({
						xtype : defaultPanel,
						border : false
					})
					tab.getEl().unmask(); //等待取消
				})
			}
		}
	}
});
