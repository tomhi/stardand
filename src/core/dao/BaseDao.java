package core.dao;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Session;

import core.model.BaseModel;
import core.util.PageBean;

public interface BaseDao {

	@SuppressWarnings("rawtypes")
	public abstract Object load(Class c, String id);

	public abstract BaseModel findById(String id);

	public abstract List<BaseModel> findAll(PageBean page);

	public abstract List<Map> findAllBySql(String sql, PageBean page);

	public abstract int getTotalCount(PageBean page, Session session);

	public abstract int getTotalCountBySql(String sql, Session session);

	public abstract Criteria getCriterions(PageBean page, Session session);

	public abstract String save(BaseModel model);

	public abstract void update(BaseModel model);

	public abstract void remove(BaseModel model);

	public abstract void remove(String id);

	public abstract List getField(Class clazz);

	public abstract List getFieldBySql(String sql);

	public abstract void setClazz(Class clazz);

}