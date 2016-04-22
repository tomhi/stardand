package com.myproject.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.dao.UserDao;

import core.service.BaseServiceImpl;
import core.util.PageBean;

@Service
public class UserServiceImpl extends BaseServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	public UserServiceImpl() {
		System.out.println("UserServiceImpl init");
	}

	public void myMethod() {	// test
		String sql = "select * from user";
		List list = this.baseDao.findAllBySql(sql, null);
		System.out.println("size = " + list.size());
	}
	
	@Override
	public void pay() {		// 事务,如有一步失败, 则全部回滚 test
		// TODO Auto-generated method stub
		userDao.pay1Step();
		userDao.pay2Step();
	}

	@Override
	public List getHistoryCost(PageBean page) {
		// TODO Auto-generated method stub
		
		String sql = "select '2014-2015' as year, a.*, a.id as userId, a.id as HISTORYID from users a";	// 历年费用示意sql，　暂时用这个语句占位
		return userDao.findAllBySql(sql, page);
	}
	
	@Override
	public List getBusinessChange(PageBean page) {
		// TODO Auto-generated method stub
		
		String sql = "select a.*, a.id as userId from users a";	// 业务变更sql，　暂时用这个语句占位
		return userDao.findAllBySql(sql, page);
	}

	@Override
	public List getAreaInfo(PageBean page) {
		// TODO Auto-generated method stub
		String sql = "select 'fdafasfa' as testid, a.*, a.id as userId from users a";	// 面积信息sql，　暂时用这个语句占位
		return userDao.findAllBySql(sql, page);
	}

	@Override
	public List getDrawingInfo(PageBean page) {
		// TODO Auto-generated method stub
		String sql = "select a.*, a.id as userId from users a";	// 图纸资料sql，　暂时用这个语句占位
		return userDao.findAllBySql(sql, page);
	}

	@Override
	public List getAreaBalance(PageBean page) {
		// TODO Auto-generated method stub
		String sql = "select a.*, a.id as userId from users a";	// 面积结算sql，　暂时用这个语句占位
		return userDao.findAllBySql(sql, page);
	}
}
