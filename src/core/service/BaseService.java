package core.service;

import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import core.model.BaseModel;
import core.util.PageBean;

public interface BaseService {

	public abstract List<BaseModel> findAll(PageBean page);

	public abstract List<Map> findAllBySql(String sql, PageBean page);

	public abstract String save(BaseModel model);

	public abstract void update(BaseModel model);

	public abstract void saveOrUpdate(BaseModel model);

	public abstract void remove(BaseModel model);

	public abstract void remove(String id);

	public abstract BaseModel findById(String id);

	public abstract List getField(Class clazz);

	public abstract List getFieldBySql(String sql);

	public abstract void setClazz(Class clazz);

}