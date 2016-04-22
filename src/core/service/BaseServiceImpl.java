package core.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import core.dao.BaseDao;
import core.model.BaseModel;
import core.util.PageBean;

@Service
public class BaseServiceImpl implements BaseService {

	protected BaseDao baseDao;

	@Autowired
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}
	
	public BaseDao getBaseDao() {
		return baseDao;
	}

	public BaseServiceImpl() {
		System.out.println("BaseService init");
	}

	public List<BaseModel> findAll(PageBean page) {
		return baseDao.findAll(page);
	}
	
	public List<Map> findAllBySql(String sql, PageBean page) {
		return baseDao.findAllBySql(sql, page);
	}

	//@Transactional
	public String save(BaseModel model) {
		model.setCreateDate(new Date());
		return baseDao.save(model);
	}
	
	public static void main(String[] args) {
		JSONObject o = JSONObject.fromObject(new Date());
	}

	public void update(BaseModel model) {
		model.setUpdateDate(new Date());
		baseDao.update(model);
	}

	public void saveOrUpdate(BaseModel model) {
		if (model.getId() == null || "".equals(model.getId())) {
			model.setCreateDate(new Date());
			baseDao.save(model);
		} else {
			model.setUpdateDate(new Date()); 
			baseDao.update(model);
		}
	}

	public void remove(BaseModel model) {
		this.baseDao.remove(model);
	}

	public void remove(String id) {
		this.baseDao.remove(id);
	}

	public BaseModel findById(String id) {
		// TODO Auto-generated method stub
		return baseDao.findById(id);
	}
	
	public List getField(Class clazz) {
		return baseDao.getField(clazz);
	}
	
	public List getFieldBySql(String sql) {
		return baseDao.getFieldBySql(sql);
	}
	
	public void setClazz(Class clazz) {
		baseDao.setClazz(clazz);
	}
}
