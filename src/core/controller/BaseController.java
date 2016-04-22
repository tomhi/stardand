package core.controller;

import java.lang.reflect.ParameterizedType;
import java.sql.BatchUpdateException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import core.model.BaseModel;
import core.service.BaseService;
import core.util.PageBean;

@Controller
@Scope("prototype") // 不可少
@RequestMapping("base")
public class BaseController<T extends BaseModel> {

	private Class clazz;
	protected BaseService baseService;
	protected HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	protected PageBean page = new PageBean(request);
	
	protected Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	protected Map<String, Object> map = new HashMap<String, Object>();
	
	protected String sql;
	
	public BaseController() {
	}

	@Autowired
	public void setBaseService(BaseService baseService) {
		System.out.println("setBaseService");
		this.baseService = baseService;
		// 获取泛型的类，向service, dao传送
		try {
			ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
			this.clazz = (Class) type.getActualTypeArguments()[0];
			this.baseService.setClazz(clazz);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public BaseService getBaseService() {
		return baseService;
	}

	// 查询所有记录，带分页
	@RequestMapping("readAll")
	public String readAll() {
		try {
			List list = baseService.findAll(page);

			map.put("success", true);
			map.put("data", list);
			map.put("totalCount", page.getTotalCount());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}

		return this.toJson(map);
	}
	
	// sql查询所有记录，带分页
	@RequestMapping("readAllBySql")
	public String readAllBySql() {
		try {
			if(this.sql == null || "".trim().equals(this.sql)) {
				throw new Exception("sql语句不能为空");
			}
			List list = baseService.findAllBySql(this.sql, page);

			map.put("success", true);
			map.put("data", list);
			map.put("totalCount", page.getTotalCount());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}

		return this.toJson(map);
	}

	// 根据id查询单条记录
	@RequestMapping("read")
	public String read(String id) {
		BaseModel model = baseService.findById(id);
		try {
			map.put("success", true);
			map.put("data", model);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}
		
		return this.toJson(map);
	}

	// 新增
	@RequestMapping("save")
	public String save(T model) {
		try {
			model.setCreateDate(new Date());
			String id = baseService.save(model);
			map.put("success", true);
			map.put("msg", "新增成功");
			map.put("id", id);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}

		return this.toJson(map);
	}

	// 更新
	@RequestMapping("update")
	public String update(T model) {
		try {
			baseService.update(model);
			map.put("success", true);
			map.put("msg", "修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}
		return this.toJson(map);
	}

	// 新增或更新
	@RequestMapping("saveOrUpdate")
	public String saveOrUpdate(T model) {
		try {
			baseService.saveOrUpdate(model);
			map.put("success", true);
			map.put("msg", "保存成功");
		} catch (Exception e) {
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
		}
		return this.toJson(map);
	}

	// 根据id删除
	@RequestMapping("remove")
	public String remove(String[] id) {

		map.put("success", true);
		map.put("totalCount", id.length);
		
		List errorList = new ArrayList();
		for (int i = 0; i < id.length; i++) {
			System.out.println("id = " + id[i]);
			Map<String, Object> error = new HashMap<String, Object>();
			try {
				baseService.remove(id[i]);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				error.put("id", id[i]);
				error.put("msg", e.toString());
				map.put("msg", e.toString());
				errorList.add(error);
			}
		}

		if (errorList.size() > 0) {
			map.put("success", false);
			map.put("errorCount", errorList.size());
			map.put("errorInfo", errorList);
		}
		return this.toJson(map);
	}

	// 获取fields
	@RequestMapping("getFields")
	public String getFields() {
		try {
			List fields = baseService.getField(clazz);
			return this.toJson(fields);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
			return this.toJson(map);
		}
	}
	
	// sql 获取fields
	@RequestMapping("getFieldsBySql")
	public String getFieldsBySql() {
		try {
			if(this.sql == null || "".trim().equals(this.sql)) {
				throw new Exception("sql语句不能为空");
			}
			List fields = baseService.getFieldBySql(this.sql);
			
			System.out.println("sql = " + sql);
			return this.toJson(fields);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("success", false);
			map.put("msg", e.getMessage());
			return this.toJson(map);
		}
	}

	public String toJson(Object object) {
		if(object instanceof String) {
			request.setAttribute("json", object);
		} else {
			request.setAttribute("json", gson.toJson(object));
		}
		return "json";
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}
}
