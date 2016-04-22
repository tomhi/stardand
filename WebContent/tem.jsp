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
	
		Ext.onReady(function () {
			var tpl = new Ext.Template(
				 '{%',
					'var username = "sun";',
				'%}',
				'<table border=1 cellpadding=0 cellspacing = 0>',
					'<tr><td width=90 >姓名</td><td width=120>{username}</td></tr>',
					'<tr><td width=90 >年龄</td><td width=120>{age}</td></tr>',
					'<tr><td width=90 >性别</td><td width=120>{sex:this.renderer()}</td></tr>',
				'</table>'
			);
			
			
			var data = {
				name : 'tom',
				age : 24,
				sex: 'm'
			}
			
			tpl.renderer = function (v) {
				if(v == 'm') {
					return '男';
				} else {
					return '女'
				}
			}
			tpl.append('a', data);
		});

	</script> 
	<div id="a"></div>
 </body>
</html>
