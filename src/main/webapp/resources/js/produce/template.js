(function($) {
    $(function() {
        initUI();
    });
    function initUI() {
        var table = $('#datatable').DataTable({
            "dom" : '<"toolbar-btn"> tr<"row"<"col-xs-6"<"col-xs-6"l><"col-xs-6"i>><"col-xs-6"p>>',
            "lengthMenu" : [ [ 50, 100, 200, 500, 2000, 1000000 ], [ 50, 100, 200, 500, 2000, "All" ] ],
            "bStateSave" : true,
            language: {
                search: "",
                searchPlaceholder: "Search..."
            },
            "bDeferRender" : true,
            "bServerSide" : false,
            "bProcessing":true,
            'bAutoWidth' : false,
            "aoColumnDefs": [
            	{ 'bSortable': false, 'aTargets': [ 0 ],"sWidth": "50px"}
             ],
            "createdRow" : function(row, data, dataIndex) {
                row.id = data.id
            },
            "sAjaxSource" : ctx + '/template/source',
            "fnServerData" : function(sSource, aoData, fnCallback) {
                for ( var d in aoData) {
                    if (aoData[d].name == "sSearch") {
                        aoData[d].value = encodeURI(aoData[d].value);
                    }
                }
                $.ajax({
                    "data" : aoData,
                    "contentType" : "application/json; charset=utf-8",
                    "success" : fnCallback,
                    "url" : sSource
                });
            },
            "fnDrawCallback" : function() {
            },
            "aoColumns" : [{
                "title" : "产品类别",
                 "mData" : 'productType'
            }, {
            	"title" : "SKU",
                "mData" : 'sku'
            }, {
            	"title" : "产品名称",
                "mData" : 'productName'
            }, {
            	"title" : "模具效果图",
                "mData" : function(data,type,row){
                	imgs=data.tempImgs.split(';');
                	var content="";
                	for(var i=0;i<imgs.length;i++){
                		content+='<img src='+imgs[i]+' class="img-rounded">';
                	}
                	return content;
                }
            }],
            "footerCallback" : function(row, data, start, end, display) {
            },
            initComplete : function() {
            }
        });
        
       var toolbar =$('<ul class="dropdown-menu"></ul>');
       toolbar.append('<li><a href="#" id="del">删除</a></li>');
       toolbar.append('<li><a href="#" id="edit">修改</a></li>');
    
       $("div.toolbar-btn").append('<button  class=" btn btn-primary " id="add">创建模具</button> ');
       $("div.toolbar-btn").append('<button  class=" btn btn-default btn-dropdown">更多操作</button> ');
       $("div.toolbar-btn").append(toolbar);
       $.bindEvent(table);//绑定各种事件
       
       $('#del').click(function() {
			var rows = table.rows('.selected');
			var data = rows.data();
			var ids = new Array();
			for(var i=0;i<data.length;i++){	
				ids.push(data[i].id);
			}	
			if(ids.length<1){
				$.messager.popup 
				("请选择任务!");
				return false;
			}
			$.messager.model = { 
		        ok:{ text: "确定",'classed': ' btn-primary' },
		        cancel: { text: "取消", 'classed': ' btn-default' }
	        };
		    $.messager.confirm("", "确认选中"+ids.length+"删除？", function() { 
		    	  $.ajax({
			 		   url : ctx + "/system/user/delete",
			 		   type:"post",			 		  
			 		   data :"ids="+ids.join(),
			 		   success : function(d) {	
			 			   table.ajax.reload();
			 			   $.messager.popup("删除成功!");
			 		   }
				});
		    });
	    });
       $('#edit').click(function() {
    	   var rows = table.rows('.selected');
           var datas = rows.data();           
           if(datas.length!=1){
               $.messager.popup("请选1个择任务!");               
               return false;
           }
           var data = datas[0];
           window.location.href = ctx + "/system/user/form?id="+data.id;
          /* var $f = $('<div role="form"></div>');
           $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">类型</label><input type="text" dialog-id="type" class="form-control"></div></div></div>');
           $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">标签名</label><input type="text" dialog-id="label" class="form-control"></div></div></div>');
           $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">值</label><input type="number" dialog-id="value" class="form-control"></div></div></div>');
           $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">描述</label><input type="text" dialog-id="description" class="form-control"></div></div></div>');
           $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">排序</label><input type="number" dialog-id="sort" class="form-control"></div></div></div>' );
           $f.find('[dialog-id=type]').val(data.type);
           $f.find('[dialog-id=label]').val(data.label);
           $f.find('[dialog-id=value]').val(data.value);
           $f.find('[dialog-id=description]').val(data.description);
           $f.find('[dialog-id=sort]').val(data.sort);
    	   $f.dialog({
               title : "修改字典",
               onClose : function() {
                   $(this).dialog("destroy");
               },
               buttons : {
                   "确定" : function() {
                       var type =  $f.find('[dialog-id=type]').val();
                       var label = $f.find('[dialog-id=label]').val();
                       var value =  $f.find('[dialog-id=value]').val();
                       var description =  $f.find('[dialog-id=description]').val();                  
                       var sort = $f.find('[dialog-id=sort]').val();
                       var param = {
                    	   type : type,
                           label : label,
                           value : value,
                           description : description,
                           sort : sort,
                           id : data.id
                       };
                       $.ajax({
                           url : ctx + "/system/dict/update",
                           type : "POST",
                           contentType : 'application/json; charset=utf-8',
                           dataType : 'json',
                           data : JSON.stringify(param),
                           success : function(result) {
                               if (result.ret == 0) {
                                   table.ajax.reload();
                                   $.messager.popup("修改成功!");
                               } else {
                               	$.messager.popup("修改失败!");
                               }
                           },
                           complete : function() {
                               $f.dialog("destroy");
                           }
                       });
                   }
               }
           });
           $('.dialog').click(function(e) {
              if(!$(e.target).hasClass('close')&&!$(e.currentTarget).hasClass('in'))
                   $f.dialog("destroy");
           });*/
       });
       
//        $('#add').click(function() {
//            var $f = $('<div role="form"></div>');
//            $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">类型</label><input type="text" dialog-id="type" class="form-control"></div></div></div>');
//            $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">标签名</label><input type="text" dialog-id="label" class="form-control"></div></div></div>');
//            $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">值</label><input type="number" dialog-id="value" class="form-control"></div></div></div>');
//            $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">描述</label><input type="text" dialog-id="description" class="form-control"></div></div></div>');
//            $f.append('<div class="form-group"><div class="input-group"><label class="input-group-addon">排序</label><input type="number" dialog-id="sort" class="form-control"></div></div></div>' );
//            $f.dialog({
//                title : "新增字典",
//                onClose : function() {
//                    $(this).dialog("destroy");
//                },
//                buttons : {
//                    "确定" : function() {
//                        var type =  $f.find('[dialog-id=type]').val();
//                        var label = $f.find('[dialog-id=label]').val();
//                        var value =  $f.find('[dialog-id=value]').val();
//                        var description =  $f.find('[dialog-id=description]').val();                  
//                        var sort = $f.find('[dialog-id=sort]').val();
//                        var param = {
//                        	type : type,
//                            label : label,
//                            value : value,
//                            description : description,
//                            sort : sort
//                        };
//                        $.ajax({
//                            url : ctx + "/system/dict/add",
//                            type : "POST",
//                            contentType : 'application/json; charset=utf-8',
//                            dataType : 'json',
//                            data : JSON.stringify(param),
//                            success : function(result) {
//                                if (result.ret == 0) {
//                                    table.ajax.reload();
//                                    $.messager.popup("添加成功!");
//                                } else {
//                                	$.messager.popup("添加失败!");
//                                }
//                            },
//                            complete : function() {
//                                $f.dialog("destroy");
//                            }
//                        });
//                    }
//                }
//            });
//            $('.dialog').click(function(e) {
//               if(!$(e.target).hasClass('close')&&!$(e.currentTarget).hasClass('in'))
//                    $f.dialog("destroy");
//            });
//        });
       
    }
})(jQuery);
