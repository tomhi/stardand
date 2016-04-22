package core.dao;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.Work;
import org.hibernate.transform.Transformers;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import core.model.BaseModel;
import core.util.Condition;
import core.util.Order;
import core.util.PageBean;
import core.util.Util;

@Repository
public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {

	public Class clazz;

	@Resource(name = "sessionFactory")
	public void setSuperSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}
	
	public BaseDaoImpl() {
		System.out.println("BaseDaoImpl");
	}

	public BaseDaoImpl(Class clazz) {
		this.clazz = clazz;
		System.out.println("BaseDaoImpl(Class clazz)");
	}
	
	@SuppressWarnings("rawtypes")
	public Object load(Class c, String id) {
		return this.getHibernateTemplate().load(c, id);
	}

	public BaseModel findById(String id) {
		// TODO Auto-generated method stub
		return (BaseModel)this.getHibernateTemplate().get(clazz, id);
	}

	// 查询单实体list, 带分页
	public List<BaseModel> findAll(PageBean page) {

		page = page == null ? new PageBean() : page;
		
		System.out.println("baseDaoImpl findAll");
		List<BaseModel> list = null;
		Session session = null;
		try {
			session = this.getSessionFactory().openSession();
			Criteria criteria = this.getCriterions(page, session);

			criteria.setFirstResult(page.getStartIndex());
			criteria.setMaxResults(page.getPageSize());

			list = criteria.list();

			page.setTotalCount(this.getTotalCount(page, session));
		} finally {
			session.close();
		}
		return list;
	}
	
	// 按hql查询, 不带分页
	public List<Object[]> findAllByHql(String hql) {
		
		List<Object[]> list = this.getHibernateTemplate().find(hql);
		return list;
	}

	// 按sql查询,带分页
	public List<Map> findAllBySql(String sql, PageBean page) {
		
		// 如果传来的page为空, 则设置pageSize为int最大值,即不分页
		page = page == null ? new PageBean(Integer.MAX_VALUE) : page;

		System.out.println("baseDao findAllBySql");

		sql = "select * from (" + sql + ") t where 1 = 1 ";

		List<Condition> conditions = page.getConditions();

		if (conditions.size() > 0) {
			Iterator<Condition> conditionsIterator = conditions.iterator();
			while (conditionsIterator.hasNext()) {
				Condition condition = conditionsIterator.next();
				sql += "and " + condition.toString();
			}
		}

		String orderSql = sql;
		List<Order> orders = page.getOrders();
		if (orders.size() > 0) {
			orderSql += " order by ";
			Iterator<Order> ordersIterator = orders.iterator();
			while (ordersIterator.hasNext()) {
				Order order = ordersIterator.next();
				orderSql += " " + order.toString();
			}
		}
		
		System.out.println("orderSql = " + orderSql);

		List<Map> list = null;
		Session session = null;
		try {
			session = this.getSessionFactory().openSession();

			Query query = session.createSQLQuery(orderSql);

			query.setFirstResult(page.getStartIndex());
			query.setMaxResults(page.getPageSize());
			//query.setFetchSize(page.getPageSize());

			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP); // 返
			
			String[] a = query.getNamedParameters();
			System.out.println(a);

			System.out.println("getQueryString = " + query.getQueryString());
			list = query.list();
			
			list = Util.mapKey2LowerCase(list); // 默认的key是大写, 转为小写
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
			System.out.println("json = " + gson.toJson(list));

			page.setTotalCount(this.getTotalCountBySql(sql, session));
		} finally {
			session.close();
		}
		return list;
	}
	
	public int getTotalCount(PageBean page, Session session) {

		Criteria criteria = this.getCriterions(page, session);

		int totalCount = ((Long) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue();

		System.out.println("totalCount = " + totalCount);

		return totalCount;
	}

	public int getTotalCountBySql(String sql, Session session) {
		System.out.println("getTotalCountBySql");

		Query query = session.createSQLQuery("select count(*) c from (" + sql + ") t");

		Object object = query.uniqueResult();

		return Integer.parseInt(object.toString());
	}

	public Criteria getCriterions(PageBean page, Session session) {
		Criteria criteria = session.createCriteria(this.clazz);
		if (page != null) {
			// 条件处理
			List<Condition> conditions = page.getConditions();
			Iterator<Condition> conditionsIterator = conditions.iterator();
			while (conditionsIterator.hasNext()) {
				Condition condition = conditionsIterator.next();
				if ("=".equals(condition.getType())) {
					criteria.add(Restrictions.eq(condition.getField(), condition.getValue()));
				} else if (">=".equals(condition.getType())) {
					criteria.add(Restrictions.ge(condition.getField(), condition.getValue()));
				} else if ("<=".equals(condition.getType())) {
					criteria.add(Restrictions.le(condition.getField(), condition.getValue()));
				} else if ("like".equals(condition.getType())) {
					criteria.add(Restrictions.like(condition.getField(), "%" + condition.getValue() + "%"));
				}
			}

			// 排序处理
			List<Order> orders = page.getOrders();
			Iterator<Order> ordersIterator = orders.iterator();
			while (ordersIterator.hasNext()) {
				Order order = ordersIterator.next();
				if ("DESC".equalsIgnoreCase(order.getValue())) {
					criteria.addOrder(org.hibernate.criterion.Order.desc(order.getField()));
				} else {
					criteria.addOrder(org.hibernate.criterion.Order.asc(order.getField()));
				}
			}
		}
		return criteria;
	}

	/*
	 * public List findAll() { final String sql = "select * from user";
	 * 
	 * List<T> list = null; try { list =
	 * (List<T>)this.getHibernateTemplate().execute(new HibernateCallback() {
	 * 
	 * public Object doInHibernate(Session session) { // TODO Auto-generated
	 * method stub
	 * 
	 * SQLQuery query = null; try {
	 * 
	 * query = session.createSQLQuery(sql);
	 * query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP); // 返
	 * 
	 * return query.list(); } catch (Exception e) { e.printStackTrace(); return
	 * null; }
	 * 
	 * } }); } catch (HibernateException e) { // TODO Auto-generated catch block
	 * e.printStackTrace(); }
	 * 
	 * return list; }
	 */

	public String save(BaseModel model) {
		//this.getHibernateTemplate().save(model);
		return (String)this.getHibernateTemplate().save(model);
	}

	public void update(BaseModel model) {
		BaseModel old = (BaseModel)this.getHibernateTemplate().get(clazz, model.getId());
		Util.mergeObject(model, old);
		
		this.getHibernateTemplate().update(old);
		System.out.println("update ok");
	}

	public void remove(BaseModel model) {
		this.getHibernateTemplate().delete(model);
	}

	public void remove(String id) {
		this.getHibernateTemplate().delete(this.getHibernateTemplate().get(clazz, id));
	}

	public List getField(Class clazz) {
		List list = new ArrayList();
		Field[] fields = clazz.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			System.out.println(fields[i].getName());
			list.add(fields[i].getName());
		}
		return list;
	}

	public List getFieldBySql(final String sql) {

		final List list = new ArrayList();
		this.getSession().doWork(new Work() {
			@Override
			public void execute(Connection conn) throws SQLException {
				// TODO Auto-generated method stub

				//String sql = "select * from (select * from user) t";

				Statement stmt = conn.createStatement();

				ResultSet rs = stmt.executeQuery(sql);// sql为待执行的sql

				ResultSetMetaData rsmd = rs.getMetaData();
				int count = rsmd.getColumnCount();

				for (int i = 1; i <= count; i++) {
					/*System.out.println("getCatalogName: " + rsmd.getCatalogName(i));
					System.out.println("getColumnClassName"
							+ rsmd.getColumnClassName(i));
					System.out.println("getColumnDisplaySize: "
							+ rsmd.getColumnDisplaySize(i));
					System.out.println("getColumnLabel: "
							+ rsmd.getColumnLabel(i));
					System.out.println("getColumnName: "
							+ rsmd.getColumnName(i));
					System.out.println("getColumnType: "
							+ rsmd.getColumnType(i));
					System.out.println("getColumnTypeName: "
							+ rsmd.getColumnTypeName(i));
					System.out.println("getPrecision: " + rsmd.getPrecision(i));
					System.out.println("getScale: " + rsmd.getScale(i));
					System.out.println("getSchemaName: " + rsmd.getSchemaName(i));
					
					System.out.println("***********************");
					System.out.println("getTableName: " + rsmd.getTableName(i));*/
					list.add(Util.cNull(rsmd.getColumnName(i)).toLowerCase());
				}
			}
		});
		return list;
	}

	public void setClazz(Class clazz) {
		this.clazz = clazz;
	}
}
