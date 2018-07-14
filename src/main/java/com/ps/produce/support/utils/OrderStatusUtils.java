/**
 * Copyright &copy; 2012-2016 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 */
package com.ps.produce.support.utils;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ps.produce.support.SpringContextHolder;
import com.ps.produce.support.pair.AmazonSite;
import com.ps.produce.support.pair.OrderStatus;
import com.ps.produce.system.dao.DictDao;
import com.ps.produce.system.entity.Dict;

/**
 * 字典工具类
 * @author ThinkGem
 * @version 2013-5-29
 */
public class OrderStatusUtils {
	
	
	
	public static String getLabel(int value){
		String label="";
		for (OrderStatus status : OrderStatus.values()) {
			if(value==status.getValue() ){
				return status.getLabel();
			}
		}
		return label;
	}
	public static String checkStatus(int value) {
		if(value==OrderStatus.waitConfirm.getValue()) {
			return "<button class=\" btn btn-primary cancle\">取消订单</button>";
		}
		if(value==OrderStatus.waitShipping.getValue()) {
			return "<button  class=\" btn btn-primary addShipInfo\">添加物流信息</button>";
		}
		return "";
	}

	
	
	
}