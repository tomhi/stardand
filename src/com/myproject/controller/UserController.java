package com.myproject.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myproject.entity.Users;
import com.myproject.service.UserService;

import core.controller.BaseController;

@Controller
@Scope("prototype")	// 不可少，否则有问题
@RequestMapping("user")
public class UserController extends BaseController<Users> {

	@Autowired
	private UserService userService;
	
	public UserController() {
		this.sql = "SELECT B.orgname,a.orgid, A.ID, A.USERNAME, A.SEX, A.NOTE,A.EMAIL, A.CREATEDATE AS CREATEDATE" +
				" FROM USERS A " +
				" LEFT JOIN sys_org B ON A.orgid = B.ID";
	}
	
	// 历年费用
	@RequestMapping("getHistoryCost")
	public String getHistoryCost() {
		try {
			List list = userService.getHistoryCost(page);

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
	
	// 业务变更
	@RequestMapping("getBusinessChange")
	public String getBusinessChange() {
		try {
			List list = userService.getBusinessChange(page);
			
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
	
	// 图纸资料
	@RequestMapping("getDrawingInfo")
	public String getDrawingInfo() {
		try {
			List list = userService.getDrawingInfo(page);
			
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
	
	// 面积信息
	@RequestMapping("getAreaInfo")
	public String getAreaInfo() {
		try {
			List list = userService.getAreaInfo(page);
			
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
	
	// 面积结算
	@RequestMapping("getAreaBalance")
	public String getAreaBalance() {
		try {
			List list = userService.getAreaBalance(page);
			
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
	
}
