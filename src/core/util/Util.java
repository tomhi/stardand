package core.util;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.myproject.entity.Users;


public class Util {
	
	public static String cNull(Object o) {
		if(o == null) {
			return "";
		} else {
			return o.toString();
		}
	}
	

	public static void main2(String[] args) {
		
		List list = new ArrayList();
		Map m = new HashMap();
		m.put("NAME", "SUN");
		m.put("SEX", "SUN");
		list.add(m);
		list.add(m);
		
		
		list = mapKey2LowerCase(list);
		System.out.println(list);
	}
	
	public static List mapKey2LowerCase(List list) {
		
		Iterator it = list.iterator();
		
		List l = new ArrayList();
		while(it.hasNext()) {
			Map map = (Map)it.next();
			Map mapNew = new HashMap();
			Object[] arr = map.keySet().toArray();
			for(int i = 0; i < arr.length; i ++) {
				mapNew.put((arr[i] + "").toLowerCase(), map.get(arr[i]));
			}
			l.add(mapNew);
		}
		
		return l;
	}

	

	// 将obj1的属性值合并到obj2上
	public static void mergeObject(Object obj1, Object obj2) {
		java.lang.reflect.Method[] methods = obj1.getClass().getDeclaredMethods();// 获取对象所有方法
		for (java.lang.reflect.Method method : methods) {
			
			if (method.getName().startsWith("get")) {// 获取get方法
				//System.out.println("name = " + method.getName());
				try {
					Object o = method.invoke(obj1);// 执行
					if (o == null || "".equals(o.toString())) {
						//System.out.println("----");
					} else {
						for (java.lang.reflect.Method m : methods) {
							if (m.getName().startsWith("set")) {// 获取get方法
								//System.out.println("name = " + method.getName());
								if(m.getName().substring(3).equals(method.getName().substring(3))) {
									m.invoke(obj2, o);
								}
							}
						}
					}
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}
	public static void main(String[] args) {
		Users old = new Users();
		old.setUsername("sun");
		old.setEmail("123");
		old.setSex("f");
		
		Users updated = new Users();
		updated.setUsername("tom");
		mergeObject(updated, old);
		
		System.out.println(old.getUsername());
		System.out.println(old.getEmail());
		System.out.println(old.getSex());
		
		
	}
}
