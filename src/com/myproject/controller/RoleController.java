package com.myproject.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myproject.entity.Roles;

import core.controller.BaseController;

@Controller
@Scope("prototype")	// 不可少
@RequestMapping("role")
public class RoleController extends BaseController<Roles> {
	
}
