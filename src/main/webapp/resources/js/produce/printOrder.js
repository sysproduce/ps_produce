(function($) {
    $(function() {
    	
    	printOrder();
    	getDate();  
    });
   
    function printOrder(){
    	$("#printOrder").click(function(e){
    		
            var checks=$('input:checkbox[class=isConfirm]:checked');
    		var orderIds=[];
    		if(checks.length<1){
    			$.messager.popup("请选中订单!");
    			return false;
    		}
    		var $btn = $(this).button('loading')
    		for(var i=0;i<checks.length;i++){
    			var t =checks[i];
    			orderIds.push( $(t).closest('tr').eq(0).attr('order-id'));
    		}
    		
    		var status=$("#status").val();
    		$.ajax({
                url : ctx + "/order/confirmOrder",
                type : "POST",
                 data:"orderId="+orderIds.join(),
                success : function(result) {
                	//location.reload();
                	if(result==0){
                	print(ctx+"/printPdf?orderIds="+orderIds.join());
                	$btn.button('reset');
                	}else{
                		$btn.button('reset');
                		$.messager.popup("订单同步失败!");
                	}

                },
                error:function(){
                	
                	$btn.button('reset');
                }
                
            });
    	});  
    }
    function getDate(){
    	var time=$('#reservation').val();
    	if(time!=""){
    		return false;
    	}
 	   var d=new Date();
        var mydate=new Date(d.getTime()-86400000*7);
 	   var str = "" + mydate.getFullYear() + "-";
 	   str += (mydate.getMonth()+1)+"-" ;
 	   str += (mydate.getDate());
 	   var nowdate=new Date();
 	   var str1 =nowdate.getFullYear() + "-";
 	   str1 += (nowdate.getMonth()+1) + "-";
 	   str1 += (nowdate.getDate())+ "";
 	   var a=str+" ~ "+str1;
 	   $('#reservation').val(a);
 	   
 }
    function print(url){
			var timestamp=Math.round(new Date().getTime()/1000);
			//if($('#PDFtoPrint'))
			if(document.getElementById("PDFtoPrint")!=null && typeof(document.getElementById("PDFtoPrint"))!='undefined'){
				document.body.removeChild(document.getElementById("PDFtoPrint"))
			}
			var iframe = document.createElement("IFRAME");
			//var iframe=$('<iframe src="" id="" style="display: none;"></iframe>');
			//$("body").append(iframe);
			iframe.style.display="none";
			iframe.id="PDFtoPrint";
			 iframe.src=url+"&timestamp="+timestamp;
			iframe.onload = function() {
		        return function() {
		        	iframe.focus();
		        	iframe.contentWindow.print();
		        	iframe.style.display="none";
		//         	setTimeout(function(){ document.body.removeChild(iframe);},10000);
		        }
		    }();
		    document.body.appendChild(iframe);
	
	}
})(jQuery);