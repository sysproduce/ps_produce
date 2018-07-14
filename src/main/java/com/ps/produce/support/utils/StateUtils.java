package com.ps.produce.support.utils;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.ps.produce.order.dto.OrderParam;
import com.ps.produce.support.Response;
import com.ps.produce.support.SignatureUtils;

public class StateUtils {
	public static  Response changState(String orderNo,String states,String tracking_number,String carriers) {
    	Gson gson=new Gson();
    	OrderParam o=new OrderParam();
    	o.setCarriers(carriers);
    	o.setOrder_no(orderNo);
    	o.setState(states);
    	o.setTracking_number(tracking_number);
    	String data =gson.toJson(o);
    	String url="http://10.101.10.112:8080/ps/ps/orders/sync";
    	url = SignatureUtils.signatureUrl(url, data, "dce7b60efaee20cc");
    	String response=HttpClientUtil.doPostJson(url,data);
        return  gson.fromJson(response,Response.class);
    }
	public static void main(String[] args) {
		changState("1807141447011421","1","111","1111");
	}
}