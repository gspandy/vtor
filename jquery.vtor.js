/**
 * jQuery vtor plugin 1.0.0
 * @author JsonZou, 2012-2012
 * @source ����VVC˼��Ľ����ҳ����֤js��ܡ�����controler��
 * @license MIT License <https://github.com/jsonzou/vtor>
 */
(function($){
   $vtor={

	   /**
		 * ��ʼ��
		 */
	  $:function(path,view){
	     $vtor.init(path,view);
	  },
	  $v:function(){
	    return $vtor.validate();
	  },
	  $id:function(id){
		  return $vtor.util.getValById(id);
	  },
      init:function(path,view){
		 //����lib��config��css
         $vtor.util.loadFile();
		//��ȡ�û�������Ϣ
		 var config={
		   vtor:{},//�Զ�����֤�ļ���ʽ
		   funcs:{}//�Զ�����û���֤������
		 };
		 $vtor.cfg(config);
        //�����û���֤�ļ���ʽ
		 if(config.vtor){
			  $.extend($vtor.config,config.vtor);
		 }
		 //�����û��Զ�����֤������
		 if(config.funcs){
			  $.extend($vtor_func,config.funcs);
		 }
		  
		  
		  //��ȡ��֤�ļ�������Ϣ
	       $vtor.core.getVtors(path);
		  //������֤����
		   $vtor.core.builtVtors();
		  //��ʼ����֤ģ�� 
		   $vtor.view=view;

		   //alert($vtor.vtorStr) 
			//alert(JSON.stringify($vtor.vtorObject)) 
		   },
      //�����ļ��ַ���
      vtorStr:'',
	 //��֤����
      vtorObject:{},
	//��֤ģ��
	  view:[],
	/*
	  ***vtor����***
      * func_pre ��֤����ǰ׺
	  * view_pre �����ļ�ģ��ǰ׺
	  * id_pre �����ļ�DOM idǰ׺
	  * validateTerm_pre �����ļ������ǰ׺
	  * msg_pre �����ļ���֤��ʾ��ǰ׺
	  * param_begin �����ļ���֤������ʼ�ַ�
	  * param_end �����ļ���֤���������ַ�
	  * param_split �����ļ���֤�����ָ���
	  * msg_type ��ʾ���ͣ�singleֻ��ʾ�ǰ��һ��������֤��multiple��ʾȫ��������֤
	  */
	 config:{
	     func_pre:'func',
		 view_pre:'@',
		 id_pre:'#',
         validateTerm_pre:'--',
		 msg_pre:'::',
		 param_begin:'(',
		 param_end:')',
		 param_split:',',
		 msg_type:'single',
		 msg_class:'vtor-input-err-msg',
		 errInput_class:'vtor-input-err-border',
		 vtor_suf:'vtor'
	  },
	/*
	  ***vtor����***
	  * msg_html ������ʾ��Ϣhtml����
	  * msg_type_singleֻ��ʾ�ǰ��һ��������֤
	  * msg_type_multy��ʾȫ��������֤
	  */
	constant:{
		func_middle:'_',
	    msg_html:"<span>&nbsp;</span>",
		msg_type_single:'single',
		msg_type_multiple:'multiple'
	  },
		//ִ����֤
	  validate:function(){
	    return $vtor.core.dovalidate($vtor.view);
	  },
	 /*
      ***���߰�***
      * clearAnnotation ���ע��
	  * trim ȥ���ַ������ҿհ��ַ�
	  * getParam ������֤����
	  */
      util:{
		getValById:function(id){
		   return $("#"+id).val();
		},
		loadFile:function(){
		  var js=document.scripts;
		 
			var jsPath='';
			for(var i=0;i<js.length;i++){
			 if(js[i].src.indexOf("jquery.vtor.js")>-1){
			   jsPath=js[i].src.substring(0,js[i].src.lastIndexOf("jquery.vtor.js"));
			 }
             }
		 
         $("head").append("<script src='"+jsPath+"lib/vtor.lib.js'> </script>");
		 $("head").append("<script src='"+jsPath+"vconf/vtor.config.js'> </script>");
	     $("head").append("<link rel='stylesheet' type='text/css' href='"+jsPath+"css/vtor.css' />");
			 

		},
	    clearAnnotation:function(str){
			 return str.replace(/\*[^*]*\*+(?:[^\/*][^*]*\*+)*/g,'').replace(/\/\/[^\r\n]*/g ,'');
			 
		  },
		trim : function(str) { 
				return str.replace(/(^\s*)|(\s*$)/g, ""); 
				},
		getParam:function(param){
			   if(!$vtor.util.trim(param)){
			     return [];
			   }
               var paramArr=param.split($vtor.config.param_split);
			   if(!paramArr){
			     return [];
			   }
               for (p in paramArr )
               {
				paramArr[p]=$vtor.util.trim(paramArr[p])
               }
			  return paramArr;
			 },
		checkVtorPth:function(path){
				  var reg=new RegExp('\\.'+$vtor.config.vtor_suf+"$"); 
				  if(reg.test(path)){
				     return true;
				  }else{
				     alert('err:\npath->'+path+'\n is not the validator file!The validator file must be end width ".'+$vtor.config.vtor_suf+'"');
				  }
                   return reg.test(path);  
			 }
	  },
	/* 
	  ***��֤���İ�***
      * show ִ����ʾ
	  * dovalidate ������֤����ִ����֤
	  * builtVtors ������֤����
	  * getVtors ��ȡ�����ļ���֤��Ϣ
	  */
	  core:{
		  
		  show:function(id,msg){
			  var _ido=$("#"+id);
			  if(_ido&&_ido.length>0){
			  _ido.addClass($vtor.config.errInput_class);
			  var _msgo= _ido.next('span.'+$vtor.config.msg_class);
			 
			  _msgo.html(msg);
		      _msgo.show(500);
              }
		  },
		  dovalidate:function(view){
		            var resoult=true;
					for(v in view){
					   var ids=$vtor.vtorObject[view[v]];
					  for(id in ids){
                         var validateTerms=ids[id];
                         for(validateTerm in validateTerms){
						    var  _resoult=$vtor_func[$vtor.config.func_pre+$vtor.constant.func_middle+validateTerm](id,validateTerms[validateTerm].param);
							if(!_resoult){
								resoult=resoult&&_resoult;
							  if($vtor.config.msg_type==$vtor.constant.msg_type_multiple){
								  $vtor.core.show(id,validateTerms[validateTerm].msg);
							     
							  }else{
								$('.'+$vtor.config.errInput_class).removeClass($vtor.config.errInput_class);
							   $vtor.core.show(id,validateTerms[validateTerm].msg);
						       return resoult;
							  }
						    }else{
							 
							  $("#"+id).removeClass($vtor.config.errInput_class);
							}
					    
						 }
					  }
					 }
					 
					 return resoult;
			 
			 
		  },
		  builtVtors:function(){
			 return  (function(){
			    var strs=$vtor.vtorStr.split($vtor.config.view_pre); 
			   for(s in strs){
				if($vtor.util.trim(strs[s])){
				   var validates=strs[s].split($vtor.config.id_pre)
				   var ids={};
				   for(var i=1;i<validates.length;i++){
					  if($vtor.util.trim(validates[i])){
							  var validateTerms=validates[i].split($vtor.config.validateTerm_pre);
							  
							  var rules={};
							  for(var g=1;g<validateTerms.length;g++){
								   var validateTerm= $vtor.util.trim(validateTerms[g]);
									  
									var func_id=$vtor.util.trim(validateTerm.substring(0,validateTerm.indexOf($vtor.config.param_begin)==-1?
										validateTerm.indexOf($vtor.config.msg_pre):validateTerm.indexOf($vtor.config.param_begin)
									));
									var param=$vtor.util.trim(validateTerm.substring(validateTerm.indexOf($vtor.config.param_begin)+1,validateTerm.indexOf($vtor.config.param_end)));
									var msg=validateTerm.split($vtor.config.msg_pre);
									var _msg='';
									if(msg.length==2){
										_msg=msg[1];
									}
									if(func_id){
										 
										rules[func_id]={param:$vtor.util.getParam(param),msg:_msg}
									}
									
							  }
							  //��ʾ���div
							  var _msgo=$($vtor.constant.msg_html);
							  var _ido= $("#"+$vtor.util.trim(validateTerms[0]));
							  if(_ido&&_ido.length>0){
							  _ido.after(_msgo);
							  _msgo.addClass($vtor.config.msg_class);
							  _msgo.css('left',_ido.offset().left+_ido.width())
							  _msgo.css('top',_ido.offset().top)
							  _ido.focus(function(){
								  $(this).next('span.'+$vtor.config.msg_class).hide(500);
								 
									  });
							  ids[$vtor.util.trim(validateTerms[0])]=rules;
							  }
					   }
				   }
				  $vtor.vtorObject[$vtor.util.trim(validates[0])]=ids;
				}
			  }	 
			  })();
		  },
		  getVtors:function(path){
			  if($vtor.util.checkVtorPth(path)){
			     
                    $.ajax({
					    type: "get",
					    url: path,
					    async:false,
					    success: function(data, textStatus){
						$vtor.vtorStr+=data;
				        } 
			        });
			    
				  $vtor.vtorStr=$vtor.util.clearAnnotation($vtor.vtorStr);
			   
			  }
		  }
	   }
   
   }; 
  
})(jQuery);