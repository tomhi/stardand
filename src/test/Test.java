package test;

import java.lang.reflect.InvocationTargetException;

import com.myproject.entity.Users;

public class Test {

	public static void main(String[] args) throws Exception {
		
		Users user = new Users();		// 更新传来的对象
		user.setUsername("sun");
		
		Users user2 = new Users();	// 原对象
		user2.setUsername("java");
		user2.setEmail("test@163.com");
		user2.setNote("备注");

		Users u = (Users)getMergeObject(user, user2);
		
		System.out.println(u == user2);

		System.out.println(u.getUsername());
		System.out.println(u.getNote());
		System.out.println(u.getEmail());
	}

	private static Object getMergeObject(Object obj1, Object obj2) {
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
		return obj2;
	}

}
	
