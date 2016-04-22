<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  	<meta http-equiv="X-UA-Compatible" content="IE=8" /> 
    <base href="<%=basePath%>">
    <title>ExtTest</title>
	
  </head>
 <body>
	<style>
		.loading {
			text-align: center; 
			margin-top: 180px;
			font-size: 25;
			
			font-family: tahoma,arial,verdana,sans-serif;
			font-weight: bold
		}
		
		.data{
		    background-color:#fff;
		}
		tr.hover {
		    background-color: #eee;
		}
		 
		.x-item-selected {
		    background-color:#dfe8f6 !important;
		    border: 1px red solid;
		}
		
		.simple_grid td {
			font-size: 12px;
			border-bottom: 1px #ddd dashed;
		}
		.simple_grid dt td {
			font-size: 12px;
			border-bottom: 1px #ddd dashed;
			background-color: #eee;
			border-left: 1px #ccc solid;
			white-space:nowarp;
		}
	</style>
	 
	<link rel="stylesheet" type="text/css" href="ext/examples/shared/example.css" />
	<link rel="stylesheet" type="text/css" href="ext/resources/css/icon.css" />
	<script type="text/javascript" src="ext/examples/shared/include-ext.js"></script>
    <script type="text/javascript" src="ext/examples/shared/options-toolbar.js"></script>
    
    <script type="text/javascript" src="ext/examples/shared/examples.js"></script>
	
	<script type="text/javascript" >

		Ext.onReady(function() {
			Ext.Loader.setConfig({ //开启动态加载
				enabled : true,
				disableCaching : true
			})

			Ext.Loader.setPath('AM', 'app');
 
			
			/*
			
			{
				xtype: 'modul',
				modul: 'user',
				type: 'sql',
				form: {		新增修改表单
					
					**
				},
				//editForm: {} 如果没有指定则和新增form
				searchItems: {	搜索域字段

				},
				columns:  {	// 表格列

				}
			}
			*/
			
			Ext.create('AM.util.Modul', {
				title: '测试',
				renderTo: Ext.getBody(),
				modul: 'user',
				type: 'sql',
				
				height: 400,
				width: 1100,
				form: {			// 新增编辑界面form
					items : [{
							hidden: true,
							name : 'id'
						}, {
							fieldLabel : '姓名',
							name : 'username',
							allowBlank: false
						}, {
							fieldLabel : '性别',
							name : 'sex',
							xtype : 'combo',
							editable : false,
							displayField : 'text',
							valueField : 'value',
							store : Ext.create('Ext.data.Store', {
								fields : ['text', 'value'],
								data : [{
										text : '男',
										value : 'm'
									}, {
										text : '女',
										value : 'f'
									}
								]
							})
						}, {
							fieldLabel : 'Email',
							name : 'email',
							vtype: 'email'
						}
					]
				},
				
				searchItems: [{		// 搜索字段
						fieldLabel : '姓名',
						name : 'Q_username_S_LIKE',
						emptyText: '请输入姓名'
					}, {
						fieldLabel : '性别',
						name : 'Q_sex_S_EQ',
						xtype: 'combo',
						editable: false,
						displayField: 'text',
						valueField: 'value',
						emptyText: '请选择',
						store: Ext.create('Ext.data.Store', {
							fields: ['text', 'value'],
							data: [
								{text: '请选择', value:''},
								{text: '男', value:'m'},
								{text: '女', value:'f'}
							]
						})
					}, {
						fieldLabel : 'Email',
						emptyText: '请输入邮箱',
						name : 'Q_email_S_LIKE'
					}, {
						fieldLabel : '创建时间',
						labelWidth: 70,
						name : 'Q_createdate_S_GE',
						format: 'Y-m-d',
						xtype: 'datefield'
					}, {
						xtype: 'label',
						text: '-'	
					}, {
						name : 'Q_createdate_S_LE',
						format: 'Y-m-d',
						xtype: 'datefield'
					}
				], 
				columns : [{		// 表格字段
						xtype : 'rownumberer'
					}, {
						dataIndex : 'id',
						hidden : true
					}, {
						header : '姓名',
						dataIndex : 'username',
						flex : 1,
						menuDisabled: true,
						draggable: false
					}, {
						header : '性别',
						dataIndex : 'sex',
						flex : 1,
						menuDisabled: true,
						draggable: false,
						renderer: function(v) {
							if(v == 'm') {
								return '男';
							} else if(v == 'f'){
								return '女';
							} else {
								return '-';
							}
						}
					}, {
						header : 'Email',
						dataIndex : 'email',
						flex : 1,
						menuDisabled: true,
						draggable: false
					}, {
						header : '创建时间',
						dataIndex : 'createdate',
						flex : 1,
						menuDisabled: true,
						draggable: false
					},{
						header : '部门',
						dataIndex : 'orgname',
						flex : 1,
						menuDisabled: true,
						draggable: false
					}
				]
			});
		});
	</script> 
 </body>
</html>
