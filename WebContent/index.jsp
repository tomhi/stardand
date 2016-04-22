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
	
	<div id="loading" class="loading">正在加载，请稍候．．．</div>
	
	<link rel="stylesheet" type="text/css" href="ext/resources/css/icon.css" />
	<link rel="stylesheet" type="text/css" href="css/portal.css" />
	<link rel="stylesheet" type="text/css" href="ext/examples/shared/example.css" />
	

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
	
	<!--
	<script type="text/javascript" src="ext/ext-all-debug.js"></script>
	 -->
	<script type="text/javascript" src="ext/examples/shared/include-ext.js"></script>
    <script type="text/javascript" src="ext/examples/shared/options-toolbar.js"></script>
	
    <script type="text/javascript" src="ext/examples/shared/examples.js"></script>
	<script type="text/javascript" src="app.js"></script> 
	 
	<script type="text/javascript" >
		Ext.onReady(function() {
			//document.getElementById('loading').style.display = 'none';
			Ext.get('loading').remove();
			var b = new Date().getTime();
			//alert(b - a);
		});
	</script> 
 </body>
</html>
