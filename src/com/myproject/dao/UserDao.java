package com.myproject.dao;

import core.dao.BaseDao;

public interface UserDao extends BaseDao {

	public abstract void myMethod();
	
	public abstract void pay1Step();
	public abstract void pay2Step();

}