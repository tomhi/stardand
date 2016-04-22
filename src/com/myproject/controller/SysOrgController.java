package com.myproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myproject.entity.SysOrg;
import com.myproject.service.SysOrgService;

import core.controller.BaseController;

@Controller
@Scope("prototype")	// 不可少
@RequestMapping("org")
public class SysOrgController extends BaseController<SysOrg> {
	
	@Autowired
	private SysOrgService sysOrgService;
	
	@RequestMapping("getTreeWithUser")
	public String getTreeWithUser() {

		String id = this.request.getParameter("node");
		List list = this.sysOrgService.getTreeWithUser(id);
		return this.toJson(list);
	}
	
	@RequestMapping("getTree")
	public String getTree() {
		
		String id = this.request.getParameter("node");
		
		List list = this.sysOrgService.getTree(id);
		return this.toJson(list);
	}

	@RequestMapping("getTreeByName")
	public String getTreeByName() {		// for mysql 
		
		String sql = "select t.* from (select a.id, a.orgname text,  " +
		"			case when pid is null then '0' else pid end pid," +
		"			'org' type, null as iconCls, null as leaf, " +
		"			(select count(*) from sys_org b where a.id = b.pid) c," +
		"			path " + 
		 "		 from sys_org a " + 
		 "	   union " + 
		 "	   select b.id, b.username text, b.orgid pid, " +
		 "			'user' as type,'user' as iconCls, 'true' as leaf, 0 as c, " +
		 "			concat(c.path, '/', b.id) path " +
		 "		from users b" +
		 "			join sys_org c on b.orgid = c.id) t";
		System.out.println("getTreeByName sql = " + sql);
		
		page.setPageSize(Integer.MAX_VALUE);
		List list = this.baseService.findAllBySql(sql, page);
		return this.toJson(list);
	}
	
	/*
	@RequestMapping("getTreeByName")
	public String getTreeByName() {		// for oracle 
		
		String sql = "select * from (select id, text,iconCls, leaf, type,c, decode(pid, null, '0', pid) pid, sys_connect_by_path(id, '/') path " + 
		 " from (select a.id, a.orgname text,  pid, 'org' type, null as iconCls, null as leaf, (select count(*) from sys_org b where a.id = b.pid) c " + 
		 "		 from sys_org a " + 
		 "	   union " + 
		 "	   select b.id, b.username text, b.orgid pid, 'user' as type,'user' as iconCls, 'true' as leaf, 0 as c from users b) " + 
		 " START WITH pid is null " + 
		 " CONNECT BY PRIOR ID = pid )";
		System.out.println("getTreeByName sql = " + sql);
		
		page.setPageSize(Integer.MAX_VALUE);
		List list = this.baseService.findAllBySql(sql, page);
		return this.toJson(list);
	}*/
}
