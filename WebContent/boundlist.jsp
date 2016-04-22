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
	
	 
	<link rel="stylesheet" type="text/css" href="ext/resources/css/icon.css" />
	<script type="text/javascript" src="ext/examples/shared/include-ext.js"></script>
    <script type="text/javascript" src="ext/examples/shared/options-toolbar.js"></script>
	
	<script type="text/javascript" >
	
		Ext.onReady(function() {
			
			Ext.Loader.setConfig({ //开启动态加载
				enabled : true,
				disableCaching : true
			})

			Ext.Loader.setPath('AM', 'app');
 
 
 
 
			
			Ext.create('Ext.view.BoundList', {
				renderTo: Ext.getBody(),
				height: 300,
				width: 600,
				title: 'fdafds',
				store: Ext.create('Ext.data.Store', {
					fields : ['text', 'value'],
					data : [{
							text : '男',
							value : 'm'
						}, {
							text : '女',
							value : 'f'
						}
					]
				}),
				columns: [
					{dataIndex: 'text',name: 'text'},
					{dataIndex: 'value',name: 'value'}
				]
			});
		});
	</script> 
 </body>
</html>
