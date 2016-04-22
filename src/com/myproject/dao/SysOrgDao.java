package com.myproject.dao;

import java.util.List;

import core.dao.BaseDao;
import core.util.PageBean;

public interface SysOrgDao extends BaseDao {

	public abstract List getTree();

}