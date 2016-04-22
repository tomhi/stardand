package com.myproject.dao;

import org.springframework.stereotype.Repository;

import com.myproject.entity.Users;

import core.dao.BaseDaoImpl;

@Repository
public class UserDaoImpl extends BaseDaoImpl implements UserDao {
	
	public UserDaoImpl() {
		super(Users.class);	// 将实体类传入BaseDaoImpl
	}

	public void myMethod() {
		System.out.println("userDao myMethod");
	}

	@Override
	public void pay1Step() {
		System.out.println("交费第一步");
	}

	@Override
	public void pay2Step() {
		System.out.println("交费第二步");
	}
}
