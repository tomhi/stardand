package core.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletRequest;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;

public class PageBean {

	private int startIndex = 0;
	private int pageSize = 10;
	private int totalCount = 0;
	
	private List<Condition> conditions = new ArrayList<Condition>();

	private List<Order> orders = new ArrayList<Order>();
	
	public PageBean() {
		
	}
	
	public PageBean(int pageSize) {
		this.pageSize = pageSize;
	}

	public PageBean(ServletRequest request) {

		Enumeration<String> paramNames = request.getParameterNames();

		while (paramNames.hasMoreElements()) {
			String paramName = (String) paramNames.nextElement();

			if (paramName.startsWith("Q_")) {
				String[] fields = paramName.split("_");
				if (fields.length == 4) {
					Object obj = convertObject(fields[2], request.getParameter(paramName));
					if (null == obj || "".equals(obj)) {
						continue;
					}

					if("OD".equalsIgnoreCase(fields[3])) {		// 排序字段
						Order order = new Order();
						order.setField(fields[1]);
						order.setValue(obj.toString());
						orders.add(order);
					} else {									// 条件字段
						Condition condition = new Condition();
						
						condition.setField(fields[1]);
						condition.setValue(obj.toString());
						
						if ("EQ".equalsIgnoreCase(fields[3])) {
							condition.setType("=");
						} else if ("LIKE".equalsIgnoreCase(fields[3])) {
							condition.setType("like");
						} else if ("LE".equalsIgnoreCase(fields[3])) {
							condition.setType("<=");
						} else if ("GE".equalsIgnoreCase(fields[3])) {
							condition.setType(">=");
						}
						conditions.add(condition);
					}
				}
			}

			if ("start".equalsIgnoreCase(paramName)) {
				this.startIndex = new Integer(request.getParameter(paramName)).intValue();
			}

			if ("limit".equalsIgnoreCase(paramName)) {
				this.pageSize = new Integer(request.getParameter(paramName)).intValue();
			}
		}
	}

	private Object convertObject(String paramType, String paramValue) {
		Object obj = null;
		try {
			if ("S".equalsIgnoreCase(paramType)) {
				obj = paramValue;
			} else if ("L".equalsIgnoreCase(paramType)) {
				obj = Long.valueOf(new Long(paramValue).longValue());
			} else if ("D".equalsIgnoreCase(paramType)) {
				obj = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(paramValue);
			} else {
				obj = paramValue;
			}
		} catch (Exception e) {
			obj = paramValue;
		}
		return obj;
	}

	public int getStartIndex() {
		return this.startIndex;
	}

	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalCount() {
		return this.totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public List<Order> getOrders() {
		return this.orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public void setOrder(Order order) {
		if (this.orders == null) {
			this.orders = new ArrayList<Order>();
		}
		this.orders.add(order);
	}

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}
}