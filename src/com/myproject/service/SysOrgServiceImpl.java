package com.myproject.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.myproject.vo.TreeNode;

import core.service.BaseServiceImpl;
import core.util.Util;

@Service
public class SysOrgServiceImpl extends BaseServiceImpl implements SysOrgService {

	@Override
	public List getTreeWithUser(String id) {
		
		
		String sql = "select * from (select a.id, a.orgname text,  " +
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
		 "			join sys_org c on b.orgid = c.id) t" +
		 " where pid = '" + id + "'";
		
		System.out.println("SysOrgServiceImpl getTreeWithUser sql = " + sql);

		List list = this.baseDao.findAllBySql(sql, null);
		List<TreeNode> listTreeNode = new ArrayList<TreeNode>();
		
		Iterator it = list.iterator();
		while(it.hasNext()) {
			Map map = (Map)it.next();
			System.out.println("map = " + map);
			TreeNode treeNode = new TreeNode();

			treeNode.setId(Util.cNull(map.get("id")));
			treeNode.setText(Util.cNull(map.get("text")));
			treeNode.setIconCls(Util.cNull(map.get("iconcls")).toLowerCase());
			
			treeNode.setLeaf("true".equals(Util.cNull(map.get("leaf"))) ? true : false);
			
			treeNode.setExpanded(false);
			treeNode.setChildCount(Integer.parseInt(Util.cNull(map.get("c"))));
			
			treeNode.setType(Util.cNull(map.get("type")));
			treeNode.setPath(Util.cNull(map.get("path")));
			
			listTreeNode.add(treeNode);
		}
		return listTreeNode;
	}
	
	/*@Override
	public List getTreeWithUser(String id) {	// for oracle
		
		
		String sql = "select * from (select id, text,iconCls, leaf, type,c, decode(pid, null, '0', pid) pid, sys_connect_by_path(id, '/') path " + 
		 " from (select a.id, a.orgname text,  pid, 'org' type, null as iconCls, null as leaf, (select count(*) from sys_org b where a.id = b.pid) c " + 
		 "		 from sys_org a " + 
		 "	   union " + 
		 "	   select b.id, b.username text, b.orgid pid, 'user' as type,'user' as iconCls, 'true' as leaf, 0 as c from users b) " + 
		 " START WITH pid is null " + 
		 " CONNECT BY PRIOR ID = pid )" +
		 " where pid = '" + id + "'";
		
		
		String sql = "select * from ( " +
		 " 			select id, a.orgname text, " +
		 "						case when a.pid is null then '0' else a.pid end pid, " +
		 "						null as iconCls, null as leaf, 'org' as type, " +
		 "						(select count(*) from sys_org b where a.id = b.pid) c from sys_org a " +
		 " 				union  " +
		 " 			select id, b.username text, b.orgid pid, 'user' as iconCls, 'true' as leaf, 'user' as type, 0 as c from users b) c " +
		 "  where pid = '" + id + "'";
		
		
		
		System.out.println("SysOrgServiceImpl getTreeWithUser sql = " + sql);

		List list = this.baseDao.findAllBySql(sql, null);
		List<TreeNode> listTreeNode = new ArrayList<TreeNode>();
		
		Iterator it = list.iterator();
		while(it.hasNext()) {
			Map map = (Map)it.next();
			System.out.println("map = " + map);
			TreeNode treeNode = new TreeNode();

			treeNode.setId(Util.cNull(map.get("id")));
			treeNode.setText(Util.cNull(map.get("text")));
			treeNode.setIconCls(Util.cNull(map.get("iconcls")).toLowerCase());
			
			treeNode.setLeaf("true".equals(Util.cNull(map.get("leaf"))) ? true : false);
			
			treeNode.setExpanded(false);
			treeNode.setChildCount(Integer.parseInt(Util.cNull(map.get("c"))));
			
			treeNode.setType(Util.cNull(map.get("type")));
			treeNode.setPath(Util.cNull(map.get("path")));
			
			listTreeNode.add(treeNode);
		}
		return listTreeNode;
	}
	*/
	
	
	@Override
	public List getTree(String id) {
		
		String sql = "select id, a.orgname text, a.pid, null as iconCls, null as leaf, 'org' as type from sys_org a  " +
		 "  where pid = '" + id + "'";
		
		System.out.println("SysOrgDaoImpl getTree sql = " + sql);

		List list = this.baseDao.findAllBySql(sql, null);
		List<TreeNode> listTreeNode = new ArrayList<TreeNode>();
		
		Iterator it = list.iterator();
		while(it.hasNext()) {
			Map map = (Map)it.next();
			System.out.println("map = " + map);
			TreeNode treeNode = new TreeNode();

			treeNode.setId(Util.cNull(map.get("id")));
			treeNode.setText(Util.cNull(map.get("text")));
			treeNode.setIconCls(Util.cNull(map.get("iconcls")).toLowerCase());
			treeNode.setLeaf("true".equals(Util.cNull(map.get("leaf"))) ? true : false);
			
			treeNode.setType(map.get("type") + "");
			treeNode.setExpanded(true);
			
			listTreeNode.add(treeNode);
		}
		return listTreeNode;
	}
}
