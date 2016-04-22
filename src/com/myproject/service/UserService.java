package com.myproject.service;

import java.util.List;

import core.service.BaseService;
import core.util.PageBean;

public interface UserService extends BaseService {

	public abstract void pay();	// 交费 test
	
	public abstract List getHistoryCost(PageBean page);

	public abstract List getBusinessChange(PageBean page);

	public abstract List getDrawingInfo(PageBean page);

	public abstract List getAreaInfo(PageBean page);
	
	public abstract List getAreaBalance(PageBean page);
}