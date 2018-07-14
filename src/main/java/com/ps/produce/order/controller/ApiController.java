package com.ps.produce.order.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.ps.produce.model.po.Template;
import com.ps.produce.model.service.TemplateService;
import com.ps.produce.order.entity.Order;
import com.ps.produce.order.service.OrderService;
import com.ps.produce.support.Response;
import com.ps.produce.support.ResponseCode;
import com.ps.produce.support.SignatureUtils;

@Controller
@RequestMapping(value = "/api")
public class ApiController {


	@Autowired
	OrderService orderService;

	@Autowired
	TemplateService templateService;

	@RequestMapping(value = "order/add")
	@ResponseBody
	public Response addOrder( HttpServletRequest request) {
		
		Response res = new Response();
		try {
			String body = IOUtils.toString(request.getInputStream(),"utf-8" );
			
			SignatureUtils.checkSign(request, body);
			Gson gson = new Gson();
			Order order = gson.fromJson(body, Order.class);
			orderService.insert(order);
		} catch (IOException e) {
			res.setMsg(e.getMessage());
			res.setResponseCode(ResponseCode.ERROR);
			e.printStackTrace();
		}
		
		return res;
	}

	@RequestMapping(value = "order/cancle")
	@ResponseBody
	public Response cancle( HttpServletRequest request) {
		Response res = new Response();
		try {
			String body = IOUtils.toString(request.getInputStream(),"utf-8" );
			
			SignatureUtils.checkSign(request, body);
			Gson gson = new Gson();
			Order order = gson.fromJson(body, Order.class);
			int i = orderService.cancle(order);
			if(i==0) {
				res.setMsg("取消订单失败");
				res.setResponseCode(ResponseCode.ERROR);
			}
		} catch (IOException e) {
			res.setMsg(e.getMessage());
			res.setResponseCode(ResponseCode.ERROR);
			e.printStackTrace();
		}
		
		return res;
	}

	@RequestMapping(value = "template/add")
	@ResponseBody
	public Response addTemplate(  HttpServletRequest request) {
		Response res = new Response();
		try {
			String body = IOUtils.toString(request.getInputStream(),"utf-8" );
			
			SignatureUtils.checkSign(request, body);
			Gson gson = new Gson();
			Template template = gson.fromJson(body, Template.class);
			templateService.insert(template);
		} catch (IOException e) {
			res.setMsg(e.getMessage());
			res.setResponseCode(ResponseCode.ERROR);
			e.printStackTrace();
		}

	
		return res;
	}

	
}
