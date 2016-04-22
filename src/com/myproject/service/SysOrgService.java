package com.myproject.service;

import java.util.List;

import core.service.BaseService;
import core.util.PageBean;

public interface SysOrgService extends BaseService {
	
	public abstract List getTreeWithUser(String id);
	public abstract List getTree(String id);
}