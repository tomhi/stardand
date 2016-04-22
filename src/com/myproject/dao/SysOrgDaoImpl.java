package com.myproject.dao;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.myproject.entity.SysOrg;
import com.myproject.entity.TreeNode;

import core.dao.BaseDaoImpl;

@Repository
public class SysOrgDaoImpl extends BaseDaoImpl implements SysOrgDao {
	
	public SysOrgDaoImpl() {
		super(SysOrg.class);
	}

	@Override
	public List getTree() {
		// TODO Auto-generated method stub
		
		List<Map> list = null;
		Session session = null;
		try {
			session = this.getSessionFactory().openSession();

			Query query = session.createSQLQuery("select id, orgname from sys_org");

			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);

			list = query.list();

			Iterator it = list.iterator();
			while(it.hasNext()) {
				Map map = (Map)it.next();
				TreeNode treeNode = new TreeNode();

				treeNode.setId(map.get("ID") + "");
				treeNode.setText(map.get("ORGNAME") + "");
				
			}
			
			
			
		} finally {
			session.close();
		}
		
		return list;
	}

}
